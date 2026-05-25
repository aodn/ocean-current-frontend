import React, { useCallback, useEffect, useState } from 'react';
import { Layer, MapMouseEvent, Source, useMap } from 'react-map-gl/mapbox';
import dayjs from 'dayjs';
import { mapboxLayerIds, mapboxSourceIds } from '@/constants/mapboxId';
import { buildStaticImageUrl } from '@/utils/data-image-builder-utils/dataImgBuilder';
import { useProductSearchParam, useQueryParams } from '@/hooks';
import useProductPath from '@/stores/product-store/hooks/useProductPath';
import { BoundingBox, GeoJsonPolygon } from '@/types/map';
import { getRegionByRegionCode, getRegionTitleByRegionCode } from '@/utils/region-utils/region';
import { convertGeoJsonCoordinatesToBBox } from '@/utils/geo-utils/geo';
import useCurrentMetersStore from '@/stores/current-meters-store/currentMeters';
import { color } from '@/styles/colors';
import { ProductPath } from '@/types/router';
import useProductStore from '@/stores/product-store/productStore';
import { useRegionLatestDates } from '@/services/hooks';
import { RegionLatestDate } from '@/types/imageList';
import { RegionScope } from '@/constants/region';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import { mapAnimation } from '@/configs/map';
import { isValidMonthlyMeanDate } from '@/utils/date-utils/date';
import useRegionPolygons from '../hooks/useRegionPolygons';
import { getPropertyFromMapFeatures, waitForMapAnimationAsync } from '../utils';
import { shouldDeferToHigherPriorityLayer, hasFeatureAtPoint, shouldBlockRegionHover } from '../utils/layerPriority';

interface RegionPolygonLayerProps {
  isMiniMap: boolean;
  disableRegionAutoFit?: boolean;
}

const { PRODUCT_REGION_BOX_SOURCE_ID } = mapboxSourceIds;
const { PRODUCT_REGION_BOX_LAYER_ID, PRODUCT_REGION_NAME_LABEL_LAYER_ID, PRODUCT_REGION_SELECTED_BOX_LAYER_ID } =
  mapboxLayerIds;

