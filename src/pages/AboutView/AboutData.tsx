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
          loading="lazy"
          decoding="async"
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
          loading="lazy"
          decoding="async"
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
          className="w-full rounded"
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
          className="w-full rounded"
        />
      </a>
    </div>
  );
};

const CurrentMetersAboutData = () => {
  return (
    <div className="space-y-8 text-base leading-relaxed text-imos-nav-text">
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

export { EACMooringArrayAboutData, ArgoAboutData, CurrentMetersAboutData };
