import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { Dropdown } from '@/components/Shared';
import { ProductSidebarText } from '@/constants/textConstant';
import useFishSoopStore, {
  setFishSoopRegion,
  setFishSoopQuarter,
  setFishSoopLayer,
  setFishSoopAvgPage,
} from '@/stores/fish-soop-store/fishSoop';
import { useFishSoopAnomalyImageList } from '@/services/hooks';
import { FISHSOOP_LAYER_DEPTHS, getFishSoopAvgPageLabel, getFishSoopRegionByCode } from '@/constants/fishSoop';
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

const FishSoopFilters: React.FC<FishSoopFiltersProps> = ({ subProduct }) => {
  const subProductKey = subProduct?.key;
  const isQuarterly = subProductKey === 'fishSOOP-quarterlyAnomalies';
  const isDepth = subProductKey === 'fishSOOP-depthAnomalies';
  const isAverageAnomalies = subProductKey === 'fishSOOP-averageAnomalies';
  const { region, quarter, layer, avgPage } = useFishSoopStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const { entries, isLoading } = useFishSoopAnomalyImageList(subProductKey ?? 'fishSOOP-profiles');

  const resolved = useMemo(
    () =>
      resolveFishSoopAnomaly(entries, {
        mode: isAverageAnomalies ? 'average' : 'region',
        region,
        quarter: isQuarterly ? quarter : '',
        layer,
        avgPage,
      }),
    [entries, isAverageAnomalies, isQuarterly, region, quarter, layer, avgPage],
  );

  // update store based on params
  useEffect(() => {
    if (isAverageAnomalies) {
      const urlPage = searchParams.get('page');
      setFishSoopAvgPage(urlPage ?? '');
      return;
    }

    const urlRegion = searchParams.get('region');
    const urlQuarter = searchParams.get('quarter');
    const urlLayer = searchParams.get('layer');

    if (urlRegion) setFishSoopRegion(urlRegion);
    if (urlQuarter) setFishSoopQuarter(urlQuarter);
    else setFishSoopQuarter('');
    if (urlLayer) setFishSoopLayer(urlLayer);
    else setFishSoopLayer('');
  }, [searchParams, isAverageAnomalies]);

  if (!isQuarterly && !isDepth && !isAverageAnomalies) {
    return null;
  }

  if (isLoading || entries.length === 0) {
    return null;
  }

  const regionElements = resolved.regionOptions.map((code) => ({
    label: getFishSoopRegionByCode(code)?.title ?? code,
    id: code,
  }));

  const quarterElements = resolved.quarterOptions.map((id) => ({ label: formatQuarterLabel(id), id }));

  const layerElements = resolved.layerOptions.map((layerNo) => ({
    label: FISHSOOP_LAYER_DEPTHS[layerNo] ?? `Layer ${layerNo}`,
    id: String(layerNo),
  }));

  const pageElements = resolved.avgPageOptions.map((page) => ({
    label: getFishSoopAvgPageLabel(page),
    id: String(page),
  }));

  const handleRegionChange = (id: string) => {
    setFishSoopRegion(id);
    setSearchParams(omitEmptyParams({ region: id }));
  };

  const handleQuarterChange = (id: string) => {
    setFishSoopQuarter(id);
    setSearchParams(omitEmptyParams({ region: resolved.region, quarter: id }));
  };

  const handleLayerChange = (id: string) => {
    setFishSoopLayer(id);
    setSearchParams(omitEmptyParams({ region: resolved.region, quarter: resolved.quarter, layer: id }));
  };

  const handleAvgPageChange = (id: string) => {
    setFishSoopAvgPage(id);
    setSearchParams(omitEmptyParams({ page: id }));
  };

  if (isAverageAnomalies) {
    return (
      <div className="text-imos-dark-grey *:border-imos-light-blue text-base *:border-b-1 *:px-4 *:pb-4 [&>*:last-child]:border-b-0">
        <FilterSection title={ProductSidebarText.PAGE}>
          <Dropdown
            elements={pageElements}
            selectedId={String(resolved.avgPage ?? '')}
            onChange={(elem) => handleAvgPageChange(elem.id)}
            smallDropdown
          />
        </FilterSection>
      </div>
    );
  }

  return (
    <div className="text-imos-dark-grey *:border-imos-light-blue text-base *:border-b-1 *:px-4 *:pb-4 [&>*:last-child]:border-b-0">
      <FilterSection title={ProductSidebarText.REGION}>
        <Dropdown
          elements={regionElements}
          selectedId={resolved.region}
          onChange={(elem) => handleRegionChange(elem.id)}
          smallDropdown
        />
      </FilterSection>

      {isQuarterly && (
        <FilterSection title={ProductSidebarText.QUARTER}>
          <Dropdown
            elements={quarterElements}
            selectedId={resolved.quarter}
            onChange={(elem) => handleQuarterChange(elem.id)}
            smallDropdown
          />
        </FilterSection>
      )}

      <FilterSection title={ProductSidebarText.DEPTH_LAYER}>
        <Dropdown
          elements={layerElements}
          selectedId={String(resolved.layer ?? '')}
          onChange={(elem) => handleLayerChange(elem.id)}
          smallDropdown
        />
      </FilterSection>
    </div>
  );
};

export default FishSoopFilters;
