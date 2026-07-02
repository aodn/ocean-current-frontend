import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LegendItem } from '@/constants/productLegends';
import LegendPopupBody from './LegendPopupBody';

const itemWithShape: LegendItem = {
  label: 'Argo',
  shape: <div data-testid="argo-shape" />,
  description: 'pink circle at the location of any profile',
};

const itemWithLabelOnly: LegendItem = {
  label: 'Selected isobaths',
  description: 'grey and cyan contours, in metres.',
};

const itemDescriptionOnly: LegendItem = {
  description: 'The latest ASL (NRT00) map is usually dated 4 days behind real time.',
};

describe('LegendPopupBody', () => {
  it('renders the shape, label and description for a full item', () => {
    render(<LegendPopupBody legendItems={[itemWithShape]} />);

    expect(screen.getByTestId('argo-shape')).toBeInTheDocument();
    expect(screen.getByText(/Argo/)).toBeInTheDocument();
    expect(screen.getByText(/pink circle at the location of any profile/)).toBeInTheDocument();
  });

  it('renders label and description without a shape for a label-only item', () => {
    render(<LegendPopupBody legendItems={[itemWithLabelOnly]} />);

    expect(screen.getByText(/Selected isobaths/)).toBeInTheDocument();
    expect(screen.getByText(/grey and cyan contours/)).toBeInTheDocument();
  });

  it('renders only description when item has no label or shape', () => {
    render(<LegendPopupBody legendItems={[itemDescriptionOnly]} />);

    expect(screen.getByText(/The latest ASL \(NRT00\) map/)).toBeInTheDocument();
  });

  it('renders all items', () => {
    render(<LegendPopupBody legendItems={[itemWithShape, itemWithLabelOnly, itemDescriptionOnly]} />);

    expect(screen.getByText(/Argo/)).toBeInTheDocument();
    expect(screen.getByText(/Selected isobaths/)).toBeInTheDocument();
    expect(screen.getByText(/The latest ASL \(NRT00\) map/)).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <LegendPopupBody legendItems={[itemWithShape, itemWithLabelOnly, itemDescriptionOnly]} />,
    );
    expect(container).toMatchSnapshot();
  });
});
