import { Fragment } from 'react';
import { useSearchParams } from 'react-router';
import dayjs from 'dayjs';
import { Dropdown } from '@/components/Shared';
import NewTabLink from '@/components/Shared/NewTabLink/NewTabLink';
import { resolveGliderResourceUrl } from '@/utils/gliders-map-utils/catalogue';
import { GLIDER_TS_VIEW } from '@/services/hooks/useGliderMission';
import type { GliderMission, GliderProductLink } from '@/types/gliders';

const formatDate = (date?: string | null) => (date && dayjs(date).isValid() ? dayjs(date).format('DD MMM YYYY') : '—');
const formatCoordinate = (value: number | null | undefined, positive: string, negative: string) =>
  value == null ? '—' : `${Math.abs(value)}° ${value < 0 ? negative : positive}`;

const linkClass =
  'text-imos-calypso-blue! rounded-sm underline decoration-imos-calypso-blue/40 underline-offset-2 hover:text-imos-deeper-blue! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-imos-calypso-blue';

const sortOptions = [
  { id: 'date-desc', label: 'Newest deployment' },
  { id: 'date-asc', label: 'Oldest deployment' },
  { id: 'name-asc', label: 'Mission name (A–Z)' },
  { id: 'name-desc', label: 'Mission name (Z–A)' },
];

const ProductLink = ({ url, label, ariaLabel }: { url?: string | null; label: string; ariaLabel?: string }) => {
  const href = resolveGliderResourceUrl(url);
  return href ? (
    <NewTabLink href={href} className={linkClass} aria-label={ariaLabel}>
      {label}
    </NewTabLink>
  ) : (
    <span className="text-imos-subheading-grey">—</span>
  );
};

const WindowLinks = ({
  links,
  onSelect,
  latestImages,
}: {
  links?: GliderProductLink[] | null;
  onSelect?: (window: string) => void;
  latestImages?: GliderMission['visualisations']['latest_images'];
}) => {
  const published = (links ?? []).filter(({ label, url }) => label && resolveGliderResourceUrl(url));
  if (!published.length) return <span className="text-imos-subheading-grey">—</span>;
  return (
    <span
      role="group"
      aria-label={onSelect ? 'Mission images' : 'Animations'}
      className="inline-flex items-center gap-1 whitespace-nowrap tabular-nums"
    >
      {published.map(({ label, url }, index) => (
        <Fragment key={`${label}:${url}`}>
          {index > 0 && (
            <span aria-hidden="true" className="text-imos-light-grey">
              {' '}
              /{' '}
            </span>
          )}
          {onSelect ? (
            <button
              type="button"
              className={`${linkClass} enabled:hover:bg-imos-light-blue disabled:text-imos-grey! cursor-pointer p-0 disabled:cursor-not-allowed disabled:no-underline`}
              aria-label={`View ${label}-day mission image`}
              disabled={latestImages != null && !latestImages[`${label}d`]}
              title={latestImages != null && !latestImages[`${label}d`] ? 'Image unavailable' : undefined}
              onClick={() => onSelect(`${label}d`)}
            >
              {label}
            </button>
          ) : (
            <ProductLink url={url} label={label} ariaLabel={`View ${label}-day animation`} />
          )}
        </Fragment>
      ))}
    </span>
  );
};

