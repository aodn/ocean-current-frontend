import { expect, type Locator, type Page } from '@playwright/test';

export class Map {
  readonly canvas: Locator;
  readonly zoomInButton: Locator;
  readonly zoomOutButton: Locator;

  constructor(private readonly page: Page) {
    this.canvas = page.locator('.mapboxgl-canvas').first();
    this.zoomInButton = page.locator('.mapboxgl-ctrl-zoom-in').first();
    this.zoomOutButton = page.locator('.mapboxgl-ctrl-zoom-out').first();
  }

  async expectVisible(): Promise<void> {
    await expect(this.canvas).toBeVisible();
  }

  async expectZoomControlsVisible(): Promise<void> {
    await expect(this.zoomInButton).toBeVisible();
    await expect(this.zoomOutButton).toBeVisible();
  }

  async expectZoomInEnabled(): Promise<void> {
    await expect(this.zoomInButton).toBeVisible();
    await expect(this.zoomInButton).toBeEnabled();
  }

  async expectZoomOutEnabled(): Promise<void> {
    await expect(this.zoomOutButton).toBeVisible();
    await expect(this.zoomOutButton).toBeEnabled();
  }

  async zoomIn(): Promise<void> {
    await this.zoomInButton.click();
  }

  async zoomOut(): Promise<void> {
    await this.zoomOutButton.click();
  }

  async clickFixedRegionBox(box: { x: number; y: number; width: number; height: number }): Promise<void> {
    await this.page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.5);
    await this.page.waitForURL(/region=/, { timeout: 5000 }).catch(() => {});
  }
}
