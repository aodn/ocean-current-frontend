import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ChildProductID } from '@/types/product';
import SubProductOptions from './SubProductOptions';

const WAVE_KEY = 'surfaceWaves-wave' as ChildProductID;
const BUOY_KEY = 'surfaceWaves-buoyTimeseries' as ChildProductID;

const subProducts = [
  { key: WAVE_KEY, title: 'Map', path: 'wave' },
  { key: BUOY_KEY, title: 'Buoy Timeseries', path: 'buoy-timeseries' },
];

const handleChange = vi.fn();

const waveButton = () => screen.getByRole('button', { name: 'Map' });
const buoyButton = () => screen.getByRole('button', { name: 'Buoy Timeseries' });

describe('SubProductOptions', () => {
  afterEach(() => vi.clearAllMocks());

  it('renders all sub-product buttons', () => {
    render(
      <SubProductOptions subProducts={subProducts} subProductKey={WAVE_KEY} handleSubProductChange={handleChange} />,
    );
    expect(waveButton()).toBeInTheDocument();
    expect(buoyButton()).toBeInTheDocument();
  });

  it('all buttons are enabled by default', () => {
    render(
      <SubProductOptions subProducts={subProducts} subProductKey={WAVE_KEY} handleSubProductChange={handleChange} />,
    );
    expect(waveButton()).not.toBeDisabled();
    expect(buoyButton()).not.toBeDisabled();
  });

  it('global disabled prop disables every button', () => {
    render(
      <SubProductOptions
        subProducts={subProducts}
        subProductKey={WAVE_KEY}
        handleSubProductChange={handleChange}
        disabled
      />,
    );
    expect(waveButton()).toBeDisabled();
    expect(buoyButton()).toBeDisabled();
  });

  it('disabledKeys disables only the matching button', () => {
    render(
      <SubProductOptions
        subProducts={subProducts}
        subProductKey={WAVE_KEY}
        handleSubProductChange={handleChange}
        disabledKeys={[BUOY_KEY]}
      />,
    );
    expect(waveButton()).not.toBeDisabled();
    expect(buoyButton()).toBeDisabled();
  });

  it('disabledKeys does not disable buttons not in the list', () => {
    render(
      <SubProductOptions
        subProducts={subProducts}
        subProductKey={WAVE_KEY}
        handleSubProductChange={handleChange}
        disabledKeys={[BUOY_KEY]}
      />,
    );
    expect(waveButton()).not.toBeDisabled();
  });

  it('global disabled combined with disabledKeys disables all buttons', () => {
    render(
      <SubProductOptions
        subProducts={subProducts}
        subProductKey={WAVE_KEY}
        handleSubProductChange={handleChange}
        disabled
        disabledKeys={[WAVE_KEY]}
      />,
    );
    expect(waveButton()).toBeDisabled();
    expect(buoyButton()).toBeDisabled();
  });

  it('clicking an enabled button calls handleSubProductChange with the correct key and path', async () => {
    render(
      <SubProductOptions
        subProducts={subProducts}
        subProductKey={WAVE_KEY}
        handleSubProductChange={handleChange}
        disabledKeys={[BUOY_KEY]}
      />,
    );
    await userEvent.click(waveButton());
    expect(handleChange).toHaveBeenCalledWith(WAVE_KEY, 'wave');
  });

  it('clicking a disabled button does not call handleSubProductChange', async () => {
    render(
      <SubProductOptions
        subProducts={subProducts}
        subProductKey={WAVE_KEY}
        handleSubProductChange={handleChange}
        disabledKeys={[BUOY_KEY]}
      />,
    );
    await userEvent.click(buoyButton());
    expect(handleChange).not.toHaveBeenCalled();
  });
});
