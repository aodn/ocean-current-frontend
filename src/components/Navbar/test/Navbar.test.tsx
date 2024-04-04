import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import NavbarMenu from '../components/NavbarMenu';

describe('Navbar component', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
  });

  it('Navbar renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('NavbarMenu renders without crashing', () => {
    const { getByText } = render(<NavbarMenu itemsLeft={[]} itemsRight={[]} />);
    expect(getByText).toBeTruthy();
  });

  it('updates hoverIndex and popoverPosition on mouse enter', async () => {
    const { findAllByText, findByText } = component;
    const menuItem = await findAllByText('Maps');
    fireEvent.mouseEnter(menuItem[0]);
    expect(await findByText('Snapshot SST')).toBeInTheDocument();
  });
});
