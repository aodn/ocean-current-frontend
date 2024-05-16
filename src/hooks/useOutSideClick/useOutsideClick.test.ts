import { renderHook, fireEvent } from '@testing-library/react';
import useOutsideClick from './useOutsideClick';

describe('useOutsideClick', () => {
  it('calls onOutsideClick when a click is outside the referenced element', () => {
    // Arrange
    const handleOutsideClick = vi.fn();
    renderHook(() => {
      const ref = {
        current: document.createElement('div'),
      };
      useOutsideClick(ref, handleOutsideClick);
      return ref;
    });

    // Act: simulate clicking outside the element
    fireEvent.mouseDown(document);

    // Assert
    expect(handleOutsideClick).toHaveBeenCalled();
  });

  it('does not call onOutsideClick when clicking inside the referenced element', () => {
    // Arrange
    const handleOutsideClick = vi.fn();
    const { result } = renderHook(() => {
      const ref = {
        current: document.createElement('div'),
      };
      useOutsideClick(ref, handleOutsideClick);
      return ref;
    });

    // Act: simulate clicking inside the element
    fireEvent.mouseDown(result.current.current);

    // Assert
    expect(handleOutsideClick).not.toHaveBeenCalled();
  });
});
