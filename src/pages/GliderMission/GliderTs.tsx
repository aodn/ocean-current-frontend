import { Link, useLocation, useSearchParams } from 'react-router';
import dayjs from 'dayjs';
import useGliderTs from '@/services/hooks/useGliderTs';
import type { GliderTsDiagram } from '@/types/gliders';
import { GLIDERS_DEPLOYMENTS_URL, getGlidersReturnTo } from '@/utils/gliders-map-utils/deployments';

const linkClass = 'text-imos-calypso-blue! rounded-md px-3 py-2 underline focus-visible:outline-2';

export function GliderTsNavigation({ previous, next }: { previous?: string; next?: string }) {
  const { state } = useLocation();
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
      <Link className={linkClass} state={state} to="/product/gliders?view=ts-index">
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
  const dateText = [digits.slice(-8), digits.slice(0, 8)].find((text) =>
    /^20\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/.test(text),
  );
  return {
    name: id.slice(3),
    platform: id.startsWith('sg_') ? 'Seaglider' : 'Slocum',
    date: dateText ? dayjs(dateText, 'YYYYMMDD') : undefined,
    mode: id.endsWith('_nrt') ? 'NRT' : 'Delayed',
  };
}

const filters = [
  { key: 'year', label: 'Year' },
  { key: 'platform', label: 'Glider type' },
  { key: 'mode', label: 'Data mode' },
] as const;

export default function GliderTsIndex() {
  const { diagrams, getDiagramUrl, isPending, isError, refetch } = useGliderTs();
  const { state } = useLocation();
  const [params, setParams] = useSearchParams();
  const back = getGlidersReturnTo(state) ?? GLIDERS_DEPLOYMENTS_URL;
  const rows = diagrams.map((diagram) => {
    const row = describeTsDiagram(diagram);
    return { diagram, ...row, year: row.date ? String(row.date.year()) : '' };
  });
  const options = {
    year: [...new Set(rows.map(({ year }) => year).filter(Boolean))].sort().reverse(),
    platform: ['Slocum', 'Seaglider'],
    mode: ['NRT', 'Delayed'],
  };
  const visible = rows.filter((row) => filters.every(({ key }) => !params.get(key) || row[key] === params.get(key)));
  const setFilter = (key: string, value: string) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set(key, value);
        else next.delete(key);
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
          <div className="border-imos-light-blue flex flex-wrap items-center gap-3 border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <h1 className="m-0 text-base font-semibold">T-S diagram index</h1>
              <span className="bg-imos-light-blue text-imos-deeper-blue rounded-full px-2 py-0.5 text-xs font-medium tabular-nums">
                {visible.length} {visible.length === 1 ? 'diagram' : 'diagrams'}
              </span>
            </div>
            <div className="flex w-full flex-wrap items-center gap-2 sm:ml-auto sm:w-auto">
              {filters.map(({ key, label }) => (
                <label
                  key={key}
                  className="border-imos-calypso-blue/50 flex h-10 grow items-center gap-2 rounded-md border px-3 sm:grow-0"
                >
                  <span className="text-imos-text-grey text-sm">{label}</span>
                  <select
                    value={params.get(key) ?? ''}
                    onChange={(event) => setFilter(key, event.target.value)}
                    className="h-full cursor-pointer bg-transparent"
                  >
                    <option value="">All</option>
                    {options[key].map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </div>
          {visible.length === 0 ? (
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
