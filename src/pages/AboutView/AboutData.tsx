const EACMooringArrayAboutData = () => {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="text-imos-nav-text flex-1 space-y-4 text-base leading-relaxed">
        <p>
          The East Australian Current (EAC) is the complex, highly energetic western boundary current that flows along
          the east coast of Australia. As the strongest current in the region, the EAC and its associated turbulent
          eddies dominate the marine climate of the Coral and Tasman Seas and of the eastern Australian continental
          shelf.
        </p>
        <p>
          Variability in the EAC&apos;s strength, location, and property transport impacts the weather, ocean
          environment, and composition and functioning of marine ecosystems of the region. However, the influence of the
          EAC on the regional climate, shelf-coastal exchange processes, and the marine ecosystems is not well
          understood due in part to the paucity of long-term ocean observations.
        </p>
        <p>
          To begin to address the need of the long-term monitoring of the EAC, the Australian Integrated Marine
          Observing System (IMOS) and CSIRO supported a comprehensive in situ mooring array at approximately 27&deg;S
          from the continental slope to the off-shore deep ocean between 2012-2022, except for a 22-month period between
          2013-2015 when the mooring array was not in place.
        </p>
        <p>
          The array is composed of seven moorings, with the shallowest mooring being the national reference station off
          North Stradbroke Island, and the deepest mooring extending from 4800 m to the surface (Figure 1a). Each
          mooring is equipped with instruments that measure temperature, salinity, and horizontal velocity placed along
          the mooring line (Figure 1b). Temperature, salinity, and some of the velocity measurements are observed at a
          specific depth (see red, green, and blue dots in Figure 1b, respectively). Over the continental shelf and
          slope, where the EAC is expected to be strongest, the velocity is measured every 4-16 m from the sea-surface
          to 1000 m of the water column. These velocity measurements are taken by acoustic doppler current profiling
          instruments (ADCPs, yellow dots in Figure 1b) and the vertical depth range of each ADCP is represented by the
          grey cones in Figure 1b.
        </p>
        <p>
          With continuous measurements of ocean properties, we can build climatological means. Using these means as
          reference, we&apos;re able to calculate anomalies of each ocean property. Anomaly values help us to identify
          unusual and extreme behaviours &ndash; for example an anomalously strong EAC, or extremely warm temperatures
          at the current&apos;s sub-surface core. However, to determine mean and anomalous values of a property, the
          continuous measurements must happen at the same coordinates and depth in the water column and be free of gaps.
        </p>
        <p>
          Planned and unplanned gaps happen in the raw data for several reasons. The number or nominal depths of the
          instruments might change between deployments, or a sensor might fail during its time in the water. Also, the
          mooring is &ldquo;blown over&rdquo; by strong currents. As the moorings are pushed over, the instruments
          measure ocean properties deeper than their nominal depth, sometimes leaving the shallower depths unmeasured.
        </p>
        <p>
          To fill these data gaps in the EAC moorings data, a team of CSIRO experts{' '}
          <a
            href="https://doi.org/10.1175/JTECH-D-21-0183.1"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            used a machine learning technique
          </a>{' '}
          to fill temporal and vertical gaps in the raw data. The gap-filled, gridded product is fully described and
          freely available{' '}
          <a
            href="https://doi.org/10.25919/sfw7-hc46"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            here
          </a>
          , ready for users&apos; uptake.
        </p>
        <p>
          In IMOS-OceanCurrent, we have used the gridded product to calculate daily temperature, salinity, and velocity
          anomalies for the 8 years of EAC mooring array data. The results are vertical sections of these properties,
          showing how the EAC changes in time. To aid interpretation, we show these vertical sections alongside our
          usual maps of remotely-sensed data, with Argo floats occasionally complementing the sub-surface data near the
          array.
        </p>
        <p>
          The dataset used here is fully described in Sloyan, B. M., Cowley, R., and Chapman, C.C. East Australian
          Current velocity, temperature and salinity data products. <em>Sci Data</em> 11, 10 (2024).{' '}
          <a
            href="https://doi.org/10.1038/s41597-023-02857-x"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            https://doi.org/10.1038/s41597-023-02857-x
          </a>
        </p>
      </div>
      <div className="flex-1 space-y-4">
        <img
          src="/resource/EAC_fig_ADCP.gif"
          alt="EAC mooring array Figure 1: (a) Location of the EAC moorings; (b) Vertical distribution of instruments at each mooring"
          loading="lazy"
          decoding="async"
          className="w-full rounded-sm"
        />
        <p className="text-imos-dark-grey text-sm leading-normal">
          Figure 1: (a) Location of the EAC moorings (red diamonds); (b) Vertical distribution of instruments at each
          mooring. Australia&apos;s eastern continental shelf break and adjacent deep abyssal plain are shown in black.
          From the continental shelf to the offshore deep ocean, the moorings are: National Reference Station North
          Stradbroke Island (NRSNSI), EAC moorings at nominal depths of 500 m (EAC0500), 2000 m (EAC2000), 3200 m
          (EAC3200), 4200 m (EAC4200), 4700 m (EAC4700) and 4800 m (EAC4800). The locations of instruments that measure
          temperature/salinity, temperature, and single point velocity along each mooring line are shown as red, green,
          and blue dots, respectively. The locations of instruments that measure current velocity over a depth range
          (i.e., ADCPs) are shown as yellow dots, and the measured range is indicated by shaded grey cones.
        </p>
      </div>
    </div>
  );
};

