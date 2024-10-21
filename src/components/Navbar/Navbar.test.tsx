import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import NavbarMenu from './components/NavbarMenu';

describe('Navbar component', () => {
  let component: RenderResult;

  beforeEach(() => {
    // Arrange
    component = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
  });

  it('Navbar renders without crashing', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('NavbarMenu renders without crashing', () => {
    // Arrange
    const { getByText } = render(<NavbarMenu items={[]} />);

    // Assert
    expect(getByText).toBeTruthy();
  });

  it('updates hoverIndex and popoverPosition on mouse enter', async () => {
    // Arrange
    const { findAllByText, findByText } = component;

    // Act
    const menuItem = await findAllByText('Maps');
    fireEvent.mouseEnter(menuItem[0]);

    // Assert
    expect(await findByText('Snapshot SST')).toBeInTheDocument();
  });
});
