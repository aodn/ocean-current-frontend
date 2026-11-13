import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GliderTypeSelect from './GliderTypeSelect';

it('selects another type with the mouse, closes the menu and restores focus', async () => {
  const onChange = vi.fn();
  render(<GliderTypeSelect platforms={['sl', 'sg']} value="sl" onChange={onChange} />);
  await userEvent.click(screen.getByRole('button', { name: 'Glider type' }));
  await userEvent.click(screen.getByText('Seaglider'));
  expect(onChange).toHaveBeenCalledWith('sg');
  expect(screen.queryByRole('menuitemradio')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Glider type' })).toHaveFocus();
});

it('closes the menu when clicking outside', async () => {
  render(<GliderTypeSelect platforms={['sl', 'sg']} value="sl" onChange={vi.fn()} />);
  await userEvent.click(screen.getByRole('button', { name: 'Glider type' }));
  await userEvent.click(document.body);
  expect(screen.queryByRole('menuitemradio')).not.toBeInTheDocument();
});

it.each(['sl', 'sg'] as const)('exposes the current type when the single option is disabled: %s', (value) => {
  render(<GliderTypeSelect platforms={[value]} value={value} onChange={vi.fn()} />);
  const button = screen.getByRole('button', { name: 'Glider type' });
  expect(button).toBeDisabled();
  expect(button).toHaveAccessibleDescription(value === 'sl' ? 'Slocum' : 'Seaglider');
});
