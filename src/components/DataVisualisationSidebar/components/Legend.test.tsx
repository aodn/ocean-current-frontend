import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LegendItem } from '@/constants/productLegends';
import Legend from './Legend';

const itemWithShape: LegendItem = {
  label: 'Argo',
  shape: <div data-testid="argo-shape" />,
  description: 'Argo float profile',
};

const itemWithLabelOnly: LegendItem = {
  label: 'Selected isobaths',
  description: 'grey and cyan contours, in metres.',
};

const itemDescriptionOnly: LegendItem = {
  description: 'The latest ASL (NRT00) map is usually dated 4 days behind real time.',
};

describe('Legend', () => {
  it('renders nothing when legendItems is null', () => {
    const { container } = render(<Legend legendItems={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when legendItems is empty', () => {
    const { container } = render(<Legend legendItems={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('only shows items with a shape in the sidebar', () => {
    render(<Legend legendItems={[itemWithShape, itemWithLabelOnly, itemDescriptionOnly]} />);

    // shape item label is visible in sidebar
    expect(screen.getByText('Argo')).toBeInTheDocument();

    // label-only and description-only items are not shown (popup is closed)
    expect(screen.queryByText('Selected isobaths')).not.toBeInTheDocument();
    expect(screen.queryByText(/The latest ASL \(NRT00\) map/)).not.toBeInTheDocument();
  });

  it('shows the "Click for more information" button', () => {
    render(<Legend legendItems={[itemWithShape]} />);
    expect(screen.getByText('Click for more information')).toBeInTheDocument();
  });

  it('shows all items in the popup after clicking the button', () => {
    render(<Legend legendItems={[itemWithShape, itemWithLabelOnly, itemDescriptionOnly]} />);

    fireEvent.click(screen.getByText('Click for more information'));

    expect(screen.getByText(/Argo float profile/)).toBeInTheDocument();
    expect(screen.getByText(/Selected isobaths/)).toBeInTheDocument();
    expect(screen.getByText(/grey and cyan contours/)).toBeInTheDocument();
    expect(screen.getByText(/The latest ASL \(NRT00\) map/)).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Legend legendItems={[itemWithShape, itemWithLabelOnly, itemDescriptionOnly]} />);
    expect(container).toMatchSnapshot();
  });
});