const ArgoAboutData = () => {
  return (
    <div className="text-imos-nav-text space-y-4 text-base leading-relaxed">
      <p>
        The Argo position maps, like the example below, show floats that reported data within a few days of the
        indicated date. The colour-fill of the float indicates the difference between the float&apos;s estimate of
        steric height anomaly (relative to 1000m) and the satellite altimeters&apos; estimate of the sea level anomaly
        (relative to the long-term mean, see panel 5 discussion below). Green signals that both observing systems are in
        agreement, while blue or red indicates that there might be a problem we need to investigate. Unfilled circles
        indicate floats that did not produce useful data to at least 1000m. The [PREV] button will go back several
        years. The [DATE INDEX] goes back to 2004.
      </p>
      <a
        href="https://oceancurrent.aodn.org.au/profiles/map.php?link=map/20110920.html"
        target="_blank"
        rel="noreferrer noopener"
        className="mx-auto block max-w-xl"
      >
        <img
          src="/resource/profiles/map/20110920.gif"
          alt="Example Argo position map for 20 September 2011"
          loading="lazy"
          decoding="async"
          className="w-full rounded-sm"
        />
      </a>
      <p>
        Click on one of the floats to see a plot like the one below (the example is from the float coded yellow, above,
        off NSW). You can also reach plots like the one below via the list of{' '}
        <a
          href="https://oceancurrent.aodn.org.au/profiles/profile_index.php"
          target="_blank"
          rel="noreferrer noopener"
          className="text-imos-sea-blue"
        >
          [WMO numbers]
        </a>
        .
      </p>
      <a
        href="https://oceancurrent.aodn.org.au/profiles/profile.php?link=5903622/20110915_5903622_44.html"
        target="_blank"
        rel="noreferrer noopener"
        className="mx-auto block max-w-xl"
      >
        <img
          src="/resource/profiles/5903622/20110915_5903622_44.gif"
          alt="Example Argo profile plot for float 5903622, cycle 44, 15 September 2011"
          loading="lazy"
          decoding="async"
          className="w-full rounded-sm"
        />
      </a>
      <p>
        The <strong>title</strong> of the example plot tells us that:
      </p>
      <ol className="list-decimal space-y-2 pl-6">
        <li>
          This profile is the 44th cycle of the float with WMO number 5903622. The &apos;CS&apos; signifies that the
          data was processed by CSIRO. The sampling occurred on 15/09/2011, and the data shown was distributed as
          profile 424 of the Fast Delivery dataset for 17/09/2011. The surfacing position was 32.508S, 155.613E.
        </li>
        <li>
          The seasonal ocean climatology to which the Argo data is compared is{' '}
          <a
            href="https://www.marine.csiro.au/~dunn/cars2009/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            CARS2009
          </a>
          .
        </li>
        <li>
          The daily-updated{' '}
          <a
            href="https://oceancurrent.aodn.org.au/glossary.php#synTS"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            &apos;synTS&apos;
          </a>{' '}
          estimate of subsurface properties to which the Argo data is compared is valid for 17/09/2011, which is a day
          later than the Argo data. The line colour key refers to this as &apos;satellite-adjusted climatology&apos;
          because the estimates are the result of using satellite observations of the sea surface height and temperature
          (shown at right) to adjust the climatological profile, according to historically-observed relationships
          between anomalies of surface dynamic height and temperature with sub-surface properties (see{' '}
          <a
            href="https://oceancurrent.aodn.org.au/misc/references.php"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            Ridgway and Dunn, 2010
          </a>
          ).
        </li>
      </ol>
      <p className="font-semibold">Panels 1 and 2 (from left)</p>
      <p>
        The <strong>black</strong> lines are the fast delivery versions of the Argo float&apos;s temperature and
        salinity observations. <strong>Linetypes:</strong> dotted=raw data, dashed=QC&apos;d raw data,
        dot-dashed=adjusted data, solid=adjusted, QC&apos;d data. The quality control and adjustments are those included
        in the Argo fast delivery data files. The <strong>red</strong> lines are climatological estimates, i.e. what is
        &apos;normal&apos; for the time of year at the float&apos;s location. The <strong>blue</strong> lines are synTS
        at the location of the Argo float. In the example above, Argo and synTS are in near-perfect agreement that the
        ocean is colder than normal all the way to 2000m and fresher than normal down to 1000m.
      </p>
      <p className="font-semibold">Panel 3</p>
      <p>
        These lines show differences from the climatological profiles, of both temperature and salinity. The Argo T, S
        and P data are only those that pass the fast delivery QC, i.e. flags 1, 2 or 5. Dashed lines are the original
        instrument data, solid lines are adjusted (by the PI), e.g. for known calibration error.
      </p>
      <p className="font-semibold">Panel 4</p>
      <p>
        This shows the AMSR-E (Advanced Microwave Scanning Radiometer, which has only coarse spatial resolution but sees
        through cloud) three-day average sea surface temperature to show the regional context of the Argo profile. The
        surface-most Argo observation is encoded within the symbol for comparison with the satellite. The colour bar
        (not shown) is 6K wide and is centered on the climatological value at the float&apos;s location.
      </p>
      <p className="font-semibold">Panel 5</p>
      <p>
        This shows the altimetric sea level anomaly (colour bar is -0.6 to 0.6m) for comparison with h1000, the surface
        steric height anomaly relative to 1000m. These are different quantities, the first estimated at coarse
        resolution from space and the second by an in-situ device, so the estimates are bound to disagree to some
        extent. They usually do agree within +/-0.15m, however, confirming that most of the sea level anomaly (i.e., the
        difference from the time-mean of inverse-barometer adjusted sea level) is due to the anomaly (i.e., the
        difference from the CARS2009 time-mean) of the vertical-integral from 1000m of the water density. This
        particular float sampled to nearly 2000m so h2000, the steric height anomaly relative to 2000m, has also been
        calculated and this value (-0.48m) is even closer to the altimetric estimate (-0.51m) than h1000 (-0.4m).
      </p>
      <h3 className="text-base font-semibold">Example 2: A submerged mixed layer</h3>
      <p>
        It is not usually as easy as it was for the example above to estimate the subsurface properties of the ocean
        from satellite data. This is illustrated by the plot below, which describes a relatively warm, but salty and
        therefore neutrally buoyant, submerged mixed layer at 200m-500m that was not inferrable from the satellite data.
        This water has come from Bass Strait. Bass Strait water is rarely seen in vertical profiles in the western
        Tasman Sea (only 7 examples from 2420 profiles since 1982) because the water forms 200 m+ tall lenses at the
        centre of anti-cyclones (Baird and Ridgway, 2012).
      </p>
      <a
        href="https://oceancurrent.aodn.org.au/profiles/profile.php?link=5903677/20110725_5903677_12.html"
        target="_blank"
        rel="noreferrer noopener"
        className="mx-auto block max-w-xl"
      >
        <img
          src="/resource/profiles/5903677/20110725_5903677_12.gif"
          alt="Example Argo profile showing a submerged mixed layer, float 5903677, 25 July 2011"
          loading="lazy"
          decoding="async"
          className="w-full rounded-sm"
        />
      </a>
      <h3 className="text-base font-semibold">Example 3: disagreement of Argo and synTS</h3>
      <p>
        We&apos;re not yet sure why the image below shows so much disagreement between synTS and Argo. The synTS
        estimate of the vertical structure of the warm (and slightly salty) anomaly is confirmed by Argo but the synTS
        amplitude of that anomaly is much greater than the Argo observations, suggesting that the gridded altimetry has
        over-estimated the sea level anomaly at the location of the float. Stepping back through time, however, shows
        that the apparent over-estimation is persistent, and more a property of the eddy (or location) than float number
        590658. E.g., see{' '}
        <a
          href="https://oceancurrent.aodn.org.au/profiles/profile.php?link=5903653/20110823_5903653_21.html"
          target="_blank"
          rel="noreferrer noopener"
          className="text-imos-sea-blue"
        >
          [float 5903653 on 23 Aug]
        </a>
        . Confirmation that the sea level anomaly is usually correct in mid September at this location is provided by
        agreement of the surface geostrophic velocity with the trajectory and speed of surface drifters, e.g.{' '}
        <a
          href="https://oceancurrent.aodn.org.au/sst.php?link=LordHoweS/2011/2011091903.html"
          target="_blank"
          rel="noreferrer noopener"
          className="text-imos-sea-blue"
        >
          [snapshot SST, altimetry and drifter]
        </a>
        .
      </p>
      <a
        href="https://oceancurrent.aodn.org.au/profiles/map/profile.php?link=5901658/20110919_5901658_126.html"
        target="_blank"
        rel="noreferrer noopener"
        className="mx-auto block max-w-xl"
      >
        <img
          src="/resource/profiles/5901658/20110919_5901658_126.gif"
          alt="Example Argo profile showing disagreement between synTS and Argo, float 5901658, 19 September 2011"
          loading="lazy"
          decoding="async"
          className="w-full rounded-sm"
        />
      </a>
    </div>
  );
};

