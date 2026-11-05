import { render } from '@testing-library/react';
import { Layer, useMap, type MapMouseEvent } from 'react-map-gl/mapbox';
import { color } from '@/styles/colors';
import GlidersDeploymentLayer from './GlidersDeploymentLayer';

vi.mock('react-map-gl/mapbox', () => ({
  useMap: vi.fn(),
  Source: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Layer: vi.fn(() => null),
}));

it('selects a clicked deployment and cleans up delegated map listeners', () => {
  const map = { on: vi.fn(), off: vi.fn(), getCanvas: () => ({ style: {} }) };
  vi.mocked(useMap).mockReturnValue({ current: map } as unknown as ReturnType<typeof useMap>);
  const onSelect = vi.fn();
  const { unmount } = render(
    <GlidersDeploymentLayer data={{ type: 'FeatureCollection', features: [] }} onSelect={onSelect} />,
  );
  const click = map.on.mock.calls.find(([event]) => event === 'click')![2] as (event: MapMouseEvent) => void;
  click({ features: [{ properties: { id: 'TwoRocks20261028_nrt' } }] } as unknown as MapMouseEvent);
  expect(onSelect).toHaveBeenCalledWith('TwoRocks20261028_nrt');
  click({ features: [] } as unknown as MapMouseEvent);
  expect(onSelect).toHaveBeenCalledTimes(1);
  unmount();
  expect(map.off).toHaveBeenCalledWith('click', 'gliders-deployment-fill', click);
  expect(map.off).toHaveBeenCalledTimes(3);
});

it('cleans up safely when navigation has already removed the map canvas', () => {
  const map = { on: vi.fn(), off: vi.fn(), getCanvas: () => undefined };
  vi.mocked(useMap).mockReturnValue({ current: map } as unknown as ReturnType<typeof useMap>);
  const { unmount } = render(
    <GlidersDeploymentLayer data={{ type: 'FeatureCollection', features: [] }} onSelect={vi.fn()} />,
  );
  expect(() => unmount()).not.toThrow();
});

it('highlights the selected deployment area', () => {
  vi.mocked(Layer).mockClear();
  vi.mocked(useMap).mockReturnValue({ current: undefined } as unknown as ReturnType<typeof useMap>);
  render(
    <GlidersDeploymentLayer
      data={{ type: 'FeatureCollection', features: [] }}
      onSelect={vi.fn()}
      selectedId="TwoRocks20261028_nrt"
    />,
  );
  const isSelected = ['==', ['get', 'id'], 'TwoRocks20261028_nrt'];
  expect(vi.mocked(Layer).mock.calls.map(([props]) => props.paint)).toEqual([
    { 'fill-color': color.dodgerBlue, 'fill-opacity': ['case', isSelected, 0.6, 0.2] },
    { 'line-color': color.calypsoBlue, 'line-width': ['case', isSelected, 3, 1.5] },
  ]);
});
