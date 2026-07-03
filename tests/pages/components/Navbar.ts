import { expect, type Locator, type Page } from '@playwright/test';

export class Navbar {
  readonly root: Locator;
  readonly brandingSection: Locator;
  readonly mapsMenu: Locator;
  readonly inWaterMenu: Locator;
  readonly newsMenu: Locator;
  readonly guidedTourMenu: Locator;
  readonly legacySiteMenu: Locator;

  constructor(private readonly page: Page) {
    this.root = page.getByTestId('main-navbar');
    this.brandingSection = this.root.getByTestId('navbar-branding');
    this.mapsMenu = this.root.getByText('Maps', { exact: true }).first();
    this.inWaterMenu = this.root.getByText('In-Water', { exact: true }).first();
    this.newsMenu = this.root.getByText('News', { exact: true }).first();
    this.guidedTourMenu = this.root.getByText('Guided Tour', { exact: true }).first();
    this.legacySiteMenu = this.root.getByText('Legacy Site', { exact: true }).first();
  }

  async expectVisible(): Promise<void> {
    await expect(this.root).toBeVisible();
  }

  async clickNews(): Promise<void> {
    await this.root.locator('a[href*="news"]').first().click();
    await this.page.waitForLoadState('load');
  }

  /** Hovers the given top-level menu (opens its dropdown) and clicks an item by its title. */
  async clickMenuItem(menu: 'maps' | 'inWater', itemTitle: string): Promise<void> {
    const trigger = menu === 'maps' ? this.mapsMenu : this.inWaterMenu;
    await trigger.hover();
    await this.root.getByText(itemTitle, { exact: true }).click();
  }
}