const TidalCurrentsAboutData = () => {
  return (
    <div className="text-imos-nav-text space-y-4 text-base leading-relaxed">
      <h2 className="text-2xl font-semibold">What&apos;s shown for each of the black boxes in the index map</h2>
      <h3 className="text-base font-semibold">1) Half-hourly, regional maps</h3>
      <div className="mx-auto max-w-xl">
        <a
          href="https://oceancurrent.aodn.org.au/tides/Darwin_spd/2026/index.html"
          target="_blank"
          rel="noreferrer noopener"
          className="block"
        >
          <img
            src="https://oceancurrent.aodn.org.au/tides/Darwin_spd.gif"
            alt="Darwin tidal current speed map"
            loading="lazy"
            decoding="async"
            className="rounded-sm"
          />
        </a>
        <a
          href="https://oceancurrent.aodn.org.au/tides/HydrogPass_spd/2026/index.html"
          target="_blank"
          rel="noreferrer noopener"
          className="block"
        >
          <img
            src="https://oceancurrent.aodn.org.au/tides/HydrogPass_spd.gif"
            alt="Hydrographer's Passage tidal current speed map"
            loading="lazy"
            decoding="async"
            className="rounded-sm"
          />
        </a>
      </div>
      <p>
        These show predictions of tidal sea level and depth-average tidal current from tide gauge and current meter
        observations as well as from the CSIRO tidal model.
      </p>
      <p>
        Choose your region on the index map above, then a day on the calendar, then click [NEXT] to step the map ahead
        in time, or [SPD/SL] to switch between tidal current speed or sea level for the colour-fill. Commencing
        September 2023, the interval between maps is either 30, 60 or 90 minutes, rather than always 60 minutes, to
        better resolve critical times while keeping the number of maps down. The critical times are those of flood,
        slack and ebb tide, and high and low tide. These times are not equal all over the map, so we have chosen
        locations we think are of particular interest. The inset graph shows the tidal current velocity (resolved along
        the specified direction) and tidal height, for the previous 13 hours and upcoming 26 hours at two locations
        (labelled x and +). At right you see that the timing of slack tide relative to height is very different in the
        Clarence Strait (near Darwin) and the Hydrographer&apos;s Passage (off Mackay). We are working on a way of
        enabling users to find out the model&apos;s estimate of the time of slack tide at any location.
      </p>
      <p>
        Mouse over the observation sites to see detailed information. For current meters this includes the magnitude and
        direction of the observation-based predicted tidal current, the rms magnitude of sub-tidal variability measured
        by that current meter and the magnitude and direction of the observed mean current.
      </p>
      <p>
        Clicking the observation sites takes you to month-per-page graphs of observation-based predictions compared with
        the model-based predictions.
      </p>
      <h3 className="text-base font-semibold">2) Month-per-page graphs</h3>
      <div className="mx-auto max-w-xl">
        <a
          href="https://oceancurrent.aodn.org.au/tides/monthplots/UTas_ARENA_CW4_201804.html"
          target="_blank"
          rel="noreferrer noopener"
          className="block"
        >
          <img
            src="https://oceancurrent.aodn.org.au/tides/monthplots/UTas_ARENA_CW4_201804.gif"
            alt="Month-per-page graph comparing observation-based and model-based tidal predictions, UTas ARENA CW4, April 2018"
            loading="lazy"
            decoding="async"
            className="w-full rounded-sm"
          />
        </a>
      </div>
      <p>
        For each current meter or tide gauge, these graphs compare the observation-based tidal predictions
        (&apos;o&apos; for short) with co-located model-based tidal predictions (&apos;m&apos;). The current velocities
        are shown as speed and direction, and components along East, North and the major and minor axes of the observed
        M2 tidal ellipse.
      </p>
      <p>
        The agreement of o and m is characterised by listing rms values of each separately, as well as of the model
        error m-o. For currents this is done for the scalar components as well as for the vector difference. If the
        vector error can be reduced by lagging or advancing the model, details are given. The direction error is
        characterised by listing the 25th, 50th and 75th percentiles.
      </p>
      <p>
        The [PREV] and [NEXT] links step a month at a time (or to an adjacent location if the next month is not done
        yet), or back to when actual observations can be included on the graph (1983 in some cases). Browsing the graphs
        with actual observations reveals how Australia&apos;s ocean currents range from tidally-dominated (e.g. in Bass
        Strait as shown at right), to mixed (e.g.{' '}
        <a
          href=" https://oceancurrent.aodn.org.au/tides/monthplots/IMOS_GBRPPS_201207.gif"
          target="_blank"
          rel="noreferrer noopener"
          className="text-imos-sea-blue"
        >
          Palm Passage
        </a>
        ) to non-tidal, such as off{' '}
        <a
          href="https://oceancurrent.aodn.org.au/tides/monthplots/IMOS_BMP070_201704.gif"
          target="_blank"
          rel="noreferrer noopener"
          className="text-imos-sea-blue"
        >
          Bateman&apos;s Bay
        </a>
        .
      </p>
      <h3 className="text-base font-semibold">Revisions</h3>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://oceancurrent.aodn.org.au/news.php#20190911"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            <strong>Sept. 2019</strong>
          </a>{' '}
          Opening announcement.
        </li>
        <li>
          <a
            href="https://oceancurrent.aodn.org.au/news.php#20230902"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            <strong>Sept. 2023</strong>
          </a>{' '}
          Focus on slack tides.
        </li>
      </ul>
      <h2 className="text-2xl font-semibold">Technical information</h2>
      <h3 className="text-base font-semibold">Current velocity observations</h3>
      <p>
        A novel aspect of the work presented here is the presentation and assessment of predictions of depth-averaged
        tidal currents (sea level information is included for completeness rather than novelty, and does not replace the
        predictions published by the{' '}
        <a
          href="http://www.bom.gov.au/oceanography/projects/ntc/ntc.shtml"
          target="_blank"
          rel="noreferrer noopener"
          className="text-imos-sea-blue"
        >
          National Operations Centre (NOC) Tidal Unit of the Bureau of Meteorology
        </a>
        ). The observation-based predictions of tidal current are made at 100 locations around Australia, using
      </p>
      <div className="mx-auto max-w-xl">
        <a
          href="https://oceancurrent.aodn.org.au/tides/hodographs/TernI.html"
          target="_blank"
          rel="noreferrer noopener"
          className="block"
        >
          <img
            src="https://oceancurrent.aodn.org.au/tides/hodographs/TernI.gif"
            alt="Hodograph showing tidal current at Tern Island"
            loading="lazy"
            decoding="async"
            className="w-full rounded-sm"
          />
        </a>
      </div>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>60 IMOS ADCPs;</strong> these Acoustic Doppler Current Profilers were deployed by or have been
          contributed to{' '}
          <a
            href="https://oceancurrent.aodn.org.au/about/current-meters"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            IMOS
          </a>
          . These observations can be assumed to be quite accurate. Here, we use the depth-average of the observations,
          which span the whole water column except for a few m at the bottom, and the surface-most 15%{' '}
        </li>
        <li>
          <strong>13 CSIRO current meters;</strong> selected from the{' '}
          <a
            href="https://www.cmar.csiro.au/data/trawler/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            CSIRO collection
          </a>{' '}
          for being in locations (Bass Strait, NW shelf and Gulf of Carpentaria) where tidal currents are significant.
          These non-ADCP moorings included either one or two current meters. In the case of two, we have simply averaged
          the observations for the record segments when both were operating.{' '}
          <a
            href="https://oceancurrent.aodn.org.au/tides/CSIROmeters/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            [plots of the individual instrument records, their average and the tidal fit]
          </a>
        </li>
        <li>
          <strong>10 UNSW Aanderaas:</strong> Middleton et al. (1984) and Griffin et al. (1987) studied the anomalous
          tides of the Southern Great Barrier Reef using these observations made by single, mechanical RCM4 Aanderaa
          current meters. By modern standards, these instruments are not very accurate. Firstly, the flow direction is
          only sampled once an hour, so short-period changes of direction are not averaged. To minimise noise due to
          waves, the instruments were moored fairly low in the water column, at the risk of under-estimating the
          depth-average velocity. Some had to be deployed close to islands, with the result that they recorded effects
          (such as asymmetric ebb and flood directions) that the model is unlikely to be able to reproduce due to its
          imperfect representation of topography. Flood-ebb asymmetries may not be well represented by a sum of harmonic
          tidal constituents, either. The instrument deployed west of Bugatti Reef, for example, has one of the highest
          rms vector differences from the model. This can be{' '}
          <a
            href="https://oceancurrent.aodn.org.au/tides/monthplots/UNSW_W_Bugatti_Rf_198411.html"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            seen
          </a>{' '}
          to be mostly due to persistent offsets between the observed flow direction and both the modelled and tidal-fit
          flow directions. The situation with the Tern Island meter is slightly different. Here, the observed flood tide
          is to the SSW, but the ebb was more likely to be either to the ENE or NW instead of NNE, as shown in the
          hodograph at right (click to enlarge). Neither the tidal self-prediction nor the model represent this. The
          impeller of the{' '}
          <a
            href="https://oceancurrent.aodn.org.au/tides/monthplots/UNSW_Creal_Rf_198412.gif"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            Creal Reef
          </a>{' '}
          meter appears to be intermittently obstructed, so the tidal prediction there is probably not accurate,
          explaining the large discrepancy from the model
        </li>
        <li>
          <strong>14 ARENA ADCPs:</strong> These were deployed in Banks Strait (NE Tas) and Clarence Strait (near
          Darwin) by Penesis et al. (2020) as part of{' '}
          <a
            href="https://arena.gov.au/knowledge-bank/tidal-energy-in-australia/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            AUSTEn
          </a>
          , to assess the renewable energy potential of the strong currents there.
        </li>
      </ul>
      <p>
        We have used the UTide tidal analysis software of Codiga (2011) to compute amplitudes and phases for up to 8
        (depending on the record length) semi-diurnal and diurnal (M2 S2 N2 K2 O1 K1 P1 and Q1) tidal velocity
        constituents{' '}
        <a
          href="http://oceancurrent.aodn.org.au/timeseries/ANMN_P34/ANMNtable.html"
          target="_blank"
          rel="noreferrer noopener"
          className="text-imos-sea-blue"
        >
          (details for IMOS sites)
        </a>
        , allowing predictions to then be made for any chosen period.
      </p>
      <h3 className="text-base font-semibold">Sea level observations</h3>
      <p>
        In contrast to the situation with tidal currents, predictions of tidal sea level are already widely available
        and heavily used. We obtained tide gauge data from
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          more than 700 locations from the{' '}
          <a
            href="http://www.bom.gov.au/oceanography/projects/ntc/ntc.shtml"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            National Operations Centre (NOC) Tidal Unit of the Bureau of Meteorology
          </a>
          . Some of these data are less accurate than others so please see the BoM for the official predictions and
          their comments on reliability{' '}
        </li>
        <li>9 from the UNSW SGBR data set (which are all thought to be high quality).</li>
      </ul>
      <h3 className="text-base font-semibold">Modelled tidal sea level and currents</h3>
      <p>
        The CSIRO tidal model is a barotropic (2-dimensional, with no vertical variation of velocity) implementation of
        COMPAS, a so-called unstructured-mesh model because the grid resolution varies from 400m in places to 6km
        offshore. This allows better representation of the sea floor than is possible with a global model, from which
        the properties of the deep-ocean tide are obtained. The{' '}
        <a href="http://www.tpxo.net" target="_blank" rel="noreferrer noopener" className="text-imos-sea-blue">
          Oregon State University TPXO tidal model
        </a>{' '}
        (Egbert and Erofeeva, 2002) provides estimates of the 8 tidal constituents listed above on a 1/6° (latitude and
        longitude) grid, for the sea level and the depth-averaged current velocity. The TPXO9 tidal model assimilates
        satellite altimeter and tide gauge measurements of sea level to make it as accurate as possible. For more
        information see:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          our 2021 assessment of the model:{' '}
          <a
            href="https://doi.org/10.5194/gmd-14-5561-2021"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            Griffin, Herzfeld, Hemer and Engwirda (2021)
          </a>
        </li>
        <li>
          <a
            href="http://www.marine.csiro.au/~griffin/ARENA_tides/tides/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            further details of model performance
          </a>
        </li>
        <li>
          <a
            href="http://www.marine.csiro.au/~griffin/ARENA_tides/tides/energystats/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            statistics of the tides relevant to renewable energy
          </a>
        </li>
        <li>
          tidal constituents from both the model, and the validation data set we used.{' '}
          <a
            href="https://doi.org/10.25919/q8dw-c732"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            CSIRO data portal digital archive
          </a>
        </li>
      </ul>
      <h3 className="text-base font-semibold">Discussion</h3>
      <p>
        There are 3 main reasons why there are not presently many &apos;official predictions&apos; of tidal currents to
        accompany the predictions of tidal height published, for example, by the BoM (see the &apos;Tidal streams&apos;
        button):
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          the{' '}
          <a
            href="https://oceancurrent-beta.aodn.org.au/product/current-meters/moored-instrument-array?depth=1&property=M2&region=01_Aust&date=0000&deploymentPlot="
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            tidal component
          </a>{' '}
          of the current is weaker than (or comparable to) the{' '}
          <a
            href="https://oceancurrent-beta.aodn.org.au/product/current-meters/moored-instrument-array?depth=1&property=vrms&region=01_Aust&date=0000&deploymentPlot="
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            non-tidal components
          </a>{' '}
          of the current for much of Australia&apos;s marine estate (i.e. nearly everywhere south of 25°S). Our index
          map shows the locations of 100 available current meters, colour-coded by whether tidal currents are dominant
          (48), comparable (20), or weaker (32) than non-tidal currents. For sea level, in contrast, there are few
          places where the amplitude of non-tidal variability is comparable to, let alone exceeds, the amplitude of
          tidal variability{' '}
        </li>
        <li>
          tidal currents are intrinsically more complex - varying markedly over short distances in line with the sea
          floor topography, as you can see by toggling between the maps of sea level and speed, so modelling and
          predicting them accurately is more difficult
        </li>
        <li>
          tidal currents have been measured at fewer places than tidal height, so model accuracy cannot be guaranteed in
          as many places.
        </li>
      </ul>
      <p>
        For these 3 reasons, we only publish tidal current predictions for selected regions, as discussed by{' '}
        <a
          href="https://doi.org/10.5194/gmd-14-5561-2021"
          target="_blank"
          rel="noreferrer noopener"
          className="text-imos-sea-blue"
        >
          Griffin, Herzfeld, Hemer and Engwirda (2021)
        </a>
        , and our predictions are not officially certified for navigation.
      </p>
      <p>
        Models like{' '}
        <a href="https://ereefs.org.au/ereefs" target="_blank" rel="noreferrer noopener" className="text-imos-sea-blue">
          eReefs
        </a>{' '}
        simulate both tidal and non-tidal currents, and similar models are also being constructed for other regions
        around Australia. Regardless of these developments, however, we think there is value in publishing predictions
        of the tidal component of the currents without attempting to include the non-tidal component.
      </p>
      <h3 className="text-base font-semibold">Definitions</h3>
      <p>
        <strong>tide</strong> The term &apos;tide&apos; is sometimes used to describe any variation of the sea level or
        the current. Here, we use the oceanographer&apos;s definition, which is that the tide is the astronomically
        forced variation of sea level and current. Hence, and in contrast to the non-tidal variability in the ocean, the
        tides are equally predictable for any period in the future (or the past), because the tidal forcing is precisely
        linked to the orbit and rotation of the Earth and the orbit of the moon.
      </p>
      <p>
        <strong>tidal prediction</strong> The most accurate way to predict the tides (currents or sea level) at a
        certain location is to obtain a record of the tides for a period then do what is known as a tidal analysis to
        determine the amplitudes and phases of all the tidal constituents, then a prediction, which is the reverse
        operation. We have used the TTide and UTide matlab software for this. To make a prediction for a location where
        no observations exist, one has to use a tidal model, either a global model such as TPXO9 or FES2014, or a
        regional model such as the CSIRO tidal model. This is because the ocean&apos;s response to the tidal forcing is
        very complicated, due to the complex shape of the oceans, coastal seas and continental shelves. Local resonances
        can increase the amplitude of the tides in some places, while destructive interference can reduce it elsewhere.
        These dynamics are frequency-dependent, affecting the diurnal and semi-diurnal tides differently. The
        relationship of currents to heights is also complex. Strong tidal currents do tend to occur in regions with high
        tidal sea level amplitudes, but at some distance away from where the range is greatest, and not always at the
        time you might expect.
      </p>
      <p>
        <strong>tidal constituent</strong> For most locations, the dominant tidal constituent is M2. This measures the
        amplitude of the sea level perturbations towards the moon on one side of the earth, and away from it on the
        other. Taking the rotation of the earth and the orbit of the moon into account, this constituent has a period of
        12h 25min 14.4s. The dominant constituent associated with the sun is called S2, and has a period of exactly 12h.
        The 50.5 minutes-per-day difference of these two periodic signals is what gives us the 28.5d spring-neap cycle
        of the daily tidal range (and the waxing and waning of the moon). There are 145 named tidal constituents,
        together accounting for the complex but periodic cycle of the tides.
      </p>
      <p>
        <strong>tidal ellipse</strong> Being a vector (two dimensional) quantity, tidal currents are more difficult to
        describe than tidal sea level. For each tidal constituent, the tidal current velocity vector traces out an
        ellipse. It is only in narrow channels that the current goes simply back and forth. In some places, the ellipse
        is close to a circle, with the speed of the current remaining constant, and only the direction changing. More
        commonly, the amplitude of the major axis is significantly greater than the amplitude of the minor axis. The
        bearing of the major axis is commonly referred to as the direction of the flooding tide.
      </p>
      <p>
        <strong>diurnal and semi-diurnal</strong> Diurnal tidal constituents (e.g. O1, K1) have periods near 24-25h.
        They are smaller than the semi-diurnal (near 12h) constituents in most places, the SA Gulfs being a notable
        exception, where the{' '}
        <a
          href="https://oceancurrent-beta.aodn.org.au/product/current-meters/moored-instrument-array?depth=1&property=K1&region=08_SA&date=0000&deploymentPlot="
          target="_blank"
          rel="noreferrer noopener"
          className="text-imos-sea-blue"
        >
          K1 currents
        </a>{' '}
        are stronger than the{' '}
        <a
          href="https://oceancurrent-beta.aodn.org.au/product/current-meters/moored-instrument-array?depth=1&property=M2&region=08_SA&date=0000&deploymentPlot="
          target="_blank"
          rel="noreferrer noopener"
          className="text-imos-sea-blue"
        >
          M2 currents
        </a>
        . They are caused by the asymmetry of the sea level perturbations on the near and far sides of the Earth.
      </p>
      <p>
        <strong>long-period tides</strong> These are constituents with periods near 15d, 30d, 6 months and 12 months.
        Some are due to direct astronomical forcing (i.e. non-colinearity of orbital axes, eccentric orbits, etc) while
        others are due to the non-linearity of the ocean response to the astronomical forcing. Neither sort of
        long-period tide are included in the predictions shown here. They are small compared to the errors of the
        short-period tides.
      </p>
      <p>
        <strong>non-tidal variability</strong> Broadly speaking, this refers to the many other causes of ocean currents
        and sea level changes, such as wind, atmospheric pressure, heat gain or loss, freshwater gain or loss and eddies
        at a wide range of sizes. There are, however, a few grey areas. Tidal currents rushing past a headland may spin
        up an eddy, depending on the state of the spring neap cycle or the existence of a large-scale alongshore
        current. That eddy is clearly caused by the tide, but it is unpredictable. Conversely, the regular daily cycle
        of winds and temperature, modulated on the annual timescale, also causes a fairly predictable signal in
        observations of the ocean, which tidal analysis software inevitably includes in its estimation of some of the
        diurnal and annual tidal constituents.
      </p>
      <p>
        <strong>slack tide</strong> (a.k.a. &ldquo;slack water&rdquo;) is the time when the tidal current turns from
        ebbing to flooding, or vice versa, i.e., it is the time when the speed of the tidal current is at a local
        minimum. The timing of slack tide relative to high and low water depends on location, as mentioned in our{' '}
        <a
          href="https://oceancurrent.aodn.org.au/news.php#20230902"
          target="_blank"
          rel="noreferrer noopener"
          className="text-imos-sea-blue"
        >
          September 2023 news item
        </a>
        .
      </p>
      <p>
        <strong>sub-tidal variability</strong> is due solely to physical processes operating at time scales longer than
        a day or so (i.e. excluding semi-diurnal and diurnal tides). We estimate the rms amplitude of these by applying
        a Hanning filter to the observations with a half-amplitude width of 20h. This filtering removes all semi-diurnal
        variability, not just the phase-locked components at resolvable frequencies. From the prediction point of view,
        the historical amplitude of sub-tidal variability is an estimate of prediction error, since the actual sub-tidal
        variability can only be predicted close to real time using weather and other data.
      </p>
      <p>
        <strong>internal tides</strong> In some places, currents associated with the internal tide rival or exceed those
        due to the barotropic (&apos;normal&apos;) tide. These are presently out-of-scope for this website but remain an
        active area of research because of their importance to everything from climate modelling (because they do
        vertical mixing and dissipate energy) to offshore engineering (e.g. on the NW shelf). Internal tides occur when
        the barotropic tide excites wavelike motions of the layers of the ocean with different density. If the amplitude
        of these waves is large, tidal-period velocities in the upper and lower layers can be in the opposite direction.
        Internal tides come and go depending on the stratification of the ocean, so they are harder to predict than the
        barotropic tide.
      </p>
      <p>
        <strong>rms</strong> Root mean square, i.e. sqrt(mean(x^2)) where x comprises N estimates of some quantity (or a
        difference of two comparable quantities), either scalar (e.g. sea level) or vector (velocity, as u + iv). Here,
        all quantities considered are tidal predictions, which have zero mean over the time intervals considered. In the
        case of velocities, the rms values are vectors, only the magnitudes of which are used unless specified
        otherwise.
      </p>
      <h3 className="text-base font-semibold">References</h3>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          Codiga, D.L., 2011. Unified Tidal Analysis and Prediction Using the UTide Matlab Functions. Technical Report
          2011-01. Graduate School of Oceanography, University of Rhode Island, Narragansett, RI. 59pp.
          ftp://www.po.gso.uri.edu/pub/downloads/codiga/pubs/2011Codiga-UTide-Report.pdf
        </li>
        <li>
          Egbert, G.D. and S.Y. Erofeeva, 2002: Efficient Inverse Modeling of Barotropic Ocean Tides. J. Atmos. Oceanic
          Technol., 19, 183\96204,{' '}
          <a
            href="https://doi.org/10.1175/1520-0426(2002)019&lt;0183:EIMOBO&gt;2.0.CO;2"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            DOI
          </a>
        </li>
        <li>
          Haigh, I.D., Wijeratne, E.M.S., MacPherson, L.R., Pattiaratchi, C.B., Mason, M.S., Crompton, R.P., George, S.,
          2014. Estimating present day extreme total water level exceedance probabilities around the coastline of
          Australia: tides, extra-tropical storm surges and mean sea level. Climate Dynamics, 42, 121-138.{' '}
          <a
            href="https://doi.org/10.1007/s00382-012-1652-1"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            DOI
          </a>
        </li>
        <li>
          Griffin, D.A., Middleton, J.H. and Bode, L. (1987). The tidal and longer period circulation of Capricornia,
          southern Great Barrier Reef. Aust. J. Mar. Freshw. Res., 38, 461-474.
        </li>
        <li>
          Griffin, D.A., Herzfeld, M., Hemer, M. and Engwirda, D: Australian tidal currents - assessment of a barotropic
          model (COMPAS v1.3.0 rev6631) with an unstructured grid, Geosci. Model Dev., 14,5561-5582,{' '}
          <a
            href="https://doi.org/10.5194/gmd-14-5561-2021"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            https://doi.org/10.5194/gmd-14-5561-2021
          </a>
          , 2021
        </li>
        <li>
          Middleton, J.H., Buchwald V.T. and Huthnance, J.M. (1984). The anomalous tides near Broad Sound. Continental
          Shelf Research 3, 359-381.
        </li>
        <li>
          Pawlowicz, R. B. Beardsley, and S. Lentz, &ldquo;Classical tidal harmonic analysis including error estimates
          in MATLAB using T_TIDE&rdquo;, Computers and Geosciences 28 (2002), 929-937.
        </li>
        <li>Penesis et al. Tidal Energy in Australia. University of Tasmania, 2020</li>
        <li>
          Pringle, William (2017), Major tidal constituents for the Indian Ocean and Western Pacific Basin, Mendeley
          Data, v1{' '}
          <a
            href="http://dx.doi.org/10.17632/tjyjn56jbf.1"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            http://dx.doi.org/10.17632/tjyjn56jbf.1
          </a>
        </li>
        <li>
          Wijeratne, E. M. S.; Pattiaratchi, C. B.; Eliot, Matt; Haigh, Ivan D. (2012). Tidal characteristics in Bass
          Strait, south-east Australia. Estuarine, Coastal and Shelf Science, Volume 114, p. 156-165.{' '}
          <a
            href="https://www.sciencedirect.com/science/article/pii/S0272771412003472?via%3Dihub"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            DOI
          </a>
        </li>
      </ul>
      <h3 className="text-base font-semibold">For further information</h3>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://arena.gov.au/knowledge-bank/tidal-energy-in-australia/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            Australian Tidal Energy - AUSTEn
          </a>
        </li>
        <li>
          <a
            href="http://www.marine.csiro.au/~griffin/ARENA_tides/tides"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            ARENA Tidal currents and sea level
          </a>{' '}
          (a comprehensive archive of the CSIRO tidal model validation results, tidal energy statistics and more)
        </li>
        <li>
          <a href="http://www.tpxo.net" target="_blank" rel="noreferrer noopener" className="text-imos-sea-blue">
            Oregon State University TPXO tidal models
          </a>
          .
        </li>
        <li>
          <a
            href="https://www.aviso.altimetry.fr/en/data/products/auxiliary-products/global-tide-fes/description-fes2014.html"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            FES2014
          </a>
        </li>
        <li>
          <a
            href="https://www.researchgate.net/publication/322331188_Assessment_of_the_FES2014_Tidal_Currents_on_the_shelves_around_Australia"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            Assessment_of_the_FES2014_Tidal_Currents_on_the_shelves_around_Australia
          </a>
        </li>
        <li>
          <a
            href="https://www.eoas.ubc.ca/~rich/#T_Tide"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            T-Tide
          </a>
        </li>
        <li>
          <a
            href="http://www.po.gso.uri.edu/~codiga/utide/utide.htm"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            UTide
          </a>
        </li>
        <li>
          <a
            href="https://noc.ac.uk/business/marine-data-products/anytide"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            anyTide
          </a>
        </li>
      </ul>
    </div>
  );
};