const TemperatureSalinityButton = ({ mission, onSelect }: { mission: GliderMission; onSelect: () => void }) => {
  if (!mission.temperature_salinity_url) return <span className="text-imos-subheading-grey">—</span>;
  const unavailable = !mission.visualisations.temperature_salinity_image;
  return (
    <button
      type="button"
      className={`${linkClass} enabled:hover:bg-imos-light-blue disabled:text-imos-grey! cursor-pointer p-0 disabled:cursor-not-allowed disabled:no-underline`}
      aria-label={`View ${mission.mission_name} temperature–salinity diagram`}
      disabled={unavailable}
      title={unavailable ? 'Diagram unavailable' : undefined}
      onClick={onSelect}
    >
      T-S
    </button>
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
    <section
      aria-label="Deployments"
      className="font-open-sans border-imos-pale-blue text-imos-dark-grey w-full min-w-0 rounded-md border bg-white"
    >
      <div className="border-imos-light-blue flex flex-wrap items-center gap-3 border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <h2 className="m-0 text-base font-semibold">Deployments</h2>
          <span className="bg-imos-light-blue text-imos-deeper-blue rounded-full px-2 py-0.5 text-xs font-medium tabular-nums">
            {missions.length} {missions.length === 1 ? 'mission' : 'missions'}
          </span>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2 sm:ml-auto sm:w-auto">
          <span className="text-imos-text-grey text-sm">Sort by</span>
          <div className="h-10 min-w-0 grow basis-56 sm:w-56 sm:grow-0">
            <Dropdown
              ariaLabel="Sort deployments"
              elements={sortOptions}
              selectedId={sort}
              onChange={({ id }) => {
                const next = new URLSearchParams(params);
                next.set('sort', id);
                setParams(next, { replace: true });
              }}
            />
          </div>
        </div>
      </div>
      {missions.length === 0 ? (
        <p role="status" className="m-0 px-4 py-6 text-sm">
          No deployments are available for the selected year and glider type.
        </p>
      ) : (
        <div
          role="region"
          aria-label="Gliders deployment table"
          className="max-h-[60vh] max-w-full overflow-auto rounded-b-md"
        >
          <table className="[&_td]:border-imos-light-blue [&_th]:border-imos-light-blue w-full border-separate border-spacing-0 text-center text-sm whitespace-nowrap [&_td]:border-b [&_td]:px-4 [&_td]:py-2.5 [&_th]:border-b [&_th]:px-4 [&_th]:py-2.5">
            <caption className="sr-only">Deployments for the selected year and glider type</caption>
            <thead className="text-imos-deeper-blue bg-imos-cloud-tint text-xs">
              <tr>
                {[
                  'Mission',
                  'Dates',
                  'Latitude',
                  'Longitude',
                  'Days',
                  'Distance (km)',
                  'Glider',
                  'Version',
                  'T-S',
                  'Details',
                  'Animation',
                  'Scientific data',
                ].map((column, index) => (
                  <th
                    key={column}
                    scope="col"
                    aria-label={column === 'Version' ? 'Processing version' : undefined}
                    title={column === 'Version' ? 'Processing version' : undefined}
                    className={
                      index === 0
                        ? 'bg-imos-cloud-tint border-r-imos-pale-blue! sticky top-0 left-0 z-30 min-w-40 border-r! sm:min-w-56'
                        : 'bg-imos-cloud-tint sticky top-0 z-20'
                    }
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((mission) => (
                <tr
                  key={mission.id}
                  className="group hover:bg-imos-cloud-tint [&:last-child>td]:border-b-0 [&:last-child>th]:border-b-0"
                >
                  <th
                    scope="row"
                    className="border-r-imos-light-blue! group-hover:bg-imos-cloud-tint sticky left-0 z-10 border-r! bg-white font-medium"
                  >
                    <button
                      type="button"
                      onClick={() => onSelect(mission)}
                      className={`${linkClass} mx-auto block max-w-36 cursor-pointer text-center break-all whitespace-normal sm:max-w-72`}
                    >
                      {mission.mission_name}
                    </button>
                  </th>
                  <td className="min-w-60 tabular-nums">
                    {mission.start_date || mission.end_date
                      ? `${formatDate(mission.start_date)} – ${formatDate(mission.end_date)}`
                      : '—'}
                  </td>
                  <td className="tabular-nums">{formatCoordinate(mission.latitude, 'N', 'S')}</td>
                  <td className="tabular-nums">{formatCoordinate(mission.longitude, 'E', 'W')}</td>
                  <td className="tabular-nums">{mission.duration_days ?? '—'}</td>
                  <td className="tabular-nums">{mission.distance_travelled_km ?? '—'}</td>
                  <td>{mission.glider_id || '—'}</td>
                  <td className="tabular-nums">{mission.processing_version || '—'}</td>
                  <td>
                    <TemperatureSalinityButton mission={mission} onSelect={() => onSelect(mission, GLIDER_TS_VIEW)} />
                  </td>
                  <td>
                    <WindowLinks
                      links={mission.visualisations.details}
                      latestImages={mission.visualisations.latest_images}
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
    </section>
  );
};

export default GlidersTable;
