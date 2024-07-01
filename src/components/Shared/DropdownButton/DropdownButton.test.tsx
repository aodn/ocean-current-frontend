import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import DropdownButton from './DropdownButton';
import { DropdownButtonProps } from './types/DropdownButton.types';

const mockProps: DropdownButtonProps = {
  label: 'Select Items',
  items: ['Item 1', 'Item 2', 'Item 3'],
  onSelect: vi.fn(),
};

describe('DropdownButton Component', () => {
  it('should render the button with the correct label', () => {
    // Arrange
    render(<DropdownButton {...mockProps} />);

    // Act
    const button = screen.getByRole('button', { name: /select items/i });

    // Assert
    expect(button).toBeInTheDocument();
  });

  it('should toggle the dropdown menu when button is clicked', async () => {
    // Arrange
    render(<DropdownButton {...mockProps} />);

    // Act
    const button = screen.getByRole('button', { name: /select items/i });
    fireEvent.click(button);

    // Assert
    const menu = await screen.findByRole('menu');
    expect(menu).toBeInTheDocument();

    // Act
    fireEvent.click(button);

    // Assert
    await waitFor(() => {
      expect(menu).not.toBeInTheDocument();
    });
  });

  it('should call onSelect with selected items when Apply button is clicked', async () => {
    // Arrange
    render(<DropdownButton {...mockProps} />);

    // Act
    const button = screen.getByRole('button', { name: /select items/i });
    fireEvent.click(button);

    const firstItem = screen.getByText('Item 1');
    fireEvent.click(firstItem);

    const applyButton = screen.getByRole('button', { name: /apply/i });
    fireEvent.click(applyButton);

    // Assert
    expect(mockProps.onSelect).toHaveBeenCalledWith(['Item 1']);
  });
});
