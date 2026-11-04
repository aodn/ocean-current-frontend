import { fireEvent, render, screen } from '@testing-library/react';
import GlidersDeploymentLayer from './GlidersDeploymentLayer';

vi.mock('react-map-gl/mapbox', () => ({
  Source: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Layer: ({ id }: { id: string }) => <div data-testid={id} />,
}));

it('does not open a page when a deployment polygon is clicked', () => {
  const open = vi.spyOn(window, 'open').mockImplementation(() => null);
  try {
    render(<GlidersDeploymentLayer data={{ type: 'FeatureCollection', features: [] }} />);
    fireEvent.click(screen.getByTestId('gliders-deployment-fill'));
    expect(open).not.toHaveBeenCalled();
  } finally {
    open.mockRestore();
  }
});
