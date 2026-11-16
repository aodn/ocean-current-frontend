import { Link, useLocation } from 'react-router';
import useGliderTs from '@/services/hooks/useGliderTs';
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

export default function GliderTsIndex() {
  const { diagrams, getDiagramUrl, isPending, isError, refetch } = useGliderTs();
  const { state } = useLocation();
  const back = getGlidersReturnTo(state) ?? GLIDERS_DEPLOYMENTS_URL;
  return (
    <section className="font-open-sans text-imos-dark-grey rounded-md bg-white p-4">
      <Link className={linkClass} to={back}>
        Back to deployments
      </Link>
      <h1 className="my-3 text-xl font-semibold">T-S diagram index</h1>
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
        <ul>
          {diagrams.map((diagram) => (
            <li key={diagram.id} className="my-2 break-all">
              <Link className={linkClass} state={state} to={getDiagramUrl(diagram)}>
                {diagram.id}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
