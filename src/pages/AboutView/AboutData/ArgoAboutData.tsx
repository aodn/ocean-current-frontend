export const ArgoAboutData = () => {
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
