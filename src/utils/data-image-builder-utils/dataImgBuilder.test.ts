import { vi } from 'vitest';
import dayjs from 'dayjs';
import { imageBaseUrl } from '@/configs/image';
import { CurrentMetersDepth, CurrentMetersProperty, CurrentMetersRegion } from '@/constants/currentMeters';
import { ArgoDepths } from '@/constants/argo';
import { ProductID } from '@/types/product';
import { RegionScope } from '@/constants/region';
import {
  buildStaticImageUrl,
  buildArgoImageUrl,
  buildProductVideoUrl,
  buildCurrentMetersMapImageUrl,
  buildCurrentMetersDataImageUrl,
  buildSSTTimeseriesImageUrl,
  buildTidalCurrentsMapImageUrl,
  buildTidalCurrentsTagFileUrl,
  buildTidalCurrentsDataImageUrl,
  buildSealCtdMapImageUrl,
  buildSealCtdGraphImageUrl,
  buildSealCtdTagsDataImageUrl,
} from './dataImgBuilder';

vi.mock('@/configs/image', () => ({
  imageBaseUrl: 'https://oceancurrent.test.com',
  imageUrlConfig: {
    imageBaseUrl: 'https://oceancurrent.test.com',
    imageS3BaseUrl: '/storage',
  },
}));