const CurrentMetersAboutData = () => {
  return (
    <div className="text-imos-nav-text space-y-8 text-base leading-relaxed">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Definitions</h2>
        <p>
          <strong>ADCP</strong> - Acoustic Doppler Current Profiler. This measures the velocity of the water at a range
          of distances (10s to 100s of meters) from the device. The ANMN and DWM facilities have used several types: the
          RDI Workhorse, RDI Continental and Nortek AWAC units, all deployed as upward- or downward-looking units,
          either rigidly on the bottom, or in taut moorings.
        </p>
        <p>
          <strong>ADV</strong> - Acoustic Doppler Velocimeter. This measures the velocity of the water just at one point
          very close to the device.
        </p>
        <p>
          <strong>U</strong>, <strong>V</strong> - Current velocity components along orthogonal axes. These estimates
          are at a number of equi-spaced vertical distances from the ADCP, i.e. the manufacturer&apos;s software has
          taken the tilt of the unit into account. For ADCPs on short mooring lines (e.g. those of the Shelf Array) that
          do not undergo large vertical displacement, these data can be used directly to estimate velocity at a range of
          depth levels. This is what we used to do here but now we take the vertical motion of the ADCP into account in
          order to show velocity in depth coordinates.
        </p>
        <p>
          <strong>ABSI</strong> - Acoustic Back-Scatter Intensity, without correction for the average range-dependent
          attenuation.
        </p>
        <p>
          <strong>ADCP-T</strong> - Temperature at the depth of the ADCP.
        </p>
        <p>
          <strong>ADCP-P</strong> - Pressure at the depth of the ADCP. This is a measure of both the mooring motion and
          the tidal elevation, and is shown to help trouble-shoot apparently spurious estimates of U and V. In some
          files this is a constant. Note that some instruments may suffer drift of the pressure data. Note also that
          mooring lines do stretch with time, so decreasing instrument depth is perfectly plausible.
        </p>
        <p>
          <strong>ADCP-D</strong> - Depth of the ADCP. For some files this is missing, so we use ADCP-P, or the
          &apos;nominal depth&apos; in the global attributes.
        </p>
        <p>
          <strong>ADCP-tilt</strong> - A combination of the ADCP Pitch and Roll data, which are in the ADCP instrumental
          coordinate system.
        </p>
        <p>
          <strong>SurfaceBinKnockdown</strong> - This is a diagnostic calculation of the approximate depth anomaly of
          the nominal surface bin resulting from the instrument tilt, also shown just for trouble-shooting purposes.
        </p>
        <p>
          <strong>Surface blanking interval</strong> - ADCP velocity estimates are contaminated by side-lobe
          interference with the surface for a significant distance beneath the surface. The thickness of this affected
          layer is about 12% of the nominal instrument depth but also depends on the instrument acoustic characteristics
          (frequency, beam width, etc), the tilt and the sea state.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Revisions</h2>
        <p>
          <strong className="text-imos-sea-blue">15 Dec 2025</strong> An update of the Shelf Array, taking the tally of
          individual current meter deployments for that array from 1419 to 1492. Most of these are new deployments, but
          there has also been some reprocessing of old files, which is great to see, e.g. 8 off Sydney in 2009 at ORS65:
          0901 to 0908 (sadly, 0909 and 0910 had fatal errors). (our ref: P52)
        </p>
        <p>
          <strong className="text-imos-sea-blue">6 May 2025</strong> An update of the Shelf Array, taking the tally of
          individual current meter deployments for that array from 1393 to 1419. Perhaps belatedly, this update includes
          a tightening of the required QC level. Now, we are rejecting data that have the velocity QC flag set to 3
          (&lsquo;bad but possibly correctable&rsquo;). We used to plot those data, so we could see the nature of the
          problem. But now we have decided it is more important just to show data we are most confident in. The result
          of this change is that 1) 5 deployments are skipped entirely and 2) for some deployments, the velocity is set
          to NaN when the pitch or roll exceeds a threshold, as happens when strong currents lay the mooring line over.
          (our ref: P51)
        </p>
        <p>
          <strong className="text-imos-sea-blue">24 Dec 2024</strong> An update of the Shelf Array, taking the tally of
          individual current meter deployments for that array from 1250 to 1393. Many of these &lsquo;new&rsquo; files
          are a tranche of ORS065 deployments (by Sydney Water). (our ref: P49)
        </p>
        <p>
          <strong className="text-imos-sea-blue">19 August 2024</strong> A refresh with just a few updates since July,
          the motivating one being that AODN had accidentally placed an NRSMAI dataset in the NRSNSI folder, something
          we should have flagged as a fatal error but only flagged it as an issue. With a few other issues (including
          removal of some duplicates) fixed as well, the tally for the shelf array is now 1250 (with only 4 assessed as
          having fatal errors). (our ref: P48)
        </p>
        <p>
          <strong className="text-imos-sea-blue">22 July 2024</strong> An update of the Shelf Array, taking the tally of
          individual current meter deployments for that array from 1198 to 1249. This revision includes a correction to
          the way we decide if &lsquo;northward&rsquo; means true north (what we want it to be) or magnetic north (as it
          is in the original data from the instrument). There are three types of files in the archive 1) old ones which
          are magnetic north (we think, so we apply a rotation ourselves), 2) newer ones which are true north, with a
          UCUR attribute compass_correction_applied to document the processing step, and 3) ones with an attribute
          magnetic_declination, which we take to mean the correction has been applied. We had been treating type 3 files
          as type 1 (so the rotation is applied twice) because they lacked the compass_correction_applied attribute. The
          number of files affected by this error was only about 24. So, users be warned: you should check all 3
          possibilities to avoid making the same error (which is fortunately only a few degrees in most cases, because
          few are in SE Aust where the correction is large). (our ref: P47)
        </p>
        <p>
          <strong className="text-imos-sea-blue">29 February 2024</strong> An update of the Shelf Array, taking the
          tally of individual current meter deployments for that array from 1142 to 1198. Many of the new files are for
          the Sydney &lsquo;Ocean Reference Station&rsquo; ORS065 just off Bondi. (our ref: P46)
        </p>
        <p>
          <strong className="text-imos-sea-blue">14 September 2023</strong> An update of the Shelf Array. The tally of
          individual current meter deployments is now 1142+96+186+21 = 1445 for Shelf, Deep(ADCP), Deep(ADV) and
          Southern Ocean arrays, respectively. A minor bug was fixed. Images with hotspots are now more precisely
          located (so what you click is what you get). (our ref: P44)
        </p>
        <p>
          <strong className="text-imos-sea-blue">9 June 2023</strong> An update of the Shelf Array. The tally of
          individual current meter deployments is now 1111+96+186+21 = 1414 for Shelf, Deep(ADCP), Deep(ADV) and
          Southern Ocean arrays, respectively. Also, seasonal (e.g. multi-summer) means were added to the maps of
          all-time and annual-mean currents. NB: in the course of this upgrade a bug was fixed - the numbers of
          device-days listed on those plots are now correct. (our ref: P43)
        </p>
        <p>
          <strong className="text-imos-sea-blue">15 Feb 2023</strong> An update of the Shelf Array, now with the
          Signature ADCPs reprocessed to include Height_Above_Sensor. The tally of individual current meter deployments
          is now 1087+96+186+21 = 1390 for Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean arrays, respectively. (our
          ref: P42)
        </p>
        <p>
          <strong className="text-imos-sea-blue">24 Nov 2022</strong> A major update of the <strong>deep water</strong>{' '}
          array, adding both the 2019-21 and 2021-22 deployments. The tally of individual current meter deployments is
          now 1039+96+186+21 = 1342 for Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean arrays, respectively. (our ref:
          P40)
        </p>
        <p>
          <strong className="text-imos-sea-blue">28 Sept 2022</strong> A routine update of the shelf array. The tally of
          deployments is now 1039+67+134+21 = 1257 for Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean arrays,
          respectively. (for ref: P37)
        </p>
        <p>
          <strong className="text-imos-sea-blue">31 March 2022</strong> A routine update of the shelf array. The tally
          of deployments is now 999+67+134+21 = 1217 for Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean arrays,
          respectively. (for ref: P35)
        </p>
        <p>
          <strong className="text-imos-sea-blue">21 August 2021</strong> A mostly-routine update focussing on the shelf
          array. The tally of deployments is now 963+67+134+21 = 1181 for Shelf, Deep(ADCP), Deep(ADV) and Southern
          Ocean arrays, respectively. This update includes data from 5 new sites in the NW in addition to
          recently-uploaded data elsewhere.
        </p>
        <p>
          <strong className="text-imos-sea-blue">11 March 2021</strong> A mostly-routine update focussing on the shelf
          array. The tally of deployments is now 898+67+134+21 = 1120 for Shelf, Deep(ADCP), Deep(ADV) and Southern
          Ocean arrays, respectively. This update corrects a minor error (introduced at the previous update) with some
          of the tabulated tidal constituents.
        </p>
        <p>
          <strong className="text-imos-sea-blue">16 Nov 2020</strong> As well as now including the 4th deployment of the
          EAC array, the Deep Water Moorings data set has a new address at the AODN. The tally of deployments is now
          875+67+134+21 = 1097 for Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean arrays, respectively.
        </p>
        <p>
          <strong className="text-imos-sea-blue">11 Feb 2020</strong> This week&apos;s update and re-read extended the
          data base further into 2019. The tally of deployments is now 841+53+110+19 = 1023 for Shelf, Deep(ADCP),
          Deep(ADV) and Southern Ocean arrays, respectively.
        </p>
        <p>
          <strong className="text-imos-sea-blue">27 Sep 2019</strong> This week&apos;s update and re-read extended the
          data base into 2019, while netting several reprocessed files for PPS and HIS. The tally of deployments is now
          815+53+110+19 = 997 for Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean arrays, respectively.
        </p>
        <p>
          <strong className="text-imos-sea-blue">26 Apr 2019</strong> This week we performed a re-read of the{' '}
          <a
            href="http://thredds.aodn.org.au/thredds/catalog/IMOS/catalog.html"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            AODN
          </a>{' '}
          archive after learning that the time vector in the files is NOT a record of the central times of the averaging
          intervals, but the BEGINNING times. To get the central time you have to add half of the averaging interval. In
          some files produced by recent versions of the toolbox, the TIME variable has an attribute
          seconds_to_middle_of_measurement (abbreviated here to &lsquo;shift&rsquo;) so you can do this. For other
          files, however, this information is missing. For short averaging intervals (av=1 or 2 minutes) this is not a
          big problem, but for instruments that were set to do longer averaging intervals (20-60 minutes), it is. In all
          cases, users wanting to analyse the very high-frequency spectral components will want to know the averaging
          interval (as well as the sampling interval), so we hope that a future re-process of the raw data will produce
          new files with 1) TIME being the center of the averaging interval (and confirm this is the case), 2) the
          averaging interval included, and 3) the number of pings averaged during that interval. This week&apos;s
          re-process also includes a minor bug fix that previously affected the &lsquo;dt_start&rsquo; and
          &lsquo;dt_end&rsquo; columns of the tables.
        </p>
        <p>
          <strong className="text-imos-sea-blue">21 Jan 2019</strong> Our latest regular re-read of the data archive at{' '}
          <a
            href="http://thredds.aodn.org.au/thredds/catalog/IMOS/catalog.html"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            AODN
          </a>{' '}
          found 766+54+110+19=949 data files for the Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean arrays,
          respectively (up 145 from 668+39+82+15=804 in May 2018). Navigation around the web site has also been
          improved.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Earlier revisions</h2>
        <p>
          <strong className="text-imos-sea-blue">24 May 2018</strong> Another re-read of the thredds server (including
          the Southern Ocean array for the first time) has netted 20 additional Shelf Array deployments and 15 Southern
          Ocean deployments. We have also implemented a new map-based way of navigating around the available data that
          also shows some basic statistics of the velocity data (such as mean, variance, tides, device-days).
        </p>
        <p>
          <strong className="text-imos-sea-blue">15 Nov 2017</strong> Another 8 months of new and/or re-processed Shelf
          Array and Deep Array data (including the 2nd EAC deployment) have now been added to our suite of plots. All
          648 Shelf Array ADCP/ADV deployments, 39 Deep Array ADCP and 82 Deep Array ADV deployments have been reloaded
          from the THREDDS server to ensure that they are current. Users should note that some data files in the archive
          still have erroneous or missing location, timezone (AEST when metadata says UTC) or magnetic declination
          information.
        </p>
        <p>
          <strong className="text-imos-sea-blue">14 Mar 2017</strong> Another year of new and/or re-processed ANMN data
          have now been added to our suite of plots. All 594 instrument deployments have been reloaded from the THREDDS
          server to ensure that they are current. Users should note that some data files in the archive still have
          erroneous or missing location, timezone (AEST when metadata says UTC) or magnetic declination information.
        </p>
        <p>
          <strong className="text-imos-sea-blue">19 Jan 2016</strong> Another year of new and/or re-processed ANMN data
          (55 instrument deployments) have now been added to our suite of plots. All 494 instrument deployments have
          been reloaded from the THREDDS server to ensure that they are current. Some data files with erroneous or
          missing location, timezone or magnetic declination information have been corrected prior to calculation of
          tidal constituents.
        </p>
        <p>
          <strong className="text-imos-sea-blue">2 Feb 2015</strong> Many new (especially ITF, KIM and PIL arrays)
          and/or re-processed (especially NRSKAI) ANMN data added. The updated time index page shows the magnitude of
          tidal residual currents after timing errors in a few data sets have been corrected.
        </p>
        <p>
          <strong className="text-imos-sea-blue">29 Jan 2015</strong> Tidal analysis has now been performed on all the
          ANMN velocity data (using the excellent{' '}
          <a
            href="http://www.po.gso.uri.edu/~codiga/utide/utide.htm"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            uTide
          </a>{' '}
          package). Summaries of the analyses have been added to the details table. See also the tidal ellipse maps. The
          time index pages now show the magnitude of the tidal-residual velocity as well as the total speed, graphically
          demonstrating the very large variation that exists around the country of the relative importance of tidal and
          non-tidal velocity components.
        </p>
        <p>
          <strong className="text-imos-sea-blue">21 Jan 2015</strong> Non-ADCP current meter (Acoustic Doppler
          Velocimeter, or ADV) data are now shown in addition to ANMN and DWM ADCP data. We now also show the Satellite
          Remote Sensing Altimeter Calibration sub-facility SRS-ALT ADV data. The DWM ADV data are very numerous so they
          are plotted separately. Some are much deeper than the ADCPs so we have defined a new set of 8 depth-strata for
          windowing the data.
        </p>
        <p>
          <strong className="text-imos-sea-blue">15 Jan 2015</strong> We have just re-plotted all the ANMN ADCP data. 33
          new or re-processed (using toolbox 2.3b) ANMN/NRS deployments have become available since 20 Sep 2014. The DWM
          deployments have all been re-processed (and now re-plotted) to correct an error in the processing of the
          backscatter data.
        </p>
        <p>
          <strong className="text-imos-sea-blue">25 Sep 2014</strong> Reprocessed SAIMOS data files (with corrected
          coordinate orientation information), and SA data for 2013 are now available from the IMOS portal. We have
          refreshed all our plots, which now show better alignment of the flow with bathymetry. We also looked a bit
          more closely at the consistency of the metadata and tabulated some diagnostics.
        </p>
        <p>
          <strong className="text-imos-sea-blue">29 Aug 2014</strong> Re-plotted all the ANMN velocity data. What&apos;s
          new:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Data from the IMOS DWM Deep Array are added.</li>
          <li>
            The Deep Array moorings make large vertical excursions when the flow is fast, obliging the user to regrid
            the data from range coordinates to range+depth coordinates (taking into account that some ADCPs point up and
            some point down). We now pass all data through this re-gridder. For most of the Shelf Array data, however,
            it has little or no effect.
          </li>
          <li>
            For uniformity and to accommodate the Deep Array data, the maps showing velocity in 6 depth-strata now show
            it for 8 strata: 0-2000m (i.e. a vertical-average of the available data), 10-30m, 50-70m, 80-120m, 150-200m,
            250-350m, 400-550m and 600-800m. Note that because ADCPs on long mooring lines only sample some depth levels
            when the current is either very strong or very weak, the time-mean of the available observations in some
            strata is not representative of the time-mean at that depth.
          </li>
          <li>
            Minor improvements to the graphics, e.g. variable scaling to accommodate the wide range of variability.
          </li>
        </ul>
      </div>
    </div>
  );
};

