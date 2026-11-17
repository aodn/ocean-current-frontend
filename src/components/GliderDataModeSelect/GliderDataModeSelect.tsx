import GliderFilterMenu from '@/components/GliderFilterMenu/GliderFilterMenu';
import { DataIcon } from '@/components/Shared/Icons';
import type { GliderDataMode } from '@/types/gliders';

const elements = [
  { id: 'nrt', label: 'NRT' },
  { id: 'delayed', label: 'Delayed' },
] as const;

const GliderDataModeSelect = ({
  value,
  onChange,
}: {
  value: GliderDataMode;
  onChange: (mode: GliderDataMode) => void;
}) => <GliderFilterMenu label="Data mode" icon={DataIcon} elements={elements} value={value} onChange={onChange} />;

export default GliderDataModeSelect;
