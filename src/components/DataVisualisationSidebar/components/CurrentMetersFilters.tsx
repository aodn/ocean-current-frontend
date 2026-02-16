import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Button, Dropdown } from '@/components/Shared';
import useCurrentMetersStore, {
  setDepth,
  setProperty,
  setRegion,
  setDeploymentPlot,
  setCurrentMetersDate,
} from '@/stores/current-meters-store/currentMeters';
import { CurrentMetersDeploymentPlotsOptions, CurrentMetersDeploymentPlotNames } from '@/types/currentMeters';
import { ProductSidebarText } from '@/constants/textConstant';
import {
  depthOptionsData,
  mooredInstrumentArrayDeploymentPlotsData,
  propertyOptionsData,
  regionsOptionsData,
  currentMeterSYearOptionsData,
} from '@/data/current-meter/sidebarOptions';
import {
  CurrentMetersDepth,
  CurrentMetersProperty,
  CurrentMetersRegion,
  CurrentMetersSubProductsKey,
} from '@/constants/currentMeters';
import { SubProduct } from '@/types/product';
import { getDeploymentPlotsBySubProduct } from '@/components/Map/utils/mapUtils';
import { currentMetersMapDataPointsFlat } from '@/data/current-meter/mapDataPoints';

interface CurrentMetersFiltersProp {
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

const CurrentMetersFilters: React.FC<CurrentMetersFiltersProp> = ({ subProduct }) => {
  const { property, depth, region, date, deploymentPlot } = useCurrentMetersStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [deploymentPlotOptions, setDeploymentPlotOptions] = useState<CurrentMetersDeploymentPlotsOptions[]>(
    mooredInstrumentArrayDeploymentPlotsData,
  );
  const subProductKey = subProduct?.key;
  const isMooredInstrumentArraySubProduct = subProductKey === CurrentMetersSubProductsKey.MOORED_INSTRUMENT_ARRAY;
  const allTimeOption = currentMeterSYearOptionsData[0].id;

  const stdParams = useMemo(() => {
    return {
      depth,
      property,
      region,
      date,
      deploymentPlot,
    };
  }, [date, deploymentPlot, depth, property, region]);

  // update deployment plots list and default option when switching sub products
  useEffect(() => {
    if (!subProductKey) return;

    const plotsList = getDeploymentPlotsBySubProduct(subProductKey);
    setDeploymentPlotOptions(plotsList);

    if (!plotsList.some((plot) => plot.id === deploymentPlot)) {
      if (!isMooredInstrumentArraySubProduct) {
        setDeploymentPlot(plotsList[0].id);
        setSearchParams({ ...stdParams, deploymentPlot: plotsList[0].id });
      } else {
        setDeploymentPlot('');
        setSearchParams({ ...stdParams, deploymentPlot: '' });
      }
    }
  }, [deploymentPlot, isMooredInstrumentArraySubProduct, setSearchParams, stdParams, subProductKey]);

  // update store based on params
  useEffect(() => {
    const setDefaultValue = (param: string, defaultVal: string) => {
      if (searchParams.get(param) && searchParams.get(param) !== '') {
        return searchParams.get(param);
      }
      return defaultVal;
    };
    const urlProperty = setDefaultValue('property', CurrentMetersProperty.vrms) as CurrentMetersProperty;
    const urlDepth = setDefaultValue('depth', CurrentMetersDepth.ONE) as CurrentMetersDepth;
    const urlRegion = setDefaultValue('region', CurrentMetersRegion.Aust) as CurrentMetersRegion;
    const urlDate = setDefaultValue('date', '0000') as string;
    const urlDeploymentPlot = setDefaultValue('deploymentPlot', '') as CurrentMetersDeploymentPlotNames | '';

    setProperty(urlProperty);
    setDepth(urlDepth);
    setRegion(urlRegion);
    setCurrentMetersDate(urlDate);
    setDeploymentPlot(urlDeploymentPlot);
  }, [searchParams]);

  const regionsOptions = isMooredInstrumentArraySubProduct ? regionsOptionsData : [regionsOptionsData[0]];

  const depthOptions =
    (property === CurrentMetersProperty.vmean || property === CurrentMetersProperty.vrms) && !deploymentPlot
      ? depthOptionsData
      : [depthOptionsData[0]];

  const propertyOptions =
    depth === CurrentMetersDepth.ONE && date === allTimeOption
      ? propertyOptionsData
      : propertyOptionsData.filter(
          (prop) => prop.id === CurrentMetersProperty.vmean || prop.id === CurrentMetersProperty.vrms,
        );

  // clear deployment plot selection when region changes
  const handleRegionChange = (id: string) => {
    setRegion(id as CurrentMetersRegion);
    setDeploymentPlot('');
    setSearchParams({ ...stdParams, region: id, deploymentPlot: '' });
  };

  const handleDeploymentPlotChange = (id: string) => {
    // all deployment plots have only one option for depth, property and date
    if (depth !== CurrentMetersDepth.ONE) {
      setDepth(CurrentMetersDepth.ONE);
    }
    if (property !== CurrentMetersProperty.vrms) {
      setProperty(CurrentMetersProperty.vrms);
    }
    if (date !== allTimeOption) {
      setCurrentMetersDate(allTimeOption);
    }

    // update the region to the corresponding deployment plot selected
    const correctRegion =
      currentMetersMapDataPointsFlat.find((point) => point.name === id)?.region ?? CurrentMetersRegion.Aust;
    if (correctRegion !== region) {
      setRegion(correctRegion);
    }

    setDeploymentPlot(id as CurrentMetersDeploymentPlotNames);
    setSearchParams({
      region: correctRegion,
      deploymentPlot: id,
      date: allTimeOption,
      property: CurrentMetersProperty.vrms,
      depth: CurrentMetersDepth.ONE,
    });
  };

  const handleDepthChange = (id: string) => {
    setDepth(id as CurrentMetersDepth);
    setSearchParams({ ...stdParams, depth: id });
  };

  const handlePropertyChange = (id: string) => {
    setProperty(id as CurrentMetersProperty);
    setSearchParams({ ...stdParams, property: id });
  };

  return (
    <div className="text-base text-imos-dark-grey [&>*:last-child]:border-b-0 [&>*]:border-b-1 [&>*]:border-imos-light-blue [&>*]:px-4 [&>*]:pb-4">
      <FilterSection title={ProductSidebarText.REGION}>
        <Dropdown
          elements={regionsOptions}
          selectedId={region}
          onChange={(elem) => handleRegionChange(elem.id)}
          smallDropdown
        />
      </FilterSection>

      <FilterSection title={ProductSidebarText.DEPLOYMENT_PLOT}>
        <Dropdown
          elements={deploymentPlotOptions}
          selectedId={deploymentPlot}
          onChange={(elem) => handleDeploymentPlotChange(elem.id)}
          smallDropdown
        />
      </FilterSection>

      <FilterSection title={ProductSidebarText.DEPTH_LAYER}>
        <Dropdown
          elements={depthOptions}
          selectedId={depth}
          onChange={(elem) => handleDepthChange(elem.id)}
          smallDropdown
        />
      </FilterSection>

      {!deploymentPlot && (
        <div>
          <h3 className="ml-3 py-2">{ProductSidebarText.PROPERTY}</h3>
          <div className="mb-6 mt-2 flex flex-wrap justify-between gap-2">
            {propertyOptions.map(({ title, id }, index) => (
              <div key={id} className={index === propertyOptions.length - 1 ? 'w-auto' : 'flex-1'}>
                <Button
                  size="full"
                  borderRadius="small"
                  type={property === id ? 'primary' : 'secondary'}
                  onClick={() => handlePropertyChange(id)}
                >
                  {title}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentMetersFilters;
