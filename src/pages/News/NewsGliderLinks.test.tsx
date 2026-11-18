import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

it.each(['true', 'false'])('renders all 20 News links with Gliders set to %s', async (enabled) => {
  vi.stubEnv('VITE_ENABLE_GLIDERS', enabled);
  const { default: News } = await import('./News');
  const { container } = render(
    <MemoryRouter>
      <News />
    </MemoryRouter>,
  );
  const links = [
    ...container.querySelectorAll<HTMLAnchorElement>(
      'a[href^="/product/gliders"], a[href^="/map/gliders"], a[href="/coming-soon?product=gliders"]',
    ),
  ];
  expect(links).toHaveLength(20);
  expect(links.filter((link) => link.pathname === '/coming-soon')).toHaveLength(enabled === 'true' ? 0 : 20);
  if (enabled === 'true') {
    expect(links.map((link) => link.getAttribute('href'))).toEqual(
      expect.arrayContaining([
        '/product/gliders?missionId=TwoRocks20240115%405.01&window=4d&date=2024012800',
        '/product/gliders?missionId=ForsterA20210329%405.01&window=30d&date=2021041400',
        '/product/gliders?view=ts&diagramId=sl_Cooktown20160322_nrt',
        '/map/gliders?year=2018&platform=sl&mode=delayed',
      ]),
    );
  }
});
