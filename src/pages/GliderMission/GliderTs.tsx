import { Link, useLocation, useSearchParams } from 'react-router';
import dayjs from 'dayjs';
import GliderFilterMenu from '@/components/GliderFilterMenu/GliderFilterMenu';
import { DataIcon, GlidersIcon } from '@/components/Shared/Icons';
import '@/configs/dayjs';
import { copyGliderTsIndexFilters } from '@/utils/gliders-map-utils/links';
import useGliderTs from '@/services/hooks/useGliderTs';
import type { GliderTsDiagram } from '@/types/gliders';
import { GLIDERS_DEPLOYMENTS_URL, getGlidersReturnTo } from '@/utils/gliders-map-utils/deployments';

const linkClass = 'text-imos-calypso-blue! rounded-md px-3 py-2 underline focus-visible:outline-2';

export function GliderTsNavigation({ previous, next }: { previous?: string; next?: string }) {
  const { state } = useLocation();
  const [params] = useSearchParams();
  const indexParams = copyGliderTsIndexFilters(params, new URLSearchParams({ view: 'ts-index' }));
  return (
    <nav
      aria-label="T-S diagram navigation"
      className="flex min-h-11 flex-wrap items-center gap-4 rounded-md bg-white px-3"
    >
      {previous && (
        <Link className={linkClass} state={state} to={previous}>
          Previous
        </Link>
      )}
      {next && (
        <Link className={linkClass} state={state} to={next}>
          Next
        </Link>
      )}
      <Link className={linkClass} state={state} to={`/product/gliders?${indexParams}`}>
        T-S index
      </Link>
    </nav>
  );
}

/**
 * Reads platform, deployment date and data mode from legacy names such as `sl_TwoRocks20261028_nrt`.
 * Irregular names (for example `sg_Perth20110626_1`) keep their name; an unreadable date stays empty.
 */
export function describeTsDiagram({ id }: GliderTsDiagram) {
  // Some names add a digit before or after the date (`sl_Forster120230714`, `sg_Bremer201703011`).
  const digits = id.match(/\d{8,}/)?.[0] ?? '';
  const date = [digits.slice(-8), digits.slice(0, 8)]
    .filter((text) => /^20\d{6}$/.test(text))
    .map((text) => dayjs(text, 'YYYYMMDD', true))
    .find((candidate) => candidate.isValid());
  return {
    name: id.slice(3),
    platform: id.startsWith('sg_') ? 'Seaglider' : 'Slocum',
    date,
    mode: id.endsWith('_nrt') ? 'NRT' : 'Delayed',
  };
}

const platforms = [
  { id: '', label: 'All types' },
  { id: 'Slocum', label: 'Slocum' },
  { id: 'Seaglider', label: 'Seaglider' },
];
const modes = [
  { id: '', label: 'All modes' },
  { id: 'NRT', label: 'NRT' },
  { id: 'Delayed', label: 'Delayed' },
];

