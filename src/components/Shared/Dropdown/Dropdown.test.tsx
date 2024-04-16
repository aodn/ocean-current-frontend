import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dropdown from './Dropdown';
import { DropdownElement } from './types/dropdown.types';

const elements: DropdownElement[] = [
  { id: '1', label: 'Option 1', icon: 'icon-url-1' },
  { id: '2', label: 'Option 2', icon: 'icon-url-2' },
];

describe('Dropdown Component', () => {
  it('should render with initial selected item', () => {
    render(<Dropdown elements={elements} initialSelectedId="1" />);
    const selectedItem = screen.getByText('Option 1');
    expect(selectedItem).toBeInTheDocument();
  });

  it('should toggle dropdown on click', async () => {
    render(<Dropdown elements={elements} initialSelectedId="1" />);
    const dropdownButton = screen.getByText('Option 1');
    expect(screen.queryByText('Option 1')).toBeInTheDocument();

    // Act
    await userEvent.click(dropdownButton);

    // Assert
    const option2 = screen.getByText('Option 2');
    expect(option2).toBeVisible();

    // Act
    await userEvent.click(dropdownButton);

    // Assert
    expect(option2).not.toBeVisible();
  });

  it('should select an item and close dropdown', async () => {
    render(<Dropdown elements={elements} initialSelectedId="1" />);
    const dropdownButton = screen.getByText('Option 1');

    // Act
    await userEvent.click(dropdownButton);
    const option2 = screen.getByText('Option 2');

    // Act
    await userEvent.click(option2);

    // Assert
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('should close dropdown when clicking outside', async () => {
    render(<Dropdown elements={elements} />);
    const dropdownButton = screen.getByText('Select Item');

    // Act
    await userEvent.click(dropdownButton);

    // Act
    fireEvent.mouseDown(document);

    // Assert
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
  });
});
