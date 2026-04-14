const EACMooringArrayAboutData = () => {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="flex-1 space-y-4 text-base leading-relaxed text-imos-nav-text">
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
          className="w-full rounded"
        />
        <p className="text-sm leading-normal text-imos-dark-grey">
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
    <div className="space-y-4 text-base leading-relaxed text-imos-nav-text">
      <p>
        The Argo like the example below show floats that reported data within a few days of the indicated date. The
        colour-fill of the float indicates the difference between the float&apos;s estimate of steric height anomaly
        (relative to 1000m) and the satellite altimeters&apos; estimate of the sea level anomaly (relative to the
        long-term mean, see panel 5 discussion below). Green signals that both observing systems are in agreement, while
        blue or red indicates that there might be a problem we need to investigate. Unfilled circles indicate floats
        that did not produce useful data to at least 1000m. The [PREV] button will go back several years. The [DATE
        INDEX] goes back to 2004.
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
          className="w-full rounded"
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
          className="w-full rounded"
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
            href="http://www.marine.csiro.au/~dunn/cars2009/"
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
      <h5 className="font-semibold">Panels 1 and 2 (from left)</h5>
      <p>
        The <strong>black</strong> lines are the fast delivery versions of the Argo float&apos;s temperature and
        salinity observations. <strong>Linetypes:</strong> dotted=raw data, dashed=QC&apos;d raw data,
        dot-dashed=adjusted data, solid=adjusted, QC&apos;d data. The quality control and adjustments are those included
        in the Argo fast delivery data files. The <strong>red</strong> lines are climatological estimates, i.e. what is
        &apos;normal&apos; for the time of year at the float&apos;s location. The <strong>blue</strong> lines are synTS
        at the location of the Argo float. In the example above, Argo and synTS are in near-perfect agreement that the
        ocean is colder than normal all the way to 2000m and fresher than normal down to 1000m.
      </p>
      <h5 className="font-semibold">Panel 3</h5>
      <p>
        These lines show differences from the climatological profiles, of both temperature and salinity. The Argo T, S
        and P data are only those that pass the fast delivery QC, i.e. flags 1, 2 or 5. Dashed lines are the original
        instrument data, solid lines are adjusted (by the PI), e.g. for known calibration error.
      </p>
      <h5 className="font-semibold">Panel 4</h5>
      <p>
        This shows the AMSR-E (Advanced Microwave Scanning Radiometer, which has only coarse spatial resolution but sees
        through cloud) three-day average sea surface temperature to show the regional context of the Argo profile. The
        surface-most Argo observation is encoded within the symbol for comparison with the satellite. The colour bar
        (not shown) is 6K wide and is centered on the climatological value at the float&apos;s location.
      </p>
      <h5 className="font-semibold">Panel 5</h5>
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
      <h4 className="text-base font-semibold">Example 2: A submerged mixed layer</h4>
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
          className="w-full rounded"
        />
      </a>
      <h4 className="text-base font-semibold">Example 3: disagreement of Argo and synTS</h4>
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
          className="w-full rounded"
        />
      </a>
    </div>
  );
};

export { EACMooringArrayAboutData, ArgoAboutData };
