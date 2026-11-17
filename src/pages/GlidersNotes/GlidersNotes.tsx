import { Link, useLocation } from 'react-router';
import { ArticleCard } from '@/components/Shared';
import NewTabLink from '@/components/Shared/NewTabLink/NewTabLink';
import { GLIDERS_DEPLOYMENTS_URL, getGlidersReturnTo } from '@/utils/gliders-map-utils/deployments';

const headingClass = 'text-imos-deep-blue mb-2 text-lg font-semibold';

const revisions = [
  ['2025', 'Adjusted the colour scales for selected missions to make heatwaves and fresh surface water easier to see.'],
  ['2024', 'Improved GPS-based velocity estimates and corrected missing or implausible mission distances.'],
  ['2019', 'Automated delayed-mode data checks and widened the plotted oxygen saturation range.'],
  ['2018', 'Added surface current estimates from satellite altimetry to mission plots.'],
  ['2017', 'Added temperature and salinity anomalies relative to CARS2009 and introduced 30-day mission plots.'],
  [
    '2016',
    'Separated near-real-time and quality-controlled delayed-mode plots and displayed oxygen as percent saturation.',
  ],
  ['2015', 'Replotted the archive and corrected an issue that prevented 2015 observations from appearing.'],
  [
    '2014',
    'Released the initial mission plots and introduced continuing updates for Seaglider and Slocum deployments.',
  ],
];

const resources = [
  ['IMOS Ocean Gliders', 'https://imos.org.au/facility/ocean-gliders'],
  ['AODN THREDDS glider data catalogue', 'https://thredds.aodn.org.au/thredds/catalog/IMOS/ANFOG/catalog.html'],
  ['Event Based Sampling programme', 'https://imos.org.au/facility/ocean-gliders/event-based-sampling'],
];

export default function GlidersNotes() {
  const { state } = useLocation();
  const back = getGlidersReturnTo(state) ?? GLIDERS_DEPLOYMENTS_URL;

  return (
    <ArticleCard title="Gliders notes and resources">
      <div className="font-open-sans text-imos-dark-grey mx-auto max-w-3xl space-y-6">
        <Link className="text-imos-sea-blue underline" to={back}>
          Back to deployments
        </Link>
        <section>
          <h2 className={headingClass}>About ocean gliders</h2>
          <p>
            Ocean gliders collect observations as they repeatedly dive and surface. They change their buoyancy to move
            up and down and use wings to travel through the water. In the deployments shown here, Seagliders are used
            for deep offshore missions and Slocum gliders typically survey the continental shelf.
          </p>
        </section>
        <section>
          <h2 className={headingClass}>Understanding the plots</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Annual overviews</strong> show where and when missions took place and the depth range of the
              observations.
            </li>
            <li>
              <strong>Temperature–salinity diagrams</strong> show how temperature and salinity vary together, with
              colours indicating depth. The climatological reference helps identify unusual observations or possible
              calibration issues.
            </li>
            <li>
              <strong>Mission profiles</strong> show the glider track alongside measurements by time and depth. The 4,
              12 and 30-day windows show different lengths of the same mission record.
            </li>
          </ul>
        </section>
        <section>
          <h2 className={headingClass}>Revision history</h2>
          <ul className="list-disc space-y-2 pl-5">
            {revisions.map(([year, description]) => (
              <li key={year}>
                <strong>{year}</strong> — {description}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className={headingClass}>Historical data notes</h2>
          <p>
            The 2014 notes documented salinity calibration problems in some missions, GPS position errors that escaped
            quality checks, and missing velocity and heading data in 2014 near-real-time Slocum files. In 2024,
            estimates of velocity over ground were revised to account for problems with interpolated positions near the
            surface.
          </p>
          <p className="mt-2 text-sm">Adapted from the original IMOS OceanCurrent Gliders notes.</p>
        </section>
        <section>
          <h2 className={headingClass}>Resources</h2>
          <ul className="list-disc space-y-2 pl-5">
            {resources.map(([label, href]) => (
              <li key={href}>
                <NewTabLink className="underline" href={href}>
                  {label}
                </NewTabLink>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </ArticleCard>
  );
}
