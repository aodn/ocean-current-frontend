import { Fragment } from 'react';
import { useSearchParams } from 'react-router';
import dayjs from 'dayjs';
import NewTabLink from '@/components/Shared/NewTabLink/NewTabLink';
import { resolveGliderResourceUrl } from '@/utils/gliders-map-utils/catalogue';
import type { GliderMission, GliderProductLink } from '@/types/gliders';

const formatDate = (date?: string | null) => (date && dayjs(date).isValid() ? dayjs(date).format('DD MMM YYYY') : '—');
const formatCoordinate = (value: number | null | undefined, positive: string, negative: string) =>
  value == null ? '—' : `${Math.abs(value)}° ${value < 0 ? negative : positive}`;

const ProductLink = ({ url, label }: { url?: string | null; label: string }) => {
  const href = resolveGliderResourceUrl(url);
  return href ? (
    <NewTabLink href={href} className="underline">
      {label}
    </NewTabLink>
  ) : (
    <>—</>
  );
};

const WindowLinks = ({
  links,
  onSelect,
}: {
  links?: GliderProductLink[] | null;
  onSelect?: (window: string) => void;
}) => {
  const published = (links ?? []).filter(({ label, url }) => label && resolveGliderResourceUrl(url));
  if (!published.length) return <>—</>;
  return (
    <>
      {published.map(({ label, url }, index) => (
        <Fragment key={`${label}:${url}`}>
          {index > 0 && ' / '}
          {onSelect ? (
            <button
              type="button"
              className="text-imos-sea-blue cursor-pointer rounded underline focus-visible:outline-2"
              onClick={() => onSelect(`${label}d`)}
            >
              {label}
            </button>
          ) : (
            <ProductLink url={url} label={label} />
          )}
        </Fragment>
      ))}
    </>
  );
};

const GlidersTable = ({
  missions,
  onSelect,
}: {
  missions: GliderMission[];
  onSelect: (mission: GliderMission, window?: string) => void;
}) => {
  const [params, setParams] = useSearchParams();
  const sort = params.get('sort') ?? 'date-desc';
  const byName = sort.startsWith('name');
  const ascending = sort.endsWith('asc');
  const sorted = [...missions].sort((a, b) => {
    // Unknown deployment dates always follow dated missions, in either direction.
    if (!byName && Boolean(a.start_date) !== Boolean(b.start_date)) return a.start_date ? -1 : 1;
    const order = byName
      ? a.mission_name.localeCompare(b.mission_name)
      : (a.start_date ?? '').localeCompare(b.start_date ?? '');
    return (ascending ? order : -order) || a.mission_name.localeCompare(b.mission_name);
  });

  return (
    <>
      <label className="text-imos-dark-grey mb-2 flex items-center gap-2 text-sm">
        Sort by
        <select
          aria-label="Sort deployments"
          className="rounded border bg-white p-2"
          value={sort}
          onChange={(event) => {
            const next = new URLSearchParams(params);
            next.set('sort', event.target.value);
            setParams(next, { replace: true });
          }}
        >
          <option value="date-desc">Deployment date (newest first)</option>
          <option value="date-asc">Deployment date (oldest first)</option>
          <option value="name-asc">Mission name (A–Z)</option>
          <option value="name-desc">Mission name (Z–A)</option>
        </select>
      </label>
      {missions.length === 0 ? (
        <p role="status">No deployments are available for the selected year and glider type.</p>
      ) : (
        <div role="region" aria-label="Gliders deployment table" className="overflow-x-auto rounded-md bg-white">
          <table className="text-imos-dark-grey w-full border-collapse text-left text-sm whitespace-nowrap [&_td]:px-3 [&_td]:py-2 [&_th]:px-3 [&_th]:py-2">
            <caption className="sr-only">Deployments for the selected year and glider type</caption>
            <thead className="bg-imos-light-blue">
              <tr>
                {[
                  'Mission',
                  'Dates',
                  'Latitude',
                  'Longitude',
                  'Days',
                  'Distance (km)',
                  'Glider',
                  'Processing version',
                  'T-S',
                  'Details',
                  'Animation',
                  'Scientific data',
                ].map((column, index) => (
                  <th
                    key={column}
                    scope="col"
                    className={index === 0 ? 'bg-imos-light-blue sticky left-0 z-10' : undefined}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((mission) => (
                <tr key={mission.id} className="border-imos-light-blue border-b last:border-b-0">
                  <th scope="row" className="sticky left-0 bg-white font-normal">
                    <button
                      type="button"
                      onClick={() => onSelect(mission)}
                      className="text-imos-calypso-blue cursor-pointer rounded text-left underline focus-visible:outline-2"
                    >
                      {mission.mission_name}
                    </button>
                  </th>
                  <td>
                    {mission.start_date || mission.end_date
                      ? `${formatDate(mission.start_date)} – ${formatDate(mission.end_date)}`
                      : '—'}
                  </td>
                  <td>{formatCoordinate(mission.latitude, 'N', 'S')}</td>
                  <td>{formatCoordinate(mission.longitude, 'E', 'W')}</td>
                  <td>{mission.duration_days ?? '—'}</td>
                  <td>{mission.distance_travelled_km ?? '—'}</td>
                  <td>{mission.glider_id || '—'}</td>
                  <td>{mission.processing_version || '—'}</td>
                  <td>
                    <ProductLink url={mission.temperature_salinity_url} label="T-S" />
                  </td>
                  <td>
                    <WindowLinks
                      links={mission.visualisations.details}
                      onSelect={(window) => onSelect(mission, window)}
                    />
                  </td>
                  <td>
                    <WindowLinks links={mission.visualisations.animations} />
                  </td>
                  <td>
                    <ProductLink url={mission.scientific_data_url} label="Scientific data" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default GlidersTable;
