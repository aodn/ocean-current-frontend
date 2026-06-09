import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DropdownElement } from '../Dropdown/types/dropdown.types';
import MenuList from './MenuList';

const elements: DropdownElement<string>[] = [
  { id: 'a', label: 'Alpha' },
  { id: 'b', label: 'Beta' },
  { id: 'c', label: 'Gamma' },
];

describe('MenuList', () => {
  it('renders a <ul> with one <li> per element', () => {
    render(<MenuList testId="menu" elements={elements} onItemClick={vi.fn()} />);
    const list = screen.getByTestId('menu');
    expect(list.tagName).toBe('UL');
    expect(list.querySelectorAll('li')).toHaveLength(elements.length);
    elements.forEach(({ label }) => expect(screen.getByText(label)).toBeInTheDocument());
  });

  it('calls onItemClick with the clicked element', () => {
    const onItemClick = vi.fn();
    render(<MenuList elements={elements} onItemClick={onItemClick} />);

    fireEvent.click(screen.getByText('Beta'));

    expect(onItemClick).toHaveBeenCalledTimes(1);
    expect(onItemClick).toHaveBeenCalledWith(elements[1]);
  });

  it('does not call onItemClick for a disabled element', () => {
    const onItemClick = vi.fn();
    render(<MenuList elements={[{ id: 'a', label: 'Alpha', disabled: true }]} onItemClick={onItemClick} />);

    fireEvent.click(screen.getByText('Alpha'));

    expect(onItemClick).not.toHaveBeenCalled();
  });

  it('does not call onItemClick for a loading element', () => {
    const onItemClick = vi.fn();
    render(<MenuList elements={[{ id: 'a', label: 'Alpha', isLoading: true }]} onItemClick={onItemClick} />);

    fireEvent.click(screen.getByText('Alpha'));

    expect(onItemClick).not.toHaveBeenCalled();
  });

  it('highlights the selected element', () => {
    render(<MenuList elements={elements} selectedId="b" onItemClick={vi.fn()} />);

    const selectedLabel = screen.getByText('Beta');
    expect(selectedLabel).toHaveClass('text-white');
    expect(selectedLabel.closest('li')).toHaveClass('bg-imos-deep-blue');
    expect(screen.getByText('Alpha').closest('li')).not.toHaveClass('bg-imos-deep-blue');
  });

  it('renders an icon per element when showIcons is set', () => {
    const Icon = () => <svg data-testid="menu-icon" />;
    render(<MenuList showIcons elements={[{ id: 'a', label: 'Alpha', Icon }]} onItemClick={vi.fn()} />);

    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
  });

  it('applies the testId to the list container', () => {
    render(<MenuList testId="my-menu" elements={elements} onItemClick={vi.fn()} />);
    expect(screen.getByTestId('my-menu')).toBeInTheDocument();
  });

  it('uses compact padding by default and wider padding when widePadding is set', () => {
    const { rerender } = render(<MenuList testId="menu" elements={elements} onItemClick={vi.fn()} />);
    expect(screen.getByTestId('menu')).toHaveClass('p-1');

    rerender(<MenuList testId="menu" widePadding elements={elements} onItemClick={vi.fn()} />);
    expect(screen.getByTestId('menu')).toHaveClass('p-2');
  });
});
