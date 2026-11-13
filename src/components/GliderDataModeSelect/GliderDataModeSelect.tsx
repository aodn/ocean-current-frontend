import type { GliderDataMode } from '@/types/gliders';

const GliderDataModeSelect = ({
  value,
  onChange,
}: {
  value: GliderDataMode;
  onChange: (mode: GliderDataMode) => void;
}) => (
  <label className="border-imos-calypso-blue/50 flex h-11 items-center gap-2 rounded-md border bg-white px-3">
    <span>Data mode</span>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value === 'delayed' ? 'delayed' : 'nrt')}
      className="h-full cursor-pointer bg-transparent"
    >
      <option value="nrt">NRT</option>
      <option value="delayed">Delayed</option>
    </select>
  </label>
);

export default GliderDataModeSelect;
