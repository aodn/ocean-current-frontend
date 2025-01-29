import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Dropdown } from '@/components/Shared';
import useCurrentMeterStore, {
  setDepth,
  setProperty,
  setRegion,
  setDeploymentPlot,
  setCurrentMetersDate,
} from '@/stores/current-meters-store/currentMeters';
import { CurrentMeterMapDataPointNames } from '@/types/currentMeters';
import { ProductSidebarText } from '@/constants/textConstant';
import {
  deepADCPDeploymentPlotsData,
  deepADVDeploymentPlotsData,
  depthOptionsData,
  mooredInstrumentArrayDeploymentPlotsData,
  propertyOptionsData,
  regionsOptionsData,
  shelfDeploymentPlotsData,
  southernOceanDeploymentPlotsData,
  yearOptionsData,
} from '@/data/current-meter/sidebarOptions';
import {
  CurrentMetersDepth,
  CurrentMetersProperty,
  CurrentMetersRegion,
  CurrentMetersSubproductsKey,
} from '@/constants/currentMeters';
import { SubProduct } from '@/types/product';

interface CurrentMetersOptionsProp {
  subProduct: SubProduct | null;
}

const CurrentMetersOptions: React.FC<CurrentMetersOptionsProp> = ({ subProduct }) => {
  const { property, depth, region, date, deploymentPlot } = useCurrentMeterStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMooredInstrumentArraySubProduct = subProduct?.key === CurrentMetersSubproductsKey.MOORED_INSTRUMENT_ARRAY;

  const deploymentPlotOptions = useMemo(() => {
    switch (subProduct?.key) {
      case CurrentMetersSubproductsKey.SHELF:
        return shelfDeploymentPlotsData;
      case CurrentMetersSubproductsKey.DEEP_ADCP:
        return deepADCPDeploymentPlotsData;
      case CurrentMetersSubproductsKey.DEEP_ADV:
        return deepADVDeploymentPlotsData;
      case CurrentMetersSubproductsKey.SOUTHERN_OCEAN:
        return southernOceanDeploymentPlotsData;
      default:
        return mooredInstrumentArrayDeploymentPlotsData;
    }
  }, [subProduct]);
  const stdParams = useMemo(() => {
    return {
      depth,
      property,
      region,
      date,
      deploymentPlot,
    };
  }, [date, deploymentPlot, depth, property, region]);

  // set default deployment plot when switching subproducts
  useEffect(() => {
    if (!isMooredInstrumentArraySubProduct) {
      setDeploymentPlot(deploymentPlotOptions[0].id);
      setSearchParams({ ...stdParams, deploymentPlot: deploymentPlotOptions[0].id });
    }
  }, [deploymentPlotOptions, isMooredInstrumentArraySubProduct, searchParams, setSearchParams, stdParams]);

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
    const urlDeploymentPlot = setDefaultValue('deploymentPlot', '') as CurrentMeterMapDataPointNames | '';

    setProperty(urlProperty);
    setDepth(urlDepth);
    setRegion(urlRegion);
    setCurrentMetersDate(urlDate);
    setDeploymentPlot(urlDeploymentPlot);
  }, [date, deploymentPlot, depth, property, region, searchParams, setSearchParams, subProduct?.key]);

  const regionsOptions = isMooredInstrumentArraySubProduct ? regionsOptionsData : [regionsOptionsData[0]];

  const depthOptions =
    (property === CurrentMetersProperty.vmean || property === CurrentMetersProperty.vrms) && !deploymentPlot
      ? depthOptionsData
      : [depthOptionsData[0]];

  const propertyOptions =
    depth === CurrentMetersDepth.ONE && date === yearOptionsData[0].id
      ? propertyOptionsData
      : propertyOptionsData.filter(
          (prop) => prop.id === CurrentMetersProperty.vmean || prop.id === CurrentMetersProperty.vrms,
        );

  const handleRegionChange = (id: string) => {
    setRegion(id as CurrentMetersRegion);
    setSearchParams({ ...stdParams, region: id });
  };

  const handleDeploymentPlotChange = (id: string) => {
    if (depth !== CurrentMetersDepth.ONE) {
      setDepth(CurrentMetersDepth.ONE);
    }
    if (property !== CurrentMetersProperty.vrms) {
      setProperty(CurrentMetersProperty.vrms);
    }
    if (date !== '0000') {
      setCurrentMetersDate('0000');
    }

    setDeploymentPlot(id as CurrentMeterMapDataPointNames);
    setSearchParams({
      ...stdParams,
      deploymentPlot: id,
      date: '0000',
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
    <>
      <div className="px-4 pb-4">
        <h3 className="py-2 text-lg font-medium text-imos-grey">{ProductSidebarText.REGION}</h3>
        <Dropdown
          elements={regionsOptions}
          selectedId={region}
          showIcons={false}
          onChange={(elem) => handleRegionChange(elem.id)}
          smallDropdown
        />
      </div>

      <div className="px-4 pb-4">
        <h3 className="py-2 text-lg font-medium text-imos-grey">{ProductSidebarText.DEPLOYMENT_PLOT}</h3>
        <Dropdown
          elements={deploymentPlotOptions}
          selectedId={deploymentPlot ?? ''}
          showIcons={false}
          onChange={(elem) => handleDeploymentPlotChange(elem.id)}
          smallDropdown
        />
      </div>

      <div className="px-4 pb-4">
        <h3 className="py-2 text-lg font-medium text-imos-grey">{ProductSidebarText.DEPTH_LAYER}</h3>
        <Dropdown
          elements={depthOptions}
          selectedId={depth}
          onChange={(elem) => handleDepthChange(elem.id)}
          showIcons={false}
          smallDropdown
        />
      </div>

      {!deploymentPlot && (
        <div className="px-4 pb-4">
          <h3 className="py-2 text-lg font-medium text-imos-grey">{ProductSidebarText.PROPERTY}</h3>
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
    </>
  );
};

export default CurrentMetersOptions;