export default function GliderTsIndex() {
  const { diagrams, getDiagramUrl, isPending, isError, refetch } = useGliderTs();
  const { state } = useLocation();
  const [params, setParams] = useSearchParams();
  const back = getGlidersReturnTo(state) ?? GLIDERS_DEPLOYMENTS_URL;
  const platform = params.get('platform') ?? '';
  const mode = params.get('mode') ?? '';
  const rows = diagrams.map((diagram) => ({ diagram, ...describeTsDiagram(diagram) }));
  const dateFormat = 'YYYY-MM-DD';
  const startDate = params.get('startDate') ?? '';
  const endDate = params.get('endDate') ?? '';
  const invalidStart = !!startDate && !dayjs(startDate, dateFormat, true).isValid();
  const invalidEnd = !!endDate && !dayjs(endDate, dateFormat, true).isValid();
  const reversed = !!startDate && !!endDate && startDate > endDate;
  const dateError =
    invalidStart || invalidEnd
      ? 'Enter valid deployment dates.'
      : reversed
        ? 'The start date must be on or before the end date.'
        : undefined;
  const visible = rows.filter((row) => {
    if ((platform && row.platform !== platform) || (mode && row.mode !== mode)) return false;
    if (!startDate && !endDate) return true;
    const date = row.date?.format(dateFormat);
    return !!date && (!startDate || date >= startDate) && (!endDate || date <= endDate);
  });
  const updateFilters = (values: Record<string, string>) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        for (const [key, value] of Object.entries(values)) {
          if (value) next.set(key, value);
          else next.delete(key);
        }
        return next;
      },
      { replace: true, state },
    );

  return (
    <section className="font-open-sans text-imos-dark-grey min-w-0">
      <Link className={`${linkClass} mb-2 inline-block bg-white`} to={back}>
        Back to deployments
      </Link>
      {isPending ? (
        <p role="status">Loading T-S index…</p>
      ) : isError ? (
        <div role="alert">
          Unable to load T-S index.{' '}
          <button type="button" onClick={() => void refetch()}>
            Try again
          </button>
        </div>
      ) : (
        <div className="border-imos-pale-blue w-full min-w-0 rounded-md border bg-white">
          <div className="border-imos-light-blue flex flex-wrap items-center justify-between gap-x-2 gap-y-2 border-b px-2 py-2">
            <div className="flex shrink-0 items-center gap-1.5">
              <h1 className="m-0 text-sm font-semibold">T-S diagram index</h1>
              {!dateError && (
                <span className="bg-imos-light-blue text-imos-deeper-blue rounded-full px-2 py-0.5 text-xs font-medium tabular-nums">
                  {visible.length} {visible.length === 1 ? 'diagram' : 'diagrams'}
                </span>
              )}
            </div>
            <div className="flex min-w-0 flex-wrap items-center gap-1.5">
              <GliderFilterMenu
                compact
                label="Glider type"
                icon={GlidersIcon}
                elements={platforms}
                value={platform}
                onChange={(value) => updateFilters({ platform: value })}
              />
              <GliderFilterMenu
                compact
                label="Data mode"
                icon={DataIcon}
                elements={modes}
                value={mode}
                onChange={(value) => updateFilters({ mode: value })}
              />
              <div role="group" aria-label="Deployment date" className="flex min-w-0 flex-wrap items-center gap-1.5">
                {[
                  { key: 'startDate', label: 'From', value: startDate, invalid: invalidStart },
                  { key: 'endDate', label: 'To', value: endDate, invalid: invalidEnd },
                ].map(({ key, label, value, invalid }) => (
                  <label key={key} className="flex min-w-0 flex-wrap items-center gap-1 text-sm">
                    {label}
                    <input
                      type="date"
                      value={invalid ? '' : value}
                      aria-invalid={invalid || (!!dateError && reversed)}
                      aria-describedby={dateError ? 'ts-date-error' : undefined}
                      onChange={(event) => updateFilters({ [key]: event.target.value })}
                      className="border-imos-calypso-blue/50 h-9 w-[7.5rem] max-w-full rounded-md border px-1"
                    />
                  </label>
                ))}
                <button
                  type="button"
                  aria-label="Clear dates"
                  disabled={!params.has('startDate') && !params.has('endDate')}
                  onClick={() => updateFilters({ startDate: '', endDate: '' })}
                  className="text-imos-calypso-blue min-h-9 rounded-md px-2 text-sm underline disabled:opacity-50"
                >
                  Clear
                </button>
              </div>
            </div>
            {dateError && (
              <p id="ts-date-error" role="alert" className="w-full text-sm">
                {dateError}
              </p>
            )}
          </div>
          {dateError ? null : visible.length === 0 ? (
            <p role="status" className="m-0 px-4 py-6 text-sm">
              No T-S diagrams match the selected filters.
            </p>
          ) : (
            <div
              role="region"
              aria-label="T-S diagram table"
              className="max-h-[60vh] max-w-full overflow-auto rounded-b-md"
            >
              <table className="[&_td]:border-imos-light-blue [&_th]:border-imos-light-blue w-full border-separate border-spacing-0 text-center text-sm whitespace-nowrap [&_td]:border-b [&_td]:px-4 [&_td]:py-2.5 [&_th]:border-b [&_th]:px-4 [&_th]:py-2.5">
                <caption className="sr-only">Temperature–salinity diagrams in legacy index order</caption>
                <thead className="text-imos-deeper-blue bg-imos-cloud-tint text-xs">
                  <tr>
                    {['Mission', 'Deployment date', 'Glider type', 'Data mode'].map((column, index) => (
                      <th
                        key={column}
                        scope="col"
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
                  {visible.map(({ diagram, name, date, platform, mode }) => (
                    <tr
                      key={diagram.id}
                      className="group hover:bg-imos-cloud-tint [&:last-child>td]:border-b-0 [&:last-child>th]:border-b-0"
                    >
                      <th
                        scope="row"
                        className="border-r-imos-light-blue! group-hover:bg-imos-cloud-tint sticky left-0 z-10 border-r! bg-white font-medium"
                      >
                        <Link
                          className={`${linkClass} p-0!`}
                          state={state}
                          to={getDiagramUrl(diagram)}
                          aria-label={`View ${diagram.id} temperature–salinity diagram`}
                        >
                          {name}
                        </Link>
                      </th>
                      <td className="tabular-nums">{date ? date.format('DD MMM YYYY') : '—'}</td>
                      <td>{platform}</td>
                      <td>{mode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
