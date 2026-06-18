export const CurrentMetersAboutData = () => {
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
