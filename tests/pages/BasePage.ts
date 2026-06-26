import { expect, type Locator, type Page, type Request } from '@playwright/test';
import { Navbar } from './components/Navbar';

export class BasePage {
  readonly navbar: Navbar;
  readonly footer: Locator;

  constructor(readonly page: Page) {
    this.navbar = new Navbar(page);
    this.footer = page.locator('footer').first();
  }

  async goto(path: string): Promise<void> {
    await this.page.goto(path, { waitUntil: 'load' });
  }

  url(): string {
    return this.page.url();
  }

  getSearchParamFromURL(param: string): string | null {
    return new URL(this.url()).searchParams.get(param);
  }

  async expectContainsText(text: string | RegExp): Promise<void> {
    await expect(this.page.locator('body')).toContainText(text);
  }

  getByText(text: string | RegExp, exact: boolean = false): Locator {
    return this.page.getByText(text, { exact });
  }

  getButton(name: string | RegExp, exact: boolean = true): Locator {
    return this.page.getByRole('button', { name, exact });
  }

  trackRequests(glob: RegExp): { url: string; status: number | null }[] {
    type Hit = { url: string; status: number | null };
    const hits: Hit[] = [];
    this.page.on('requestfinished', async (req: Request) => {
      if (glob.test(req.url())) {
        const res = await req.response();
        hits.push({ url: req.url(), status: res ? res.status() : null });
      }
    });
    return hits;
  }
}
