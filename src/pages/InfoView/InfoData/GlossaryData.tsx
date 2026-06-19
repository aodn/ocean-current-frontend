// Glossary of oceanographic terminology, techniques and principles.
// Ported from the legacy glossary.php page. Each term is anchored by `id` so
// other pages can deep-link to a definition (e.g. ArgoAboutData links to
// #synTS). Cross-references between terms use in-page `#id` anchors; links to
// legacy resources/pages are pointed at the new app or the legacy file server.

import React from 'react';

// Legacy file server, source for static assets (images, movies, references)
// that have not been migrated into the new app.
const LEGACY_BASE = 'https://oceancurrent.aodn.org.au';

interface GlossaryTerm {
  // Anchor id used for deep-linking, e.g. /info/glossary#synTS
  id: string;
  term: string;
  definition: () => JSX.Element;
}

const ExternalLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noreferrer noopener" className="text-imos-sea-blue underline">
    {children}
  </a>
);

// In-page jump to another glossary term.
const TermLink: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => (
  <a href={`#${id}`} className="text-imos-sea-blue underline">
    {children}
  </a>
);

const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'altimeter',
    term: 'altimeter',
    definition: () => (
      <>
        <img
          src={`${LEGACY_BASE}/misc/orbit720.gif`}
          alt="Satellite orbit diagram"
          loading="lazy"
          decoding="async"
          className="float-right mb-2 ml-4 max-w-xs"
        />
        <p>
          A satellite altimeter measures the range from the satellite to the sea surface directly below using a very
          precise radar. The orbital position of the satellite is also known very precisely because altimetry satellites
          use a combination of GPS, DORIS and laser ranging to carefully monitor the orbit of the satellite. The
          difference of the range and the orbit is the height (averaged over space - the 2km-radius footprint of the
          radar, and time - 1Hz averages are about 7km apart) of the sea surface (effectively relative to the center of
          the Earth). Amazingly, the <TermLink id="SSH">sea surface height</TermLink> can be determined to centimeter
          accuracy, once a number of corrections are made, e.g. for the wet troposphere path delay, the sea-state bias
          and the instrumental bias. The Topex/Poseidon and Jason missions are in orbits that take 10 days to finish
          re-sampling a criss-crossing pattern of ascending (/) and descending (\) passes sampling ground tracks which
          are about 250km apart at mid-latitudes.{' '}
          <ExternalLink href={`${LEGACY_BASE}/misc/orbit.fli`}>
            [play orbit movie; shows half a 10-d cycle]
          </ExternalLink>
          . The ERS and Envisat ground tracks are about 160km apart at mid-latitudes, but are re-sampled only every 35
          days. The GFO mission is intermediate, with a 17-d repeat cycle.{' '}
          <ExternalLink href={`${LEGACY_BASE}/misc/tr1996.fli`}>
            [play movie of Topex/Poseidon and ERS along-track sea level measurements off WA]
          </ExternalLink>
          . More information:
          <br />
          <ExternalLink href="https://sealevel.jpl.nasa.gov/">Sea Level at NASA JPL</ExternalLink>
          <br />
          <ExternalLink href="https://www.aviso.altimetry.fr/en/home.html">AVISO</ExternalLink>
          <br />
          <ExternalLink href="https://www.star.nesdis.noaa.gov/socd/lsa/">NOAA</ExternalLink>
          <br />
          <ExternalLink href="https://www.eumetsat.int/">EuMetSat</ExternalLink>
          <br />
          <ExternalLink href="https://www.esa.int/">ESA</ExternalLink>
          <br />
          <ExternalLink href="https://www.altimetry.info/">ESA/CNES altimetry tutorial</ExternalLink>
        </p>
      </>
    ),
  },
  {
    id: 'AVHRR',
    term: 'AVHRR',
    definition: () => (
      <p>
        Advanced Very High Resolution Radiometer. A sensor carried by the{' '}
        <ExternalLink href="https://www.noaa.gov/">US National Ocean and Atmosphere Administration (NOAA)</ExternalLink>{' '}
        satellites which oceanographers use to measure Sea Surface Temperature (SST). The pixel size is about 1km and
        accuracy about +/-0.6&#176;C. The NOAA satellites broadcast the data continuously, so any groundstation that can
        see the satellite can receive the data. Several satellite passes per day are tracked, received, processed and
        archived at WASTAC in Perth, the Bureau of Meteorology in Melbourne, CSIRO in Hobart and ACRES in Alice Springs.
      </p>
    ),
  },
  {
    id: 'CAST2008',
    term: 'CAST2008 Mean Dynamic Topography',
    definition: () => (
      <p>
        This is an estimate of the Mean Dynamic Topography made by Ken Ridgway and colleagues at CSIRO. It results from
        running the Bluelink global ocean model (OFAM) with very strong nudging to the three-dimensional, seasonally
        varying, <TermLink id="CARS">CARS</TermLink> climatological temperature and salinity fields.
      </p>
    ),
  },
  {
    id: 'CARS',
    term: 'CARS - the CSIRO Atlas of Regional Seas',
    definition: () => (
      <p>
        The name is no longer very appropriate, since the CARS2009 version of this season-resolving hydrographic atlas
        covers the entire globe. It is produced by interpolating all available in-situ observations of hydrographic
        properties onto a regular three-dimensional grid. The result is a set of harmonic constants for the yearly and
        semi-annual components of the variability as well as the all-time mean. The sudden increase in the amount of
        data provided by the{' '}
        <a href="/product/argo" className="text-imos-sea-blue underline">
          Argo
        </a>{' '}
        programme means that the atlas is not really a long-term average so it is best to interpret it as simply an
        average of all available data, binned by time-of-year, but not year itself.
      </p>
    ),
  },
  {
    id: 'CTW',
    term: 'Coastal Trapped Wave',
    definition: () => (
      <p>
        otherwise known as a topographic Rossby Wave, a Coastal Trapped Wave is a large-scale, sub-inertial wave with
        the striking property of only propagating <em>along</em> the continental margin, rather than in whatever
        direction it is forced. In the southern hemisphere, a CTW propagates with the coast on its left. CTWs generated
        by cyclones off the north-west shelf can be tracked all the way to Victoria. CTWs generated in the Great
        Australian Bight have an effect at Sydney. Real-world CTWs have properties in common with two sorts of idealised
        waves. The propagation speed of (barotropic) Continental Shelf Waves depends on the width and slope of the
        continental margin, while (baroclinic) Internal Kelvin Waves propagate along vertical (by definition) boundaries
        in the presence of stratification. Thus, the phase (and group) speed of the CTW is determined by the shape of
        the shelf and the strength of the stratification, and ranges from 10m/s (e.g. where the shelf is very wide) to
        1m/s or even less in some places. Pulses of current, sometimes up to 0.5m/s, accompany the sea level signal and
        there is also an effect on the depth of the thermocline that mirrors the sea level signal. Harmonic solutions
        (i.e. periodic in time) of the CTW equations comprise a number of discrete wavenumbers for each frequency. High
        mode-number solutions have progressively shorter along-shelf wavelengths (and therefore lower phase speed) and
        progressively more antinodes in the across-shelf amplitudes of sea level, velocity and thermocline displacement.
      </p>
    ),
  },
  {
    id: 'Coriolis',
    term: 'Coriolis force',
    definition: () => (
      <p>
        the &lsquo;pseudo-force&rsquo; on an object moving with respect to a rotating frame of reference. A cannon shell
        appears to veer left in the southern hemisphere, and right in the northern hemisphere.
      </p>
    ),
  },
  {
    id: 'Ekman',
    term: 'Ekman velocity',
    definition: () => (
      <p>
        A steady wind blowing over the open ocean causes the surface layer of water to move at a velocity (called the
        &apos;Ekman velocity&apos;) which is such that the <TermLink id="Coriolis">Coriolis force</TermLink> on the
        layer balances the force of the wind. Hence, a wind from the south drives an Ekman velocity towards the west, in
        the southern hemisphere. The thickness of this layer is variable, with 30-50m being fairly typical. The Ekman
        velocity is additional to whatever velocity the surface layer was moving at before the wind commenced, and takes
        a day or two to settle down to being at right angles to the wind. The oscillations that follow a sudden change
        of the wind stress are called inertial oscillations.
      </p>
    ),
  },
  {
    id: 'GSLA',
    term: 'Gridded Sea Level Anomaly',
    definition: () => (
      <p>
        This is the name used on this website for the gridded maps of <TermLink id="SLA">Sea Level Anomaly</TermLink>{' '}
        that we make by combining the data from many <TermLink id="altimeter">altimeters</TermLink> and tide gauges.
        Being a two-dimensional map, it is possible to use the very simple and surprisingly-accurate{' '}
        <TermLink id="geostrophic">geostrophic</TermLink> equations to determine the surface velocity field associated
        with the surface pressure gradient caused by the gradient of GSLA (as distinct, for example, from the{' '}
        <TermLink id="Ekman">Ekman velocity</TermLink> and the Stokes drift). Most of the graphics, however, show the
        velocity field determined from <TermLink id="GSL">Gridded Sea Level</TermLink>.
      </p>
    ),
  },
  {
    id: 'GSL',
    term: 'Gridded Sea Level',
    definition: () => (
      <p>
        Gridded Sea Level (GSL) is the name we use for our estimate of the Dynamic Topography obtained by adding the{' '}
        <TermLink id="CAST2008">CAST2008 Mean Dynamic Topography</TermLink> to{' '}
        <TermLink id="GSLA">Gridded Sea Level Anomaly (GSLA)</TermLink>. Geostrophic currents computed from GSL include
        the time-mean and are therefore much more directly comparable with in-situ measurements of surface current
        velocity such as those determined from the trajectories of <TermLink id="GLD">surface drifters</TermLink>. Why
        do we need to use CAST2008? While the <TermLink id="geoid">geoid</TermLink> remains unknown with sufficient
        spatial resolution, the only way to remove the influence of the geoid from altimetric measurements of the Sea
        Surface Height is to subtract the long-term-mean of the observations, which, unfortunately, also subtracts the
        time-mean component of the Dynamic Topography.
      </p>
    ),
  },
  {
    id: 'geostrophic',
    term: 'geostrophic',
    definition: () => (
      <p>
        balance of pressure gradient and the <TermLink id="Coriolis">Coriolis force</TermLink>. In the southern
        hemisphere, a northward current is geostrophically balanced by sea level slope rising to the west. Similarly, an
        anti-clockwise rotating body of water, or &apos;eddy&apos; has elevated sea level in the centre.{' '}
        <b>Slowly-varying</b> (ie, over several days and over &apos;large&apos;, e.g. 50km or more, distances) currents
        are invariably close to being geostrophic, so by measuring either the current velocity or the slope of sea
        level, the other can be calculated. The same principle applies in meteorology: the wind blows anticlockwise
        around a high pressure system in the southern hemisphere, and clockwise around a low, or cyclonic, system. More
        rapidly-varying (in time or space) sea level slopes are much less likely to be geostrophic, so estimation of
        velocity from sea level requires many other factors to be taken into account, such as the wind stress, curvature
        of the sea level gradients, etc.
      </p>
    ),
  },
  {
    id: 'geoid',
    term: 'geoid',
    definition: () => (
      <p>
        The surface to which the ocean would conform if all the ocean currents came to rest. It is a very irregular
        surface, with highs and lows of 30m or more that mirror the small-scale and large-scale irregularities of the
        Earth&apos;s gravity, due, for example, to variations of the depth of the ocean. The difference between the Mean
        Sea Surface (MSS) and the geoid is called the Mean Dynamic Topography.
      </p>
    ),
  },
  {
    id: 'IGDR',
    term: 'Interim Geophysical Data Record',
    definition: () => (
      <p>
        The name given to the several-day-old altimetry data product that first made it possible in ~2000 to use
        altimetry for near-real-time applications. The key difference between the hours-old FGDR data stream and the
        months-old GDR data stream is the accuracy of the orbit.
      </p>
    ),
  },
  {
    id: 'IB',
    term: 'Inverse barometer',
    definition: () => (
      <p>
        To a fairly good approximation, a local reduction of atmospheric pressure of 10hPa leads to a sea level rise of
        10cm. This rise of sea level will be recorded by tidegauges and satellites but needs to be removed in order to
        monitor the internal dynamics of the ocean, because the important quantity is the total pressure just below the
        ocean surface, which is the atmospheric pressure plus the hydrostatic pressure due to any local elevation of the
        sea surface.
      </p>
    ),
  },
  {
    id: 'isostatic',
    term: 'isostatic adjustment',
    definition: () => (
      <p>
        When we refer to &apos;isostatically-adjusted&apos; sea level, we mean we have subtracted the &apos;inverse
        barometer&apos; response of sea level to fluctuations of local atmospheric pressure.
      </p>
    ),
  },
  {
    id: 'latestdatacomposite',
    term: 'latest-data composite',
    definition: () => (
      <p>
        A &apos;composite&apos; satellite image is one that is derived from many individual swaths of satellite data. If
        the time-window of the compositing period is long enough, some parts of the globe will be &apos;seen&apos; by
        the satellite multiple times, in which case some form of averaging could be done. In a &apos;latest-data
        composite&apos; image, no time-averaging is done at all. Each pixel of the image is the latest data. This
        procedure has obvious drawbacks but it has the big advantage of retaining all the spatial detail of the latest
        individual image, while also being a complete image for a large region.
      </p>
    ),
  },
  {
    id: 'SLA',
    term: 'Sea Level Anomaly',
    definition: () => (
      <p>
        This is the commonly used, abbreviated name for the quantity from which the time-varying component (ie, the
        &apos;anomaly&apos; or difference from the time-mean) of the <TermLink id="geostrophic">geostrophic</TermLink>{' '}
        current velocity can be computed. Sometimes the terms &apos;subtidal&apos; and &apos;adjusted&apos; are also
        pre-pended to make it unambiguous that the variations of sea level due, respectively, to the high frequency
        tides (diurnal, semi-diurnal, ter-diurnal, etc) and <TermLink id="IB">inverse barometer effect</TermLink> are{' '}
        <b>not</b> included. SLA can be derived from tidegauge and/or altimeter along-track measurements of{' '}
        <TermLink id="SSH">Sea Surface Height</TermLink>. The very irregular timing and spacing of SLA data make it very
        attractive to use the data after it has been mapped onto a regular grid, interpolated to a point in time. We
        call this product <TermLink id="GSLA">Gridded Sea Level Anomaly</TermLink>.
      </p>
    ),
  },
  {
    id: 'SSH',
    term: 'Sea Surface Height',
    definition: () => (
      <p>
        The spatial structure of the Sea Surface Height is mostly due to the undulations of the{' '}
        <TermLink id="geoid">geoid</TermLink>. Only a small part of the variability is due to the mean and time-varying
        components of the &apos;dynamic topography&apos; associated with ocean circulation. The shape of the geoid is
        not known precisely, but we can assume that it does not vary much with time. The average over time of the
        altimetric sea surface height (the Mean Sea Surface) is the sum of the geoid and the mean dynamic topography. By
        subtracting the MSS from altimeter measurements of the Sea Surface Height we are therefore left with the
        variable part of the dynamic topography. From this we subtract model estimates of the high frequency signals due
        to tides and the <TermLink id="IB">inverse barometer</TermLink> effect, leaving an estimate of the{' '}
        <TermLink id="SLA">Sea Level Anomaly</TermLink> which can be used to map the time-varying part of the highs and
        lows of the ocean surface around which the transient component of{' '}
        <TermLink id="geostrophic">geostrophic</TermLink> currents flow.
      </p>
    ),
  },
  {
    id: 'SST',
    term: 'SST',
    definition: () => (
      <p>
        Sea Surface Temperature. Usually measured either continuously from ship at the depth of the engine water intake,
        or remotely by satellite (see <TermLink id="AVHRR">AVHRR</TermLink>) or airplane.
      </p>
    ),
  },
  {
    id: 'synTS',
    term: 'synTS',
    definition: () => (
      <p>
        short for &apos;synthetic temperature and salinity&apos;. This data product is also described on this website as
        &apos;Satellite adjusted climatology&apos; as explained at{' '}
        <a href="/about/argo" className="text-imos-sea-blue underline">
          [what&apos;s shown]
        </a>
        . The synTS method is described by{' '}
        <a href="/info/references" className="text-imos-sea-blue underline">
          Ridgway and Dunn (2010)
        </a>
        .
      </p>
    ),
  },
  {
    id: 'GLD',
    term: 'Surface Drifter',
    definition: () => (
      <p>
        The principle method for validating our altimetric surface velocity estimates is by comparing them to the
        velocity of Surface Drifters, or{' '}
        <ExternalLink href="https://www.aoml.noaa.gov/phod/gdp/">Global Lagrangian Drifters</ExternalLink>. These buoys
        are tracked by the Argos positioning system (not to be confused with the Argo floats) and have a 10m long
        sea-anchor at the end of a 10m wire, to minimise their down-wind velocity, thus reducing their sensitivity to
        those components of the surface current velocity to which the altimeters are blind.
      </p>
    ),
  },
  {
    id: 'upwelling',
    term: 'upwelling',
    definition: () => (
      <p>
        when water is drawn to the surface from great depth. It is a very significant phenomenon because it makes
        nutrients that have settled to depth become available again to phytoplankton living within the depth of
        penetration of sunlight. Various forces drive upwelling. At the coast, alongshore winds that have the coast on
        their right in the southern hemisphere drive the surface waters away from the coast in the Ekman layer. That
        water has to be replaced, so it rises from below. The place where this happens most strongly in Australia is
        known as the Bonney Coast, between Portland and Robe.
      </p>
    ),
  },
  {
    id: 'windStress',
    term: 'wind stress',
    definition: () => (
      <p>
        The effect on the ocean of the wind increases greatly as the wind velocity increases. The wind stress is a
        measure of this effect and is approximately proportional to the square of the wind velocity.
      </p>
    ),
  },
];

export const GlossaryData = () => (
  <dl className="flex flex-col gap-6">
    {glossaryTerms.map(({ id, term, definition }) => (
      <div key={id} id={id} className="scroll-mt-24">
        <dt className="font-poppins text-imos-deep-blue text-lg font-medium">{term}</dt>
        <dd className="mt-1">{definition()}</dd>
      </div>
    ))}
  </dl>
);
