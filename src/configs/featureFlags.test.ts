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
