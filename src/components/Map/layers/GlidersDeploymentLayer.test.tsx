import { render } from '@testing-library/react';
import { Children, cloneElement, type ReactElement, type ReactNode } from 'react';
import { Layer, useMap, type MapMouseEvent } from 'react-map-gl/mapbox';
import { mapAnimation } from '@/configs/map';
import { color } from '@/styles/colors';
import type { BoundingBox } from '@/types/map';
import GlidersDeploymentLayer from './GlidersDeploymentLayer';

vi.mock('react-map-gl/mapbox', () => ({
  useMap: vi.fn(),
  Source: ({ children, id }: { children: ReactNode; id: string }) =>
    Children.map(children, (child) => child && cloneElement(child as ReactElement<{ source: string }>, { source: id })),
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

it('moves the selection outline to the newly selected deployment', () => {
  vi.mocked(Layer).mockClear();
  vi.mocked(useMap).mockReturnValue({ current: undefined } as unknown as ReturnType<typeof useMap>);
  const props = { data: { type: 'FeatureCollection' as const, features: [] }, onSelect: vi.fn() };
  const first = 'TwoRocks20261028_nrt';
  const second = 'Ceduna20260924_nrt';
  const { rerender } = render(<GlidersDeploymentLayer {...props} selectedId={first} />);

  const selectionLayer = () => vi.mocked(Layer).mock.lastCall?.[0];
  expect(selectionLayer()).toMatchObject({
    id: 'gliders-deployment-selection-outline',
    source: 'gliders-deployments',
    filter: ['==', ['get', 'id'], first],
    paint: { 'line-color': color.primary2, 'line-width': 3 },
  });

  rerender(<GlidersDeploymentLayer {...props} selectedId={second} />);
  expect(selectionLayer()?.filter).toEqual(['==', ['get', 'id'], second]);
});

it('frames each selected area once the minimap has space', () => {
  const container = { clientWidth: 0, clientHeight: 240 };
  const events = new Map<string, () => void>();
  const map = {
    getContainer: () => container,
    getCanvas: () => ({ style: {} }),
    on: vi.fn((event, listener) => events.set(event, listener)),
    off: vi.fn((event) => events.delete(event)),
    fitBounds: vi.fn(),
  };
  vi.mocked(useMap).mockReturnValue({ current: map } as unknown as ReturnType<typeof useMap>);
  const props = { data: { type: 'FeatureCollection' as const, features: [] }, onSelect: vi.fn() };
  const initial: BoundingBox = [114, -32, 116, -31];
  const next: BoundingBox = [131, -34, 133, -31];
  const { rerender } = render(<GlidersDeploymentLayer {...props} selectedId="First" selectedBounds={initial} />);
  expect(map.fitBounds).not.toHaveBeenCalled();

  container.clientWidth = 300;
  events.get('resize')?.();
  expect(map.fitBounds).toHaveBeenLastCalledWith(initial, {
    padding: 20,
    duration: mapAnimation.duration,
    retainPadding: false,
  });

  rerender(<GlidersDeploymentLayer {...props} selectedId="First" selectedBounds={[...initial]} />);
  expect(map.fitBounds).toHaveBeenCalledTimes(1);
  rerender(<GlidersDeploymentLayer {...props} selectedId="Second" selectedBounds={next} />);
  expect(map.fitBounds.mock.calls.map(([bounds]) => bounds)).toEqual([initial, next]);
});

it('opens the first deployment under the click', () => {
  const map = { on: vi.fn(), off: vi.fn(), getCanvas: () => ({ style: {} }) };
  vi.mocked(useMap).mockReturnValue({ current: map } as unknown as ReturnType<typeof useMap>);
  const onSelect = vi.fn();
  render(<GlidersDeploymentLayer data={{ type: 'FeatureCollection', features: [] }} onSelect={onSelect} />);
  const click = map.on.mock.calls.find(([event]) => event === 'click')![2] as (event: MapMouseEvent) => void;
  click({ features: ['first', 'second'].map((id) => ({ properties: { id } })) } as unknown as MapMouseEvent);
  expect(onSelect).toHaveBeenCalledExactlyOnceWith('first');
});