const FishSoopAboutData = () => {
  return (
    <div className="text-imos-nav-text space-y-8 text-base leading-relaxed">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">What is FishSOOP?</h2>
        <p>
          FishSOOP (Fishing vessels as Ships Of Opportunity Program) turns everyday fishing activity into ocean science
          fieldwork. By attaching small sensors to commercial fishing gear or equipment operated by citizen scientists,
          FishSOOP collects measurements of sea temperature at depth in coastal waters on and off the continental shelf.
        </p>
        <p>
          All data are quality-controlled and made available open source through the{' '}
          <a
            href="https://thredds.aodn.org.au/thredds/catalog/IMOS/SOOP/SOOP-FishSOOP/REALTIME/catalog.html"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            Australian Ocean Data Network (AODN) data server
          </a>
          , where you will find data from 2021 to nearly real time. FishSOOP provides unique insights into ocean
          conditions where it matters most to the fishing industry (where fishing occurs), and bridges the gap between
          fisheries and science. For further information:{' '}
          <a
            href="https://imos.org.au/facility/ships-of-opportunity/fishing-vessels-as-ships-of-opportunity"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            IMOS FishSOOP
          </a>
          ,{' '}
          <a
            href="https://www.unsw.edu.au/research/oceanography/fishsoop"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            UNSW FishSOOP
          </a>
          .
        </p>
        <p>
          The FishSOOP dataset comprises a large number of closely spaced deployments of temperature sensors, unevenly
          distributed but mostly over the continental shelf and slope. The Regional Profiles, Quarterly Anomalies and
          Depth Anomalies views are different ways of exploring this dataset.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Daily, regional plots</h2>
        <a
          href="/product/fish-soop/regional-profiles?region=SNSW"
          target="_blank"
          rel="noreferrer noopener"
          className="mx-auto block max-w-xl"
        >
          <img
            src="https://oceancurrent.aodn.org.au/fishsoop/SNSW/2026/latest.gif"
            alt="Example daily regional FishSOOP plot for Southern NSW"
            loading="lazy"
            decoding="async"
            className="w-full rounded-sm"
          />
        </a>
        <p>
          These pages have five panels, all of which show the FishSOOP temperature data during a 24h period, within one
          of 18 pre-determined regions around Australia. Showing multiple deployments at once greatly reduces the number
          of plots and allows quick intercomparison of nearby data.
        </p>
        <p>
          <strong>Left panel:</strong> the FishSOOP temperature observations are shown as black lines. To get a sense of
          how &apos;normal&apos; these observations are, we include the climatological average profile (as a bold blue
          line) at the location of the deepest FishSOOP deployment, as well as the climatological average plus 1, 2 and
          3 climatological standard deviations (as thin blue, green and red lines). The climatology used is the CSIRO
          Atlas of Regional Seas (CARS 2009), which, importantly, is now quite old.
        </p>
        <p>
          <strong>Centre panels, top,</strong> overlays the locations of FishSOOP data on a Sea Surface Temperature
          image. The colourbar for both SST and the FishSOOP 0-50m average temperature spans the CARS surface
          temperature range across the domain shown, plus [-2 2] &deg;C. Hover on the circled FishSOOP data to see the
          sensor 0-5m temperature, serial number, maximum depth reached and the water depth according to GEBCO_2019.
          Click to go to the AODN THREDDS server where you can download the data.
        </p>
        <p>
          <strong>Centre panels, bottom,</strong> shows colour-coded FishSOOP temperature observations vs time and
          depth. FishSOOP temperature sensors are attached to a wide variety of fishing gear, some of which go to the
          sea floor for several days, while others go to mid-depth for a while. The FishSOOP data does not include the
          total water depth, so we add the GEBCO_2019 estimate of this as a horizontal dashed line spanning the duration
          of the deployment.
        </p>
        <p>
          <strong>Right panels, top and bottom,</strong> show the averages, within depth ranges defined by the top and
          bottom halves of the deepest deployment, of the anomaly of the FishSOOP observed temperature. These anomalies
          are with reference to the CARS temperature estimates at the individual deployment locations - not a single
          location for all (as used in the left panel).
        </p>

        <h3 className="text-base font-semibold">Finding the plot covering your region and time of interest</h3>
        <a
          href="/product/fish-soop/regional-profiles?region=Au"
          target="_blank"
          rel="noreferrer noopener"
          className="mx-auto block max-w-xl"
        >
          <img
            src="https://oceancurrent.aodn.org.au/fishsoop/maps/2026/latest.gif"
            alt="FishSOOP data finder map"
            loading="lazy"
            decoding="async"
            className="w-full rounded-sm"
          />
        </a>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Go to the data finder and navigate time (using the arrows, or the calendar reached by clicking the year)
            until your region shows up as having data. This is indicated by the regional boundary line being thick, with
            a count of the number of deployments that day. Click anywhere within the box to see the temperature data. If
            the boundary is a thin line, there were deployments at some point in the year, so clicking takes you to a
            calendar. A dashed bounding box means no deployments that year. The data finder also gives a first glimpse
            of all the FishSOOP temperature data for the day, by showing the temperature anomaly observed by each
            deployment, averaged over 24h within depths of 0-50m.
          </li>
          <li>
            The Argo map page shows locations of selected FishSOOP profiles (chosen to avoid over-plotting) as well as
            Argo. Clicking a FishSOOP icon takes you to the appropriate daily, regional plot.
          </li>
          <li>Various other long-standing series of SST plots also have clickable FishSOOP symbols, as above.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">FishSOOP temperatures compared to historical observations</h2>
        <p>
          Here we compare the FishSOOP dataset with the CARS2009 climatology to see if the FishSOOP observations differ
          from CARS2009 in a systematic way. Because the temperature of the ocean varies strongly with depth, time and
          location, and the CARS seasonal climatology accounts for much of this, subtracting the CARS counterparts of
          the observations removes much of this signal, potentially allowing coherent patterns of change to emerge.
        </p>

        <h3 className="text-base font-semibold">Three-monthly, regional, layer-averages of the differences</h3>
        <a
          href="/product/fish-soop/average-anomalies?page=1"
          target="_blank"
          rel="noreferrer noopener"
          className="mx-auto block max-w-xl"
        >
          <img
            src="https://oceancurrent.aodn.org.au/fishsoop/anom2/tanom_avg_p1.gif"
            alt="3-month, regional, layer-averaged FishSOOP temperature anomalies"
            loading="lazy"
            decoding="async"
            className="w-full rounded-sm"
          />
        </a>
        <p>
          This is a multi-page summary of the FishSOOP data coverage, with two depth layers per page, showing the
          3-month average temperature difference (the anomaly) between FishSOOP data and CARS2009, and an indication
          (log10 number of x&apos;s) of the number of observations in each region-depth-time bin. At left next to each
          region name is the all-time average for that region and layer, with the Australia-wide region at the bottom of
          the list.
        </p>

        <h3 className="text-base font-semibold">All-time and annual-mean differences</h3>
        <a
          href="/product/fish-soop/depth-anomalies?region=Au&layer=8"
          target="_blank"
          rel="noreferrer noopener"
          className="mx-auto block max-w-xl"
        >
          <img
            src="https://oceancurrent.aodn.org.au/fishsoop/anom/tanom_reg18_Au_layer8.gif"
            alt="All-time and annual-mean FishSOOP temperature anomalies, Australia-wide, whole water column"
            loading="lazy"
            decoding="async"
            className="w-full rounded-sm"
          />
        </a>
        <p>
          For each region, the average difference between the FishSOOP observations and climatology (the
          &apos;anomaly&apos;) is shown for 8 overlapping depth layers, one of which is the whole water column
          (nominally 0-1000m), shown above.
        </p>
        <p>
          <strong>Panel 1</strong> Each dot on the map represents a single deployment of a FishSOOP sensor, located at
          the average position of the deployment, coloured by the layer-average anomaly. The title lists the 5th, 50th
          and 95th centile and the mean of the anomalies for the selected region and layer.
        </p>
        <p>
          <strong>Panel 2</strong> Each dot represents a layer-mean anomaly from one deployment, plotted at the mean
          depth of the data points within that depth window (or &apos;layer&apos;). The average (over all regions and
          time) of the layer-average temperature anomalies is shown by the horizontal position of the red line, whose
          vertical extent shows the depth window of the layer.
        </p>
        <p>
          <strong>Panel 3</strong> shows the temporal variability of the anomalies, with annual averages (red lines)
          overlain on the individual observations.
        </p>
        <p>
          The CARS2009 climatology is based on ocean observations made before about 2008, so the mean anomaly of the
          FishSOOP observations can be interpreted as a change over the following decades. This is consistent with
          published estimates of the rate of upper-ocean warming, and with the lack of strong vertical gradient (down to
          about 500m) found in Argo data by Roemich et al. (2015), suggesting the observed difference is not an artefact
          of the comparison.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Technical documentation</h2>
        <p>
          Technical details of the FishSOOP program are documented by Lago, V., M. Roughan and S. Caon. (2025) IMOS
          Fishing Vessels as Ships of Opportunity (FishSOOP), Real-time Quality Assurance and Quality Control Practice
          Manual, Version 1.0. Integrated Marine Observing System.{' '}
          <a
            href="https://repository.oceanbestpractices.org/handle/11329/2629"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            doi.org/10.26198/sp0r-p448
          </a>
          . <em>OceanCurrent</em> does not perform any additional editing of the dataset available at the AODN data
          server: only data flagged as good (flag value 1) are shown.
        </p>
        <p>
          Stay in the loop! Subscribe to the{' '}
          <a
            href="https://www.unsw.edu.au/research/oceanography/fishsoop/fishsoop"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            FishSOOP newsletter
          </a>
          . For use cases, extreme events and the quality-control log, see the legacy{' '}
          <a
            href="https://oceancurrent.aodn.org.au/fishsoop/fishsoopnotes.htm"
            target="_blank"
            rel="noreferrer noopener"
            className="text-imos-sea-blue"
          >
            FishSOOP notes
          </a>
          .
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Revision history</h2>
        <p>
          <strong className="text-imos-sea-blue">20 October 2025:</strong> First exposure draft.
        </p>
        <p>
          <strong className="text-imos-sea-blue">17 December 2025:</strong> News item announcing public access.
        </p>
        <p>
          <strong className="text-imos-sea-blue">January 2026:</strong> Annual and quarterly averages added.
        </p>
        <p>
          <strong className="text-imos-sea-blue">16 February 2026:</strong> Notes section substantially added-to and
          edited.
        </p>
      </div>
    </div>
  );
};

export { EACMooringArrayAboutData, ArgoAboutData, CurrentMetersAboutData, TidalCurrentsAboutData, FishSoopAboutData };
