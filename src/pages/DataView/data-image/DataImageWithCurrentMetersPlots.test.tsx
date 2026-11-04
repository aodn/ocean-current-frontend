import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTestQueryClient } from '@/configs/query';
import { fetchCurrentMetersPlotsList } from '@/services/imageList';
import { CurrentMetersDeploymentPlotNames } from '@/types/currentMeters';
import { imageUrlConfig } from '@/configs/image';
import DataImageWithCurrentMetersPlots from './DataImageWithCurrentMetersPlots';

vi.mock('@/services/imageList');

const plotsResponse = (station: string) => ({
  productId: 'currentMetersPlot-54',
  region: station,
  depthData: [
    {
      depth: 'xyz',
      path: `/timeseries/ANMN_P54/${station}/xyz`,
      files: [
        `${station}-1411-ADCP_xyz.gif`,
        `${station}-2507-ADCP_xyz.gif`,
        `${station}-2602-ADCP_xyz.gif`,
        'latest.gif',
      ],
    },
    {
      depth: 'zt',
      path: `/timeseries/ANMN_P54/${station}/zt`,
      files: [`${station}-1411-ADCP_zt.gif`, `${station}-2507-ADCP_zt.gif`],
    },
  ],
});

const renderPlots = (deploymentPlot: string) => {
  const queryClient = createTestQueryClient();
  const tree = (plot: string) => (
    <QueryClientProvider client={queryClient}>
      <DataImageWithCurrentMetersPlots deploymentPlot={plot as CurrentMetersDeploymentPlotNames} />
    </QueryClientProvider>
  );
  const { rerender } = render(tree(deploymentPlot));
  return { rerenderWithPlot: (plot: string) => rerender(tree(plot)) };
};

const velocityImage = (plot: string) =>
  screen.findByAltText(`Layer-average velocity vector scatter plots for deployment plot ${plot}`);
const depthTimeImage = (plot: string) => screen.findByAltText(`Depth-time plots for deployment plot ${plot}`);

describe('DataImageWithCurrentMetersPlots', () => {
  beforeEach(() => {
    vi.mocked(fetchCurrentMetersPlotsList).mockImplementation(
      (plot) => Promise.resolve(plotsResponse(plot)) as ReturnType<typeof fetchCurrentMetersPlotsList>,
    );
  });

  it('opens each plot type on its newest deployment and never on latest.gif', async () => {
    renderPlots('BMP120');

    expect(await velocityImage('BMP120')).toHaveAttribute(
      'src',
      `${imageUrlConfig.imageBaseUrl}/timeseries/ANMN_P54/BMP120/xyz/BMP120-2602-ADCP_xyz.gif`,
    );
    expect(await depthTimeImage('BMP120')).toHaveAttribute(
      'src',
      `${imageUrlConfig.imageBaseUrl}/timeseries/ANMN_P54/BMP120/zt/BMP120-2507-ADCP_zt.gif`,
    );
  });

  it('selects the newest deployment again when the station changes', async () => {
    const { rerenderWithPlot } = renderPlots('BMP120');
    await velocityImage('BMP120');

    rerenderWithPlot('SYD140');

    const image = await velocityImage('SYD140');
    await vi.waitFor(() =>
      expect(image).toHaveAttribute(
        'src',
        `${imageUrlConfig.imageBaseUrl}/timeseries/ANMN_P54/SYD140/xyz/SYD140-2602-ADCP_xyz.gif`,
      ),
    );
  });
});