const RegionPolygonLayer: React.FC<RegionPolygonLayerProps> = ({ isMiniMap, disableRegionAutoFit = false }) => {
  const baseProductPath = useProductPath();
  const { searchParams, updateQueryParamsAndNavigate } = useQueryParams();
  const { region: regionCodeFromUrl, date: dateFromUrl } = useProductSearchParam();
  const productId = useProductStore((state) => state.productParams.productId);
  const selectedRegionTitle = getRegionTitleByRegionCode(regionCodeFromUrl, productId) || 'Au';
  const regionGeoJsonData = useRegionPolygons();
  const { isOceanColour, isCurrentMetersMooredInstrumentArray, isSealCtd, isSealCtdTags } = useProductCheck();

  const isSealCtdRelatedProduct = isSealCtd || isSealCtdTags;

  // SealCTD related products on the map only use the seal CTD tracks data source
  const { data: regionLatestDates, isLoading: isLoadingLatestDates } = useRegionLatestDates(
    isSealCtdRelatedProduct ? 'sealCtd-sealTracks' : productId,
  );

  const {
    property: currentMetersProperty,
    depth: currentMetersDepth,
    date: currentMetersDate,
  } = useCurrentMetersStore();

  const { current: map } = useMap();

  const [hoveredRegion, setHoveredRegion] = useState<string>('');
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);

  const fallbackLatestDate = dayjs().subtract(2, 'day').format('YYYYMMDD');

  /**
   * If today is before the 15th of the month, use the 15th of the previous month,
   * Otherwise, use the 15th of the current month
   */
  const getMonthlyMeansDate = useCallback(() => {
    const today = dayjs();
    const currentDay = today.date();

    if (currentDay < 15) {
      return today.subtract(1, 'month').date(15).format('YYYYMMDD');
    } else {
      return today.date(15).format('YYYYMMDD');
    }
  }, []);

  const validateImageExists = useCallback((url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.decoding = 'async';
      img.src = url;
    });
  }, []);

  const mapFitBounds = useCallback(
    (bounds: BoundingBox, padding: number = 50) => {
      if (map) {
        map.fitBounds(bounds, { padding, duration: mapAnimation.duration });
      }
    },
    [map],
  );

  useEffect(() => {
    if (!map) return;
    // Used by the home page carousel (#432): it shares this layer to render polygons but must keep
    // the user's current center/zoom across product changes, so suppress all imperative fits.
    if (disableRegionAutoFit) return;

    const regionCode = regionCodeFromUrl || 'Au';
    const region = getRegionByRegionCode(regionCode, productId);

    const fitToAuRegion = () => {
      const auRegion = getRegionByRegionCode('Au');
      if (auRegion) {
        mapFitBounds(auRegion.coords);
      }
    };

    if (region) {
      // zoom in on EAC Mooring Array's only region when in main map view
      if (baseProductPath === 'eac-mooring-array') {
        mapFitBounds(region.coords, 20);
      }

      // so that POLAR region is visible
      if (baseProductPath === 'seal-ctd/tracks' && !isMiniMap) {
        mapFitBounds(region.coords, 200);
      }

      // focus on region only when in minimap, otherwise the map carousel in landing page breaks the auto cycle
      if (isMiniMap) {
        if (baseProductPath.includes('surface-waves')) {
          fitToAuRegion();
        } else {
          mapFitBounds(region.coords);
        }
      }
    } else {
      fitToAuRegion();
    }
  }, [map, regionCodeFromUrl, mapFitBounds, isMiniMap, baseProductPath, productId, disableRegionAutoFit]);

  const handleMouseMove = useCallback(
    (e: MapMouseEvent) => {
      if (!map) return;

      // Check if region hover should be blocked (e.g., by Argo points)
      // Some layers like Argo points should block region highlighting,
      // while others like CurrentMeter plots allow dual hover effect.
      if (shouldBlockRegionHover(map, e)) {
        setHoveredRegion('');
        setHoveredId(null);
        return;
      }

      // Check and highlight the region underneath
      const features = map.queryRenderedFeatures(e.point, {
        layers: [PRODUCT_REGION_BOX_LAYER_ID],
      });

      const isRegionHovered =
        features &&
        features.length > 0 &&
        features[0]?.geometry?.type === 'Polygon' &&
        features[0].id != null &&
        features[0].id != undefined;

      if (isRegionHovered) {
        setHoveredId(features[0].id!);

        const { name: regionName } = getPropertyFromMapFeatures<{
          name: string;
        }>(map, e, PRODUCT_REGION_BOX_LAYER_ID, ['name']);

        if (regionName) {
          setHoveredRegion(regionName);
        }
      } else {
        setHoveredRegion('');
        setHoveredId(null);
      }
    },
    [map],
  );

  const handleMouseClick = useCallback(
    (e: MapMouseEvent) => {
      if (!hoveredRegion || !map || isLoadingLatestDates) {
        return;
      }

      // Check if a higher-priority layer should handle this click
      if (shouldDeferToHigherPriorityLayer(map, e, PRODUCT_REGION_BOX_LAYER_ID)) {
        return;
      }

      if (!hasFeatureAtPoint(map, e, PRODUCT_REGION_BOX_LAYER_ID)) {
        return;
      }

      const features = map.queryRenderedFeatures(e.point, {
        layers: [PRODUCT_REGION_BOX_LAYER_ID],
      });

      const { code } = getPropertyFromMapFeatures<{
        name: string;
        code: string;
      }>(map, e, PRODUCT_REGION_BOX_LAYER_ID, ['name', 'code']);

      if (code) {
        const regionCode = code;

        if (features.length > 0 && features[0]?.geometry?.type === 'Polygon') {
          const regionBounds = convertGeoJsonCoordinatesToBBox(features[0].geometry.coordinates as GeoJsonPolygon);
          mapFitBounds(regionBounds);
        }

        const navigateAfterAnimation = async () => {
          await waitForMapAnimationAsync(map);

          let targetPath = `/product/${baseProductPath}`;
          let queryObject: Record<string, unknown> = {};
          let replaceExistingParams = false;

          if (isCurrentMetersMooredInstrumentArray) {
            queryObject = {
              date: currentMetersDate,
              region: regionCode,
              depth: currentMetersDepth,
              property: currentMetersProperty,
              deploymentPlot: null,
            };
          } else {
            const dateFromQuery = searchParams.date;

            if (productId === 'surfaceWaves-wave') {
              const waveLatestDate =
                regionLatestDates?.regionLatestDates?.find((item: RegionLatestDate) => item.region === regionCode)
                  ?.latestDate || fallbackLatestDate;

              replaceExistingParams = true;
              queryObject = { region: regionCode, date: waveLatestDate };
            } else if (productId === 'surfaceWaves-buoyTimeseries') {
              replaceExistingParams = true;
              queryObject = { region: 'Au', date: dateFromUrl };
              targetPath = '/product/surface-waves/wave';
            } else if (productId === 'monthlyMeans-30day') {
              let monthlyMeansDate = getMonthlyMeansDate();

              if (
                dateFromQuery &&
                isValidMonthlyMeanDate(dateFromQuery) &&
                dayjs(dateFromQuery, 'YYYYMMDD').isBefore(dayjs(monthlyMeansDate, 'YYYYMMDD').add(1, 'day'))
              ) {
                monthlyMeansDate = dateFromQuery;
              }

              const candidateUrl = buildStaticImageUrl(
                'monthlyMeans-30day',
                dayjs(monthlyMeansDate, 'YYYYMMDD'),
                regionCode,
                RegionScope.State,
                RegionScope.State,
                regionCode,
              );
              const exists = await validateImageExists(candidateUrl);
              if (!exists) {
                monthlyMeansDate = dayjs(monthlyMeansDate, 'YYYYMMDD').subtract(1, 'month').date(15).format('YYYYMMDD');
              }

              queryObject = { region: regionCode, date: monthlyMeansDate, point: null };
              replaceExistingParams = true;
            } else {
              const foundRegionLatestDate = regionLatestDates?.regionLatestDates?.find(
                (item: RegionLatestDate) => item.region === regionCode,
              )?.latestDate;

              const latestDate = foundRegionLatestDate || fallbackLatestDate;

              if (isSealCtdRelatedProduct) {
                replaceExistingParams = true;
                targetPath = `/product/${ProductPath.SEAL_CTD}/tracks`;
                queryObject = { region: regionCode, date: latestDate, point: null };
              } else {
                queryObject = dateFromQuery
                  ? { region: regionCode, point: null }
                  : { region: regionCode, date: latestDate, point: null };
              }
            }
          }

          updateQueryParamsAndNavigate(targetPath, queryObject, replaceExistingParams);
        };

        navigateAfterAnimation();
      }
    },
    [
      hoveredRegion,
      map,
      isLoadingLatestDates,
      mapFitBounds,
      baseProductPath,
      isCurrentMetersMooredInstrumentArray,
      updateQueryParamsAndNavigate,
      currentMetersDate,
      currentMetersDepth,
      currentMetersProperty,
      searchParams.date,
      productId,
      regionLatestDates?.regionLatestDates,
      fallbackLatestDate,
      dateFromUrl,
      getMonthlyMeansDate,
      validateImageExists,
      isSealCtdRelatedProduct,
    ],
  );

  const handleMouseLeave = useCallback(() => {
    if (!map) return;
    setHoveredRegion('');
    setHoveredId(null);
  }, [map]);

  useEffect(() => {
    if (!map) return;

    map.on('mousemove', PRODUCT_REGION_BOX_LAYER_ID, handleMouseMove);
    map.on('mouseleave', PRODUCT_REGION_BOX_LAYER_ID, handleMouseLeave);
    map.on('click', PRODUCT_REGION_BOX_LAYER_ID, handleMouseClick);

    return () => {
      map.off('click', PRODUCT_REGION_BOX_LAYER_ID, handleMouseClick);
      map.off('mouseleave', PRODUCT_REGION_BOX_LAYER_ID, handleMouseLeave);
      map.off('mousemove', PRODUCT_REGION_BOX_LAYER_ID, handleMouseMove);
    };
  }, [handleMouseClick, handleMouseLeave, handleMouseMove, map]);

  return (
    <Source id={PRODUCT_REGION_BOX_SOURCE_ID} type="geojson" data={regionGeoJsonData}>
      <Layer
        id={PRODUCT_REGION_BOX_LAYER_ID}
        type="fill"
        source={PRODUCT_REGION_BOX_SOURCE_ID}
        paint={{
          'fill-color': [
            'case',
            ['==', ['id'], hoveredId],
            isOceanColour ? 'rgba(58, 77, 143, 0.8)' : 'rgba(255,255,255,0.75)',
            'rgba(19, 40, 113, 0)',
          ],
          'fill-outline-color': ['case', ['==', ['id'], hoveredId], 'rgba(58, 92, 143, 0.8)', 'rgba(47, 0, 179, 0.3)'],
        }}
      />
      <Layer
        type="line"
        source={PRODUCT_REGION_BOX_SOURCE_ID}
        paint={{
          'line-color': ['case', ['==', ['id'], hoveredId], 'rgba(34,34,34, 0.7)', 'rgba(34,34,34,0.5)'],
          'line-width': ['case', ['==', ['id'], hoveredId], 3.5, 2.4],
        }}
      />
      <Layer
        id={PRODUCT_REGION_NAME_LABEL_LAYER_ID}
        type="symbol"
        source={PRODUCT_REGION_BOX_SOURCE_ID}
        layout={{
          'text-field': ['get', 'name'],
          'text-size': 16,
          'text-justify': 'center',
          'text-anchor': 'center',
          'text-font': ['Open Sans Bold'],
        }}
        paint={{
          'text-color': isOceanColour ? '#fff' : '#000000',
        }}
        filter={['==', 'name', hoveredRegion]}
      />

      <Layer
        id={PRODUCT_REGION_SELECTED_BOX_LAYER_ID}
        type="line"
        source={PRODUCT_REGION_BOX_SOURCE_ID}
        paint={{
          'line-color': color.primary2,
          'line-width': 5,
        }}
        filter={['==', 'name', selectedRegionTitle]}
      />
      <Layer
        type="symbol"
        source={PRODUCT_REGION_BOX_SOURCE_ID}
        layout={{
          'text-field': ['get', 'name'],
          'text-size': 16,
          'text-justify': 'center',
          'text-anchor': 'center',
          'text-font': ['Open Sans Bold'],
        }}
        paint={{
          'text-color': isOceanColour ? '#fff' : '#000000',
        }}
        filter={['==', 'name', selectedRegionTitle]}
      />
    </Source>
  );
};

export default RegionPolygonLayer;
