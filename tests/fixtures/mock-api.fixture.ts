import type { Page } from '@playwright/test';
import { registerImageMapTooltipMocks, registerSurfaceWavesMocks } from '../mocks';

export class MockApi {
  constructor(private readonly page: Page) {}

  async useImageMapTooltipMocks(): Promise<void> {
    if (process.env.E2E_SMOKE === 'true') {
      return;
    }

    await registerImageMapTooltipMocks(this.page);
  }

  async useSurfaceWavesMocks(): Promise<void> {
    await registerSurfaceWavesMocks(this.page);
  }
}
