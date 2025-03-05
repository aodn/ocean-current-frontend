import dayjs from 'dayjs';
import { TargetPathRegionScope } from '@/constants/imgPath';
import { imageBaseUrl } from '@/configs/image';
import {
  CurrentMetersDepth,
  CurrentMetersPlotPath,
  CurrentMetersProperty,
  CurrentMetersRegion,
  CurrentMetersSubproductsKey,
} from '@/constants/currentMeters';
import { ArgoDepths } from '@/constants/argo';
import {
  buildProductImageUrl,
  buildArgoImageUrl,
  buildProductVideoUrl,
  buildCurrentMetersMapImageUrl,
  buildCurrentMetersDataImageUrl,
  buildSSTTimeseriesImageUrl,
  buildTidalCurrentsMapImageUrl,
  buildTidalCurrentsTagFileUrl,
  buildTidalCurrentsDataImageUrl,
} from './dataImgBuilder';

describe('buildProductImageUrl', () => {
  describe('sixDaySst', () => {
    it('should return the correct image url for state region', () => {
      // Arrange
      const productType = 'sixDaySst';
      const subProduct = 'SST';
      const region = 'Au';
      const regionScope = TargetPathRegionScope.State;
      const date = '20240519';

      // Act
      const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/STATE_daily/SST/Au/20240519.gif`);
    });

    it('should return the correct image url for local region', () => {
      // Arrange
      const productType = 'sixDaySst';
      const subProduct = 'SST';
      const region = 'Adelaide';
      const regionScope = TargetPathRegionScope.Local;
      const date = '20240519';

      // Act
      const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/DR_SST_daily/SST/Adelaide/20240519.gif`);
    });

    it('should return the correct image and video URLs for SST', () => {
      // Arrange
      const productType = 'sixDaySst';
      const subProduct = 'SST';
      const region = 'Tas';
      const regionScope = TargetPathRegionScope.Local;
      const date = '20240723';

      // Act
      const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);
      const videoUrl = buildProductVideoUrl(productType, subProduct, region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/DR_SST_daily/SST/Tas/20240723.gif`);
      expect(videoUrl).toBe(`${imageBaseUrl}/DR_SST_daily/SST/Tas/Tas_SST_2024_Q3.mp4`);
    });

    it('should return the correct image and video URLs for SST_ANOM', () => {
      // Arrange
      const productType = 'sixDaySst';
      const subProduct = 'SST_ANOM';
      const region = 'Tas';
      const regionScope = TargetPathRegionScope.Local;
      const date = '20240721';

      // Act
      const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);
      const videoUrl = buildProductVideoUrl(productType, subProduct, region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/DR_SST_daily/SST_ANOM/Tas/20240721.gif`);
      expect(videoUrl).toBe(`${imageBaseUrl}/DR_SST_daily/SST_ANOM/Tas/Tas_SST_ANOM_2024_Q3.mp4`);
    });

    it('should return the correct image and video URLs for pctiles', () => {
      // Arrange
      const productType = 'sixDaySst';
      const subProduct = 'pctiles';
      const region = 'Tas';
      const regionScope = TargetPathRegionScope.Local;
      const date = '20240721';

      // Act
      const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);
      const videoUrl = buildProductVideoUrl(productType, subProduct, region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/DR_SST_daily/pctiles/Tas/20240721.gif`);
      expect(videoUrl).toBe(`${imageBaseUrl}/DR_SST_daily/pctiles/Tas/Tas_pctiles_2024_Q3.mp4`);
    });
  });

  describe('buildSSTTimeseriesImageUrl', () => {
    it('should return the correct image url for SST Timeseries', () => {
      // Arrange
      const region = 'Broome';

      // Act
      const imageUrl = buildSSTTimeseriesImageUrl(region);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/MM_SSTA/MMA/Broome_Anomaly_1993-latest.gif`);
    });
  });

  describe('fourHourSst', () => {
    it('should return the correct image url for local region', () => {
      // Arrange
      const productType = 'fourHourSst';
      const subProduct = 'SST';
      const region = 'Adelaide';
      const regionScope = TargetPathRegionScope.Local;
      const date = '2024051922';

      // Act
      const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/SST_4hr/SST/Adelaide/2024051922.gif`);
    });

    it('should throw an error for state region', () => {
      // Arrange
      const productType = 'fourHourSst';
      const subProduct = 'SST';
      const region = 'Au';
      const regionScope = TargetPathRegionScope.State;
      const date = '20240519';

      // Act & Assert
      expect(() => buildProductImageUrl(productType, subProduct, region, regionScope, date)).toThrowError(
        `Product ${productType} does not support state region`,
      );
    });

    it('should return the correct image and video URLs for SST_Filled', () => {
      // Arrange
      const productType = 'fourHourSst';
      const subProduct = 'SST_Filled';
      const region = 'Tas';
      const regionScope = TargetPathRegionScope.Local;
      const date = '202407230600';

      // Act
      const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);
      const videoUrl = buildProductVideoUrl(productType, subProduct, region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/SST_4hr/SST_Filled/Tas/2024072306.gif`);
      expect(videoUrl).toBe(`${imageBaseUrl}/SST_4hr/SST_Filled/Tas/Tas_SST_Filled_202407.mp4`);
    });

    it('should return the correct image and video URLs for SST', () => {
      // Arrange
      const productType = 'fourHourSst';
      const subProduct = 'SST';
      const region = 'Tas';
      const regionScope = TargetPathRegionScope.Local;
      const date = '202407230600';

      // Act
      const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);
      const videoUrl = buildProductVideoUrl(productType, subProduct, region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/SST_4hr/SST/Tas/2024072306.gif`);
      expect(videoUrl).toBe(`${imageBaseUrl}/SST_4hr/SST/Tas/Tas_SST_202407.mp4`);
    });

    it('should return the correct image URL for SST_Age', () => {
      // Arrange
      const productType = 'fourHourSst';
      const subProduct = 'SST_Age';
      const region = 'Tas';
      const regionScope = TargetPathRegionScope.Local;
      const date = '2024072306';

      // Act
      const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/SST_4hr/SST_Age/Tas/2024072306.gif`);
    });

    it('should return the correct image URL for Wind', () => {
      // Arrange
      const productType = 'fourHourSst';
      const subProduct = 'Wind';
      const region = 'Tas';
      const regionScope = TargetPathRegionScope.Local;
      const date = '2024072306';

      // Act
      const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/SST_4hr/Wind/Tas/2024072306.gif`);
    });
  });

  describe('oceanColour', () => {
    it('should return the correct image url for local region chl', () => {
      // Arrange
      const productType = 'oceanColour';
      const subProduct = 'CHL';
      const region = 'Adelaide';
      const regionScope = TargetPathRegionScope.Local;
      const date = '2024051906';

      // Act
      const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);
      const videoUrl = buildProductVideoUrl(productType, subProduct, region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/Adelaide_chl/2024051906.gif`);
      expect(videoUrl).toBe(`${imageBaseUrl}/Adelaide_chl/Adelaide_chl202405.mp4`);
    });

    it('should return the correct image and video URLs for CHL', () => {
      // Arrange
      const productType = 'oceanColour';
      const subProduct = 'CHL';
      const region = 'SE';
      const regionScope = TargetPathRegionScope.State;
      const date = '20240717';

      // Act
      const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);
      const videoUrl = buildProductVideoUrl(productType, subProduct, region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/STATE_daily/CHL/SE/20240717.gif`);
      expect(videoUrl).toBe(`${imageBaseUrl}/STATE_daily/CHL/SE/SE_CHL_2024_Q3.mp4`);
    });

    it('should return the correct image and video URLs for CHL_AGE', () => {
      // Arrange
      const productType = 'oceanColour';
      const subProduct = 'CHL_AGE';
      const region = 'SE';
      const regionScope = TargetPathRegionScope.State;
      const date = '20240717';

      // Act
      const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);
      const videoUrl = buildProductVideoUrl(productType, subProduct, region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/STATE_daily/CHL_AGE/SE/20240717.gif`);
      expect(videoUrl).toBe(`${imageBaseUrl}/STATE_daily/CHL_AGE/SE/SE_CHL_AGE_2024_Q3.mp4`);
    });
  });

  describe('monthlyMeans', () => {
    it('should return the correct image url for monthly means', () => {
      // Arrange
      const productType = 'monthlyMeans';
      const subProduct = 'CLIM_CNESCARS';
      const region = 'Au';
      const regionScope = TargetPathRegionScope.State;
      const date = '202405';

      // Act
      const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/30d_MEAN_v1/CLIM_CNESCARS/Au/05.gif`);
    });

    it('should return the correct image and video URLs without subProduct', () => {
      // Arrange
      const productType = 'monthlyMeans';
      const subProduct = null;
      const region = 'NW_mm';
      const regionScope = TargetPathRegionScope.State;
      const date = '20240615';

      // Act
      const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);
      const videoUrl = buildProductVideoUrl(productType, subProduct, region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/30d_MEAN/NW_mm/20240615.gif`);
      expect(videoUrl).toBe(`${imageBaseUrl}/30d_MEAN/NW_mm/NW_mm.mp4`);
    });

    it('should return the correct image URL for CLIM_OFAM3_SSTAARS', () => {
      // Arrange
      const productType = 'monthlyMeans';
      const subProduct = 'CLIM_OFAM3_SSTAARS';
      const region = 'NW_mm';
      const regionScope = TargetPathRegionScope.State;
      const date = '20240615';

      // Act
      const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/30d_MEAN/CLIM_OFAM3_SSTAARS/NW_mm/06.gif`);
    });

    it('should return the correct image URL for CLIM_CNESCARS', () => {
      // Arrange
      const productType = 'monthlyMeans';
      const subProduct = 'CLIM_CNESCARS';
      const region = 'NW_mm';
      const regionScope = TargetPathRegionScope.Local;
      const date = '20240615';

      // Act
      const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/30d_MEAN_v1/CLIM_CNESCARS/NW_mm/06.gif`);
    });
  });

  describe('adjustedSeaLevelAnomaly', () => {
    it('should return the correct image and video URLs for SLA', () => {
      // Arrange
      const productType = 'adjustedSeaLevelAnomaly';
      const subProduct = 'SLA';
      const region = 'Au';
      const regionScope = TargetPathRegionScope.State;
      const date = '20240717';

      // Act
      const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);
      const videoUrl = buildProductVideoUrl(productType, subProduct, region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/STATE_daily/SLA/Au/20240717.gif`);
      expect(videoUrl).toBe(`${imageBaseUrl}/STATE_daily/SLA/Au/Au_SLA_2024_Q3.mp4`);
    });

    it('should return the correct image and video URLs for SLA_pctiles', () => {
      // Arrange
      const productType = 'adjustedSeaLevelAnomaly';
      const subProduct = 'SLA_pctiles';
      const region = 'Au';
      const regionScope = TargetPathRegionScope.State;
      const date = '20240717';

      // Act
      const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);
      const videoUrl = buildProductVideoUrl(productType, subProduct, region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/STATE_daily/SLA_pctiles/Au/20240717.gif`);
      expect(videoUrl).toBe(`${imageBaseUrl}/STATE_daily/SLA_pctiles/Au/Au_SLA_pctiles_2024_Q3.mp4`);
    });

    it('should return the correct image url for monthly means', () => {
      // Arrange
      const productType = 'adjustedSeaLevelAnomaly';
      const subProduct = '';
      const region = 'SO';
      const regionScope = TargetPathRegionScope.State;
      const date = '20240717';

      // Act
      const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/SO/20240717.gif`);
    });
  });

  describe('climatology', () => {
    it('should return the correct image URL for SST', () => {
      // Arrange
      const productType = 'climatology';
      const subProduct = 'SST';
      const region = 'Tas';
      const regionScope = TargetPathRegionScope.Local;
      const date = '20240723';

      // Act
      const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/DR_SST_CLIM/SST/Tas/07.gif`);
    });

    it('should return the correct image URL for NMON', () => {
      // Arrange
      const productType = 'climatology';
      const subProduct = 'NMON';
      const region = 'Tas';
      const regionScope = TargetPathRegionScope.Local;
      const date = '20240723';

      // Act
      const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/DR_SST_CLIM/NMON/Tas/07.gif`);
    });
  });

  it('should return the correct image url for API call', () => {
    // Arrange
    const productType = 'sixDaySst';
    const subProduct = 'SST';
    const region = 'Adelaide';
    const regionScope = TargetPathRegionScope.Local;
    const date = '20240519';
    const isApi = true;

    // Act
    const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date, isApi);

    // Assert
    expect(imageUrl).toBe('/api/DR_SST_daily/SST/Adelaide/20240519.gif');
  });

  it('should throw an error for unsupported product type', () => {
    // Arrange
    const productType = 'unsupportedProduct';
    const subProduct = 'SST';
    const region = 'Adelaide';
    const regionScope = TargetPathRegionScope.Local;
    const date = '20240519';

    // Act & Assert
    expect(() => buildProductImageUrl(productType, subProduct, region, regionScope, date)).toThrowError(
      `Product type ${productType} is not supported`,
    );
  });
});

describe('buildArgoImageUrl', () => {
  it('should return the correct image url for correct parameters', () => {
    // Arrange
    const worldMeteorologicalOrgId = '1234';
    const date = dayjs('20240519');
    const cycle = '12';
    const depth = ArgoDepths['2000M'];

    // Act
    const imageUrl = buildArgoImageUrl(worldMeteorologicalOrgId, date, cycle, depth);

    // Assert
    expect(imageUrl).toBe(`${imageBaseUrl}/profiles/1234/20240519_1234_12.gif`);
  });

  it('should return the formatted date image url for different date format', () => {
    // Arrange
    const worldMeteorologicalOrgId = '1234';
    const date = dayjs('2024-05-19');
    const cycle = '12';
    const depth = ArgoDepths['2000M'];

    // Act
    const imageUrl = buildArgoImageUrl(worldMeteorologicalOrgId, date, cycle, depth);

    // Assert
    expect(imageUrl).toBe(`${imageBaseUrl}/profiles/1234/20240519_1234_12.gif`);
  });

  it('should return the profiles_s image url if depth is not 0', () => {
    // Arrange
    const worldMeteorologicalOrgId = '1234';
    const date = dayjs('20240519');
    const cycle = '12';
    const depth = '1';

    // Act
    const imageUrl = buildArgoImageUrl(worldMeteorologicalOrgId, date, cycle, depth);

    // Assert
    expect(imageUrl).toBe(`${imageBaseUrl}/profiles_s/1234/20240519_1234_12.gif`);
  });
});

describe('buildProductImageUrl', () => {
  it('should return the correct image url for surface waves', () => {
    // Arrange
    const date = '2024-05-19T12:00:00';
    const subProduct = null;
    const productType = 'surfaceWaves';
    const region = 'Au';
    const regionScope = TargetPathRegionScope.State;

    // Act
    const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);

    // Assert
    expect(imageUrl).toBe('/s3/WAVES/y2024/m05/2024051912.gif');
  });

  it('should handle different date formats correctly', () => {
    // Arrange
    const date = '20240519120000';
    const subProduct = null;
    const productType = 'surfaceWaves';
    const region = 'Au';
    const regionScope = TargetPathRegionScope.State;

    // Act
    const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);

    // Assert
    expect(imageUrl).toBe('/s3/WAVES/y2024/m05/2024051912.gif');
  });
});

describe('buildProductVideoUrl', () => {
  it('should return the correct video url for four hour sst', () => {
    // Arrange
    const productType = 'fourHourSst';
    const subProduct = 'SST';
    const region = 'Adelaide';
    const regionScope = TargetPathRegionScope.Local;
    const date = '2024-05-19';

    // Act
    const videoUrl = buildProductVideoUrl(productType, subProduct, region, regionScope, date);

    // Assert
    expect(videoUrl).toBe(`${imageBaseUrl}/SST_4hr/SST/Adelaide/Adelaide_SST_202405.mp4`);
  });

  it('should return the correct video url for monthly means', () => {
    // Arrange
    const productType = 'monthlyMeans';
    const subProduct = 'anomalies';
    const region = 'Au';
    const regionScope = TargetPathRegionScope.State;
    const date = '202405';

    // Act
    const videoUrl = buildProductVideoUrl(productType, subProduct, region, regionScope, date);

    // Assert
    expect(videoUrl).toBe(`${imageBaseUrl}/30d_MEAN/Au/Au.mp4`);
  });

  it('should throw an error for unsupported product type', () => {
    // Arrange
    const productType = 'unsupportedProduct';
    const subProduct = 'SST';
    const region = 'Adelaide';
    const regionScope = TargetPathRegionScope.Local;
    const date = '2024-05-19';

    // Act & Assert
    expect(() => buildProductVideoUrl(productType, subProduct, region, regionScope, date)).toThrowError(
      `Product type ${productType} is not supported`,
    );
  });
});

describe('buildCurrentMetersMapImageUrl', () => {
  it('should return the correct map image url for current Meters', () => {
    // Arrange
    const region = CurrentMetersRegion.Aust;
    const date = '2024';
    const property = CurrentMetersProperty.vmean;
    const depth = CurrentMetersDepth.ONE;

    // Act
    const imageUrl = buildCurrentMetersMapImageUrl(region, date, property, depth);

    // Assert
    expect(imageUrl).toBe(`${imageBaseUrl}/timeseries/ANMN_P49/mapst/01_Aust_vmean_1_2024.gif`);
  });
});

describe('buildCurrentMetersDataImageUrl', () => {
  it('should return the correct data image url for current Meters', () => {
    // Arrange
    const subProduct = CurrentMetersSubproductsKey.SOUTHERN_OCEAN;
    const deploymentPlot = 'TOTTEN1';
    const type = CurrentMetersPlotPath.VELOCITY_VECTOR;
    const plotId = 'TOTTEN1-WORKHORSE-ADCP-14489_xyz';

    // Act
    const imageUrl = buildCurrentMetersDataImageUrl(subProduct, deploymentPlot, type, plotId);

    // Assert
    expect(imageUrl).toBe(`${imageBaseUrl}/timeseries/ANMN_P48/TOTTEN1/xyz/TOTTEN1-WORKHORSE-ADCP-14489_xyz.gif`);
  });
});

describe('buildTidalCurrentsMapImageUrl', () => {
  it('should return the correct map image url for Tidal Currents', () => {
    // Arrange
    const subProduct = 'tidalCurrents-sl';
    const date = dayjs('202502280000');
    const region = 'GOC';

    // Act
    const imageUrl = buildTidalCurrentsMapImageUrl(region, subProduct, date);

    // Assert
    expect(imageUrl).toBe(`${imageBaseUrl}/tides/GOC_hv/2025/202502280000.gif`);
  });
});

describe('buildTidalCurrentsTagFileUrl', () => {
  it('should return the correct Tidal Currents TAG file url', () => {
    // Arrange
    const subProduct = 'tidalCurrents-sl';
    const date = dayjs('202502280000');
    const region = 'GOC';

    // Act
    const imageUrl = buildTidalCurrentsTagFileUrl(region, subProduct, date);

    // Assert
    expect(imageUrl).toBe('tides/GOC_hv/2025/202502280000.txt');
  });
});

describe('buildTidalCurrentsDataImageUrl', () => {
  it('should return the correct data image url for Tidal Currents', () => {
    // Arrange
    const href = '../../monthplots/NTC_Fenton_patches_202503.html';

    // Act
    const imageUrl = buildTidalCurrentsDataImageUrl(href);

    // Assert
    expect(imageUrl).toBe(`${imageBaseUrl}/tides/monthplots/NTC_Fenton_patches_202503.gif`);
  });
});
