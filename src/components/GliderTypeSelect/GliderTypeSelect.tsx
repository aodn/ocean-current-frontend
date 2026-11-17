import GliderFilterMenu from '@/components/GliderFilterMenu/GliderFilterMenu';
import { GlidersIcon } from '@/components/Shared/Icons';
import type { GliderYearmap } from '@/types/gliders';

type Platform = GliderYearmap['platform'];

const GliderTypeSelect = ({
  platforms,
  value,
  onChange,
}: {
  platforms: Platform[];
  value: Platform;
  onChange: (platform: Platform) => void;
}) => (
  <GliderFilterMenu
    label="Glider type"
    icon={GlidersIcon}
    elements={platforms.map((id) => ({ id, label: id === 'sl' ? 'Slocum' : 'Seaglider' }))}
    value={value}
    onChange={onChange}
  />
);

export default GliderTypeSelect;
