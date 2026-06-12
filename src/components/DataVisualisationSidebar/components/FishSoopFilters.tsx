import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { Button, Dropdown } from '@/components/Shared';
import { ProductSidebarText } from '@/constants/textConstant';
import useFishSoopStore, {
  setFishSoopRegion,
  setFishSoopQuarter,
  setFishSoopLayer,
  setFishSoopAvgPage,
  setFishSoopMode,
} from '@/stores/fish-soop-store/fishSoop';
import { useFishSoopAnomalyImageList } from '@/services/hooks';
import {
  FISHSOOP_AVERAGE_REGION_ID,
  FISHSOOP_AVERAGE_REGION_LABEL,
  FISHSOOP_LAYER_DEPTHS,
  getFishSoopRegionByCode,
} from '@/constants/fishSoop';
import { resolveFishSoopAnomaly } from '@/utils/fish-soop-utils/fishSoopAnomaly';
import { SubProduct } from '@/types/product';
import omitEmptyParams from '@/hooks/useQueryParams/omitEmptyParams';

interface FishSoopFiltersProps {
  subProduct: SubProduct | null;
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children }) => (
  <div>
    <h3 className="ml-3 py-2">{title}</h3>
    <div className="h-10">{children}</div>
  </div>
);

const formatQuarterLabel = (quarter: string): string => quarter.replace(/^(\d{4})Q(\d)$/, '$1 Q$2');

/**
 * Sidebar filters for the FishSOOP anomaly sub-products. The region / quarter /
 * layer options are parsed from the API filename list, so only combinations
 * that exist are offered. The Quarterly Anomalies region dropdown pins an
 * "Average (whole dataset)" entry on top which swaps the quarter + layer
 * selectors for a p1..p4 page selector (the `tanom_avg_p<N>.gif` overview).
 */
const FishSoopFilters: React.FC<FishSoopFiltersProps> = ({ subProduct }) => {
  const subProductKey = subProduct?.key;
  const isQuarterly = subProductKey === 'fishSOOP-quarterlyAnomalies';
  const isDepth = subProductKey === 'fishSOOP-depthAnomalies';
  const { region, quarter, layer, avgPage, mode } = useFishSoopStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const { entries, isLoading } = useFishSoopAnomalyImageList(subProductKey ?? 'fishSOOP-quarterlyAnomalies');

  const isAverageMode = isQuarterly && mode === 'average';

  const resolved = useMemo(
    () =>
      resolveFishSoopAnomaly(entries, {
        mode: isAverageMode ? 'average' : 'region',
        region,
        quarter: isQuarterly ? quarter : '',
        layer,
        avgPage,
      }),
    [entries, isAverageMode, isQuarterly, region, quarter, layer, avgPage],
  );

  // update store based on params
  useEffect(() => {
    const urlRegion = searchParams.get('region');
    const urlQuarter = searchParams.get('quarter');
    const urlLayer = searchParams.get('layer');
    const urlPage = searchParams.get('page');

    if (urlRegion === FISHSOOP_AVERAGE_REGION_ID) {
      setFishSoopMode('average');
    } else if (urlRegion) {
      setFishSoopMode('region');
      setFishSoopRegion(urlRegion);
    }
    if (urlQuarter) setFishSoopQuarter(urlQuarter);
    if (urlLayer) setFishSoopLayer(urlLayer);
    if (urlPage) setFishSoopAvgPage(urlPage);
  }, [searchParams]);

  if (!isQuarterly && !isDepth) {
    return null;
  }

  if (isLoading || entries.length === 0) {
    return null;
  }

  const regionElements = [
    ...(isQuarterly ? [{ label: FISHSOOP_AVERAGE_REGION_LABEL, id: FISHSOOP_AVERAGE_REGION_ID }] : []),
    ...resolved.regionOptions.map((code) => ({ label: getFishSoopRegionByCode(code)?.title ?? code, id: code })),
  ];

  const quarterElements = resolved.quarterOptions.map((id) => ({ label: formatQuarterLabel(id), id }));

  const layerElements = resolved.layerOptions.map((layerNo) => ({
    label: FISHSOOP_LAYER_DEPTHS[layerNo] ?? `Layer ${layerNo}`,
    id: String(layerNo),
  }));

  const handleRegionChange = (id: string) => {
    if (id === FISHSOOP_AVERAGE_REGION_ID) {
      setFishSoopMode('average');
      setSearchParams(omitEmptyParams({ region: FISHSOOP_AVERAGE_REGION_ID, page: avgPage }));
      return;
    }
    setFishSoopMode('region');
    setFishSoopRegion(id);
    setSearchParams(omitEmptyParams({ region: id }));
  };

  const handleQuarterChange = (id: string) => {
    setFishSoopQuarter(id);
    setSearchParams(omitEmptyParams({ region: resolved.region, quarter: id, layer }));
  };

  const handleLayerChange = (id: string) => {
    setFishSoopLayer(id);
    setSearchParams(omitEmptyParams({ region: resolved.region, quarter: resolved.quarter, layer: id }));
  };

  const handleAvgPageChange = (page: number) => {
    setFishSoopAvgPage(String(page));
    setSearchParams(omitEmptyParams({ region: FISHSOOP_AVERAGE_REGION_ID, page: String(page) }));
  };

  return (
    <div className="text-imos-dark-grey *:border-imos-light-blue text-base *:border-b-1 *:px-4 *:pb-4 [&>*:last-child]:border-b-0">
      <FilterSection title={ProductSidebarText.REGION}>
        <Dropdown
          elements={regionElements}
          selectedId={isAverageMode ? FISHSOOP_AVERAGE_REGION_ID : resolved.region}
          onChange={(elem) => handleRegionChange(elem.id)}
          smallDropdown
        />
      </FilterSection>

      {isQuarterly && !isAverageMode && (
        <FilterSection title={ProductSidebarText.QUARTER}>
          <Dropdown
            elements={quarterElements}
            selectedId={resolved.quarter}
            onChange={(elem) => handleQuarterChange(elem.id)}
            smallDropdown
          />
        </FilterSection>
      )}

      {!isAverageMode && (
        <FilterSection title={ProductSidebarText.DEPTH_LAYER}>
          <Dropdown
            elements={layerElements}
            selectedId={String(resolved.layer ?? '')}
            onChange={(elem) => handleLayerChange(elem.id)}
            smallDropdown
          />
        </FilterSection>
      )}

      {isAverageMode && (
        <div>
          <h3 className="ml-3 py-2">{ProductSidebarText.PAGE}</h3>
          <div className="mt-2 mb-6 flex flex-wrap justify-between gap-2">
            {resolved.avgPageOptions.map((page) => (
              <div key={page} className="flex-1">
                <Button
                  size="full"
                  borderRadius="small"
                  type={resolved.avgPage === page ? 'primary' : 'secondary'}
                  onClick={() => handleAvgPageChange(page)}
                >
                  {`p${page}`}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FishSoopFilters;