describe('buildProductImageUrlByProductId', () => {
  describe('sixDaySst', () => {
    it('should return the correct image url for state region', () => {
      // Arrange
      const productId = 'sixDaySst-sst';
      const region = 'Au';
      const regionScope = RegionScope.State;
      const date = '20240519';

      // Act
      const imageUrl = buildStaticImageUrl(productId, dayjs(date), region, regionScope, regionScope, region);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/STATE_daily/SST/Au/20240519.gif`);
    });

    it('should return the correct image url for local region', () => {
      // Arrange
      const productId = 'sixDaySst-sst';
      const region = 'Adelaide';
      const regionScope = RegionScope.Local;
      const date = '20240519';

      // Act
      const imageUrl = buildStaticImageUrl(productId, dayjs(date), region, regionScope, regionScope, region);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/DR_SST_daily/SST/Adelaide/20240519.gif`);
    });

    it('should return the correct image and video URLs for SST', () => {
      // Arrange
      const productId = 'sixDaySst-sst';
      const region = 'Tas';
      const regionScope = RegionScope.Local;
      const date = '20240723';

      // Act
      const imageUrl = buildStaticImageUrl(productId, dayjs(date), region, regionScope, regionScope, region);
      const videoUrl = buildProductVideoUrl('sixDaySst-sst', region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/DR_SST_daily/SST/Tas/20240723.gif`);
      expect(videoUrl).toBe(`${imageBaseUrl}/DR_SST_daily/SST/Tas/Tas_SST_2024_Q3.mp4`);
    });

    it('should return the correct image and video URLs for SST_ANOM', () => {
      // Arrange
      const productId = 'sixDaySst-sstAnomaly';
      const region = 'Tas';
      const regionScope = RegionScope.Local;
      const date = '20240721';

      // Act
      const imageUrl = buildStaticImageUrl(productId, dayjs(date), region, regionScope, regionScope, region);
      const videoUrl = buildProductVideoUrl('sixDaySst-sstAnomaly', region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/DR_SST_daily/SST_ANOM/Tas/20240721.gif`);
      expect(videoUrl).toBe(`${imageBaseUrl}/DR_SST_daily/SST_ANOM/Tas/Tas_SST_ANOM_2024_Q3.mp4`);
    });

    it('should return the correct image and video URLs for pctiles', () => {
      // Arrange
      const productId = 'sixDaySst-centiles';
      const region = 'Tas';
      const regionScope = RegionScope.Local;
      const date = '20240721';

      // Act
      const imageUrl = buildStaticImageUrl(productId, dayjs(date), region, regionScope, regionScope, region);
      const videoUrl = buildProductVideoUrl('sixDaySst-centiles', region, regionScope, date);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/DR_SST_daily/pctiles/Tas/20240721.gif`);
      expect(videoUrl).toBe(`${imageBaseUrl}/DR_SST_daily/pctiles/Tas/Tas_pctiles_2024_Q3.mp4`);
    });
  });

  describe('sixDaySst climatology', () => {
    it('should use DR_SST_CLIM segment for climatologySst local region', () => {
      const productId = 'sixDaySst-climatologySst';
      const region = 'Adelaide';
      const regionScope = RegionScope.Local;
      const date = '202603';

      const imageUrl = buildStaticImageUrl(productId, dayjs(date), region, regionScope, regionScope, region);

      expect(imageUrl).toBe(`${imageBaseUrl}/DR_SST_CLIM/SST/Adelaide/03.gif`);
    });

    it('should use DR_SST_CLIM segment for climatologyDataCount local region', () => {
      const productId = 'sixDaySst-climatologyDataCount';
      const region = 'Brisbane';
      const regionScope = RegionScope.Local;
      const date = '202603';

      const imageUrl = buildStaticImageUrl(productId, dayjs(date), region, regionScope, regionScope, region);

      expect(imageUrl).toBe(`${imageBaseUrl}/DR_SST_CLIM/NMON/Brisbane/03.gif`);
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
      const productId = 'fourHourSst-sst';
      const region = 'Adelaide';
      const regionScope = RegionScope.Local;
      const date = '2024051922';

      // Act
      const imageUrl = buildStaticImageUrl(productId, dayjs(date), region, regionScope, regionScope, region);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/SST_4hr/SST/Adelaide/2024051922.gif`);
    });

    it.skip('should throw an error for state region', () => {
      // Arrange
      const productId = 'fourHourSst-sst';
      const region = 'Au';
      const regionScope = RegionScope.State;
      const date = '20240519';

      // Act & Assert
      expect(() => buildStaticImageUrl(productId, dayjs(date), region, regionScope, regionScope, region)).toThrowError(
        `Product with id ${productId} not found`,
      );
    });

    it('should return the correct image URL for SST_Filled', () => {
      // Arrange
      const productId = 'fourHourSst-sstFilled';
      const region = 'Tas';
      const regionScope = RegionScope.Local;
      const date = '202407230600';

      // Act
      const imageUrl = buildStaticImageUrl(productId, dayjs(date), region, regionScope, regionScope, region);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/SST_4hr/SST_Filled/Tas/2024072306.gif`);
    });
  });

  describe('oceanColour', () => {
    it('should return the correct image url for local region chl', () => {
      // Arrange
      const productId = 'oceanColour-chlA';
      const region = 'Adelaide';
      const regionScope = RegionScope.Local;
      const date = '2024051906';

      // Act
      const imageUrl = buildStaticImageUrl(productId, dayjs(date), region, regionScope, regionScope, region);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/Adelaide_chl/2024051906.gif`);
    });

    it('should return the correct image URL for CHL state region', () => {
      // Arrange
      const productId = 'oceanColour-chlA';
      const region = 'SE';
      const regionScope = RegionScope.State;
      const date = '20240717';

      // Act
      const imageUrl = buildStaticImageUrl(productId, dayjs(date), region, regionScope, regionScope, region);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/STATE_daily/CHL/SE/20240717.gif`);
    });

    it('should return the correct image URL for chlAAge state region (not routed through buildOceanColourImageUrl)', () => {
      // Arrange
      const productId = 'oceanColour-chlAAge';
      const region = 'SE';
      const regionScope = RegionScope.State;
      const date = '20240717';
      const oceanColourDateList = [{ date: '20240717', path: '/SE_chl/2024' }];

      // Act
      const imageUrl = buildStaticImageUrl(productId, dayjs(date), region, regionScope, regionScope, region, {
        oceanColourDateList,
      });

      // Assert - should use buildDefaultFallbackImageUrl path, not buildOceanColourImageUrl
      expect(imageUrl).toBe(`${imageBaseUrl}/STATE_daily/CHL_AGE/SE/20240717.gif`);
    });
  });

  describe('buildStaticImageUrl with oceanColourDateList', () => {
    // oceanColour-chlA local uses HOUR format (YYYYMMDDHH)
    it('should use path from dateList for oceanColour-chlA local when date matches', () => {
      const productId = 'oceanColour-chlA';
      const region = 'TimorP';
      const regionScope = RegionScope.Local;
      const date = '2024071706';
      const oceanColourDateList = [{ date: '2024071706', path: '/TimorP_chl/2024' }];

      const imageUrl = buildStaticImageUrl(productId, dayjs(date), region, regionScope, regionScope, region, {
        oceanColourDateList,
      });

      expect(imageUrl).toBe(`${imageBaseUrl}/TimorP_chl/2024/2024071706.gif`);
    });

    it('should fall back to regionCode path for oceanColour-chlA local when date not in dateList', () => {
      const productId = 'oceanColour-chlA';
      const region = 'TimorP';
      const regionScope = RegionScope.Local;
      const date = '2024071706';
      const oceanColourDateList = [{ date: '2024071800' }]; // different date, no match

      const imageUrl = buildStaticImageUrl(productId, dayjs(date), region, regionScope, regionScope, region, {
        oceanColourDateList,
      });

      expect(imageUrl).toBe(`${imageBaseUrl}/TimorP_chl/2024071706.gif`);
    });

    // oceanColour-chlAAge state uses DAY format (YYYYMMDD) — distinct from chlA
    it('should use DAY format for oceanColour-chlAAge state with dateList', () => {
      const productId = 'oceanColour-chlAAge';
      const region = 'SE';
      const regionScope = RegionScope.State;
      const date = '20240717';
      const oceanColourDateList = [{ date: '20240717', path: '/STATE_daily/CHL_AGE/SE' }];

      const imageUrl = buildStaticImageUrl(productId, dayjs(date), region, regionScope, regionScope, region, {
        oceanColourDateList,
      });

      expect(imageUrl).toBe(`${imageBaseUrl}/STATE_daily/CHL_AGE/SE/20240717.gif`);
    });

    it('should route via proxy for oceanColour-chlA local when isProxyRequired is true', () => {
      const productId = 'oceanColour-chlA';
      const region = 'SE';
      const regionScope = RegionScope.Local;
      const date = '2024071706';
      const oceanColourDateList = [{ date: '2024071706' }];

      const imageUrl = buildStaticImageUrl(productId, dayjs(date), region, regionScope, regionScope, region, {
        oceanColourDateList,
        isProxyRequired: true,
      });

      expect(imageUrl).toBe('/resource/SE_chl/2024071706.gif');
    });

    // Without dateList, oceanColour falls through to the default branch
    it('should fall through to default branch for oceanColour-chlA when no dateList provided', () => {
      const productId = 'oceanColour-chlA';
      const region = 'SE';
      const regionScope = RegionScope.State;
      const date = '20240717';

      const imageUrl = buildStaticImageUrl(productId, dayjs(date), region, regionScope, regionScope, region);

      expect(imageUrl).toBe(`${imageBaseUrl}/STATE_daily/CHL/SE/20240717.gif`);
    });
  });

  describe('monthlyMeans', () => {
    it('should return the correct image url for monthlyMeans-climatology', () => {
      // Arrange
      const productId = 'monthlyMeans-climatology';
      const region = 'SW_mm';
      const regionScope = RegionScope.State;
      const date = '202402';

      // Act
      const imageUrl = buildStaticImageUrl(productId, dayjs(date), region, regionScope, regionScope, region);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/30d_MEAN/CLIM_OFAM3_SSTAARS/SW_mm/02.gif`);
    });

    it('should return the correct image URL for monthlyMeans-30day', () => {
      // Arrange
      const productId = 'monthlyMeans-30day';
      const region = 'NW_mm';
      const regionScope = RegionScope.State;
      const date = '20240615';

      // Act
      const imageUrl = buildStaticImageUrl(productId, dayjs(date), region, regionScope, regionScope, region);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/30d_MEAN/NW_mm/20240615.gif`);
    });
  });

  describe('adjustedSeaLevelAnomaly', () => {
    it('should return the correct image URL for SLA', () => {
      // Arrange
      const productId = 'adjustedSeaLevelAnomaly-sst';
      const region = 'Au';
      const regionScope = RegionScope.State;
      const date = '20240717';

      // Act
      const imageUrl = buildStaticImageUrl(productId, dayjs(date), region, regionScope, regionScope, region);

      // Assert
      expect(imageUrl).toBe(`${imageBaseUrl}/ht/20240717.gif`);
    });
  });

  it('should return the correct image url for API call', () => {
    // Arrange
    const productId = 'sixDaySst-sst';
    const region = 'Adelaide';
    const regionScope = RegionScope.Local;
    const date = '20240519';

    // Act
    const imageUrl = buildStaticImageUrl(productId, dayjs(date), region, regionScope, regionScope, region, {
      isProxyRequired: true,
    });

    // Assert
    expect(imageUrl).toBe('/resource/DR_SST_daily/SST/Adelaide/20240519.gif');
  });

  it('should throw an error for unsupported product ID', () => {
    // Arrange
    const productId = 'unsupportedProduct-test';
    const region = 'Adelaide';
    const regionScope = RegionScope.Local;
    const date = '20240519';

    // Act & Assert
    expect(() =>
      buildStaticImageUrl(productId as ProductID, dayjs(date), region, regionScope, regionScope, region),
    ).toThrowError(`Product with id ${productId} not found`);
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

describe('buildProductVideoUrl', () => {
  it('should return the correct video url for four hour sst', () => {
    // Arrange
    const productType = 'fourHourSst-sst';
    const region = 'Adelaide';
    const regionScope = RegionScope.Local;
    const date = '2024-05-19';

    // Act
    const videoUrl = buildProductVideoUrl(productType, region, regionScope, date);

    // Assert
    expect(videoUrl).toBe(`${imageBaseUrl}/SST_4hr/SST/Adelaide/Adelaide_SST_202405.mp4`);
  });

  it('should return the correct video url for monthly means', () => {
    // Arrange
    const productType = 'monthlyMeans-30day';
    const region = 'Au';
    const regionScope = RegionScope.State;
    const date = '202405';

    // Act
    const videoUrl = buildProductVideoUrl(productType, region, regionScope, date);

    // Assert
    expect(videoUrl).toBe(`${imageBaseUrl}/30d_MEAN/Au/Au.mp4`);
  });

  it('should throw an error for unsupported product type', () => {
    // Arrange
    const productType = 'unsupportedProduct';
    const region = 'Adelaide';
    const regionScope = RegionScope.Local;
    const date = '2024-05-19';

    // Act & Assert
    expect(() => buildProductVideoUrl(productType as ProductID, region, regionScope, date)).toThrowError(
      `Product with id ${productType} not found`,
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
    const deploymentPlotPath = '/timeseries/ANMN_P48/TOTTEN1/xyz';
    const plotId = 'TOTTEN1-WORKHORSE-ADCP-14489_xyz';

    // Act
    const imageUrl = buildCurrentMetersDataImageUrl(deploymentPlotPath, plotId);

    // Assert
    expect(imageUrl).toBe(`${imageBaseUrl}/timeseries/ANMN_P48/TOTTEN1/xyz/TOTTEN1-WORKHORSE-ADCP-14489_xyz.gif`);
  });
});

describe('buildTidalCurrentsMapImageUrl', () => {
  it('should return the correct map image url for Tidal Currents', () => {
    // Arrange
    const date = dayjs('202502280000');
    const region = 'GOC';
    const tidalCurrentsImageData = [
      {
        path: 'tides/GOC_hv/2025',
        region: 'GOC',
        productId: 'tides',
        files: [{ name: '202502280000.gif' }],
      },
    ];

    // Act
    const imageUrl = buildTidalCurrentsMapImageUrl(region, date, tidalCurrentsImageData);

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
    const point = 'NTC_Fenton_patches';
    const date = dayjs('202502280000');

    // Act
    const imageUrl = buildTidalCurrentsDataImageUrl(point, date);

    // Assert
    expect(imageUrl).toBe(`${imageBaseUrl}/tides/monthplots/NTC_Fenton_patches_202502.gif`);
  });
});

describe('buildSealCtdMapImageUrl', () => {
  it('should return the correct url for SealCTD Tracks map image', () => {
    // Arrange
    const region = 'NSW';
    const date = dayjs('202502280000');

    // Act
    const imageUrl = buildSealCtdMapImageUrl(region, date);

    // Assert
    expect(imageUrl).toBe(`${imageBaseUrl}/AATAMS/NSW/tracks/20250228.gif`);
  });
});

describe('buildSealCtdGraphImageUrl', () => {
  it('should return the correct url for SealCTD Temperature graph image', () => {
    // Arrange
    const region = 'POLAR';
    const date = dayjs('202502280000');
    const subProduct = 'sealCtd-timeseriesTemperature';

    // Act
    const imageUrl = buildSealCtdGraphImageUrl(region, date, subProduct);

    // Assert
    expect(imageUrl).toBe('/AATAMS/POLAR/timeseries/T_2025_p0.gif');
  });

  it('should return the correct url for SealCTD Salinity graph image', () => {
    // Arrange
    const region = 'GAB-Seal';
    const date = dayjs('20250228');
    const subProduct = 'sealCtd-timeseriesSalinity';

    // Act
    const imageUrl = buildSealCtdGraphImageUrl(region, date, subProduct);

    // Assert
    expect(imageUrl).toBe('/AATAMS/GAB/timeseries/S_2024_2025_p0.gif');
  });
});

describe('buildSealCtdTagsDataImageUrl', () => {
  it('should return the correct url for SealCTD 10 days data image', () => {
    // Arrange
    const sealTagId = 'Q9902023';
    const date = dayjs('202502280000');
    const productId = 'sealCtdTags-10days';

    // Act
    const imageUrl = buildSealCtdTagsDataImageUrl(sealTagId, date, productId);

    // Assert
    expect(imageUrl).toBe(`${imageBaseUrl}/AATAMS/SATTAGS/Q9902023/10days/20250228.gif`);
  });

  // Arrange
  it('should return the correct url for SealCTD TS data image', () => {
    const sealTagId = 'Q9902023';
    const date = dayjs('20250228');
    const productId = 'sealCtdTags-ts';

    // Act
    const imageUrl = buildSealCtdTagsDataImageUrl(sealTagId, date, productId);

    // Assert
    expect(imageUrl).toBe(`${imageBaseUrl}/AATAMS/SATTAGS/Q9902023/TS.gif`);
  });
});
