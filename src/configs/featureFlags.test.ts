afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

it.each([undefined, '', 'false', 'TRUE', '1'])('keeps Gliders disabled when the flag is %s', async (value) => {
  vi.stubEnv('VITE_ENABLE_GLIDERS', value);
  const { featureFlags } = await import('./featureFlags');
  expect(featureFlags.gliders).toBe(false);
});

it('enables Gliders when explicitly configured', async () => {
  vi.stubEnv('VITE_ENABLE_GLIDERS', 'true');
  const { featureFlags } = await import('./featureFlags');
  expect(featureFlags.gliders).toBe(true);
});

describe.each([
  { flag: 'false', enabled: false },
  { flag: 'true', enabled: true },
])('Gliders navigation when the flag is $flag', ({ flag, enabled }) => {
  beforeEach(() => vi.stubEnv('VITE_ENABLE_GLIDERS', flag));

  it(enabled ? 'links the navbar to the Gliders map' : 'keeps the navbar on the coming-soon page', async () => {
    const { linksData } = await import('@/data/linksData');
    const gliders = linksData.flatMap(({ links }) => links ?? []).find(({ id }) => id === 'gliders');
    expect(gliders?.url).toBe(enabled ? '/map/gliders' : '/coming-soon?product=gliders');
  });

  it(`${enabled ? 'shows' : 'hides'} Gliders in the product sidebar and product list`, async () => {
    const { sidebarProductsNav } = await import('@/data/sidebarProductsNav');
    const { OC_PRODUCTS } = await import('@/constants/product');
    expect(sidebarProductsNav.some(({ id }) => id === 'gliders')).toBe(enabled);
    expect(OC_PRODUCTS.some(({ key }) => key === 'gliders')).toBe(enabled);
  });
});
