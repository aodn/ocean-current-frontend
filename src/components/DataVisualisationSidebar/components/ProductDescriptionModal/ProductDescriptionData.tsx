const OceanColourModalData = () => {
  return (
    <div className="p-4 text-gray-800">
      <p className="mb-4">
        Daily images of chlorophyll-a estimates from the MODIS sensor on NASA’s Aqua satellite indicating the amount of
        phytoplankton in the water. Chlorophyll-a can be detected by satellite by measuring the relative amounts of
        light coming from the ocean at different wavelengths. The Ocean Colour model (OC3) that converts the satellite
        observations to chlorophyll-a concentration assumes that chlorophyll-a is the only thing in the water affecting
        the measurements. This is largely true in the open ocean but in coastal waters tannin from rivers and suspended
        sediments can be present and cannot be differentiated from chlorophyll-a.
      </p>
      <p className="mb-4">
        In the open ocean we can be confident the satellite images represent productivity, but in very shallow coastal
        waters or over reefs, bottom reflectance and bottom vegetation can also contribute to the estimate. There are
        times when a large chlorophyll-a signal in coastal waters can be relied on to infer productivity. For example,
        any summertime upwelling event off the Bonney Coast, where the shelf is deep and there is little river runoff.
        Conversely, there are times when we can be confident the satellite images are representing something else, such
        as the beautiful outline of the reefs on the central Great Barrier Reef or suspended sediment and dissolved
        organic matter in the aftermath of Cyclone Debbie.
      </p>
    </div>
  );
};

const SnapshotModalData = () => {
  return (
    <div className="p-4 text-gray-800">
      <p className="mb-4">
        This is our legacy system for displaying the long archive of SST images from the NOAA Polar-Orbiting
        Environmental Satellites (and MODIS and VIIRS recently). Snapshot SST, as the name suggests, shows individual
        SST images without any time-averaging. Where the sky is clear, these images provide great detail. Unfortunately,
        individual SST images almost always have some gaps due to cloud. For this product, we fill those gaps using the
        last-available view of the ocean, no matter how old that is. The gap filling helps when viewing the animations
        as the eye is drawn to the movement of the water in cloud-free areas and not the cloud gaps.
      </p>
    </div>
  );
};

const SixDaySstModalData = () => {
  return (
    <div className="p-4 text-gray-800">
      <p className="mb-4">
        <strong className="text-imos-sea-blue">SST:</strong> 6-day composite SST (L3S-6d, QL≥2) using night-only SST in
        a 6-day window centred on <strong>t0</strong>, the analysis time. The 6-day window is used to maximise coverage
        and night-only SST is used to minimise bias due to diurnal heating. The 6d composites are produced by the BoM
        for IMOS using GHRSST protocol on a 2x2km grid. All SST is adjusted by the SSES bias before compositing and an
        offset of 0.17C is added to obtain the bulk SST.
      </p>
      <p className="mb-4">
        <strong className="text-imos-sea-blue">SST Anomaly:</strong> The SSTAARS climatology, calculated for each 2x2km
        pixel for the analysis date, <strong>t0</strong>, is removed from the SST.
      </p>
      <p className="mb-4">
        <strong className="text-imos-sea-blue">Percentiles:</strong> The SST anomalies are ranked against almost 25
        years of anomalies (1992-2016). The percentiles have been evaluated at each pixel for every day of the year.
        Anomalies falling in the &lt;10 rank (dark blue) are the coldest 10% of observed anomalies at that pixel for
        that day of the year. Similarly, anomalies ranked &gt;90 are the hottest 10% of observed anomalies. Green
        percentiles (two shades) represent the average 20% of temperature anomalies.
      </p>
    </div>
  );
};

const AdjustedSeaLevelAnomalyModalData = () => {
  return (
    <div className="p-4 text-gray-800">
      <p className="mb-4">
        <strong className="text-imos-sea-blue">Adjusted Sea Level:</strong> We used to call this Gridded Sea Level but
        changed the name in Sep 2021. Adjusted Sea level (like GSL) is sea level minus two rapidly-varying sea level
        signals mostly due to barotropic dynamics: astronomical tides and the ocean&apos;s response to atmospheric
        pressure (which is to rise about 10 cm for each 10 hPa fall of pressure). Adjusted Sea Level is thus a measure
        of the slow modes of the ocean. The slow modes are largely in geostrophic balance, so we can estimate the
        near-surface velocity from the gradients of ASL. ASL is also a measure of depth-integrated density (and thus
        ocean heat content), as shown on our Argo pages where ASL is compared with in-situ determinations of steric
        height anomaly.
      </p>
      <p className="mb-4">
        <strong className="text-imos-sea-blue">Terminology:</strong> The once-traditional term &apos;adjusted&apos; is
        commonly omitted by many agencies and oceanographers. We did this, too, then regretted it, because dropping the
        &apos;adjusted&apos; leaves no short name for &apos;unadjusted sea level&apos;, which is the quantity most
        relevant to users interested in coastal inundation (see our Australia/NZ maps of Non-tidal Sea Level). Another
        candidate name for Adjusted Sea Level is
        <a
          href="https://link.springer.com/article/10.1007/s10712-019-09525-z"
          target="_blank"
          rel="noreferrer"
          className="text-imos-sea-blue"
        >
          ocean dynamic sea level
        </a>
        . Related names include: dynamic height, dynamic topography, and subsurface pressure.
      </p>
      <p className="mb-4">
        <strong className="text-imos-sea-blue">Adjusted Sea Level Anomaly:</strong> By &apos;anomaly&apos;, we mean the
        departure from the long-term (1993-2012) mean. We (like most users of altimetry) estimate ASLA by subtracting
        the long-term mean of ASL from the altimeter observations. This must be done in order to remove the ~100m sea
        level highs and lows (with respect to a smooth surface) mostly due to gravity perturbations associated with sea
        floor topography. We do it using a correction supplied by the space agencies, which is the Mean Sea Surface
        (MSS, evaluated along the precise track of the altimeter). Unfortunately this also removes the ~1m scale highs
        and lows of the Mean Dynamic Topography (MDT) associated with the long-term mean of the ocean circulation (that
        causes the Coral Sea off Queensland to be about 1m higher than waters off Tasmania with respect to the geoid).
        We add the Bluelink ocean model estimate of the MDT to our altimetry-derived maps of ASLA (formerly known as
        GSLA) to produce ASL, from which we estimate velocities that include the mean. Most users, however, are more
        interested in the anomaly of sea level (adjusted or not) than the more abstract concept of sea level with
        respect to the geoid. Showing the anomaly also allows use of a more restricted colour bar, and to show the
        along-track altimetry data closer to its supplied form.
      </p>
      <p className="mb-4">
        <strong className="text-imos-sea-blue">
          Centile rankings of (daily, detrended) Adjusted Sea Level Anomaly:
        </strong>{' '}
        This is a way of seeing &apos;how anomalous&apos; the anomaly at a particular place and time is, compared with
        past anomalies at the same place. But sea level anomalies are not randomly distributed about a mean value,
        because sea level has a significant trend; about 100mm in the last 28 years (~3.7mm/year). Nor does it have a
        very regular annual cycle{' '}
        <a
          href="https://oceancurrent.aodn.org.au/GSLA_stats/DM02/GSLA_Au_h.html"
          target="_blank"
          rel="noreferrer"
          className="text-imos-sea-blue"
        >
          [see time series plot of the Australasia-region average adjusted sea level anomaly]
        </a>
        . So we have chosen to show the daily centile rankings of ASLA after subtracting the Australasia-region trend,
        but not the average annual cycle, in contrast to how we rank anomalies of Sea Surface Temperature. Otherwise,
        the interpretation of the centile maps is the same: if a point on the map is red, it means that the adjusted sea
        level that day, at that location, falls within the top few percent of all observed anomalies (detrended as
        described above). Note that we have used a non-linear colour scale, in order to show more discrimination at the
        high and low ends.
      </p>
      <p className="mb-4">
        <strong className="text-imos-sea-blue">Centile levels of the 28-year, detrended data set:</strong> This is the
        reference data set against which the detrended anomalies for a particular day are compared. For efficiency, it
        is not re-computed every day. Consequently, and because eddies do not follow in each other&apos;s tracks, new
        observations can fall outside the range of the
        <a
          href="https://oceancurrent.aodn.org.au/GSLA_stats/DM02/"
          target="_blank"
          rel="noreferrer"
          className="text-imos-sea-blue"
        >
          centile levels of the reference data set
        </a>
        .
      </p>
    </div>
  );
};

const FourHourSstModalData = () => {
  return (
    <div className="p-4 text-gray-800">
      <p className="mb-4">
        Four-hour SST is a 4-hour composite SST produced every 4 hours at 2km resolution, using all available satellite
        SST:
      </p>
      <ul className="mb-4 list-inside list-disc">
        <li className="mb-2">10min Himawari-8 and Himawari-9 from the Bureau of Meteorology</li>
        <li className="mb-2">N15, N18, N19 from BoM</li>
        <li className="mb-2">MetopA &amp; MetopB from NOAA</li>
        <li className="mb-2">VIIRS Suomi-NPP from NOAA</li>
      </ul>
      <p className="mb-4">
        <strong className="text-imos-sea-blue">Method:</strong> Step 1: 4-hour composites of Him8 SST (with 2-4km
        resolution) are made, taking the median SST at every pixel. Step 2: the final composite is made using the Him8
        composite and all other available AVHRR and VIIRS SST. The composite is made in two steps so that if the BoM
        Him8 SST is unavailable we can replace it with NOAA hourly Him8 composites. All SST is adjusted by the SSES bias
        before compositing and an offset of 0.17C is added to obtain the bulk SST.
      </p>
      <div className="mb-4">
        <strong className="text-imos-sea-blue">Available:</strong> 11 Aug 2017 to present
      </div>
      <div className="mb-4">
        <strong className="text-imos-sea-blue">SST:</strong> All SST of QL&gt;=4 (QL=4 or 5 are the BoM&apos;s highest
        Quality Levels)
      </div>
      <div className="mb-4">
        <strong className="text-imos-sea-blue">Filled SST:</strong> the gaps in the SST are filled with the most recent
        previous composites
      </div>
      <div className="mb-4">
        <strong className="text-imos-sea-blue">SST Age:</strong> the age of the Filled SST
      </div>
      <div className="mb-4">
        <strong className="text-imos-sea-blue">Wind Speed:</strong> BoM ACCESS-R 3hr average wind speed and direction
        for the analysis time
      </div>
    </div>
  );
};

const ClimatologyModalData = () => {
  return (
    <div className="p-4 text-gray-800">
      <p className="mb-4">
        SSTAARS (SST Atlas of Australian Regional Seas) was created by fitting four annual sinusoids (and a trend) to 25
        years of daily, night-only AVHRR SST, L3S-1d, provided by the Bureau of Meteorology (BoM). The climatology
        provides a functional form of the seasonal SST for every 2km x 2km pixel which can be evaluated daily and is
        available from the AODN.
      </p>
      <div className="mb-4">
        <strong className="text-imos-sea-blue">SST:</strong> the annual mean and monthly evaluations of SSTAARS SST
        (without the trend)
      </div>
      <div className="mb-4">
        <strong className="text-imos-sea-blue">Data Count:</strong> the total number of days of cloud free SST at each
        pixel that were available for the climatology for each month - out of a possible 750 days.
      </div>
      <div className="mb-4">
        <strong className="text-imos-sea-blue">Sea level height:</strong> seasonal GSLA + OFAM3 mean sea level height,
        white contours every 0.1m.
      </div>
      <div className="mb-4">Geostrophic velocity: estimated from the sea level height</div>
      <p className="mb-4">
        <strong className="text-imos-sea-blue">Bathymetry:</strong> We have included a few more bottom contours to help
        interpret the climatology. The 10m, 200m and 1000m contours of bathymetry in cyan and the 50m contour in dark
        blue.
      </p>
    </div>
  );
};

const EACMooringArrayModalData = () => {
  return (
    <div className="p-4 text-gray-800">
      <p className="mb-4">
        Daily estimates of East Australian Current (EAC) properties calculated from the CSIRO EAC gridded mooring
        product.
      </p>
      <p className="mb-4">
        The upper left plot is the time-series of the EAC transport summed from North Stradbroke to the outer EAC
        mooring and from the sea surface to 1500 m depth (solid black line). The green dot identifies the day being
        displayed on the page.
      </p>
      <p className="mb-4">
        The map below is our 6-day Sea Surface Temperature (SST) composite product, with the daily cumulative EAC
        transport from North Stradbroke to the outer EAC mooring overlain (solid black line). The transport value at the
        mid-point and end of the distance between North Stradbroke to the outer EAC mooring is provided (numbers written
        near the larger black dots). Black dots show locations of moorings, with larger black dots indicating the
        mid-point and end of the array.
      </p>
      <p className="mb-4">
        The plots on the right show the EAC mooring array temperature, salinity, and northward and eastward velocity
        interpolated onto a 1-2 km grid along the mooring line segment (black dashed line on SST map). The first column
        are the daily property sections, and the second column are the anomalies from the 2012-2022 seasonal
        climatology. The small black dots show the available data at each mooring which are used to create the filled
        mooring data and EAC gridded data product. The black dots at the surface indicate the SST and sea surface
        salinity that are included in the gridded product.
      </p>
      <p className="mb-4">
        <strong className="text-imos-sea-blue">Method (CSIRO EAC gridded mooring product):</strong> (1) A 5-day filter
        is applied to the hourly-depth mooring data to remove tides and other high frequency processes. (2) Data are
        interpolated to a common daily time stamp to create the daily-depth temperature and salinity data. (3) An
        Iterative Completion Self-Organizing Maps (ITCOMPSOM) method, based on the SOM (Self Organising Maps) neural
        network machine learning algorithm, is used to fill temporal and vertical data gaps. (4) The filled velocity,
        temperature and salinity are interpolated onto a 1-2 km regular grid between the North Stradbroke Island and
        outer EAC mooring.
      </p>
      <p className="mb-4">
        For more information on this product see
        <a
          href="https://oceancurrent.aodn.org.au/eac_about.php"
          target="_blank"
          rel="noreferrer"
          className="text-imos-sea-blue"
        >
          {' '}
          here
        </a>{' '}
        and{' '}
        <a href="https://doi.org/10.25919/sfw7-hc46" target="_blank" rel="noreferrer" className="text-imos-sea-blue">
          here
        </a>
        .
      </p>
    </div>
  );
};

const ArgoModalData = () => {
  return (
    <div className="p-4 text-gray-800">
      <p className="mb-4">
        Temperature and salinity data from the selected float compared with satellite-adjusted climatology, down to
        2000m in the Australian region.
      </p>
    </div>
  );
};

const TidalCurrentsModalData = () => {
  return (
    <div className="p-4 text-gray-800">
      <h2 className="mb-4 text-lg font-semibold">Half-hourly, regional maps</h2>
      <p className="mb-4">
        These show predictions of tidal sea level and depth-average tidal current from tide gauge and current meter
        observations as well as from the CSIRO tidal model.
      </p>
      <p className="mb-4">
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
      <p className="mb-4">
        Mouse over the observation sites to see detailed information. For current meters this includes the magnitude and
        direction of the observation-based predicted tidal current, the rms magnitude of sub-tidal variability measured
        by that current meter and the magnitude and direction of the observed mean current.
      </p>

      <p className="mb-4">
        Clicking the observation sites takes you to month-per-page graphs of observation-based predictions compared with
        the model-based predictions.
      </p>

      <h2 className="mb-4 text-lg font-semibold">Month-per-page graphs</h2>
      <p className="mb-4">
        For each current meter or tide gauge, these graphs compare the observation-based tidal predictions
        (&apos;o&apos; for short) with co-located model-based tidal predictions (&apos;m&apos;). The current velocities
        are shown as speed and direction, and components along East, North and the major and minor axes of the observed
        M2 tidal ellipse.
      </p>
      <p className="mb-4">
        The agreement of o and m is characterised by listing rms values of each separately, as well as of the model
        error m-o. For currents this is done for the scalar components as well as for the vector difference. If the
        vector error can be reduced by lagging or advancing the model, details are given. The direction error is
        characterised by listing the 25th, 50th and 75th percentiles.{' '}
      </p>
      <p className="mb-4">
        The [PREV] and [NEXT] links step a month at a time (or to an adjacent location if the next month is not done
        yet), or back to when actual observations can be included on the graph (1983 in some cases). Browsing the graphs
        with actual observations reveals how Australia&apos;s ocean currents range from tidally-dominated (e.g. in Bass
        Strait as shown at right), to mixed (e.g.
        <a
          href="https://oceancurrent.aodn.org.au/tides/monthplots/IMOS_GBRPPS_201207.html"
          className="mx-1 text-[#52BDEC]"
        >
          Palm Passage
        </a>
        ) to non-tidal, such as off
        <a
          href="https://oceancurrent.aodn.org.au/tides/monthplots/IMOS_BMP070_201704.html"
          className="mx-1 text-[#52BDEC]"
        >
          Bateman&apos;s Bay
        </a>
        .
      </p>

      <h2 className="mb-4 text-lg font-semibold">Technical information</h2>

      <h3 className="mb-4 text-lg font-semibold">Current velocity observations</h3>
      <p className="mb-4">
        A novel aspect of the work presented here is the presentation and assessment of predictions of depth-averaged
        tidal currents (sea level information is included for completeness rather than novelty, and does not replace the
        predictions published by the
        <a href="http://www.bom.gov.au/oceanography/projects/ntc/ntc.shtml" className="mx-1 text-[#52BDEC]">
          National Operations Centre (NOC) Tidal Unit of the Bureau of Meteorology
        </a>
        ). The observation-based predictions of tidal current are made at 100 locations around Australia, using
      </p>
      <ul className="mb-4 list-inside list-disc">
        <li className="mb-2">
          <strong className="text-[#52BDEC]">60 IMOS ADCPs;</strong> these Acoustic Doppler Current Profilers were
          deployed by or have been contributed to
          <a href="https://oceancurrent.aodn.org.au/timeseries" className="mx-1 text-[#52BDEC]">
            IMOS
          </a>
          . These observations can be assumed to be quite accurate. Here, we use the depth-average of the observations,
          which span the whole water column except for a few m at the bottom, and the surface-most 15%
        </li>
        <li className="mb-2">
          <strong className="text-[#52BDEC]">13 CSIRO current meters;</strong> selected from the
          <a href="https://www.cmar.csiro.au/data/trawler/" className="mx-1 text-[#52BDEC]">
            CSIRO collection
          </a>
          for being in locations (Bass Strait, NW shelf and Gulf of Carpentaria) where tidal currents are significant.
          These non-ADCP moorings included either one or two current meters. In the case of two, we have simply averaged
          the observations for the record segments when both were operating.
          <a href="https://oceancurrent.aodn.org.au/tides/CSIROmeters/" className="mx-1 text-[#52BDEC]">
            [plots of the individual instrument records, their average and the tidal fit]
          </a>
        </li>
        <li className="mb-2">
          <strong className="text-[#52BDEC]">10 UNSW Aanderaas:</strong> Middleton et al. (1984) and Griffin et al.
          (1987) studied the anomalous tides of the Southern Great Barrier Reef using these observations made by single,
          mechanical RCM4 Aanderaa current meters. By modern standards, these instruments are not very accurate.
          Firstly, the flow direction is only sampled once an hour, so short-period changes of direction are not
          averaged. To minimise noise due to waves, the instruments were moored fairly low in the water column, at the
          risk of under-estimating the depth-average velocity. Some had to be deployed close to islands, with the result
          that they recorded effects (such as asymmetric ebb and flood directions) that the model is unlikely to be able
          to reproduce due to its imperfect representation of topography. Flood-ebb asymmetries may not be well
          represented by a sum of harmonic tidal constituents, either. The instrument deployed west of Bugatti Reef, for
          example, has one of the highest rms vector differences from the model. This can be
          <a
            href="https://oceancurrent.aodn.org.au/tides/monthplots/UNSW_W_Bugatti_Rf_198411.html"
            className="mx-1 text-[#52BDEC]"
          >
            seen
          </a>
          to be mostly due to persistent offsets between the observed flow direction and both the modelled and tidal-fit
          flow directions. The situation with the Tern Island meter is slightly different. Here, the observed flood tide
          is to the SSW, but the ebb was more likely to be either to the ENE or NW instead of NNE, as shown in the
          hodograph at right (click to enlarge). Neither the tidal self-prediction nor the model represent this. The
          impeller of the
          <a
            href="https://oceancurrent.aodn.org.au/tides/monthplots/UNSW_Creal_Rf_198412.html"
            className="mx-1 text-[#52BDEC]"
          >
            Creal Reef
          </a>
          meter appears to be intermittently obstructed, so the tidal prediction there is probably not accurate,
          explaining the large discrepancy from the model
        </li>
        <li className="mb-2">
          <strong className="text-[#52BDEC]">14 ARENA ADCPs:</strong> These were deployed in Banks Strait (NE Tas) and
          Clarence Strait (near Darwin) by Penesis et al. (2020) as part of
          <a href="http://austen.org.au/" className="mx-1 text-[#52BDEC]">
            AUSTEn
          </a>
          , to assess the renewable energy potential of the strong currents there.
        </li>
      </ul>
      <p className="mb-4">
        We have used the UTide tidal analysis software of Codiga (2011) to compute amplitudes and phases for up to 8
        (depending on the record length) semi-diurnal and diurnal (M2 S2 N2 K2 O1 K1 P1 and Q1) tidal velocity
        constituents
        <a href="http://oceancurrent.aodn.org.au/timeseries/ANMN_P34/ANMNtable.html" className="mx-1 text-[#52BDEC]">
          (details for IMOS sites)
        </a>
        , allowing predictions to then be made for any chosen period.
      </p>

      <h3 className="mb-4 text-lg font-semibold">Sea level observations</h3>
      <p className="mb-4">
        In contrast to the situation with tidal currents, predictions of tidal sea level are already widely available
        and heavily used. We obtained tide gauge data from
      </p>
      <ul className="mb-4 list-inside list-disc">
        <li className="mb-2">
          more than 700 locations from the
          <a href="http://www.bom.gov.au/oceanography/projects/ntc/ntc.shtml" className="mx-1 text-[#52BDEC]">
            National Operations Centre (NOC) Tidal Unit of the Bureau of Meteorology
          </a>
          . Some of these data are less accurate than others so please see the BoM for the official predictions and
          their comments on reliability
        </li>
        <li className="mb-2">9 from the UNSW SGBR data set (which are all thought to be high quality). </li>
      </ul>

      <h3 className="mb-4 text-lg font-semibold">Modelled tidal sea level and currents</h3>
      <p className="mb-4">
        The CSIRO tidal model is a barotropic (2-dimensional, with no vertical variation of velocity) implementation of
        COMPAS, a so-called unstructured-mesh model because the grid resolution varies from 400m in places to 6km
        offshore. This allows better representation of the sea floor than is possible with a global model, from which
        the properties of the deep-ocean tide are obtained. The
        <a href="http://www.tpxo.net/" className="mx-1 text-[#52BDEC]">
          Oregon State University TPXO tidal model
        </a>
        (Egbert and Erofeeva, 2002) provides estimates of the 8 tidal constituents listed above on a 1/6° (latitude and
        longitude) grid, for the sea level and the depth-averaged current velocity. The TPXO9 tidal model assimilates
        satellite altimeter and tide gauge measurements of sea level to make it as accurate as possible. For more
        information see:
      </p>
      <ul className="mb-4 list-inside list-disc">
        <li className="mb-2">
          our 2021 assessment of the model:
          <a href="https://doi.org/10.5194/gmd-14-5561-2021" className="mx-1 text-[#52BDEC]">
            Griffin, Herzfeld, Hemer and Engwirda (2021)
          </a>
        </li>
        <li className="mb-2">
          <a href="http://www.marine.csiro.au/~griffin/ARENA_tides/tides/" className="mx-1 text-[#52BDEC]">
            further details of model performance
          </a>
        </li>
        <li className="mb-2">
          <a href="http://www.marine.csiro.au/~griffin/ARENA_tides/tides/energystats/" className="mx-1 text-[#52BDEC]">
            statistics of the tides relevant to renewable energy
          </a>
        </li>
        <li className="mb-2">
          tidal constituents from both the model, and the validation data set we used.
          <a href="https://doi.org/10.25919/q8dw-c732" className="mx-1 text-[#52BDEC]">
            CSIRO data portal digital archive
          </a>
        </li>
      </ul>

      <h3 className="mb-4 text-lg font-semibold">Discussion</h3>
      <p className="mb-4">
        There are 3 main reasons why there are not presently many &apos;official predictions&apos; of tidal currents to
        accompany the predictions of tidal height published, for example, by the
        <a href="http://www.bom.gov.au/australia/tides/" className="mx-1 text-[#52BDEC]">
          BoM
        </a>
        (see the &apos;Tidal streams&apos; button):
      </p>
      <ol className="list-decimal pl-5 font-sans leading-relaxed text-gray-800">
        <li>
          the
          <a
            href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P34/mapst/01_Aust_M2_1.html"
            className="mx-1 text-[#52BDEC]"
          >
            tidal component
          </a>
          of the current is weaker than (or comparable to) the
          <a
            href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P34/mapst/01_Aust_vrms_1.html"
            className="mx-1 text-[#52BDEC]"
          >
            non-tidal components
          </a>
          of the current for much of Australia&apos;s marine estate (i.e. nearly everywhere south of 25°S). Our index
          map shows the locations of 100 available current meters, colour-coded by whether tidal currents are dominant
          (48), comparable (20), or weaker (32) than non-tidal currents. For sea level, in contrast, there are few
          places where the amplitude of non-tidal variability is comparable to, let alone exceeds, the amplitude of
          tidal variability
        </li>
        <li>
          tidal currents are intrinsically more complex - varying markedly over short distances in line with the sea
          floor topography, as you can see by toggling between the maps of sea level and speed, so modelling and
          predicting them accurately is more difficult
        </li>
        <li>
          tidal currents have been measured at fewer places than tidal height, so model accuracy cannot be guaranteed in
          as many places.{' '}
        </li>
      </ol>
      <p className="mb-4">
        For these 3 reasons, we only publish tidal current predictions for selected regions, as discussed by
        <a href="https://doi.org/10.5194/gmd-14-5561-2021" className="mx-1 text-[#52BDEC]">
          Griffin, Herzfeld, Hemer and Engwirda (2021)
        </a>
        , and our predictions are not officially certified for navigation.
      </p>
      <p className="mb-4">
        Models like
        <a href="https://ereefs.org.au/ereefs" className="mx-1 text-[#52BDEC]">
          eReefs
        </a>
        simulate both tidal and non-tidal currents, and similar models are also being constructed for other regions
        around Australia. Regardless of these developments, however, we think there is value in publishing predictions
        of the tidal component of the currents without attempting to include the non-tidal component.
      </p>

      <h3 className="mb-4 text-lg font-semibold">Definitions</h3>
      <p className="mb-4">
        <strong className="text-[#52BDEC]">tide</strong> The term &apos;tide&apos; is sometimes used to describe any
        variation of the sea level or the current. Here, we use the oceanographer&apos;s definition, which is that the
        tide is the astronomically forced variation of sea level and current. Hence, and in contrast to the non-tidal
        variability in the ocean, the tides are equally predictable for any period in the future (or the past), because
        the tidal forcing is precisely linked to the orbit and rotation of the Earth and the orbit of the moon.
      </p>
      <p className="mb-4">
        <strong className="text-[#52BDEC]">tidal prediction</strong> The most accurate way to predict the tides
        (currents or sea level) at a certain location is to obtain a record of the tides for a period then do what is
        known as a tidal analysis to determine the amplitudes and phases of all the tidal constituents, then a
        prediction, which is the reverse operation. We have used the TTide and UTide matlab software for this. To make a
        prediction for a location where no observations exist, one has to use a tidal model, either a global model such
        as TPXO9 or FES2014, or a regional model such as the CSIRO tidal model. This is because the ocean&apos;s
        response to the tidal forcing is very complicated, due to the complex shape of the oceans, coastal seas and
        continental shelves. Local resonances can increase the amplitude of the tides in some places, while destructive
        interference can reduce it elsewhere. These dynamics are frequency-dependent, affecting the diurnal and
        semi-diurnal tides differently. The relationship of currents to heights is also complex. Strong tidal currents
        do tend to occur in regions with high tidal sea level amplitudes, but at some distance away from where the range
        is greatest, and not always at the time you might expect.
      </p>
      <p className="mb-4">
        <strong className="text-[#52BDEC]">tidal constituent</strong> For most locations, the dominant tidal constituent
        is M2. This measures the amplitude of the sea level perturbations towards the moon on one side of the earth, and
        away from it on the other. Taking the rotation of the earth and the orbit of the moon into account, this
        constituent has a period of 12h 25min 14.4s. The dominant constituent associated with the sun is called S2, and
        has a period of exactly 12h. The 50.5 minutes-per-day difference of these two periodic signals is what gives us
        the 28.5d spring-neap cycle of the daily tidal range (and the waxing and waning of the moon). There are 145
        named tidal constituents, together accounting for the complex but periodic cycle of the tides.
      </p>
      <p className="mb-4">
        <strong className="text-[#52BDEC]">tidal ellipse</strong> Being a vector (two dimensional) quantity, tidal
        currents are more difficult to describe than tidal sea level. For each tidal constituent, the tidal current
        velocity vector traces out an ellipse. It is only in narrow channels that the current goes simply back and
        forth. In some places, the ellipse is close to a circle, with the speed of the current remaining constant, and
        only the direction changing. More commonly, the amplitude of the major axis is significantly greater than the
        amplitude of the minor axis. The bearing of the major axis is commonly referred to as the direction of the
        flooding tide.
      </p>
      <p className="mb-4">
        <strong className="text-[#52BDEC]">diurnal and semi-diurnal</strong> Diurnal tidal constituents (e.g. O1, K1)
        have periods near 24-25h. They are smaller than the semi-diurnal (near 12h) constituents in most places, the SA
        Gulfs being a notable exception, where the
        <a
          href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P34/mapst/08_SA_K1_1.html"
          className="mx-1 text-[#52BDEC]"
        >
          K1 currents
        </a>
        are stronger than the
        <a
          href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P34/mapst/08_SA_M2_1.html"
          className="mx-1 text-[#52BDEC]"
        >
          M2 currents
        </a>
        . They are caused by the asymmetry of the sea level perturbations on the near and far sides of the Earth.
      </p>
      <p className="mb-4">
        <strong className="text-[#52BDEC]">long-period tides</strong> These are constituents with periods near 15d, 30d,
        6 months and 12 months. Some are due to direct astronomical forcing (i.e. non-colinearity of orbital axes,
        eccentric orbits, etc) while others are due to the non-linearity of the ocean response to the astronomical
        forcing. Neither sort of long-period tide are included in the predictions shown here. They are small compared to
        the errors of the short-period tides.
      </p>
      <p className="mb-4">
        <strong className="text-[#52BDEC]">non-tidal variability</strong> Broadly speaking, this refers to the many
        other causes of ocean currents and sea level changes, such as wind, atmospheric pressure, heat gain or loss,
        freshwater gain or loss and eddies at a wide range of sizes. There are, however, a few grey areas. Tidal
        currents rushing past a headland may spin up an eddy, depending on the state of the spring neap cycle or the
        existence of a large-scale alongshore current. That eddy is clearly caused by the tide, but it is unpredictable.
        Conversely, the regular daily cycle of winds and temperature, modulated on the annual timescale, also causes a
        fairly predictable signal in observations of the ocean, which tidal analysis software inevitably includes in its
        estimation of some of the diurnal and annual tidal constituents.
      </p>
      <p className="mb-4">
        <strong className="text-[#52BDEC]">slack tide</strong> (a.k.a. &ldquo;slack water&ldquo;) is the time when the
        tidal current turns from ebbing to flooding, or vice versa, i.e., it is the time when the speed of the tidal
        current is at a local minimum. The timing of slack tide relative to high and low water depends on location, as
        mentioned in our
        <a href="https://oceancurrent.aodn.org.au/news.php#20230902" className="mx-1 text-[#52BDEC]">
          September 2023 news item
        </a>
        .
      </p>
      <p className="mb-4">
        <strong className="text-[#52BDEC]">sub-tidal variability</strong> is due solely to physical processes operating
        at time scales longer than a day or so (i.e. excluding semi-diurnal and diurnal tides). We estimate the rms
        amplitude of these by applying a Hanning filter to the observations with a half-amplitude width of 20h. This
        filtering removes all semi-diurnal variability, not just the phase-locked components at resolvable frequencies.
        From the prediction point of view, the historical amplitude of sub-tidal variability is an estimate of
        prediction error, since the actual sub-tidal variability can only be predicted close to real time using weather
        and other data.
      </p>
      <p className="mb-4">
        <strong className="text-[#52BDEC]">internal tides</strong> In some places, currents associated with the internal
        tide rival or exceed those due to the barotropic (&apos;normal&apos;) tide. These are presently out-of-scope for
        this website but remain an active area of research because of their importance to everything from climate
        modelling (because they do vertical mixing and dissipate energy) to offshore engineering (e.g. on the NW shelf).
        Internal tides occur when the barotropic tide excites wavelike motions of the layers of the ocean with different
        density. If the amplitude of these waves is large, tidal-period velocities in the upper and lower layers can be
        in the opposite direction. Internal tides come and go depending on the stratification of the ocean, so they are
        harder to predict than the barotropic tide.
      </p>
      <p className="mb-4">
        <strong className="text-[#52BDEC]">rms</strong> Root mean square, i.e. sqrt(mean(x^2)) where x comprises N
        estimates of some quantity (or a difference of two comparable quantities), either scalar (e.g. sea level) or
        vector (velocity, as u + iv). Here, all quantities considered are tidal predictions, which have zero mean over
        the time intervals considered. In the case of velocities, the rms values are vectors, only the magnitudes of
        which are used unless specified otherwise.
      </p>

      <h3 className="mb-4 text-lg font-semibold">References</h3>
      <ul className="mb-4 list-inside list-disc">
        <li className="mb-2">
          Codiga, D.L., 2011. Unified Tidal Analysis and Prediction Using the UTide Matlab Functions. Technical Report
          2011-01. Graduate School of Oceanography, University of Rhode Island, Narragansett, RI. 59pp.
          ftp://www.po.gso.uri.edu/pub/downloads/codiga/pubs/2011Codiga-UTide-Report.pdf
        </li>
        <li className="mb-2">
          Egbert, G.D. and S.Y. Erofeeva, 2002: Efficient Inverse Modeling of Barotropic Ocean Tides. J. Atmos. Oceanic
          Technol., 19, 183\96204,
          <a href="https://doi.org/10.1175/1520-0426(2002)019%3C0183:EIMOBO%3E2.0.CO;2" className="mx-1 text-[#52BDEC]">
            DOI
          </a>
        </li>
        <li className="mb-2">
          Haigh, I.D., Wijeratne, E.M.S., MacPherson, L.R., Pattiaratchi, C.B., Mason, M.S., Crompton, R.P., George, S.,
          2014. Estimating present day extreme total water level exceedance probabilities around the coastline of
          Australia: tides, extra-tropical storm surges and mean sea level. Climate Dynamics, 42, 121-138.
          <a href="https://doi.org/10.1007/s00382-012-1652-1" className="mx-1 text-[#52BDEC]">
            DOI
          </a>
        </li>
        <li className="mb-2">
          Griffin, D.A., Middleton, J.H. and Bode, L. (1987). The tidal and longer period circulation of Capricornia,
          southern Great Barrier Reef. Aust. J. Mar. Freshw. Res., 38, 461-474.
        </li>
        <li className="mb-2">
          Griffin, D.A., Herzfeld, M., Hemer, M. and Engwirda, D: Australian tidal currents - assessment of a barotropic
          model (COMPAS v1.3.0 rev6631) with an unstructured grid, Geosci. Model Dev., 14,5561-5582,
          <a href="https://doi.org/10.5194/gmd-14-5561-2021" className="mx-1 text-[#52BDEC]">
            https://doi.org/10.5194/gmd-14-5561-2021
          </a>
          , 2021
        </li>
        <li className="mb-2">
          Middleton, J.H., Buchwald V.T. and Huthnance, J.M. (1984). The anomalous tides near Broad Sound. Continental
          Shelf Research 3, 359-381.
        </li>
        <li className="mb-2">
          Pawlowicz, R. B. Beardsley, and S. Lentz, &ldquo;Classical tidal harmonic analysis including error estimates
          in MATLAB using T_TIDE&ldquo;, Computers and Geosciences 28 (2002), 929-937.{' '}
        </li>
        <li className="mb-2">Penesis et al. Tidal Energy in Australia. University of Tasmania, 2020 </li>
        <li className="mb-2">
          Pringle, William (2017),Major tidal constituents for the Indian Ocean and Western Pacific Basin, Mendeley
          Data, v1
          <a href="http://dx.doi.org/10.17632/tjyjn56jbf.1" className="mx-1 text-[#52BDEC]">
            http://dx.doi.org/10.17632/tjyjn56jbf.1
          </a>
        </li>
        <li className="mb-2">
          Wijeratne, E. M. S.; Pattiaratchi, C. B.; Eliot, Matt; Haigh, Ivan D. (2012). Tidal characteristics in Bass
          Strait, south-east Australia. Estuarine, Coastal and Shelf Science, Volume 114, p. 156-165.
          <a
            href="https://www.sciencedirect.com/science/article/pii/S0272771412003472?via%3Dihub"
            className="mx-1 text-[#52BDEC]"
          >
            DOI
          </a>
        </li>
      </ul>

      <h3 className="mb-4 text-lg font-semibold">For further information</h3>
      <ul className="mb-4 list-inside list-disc">
        <li className="mb-2">
          <a href="http://austen.org.au/" className="mx-1 text-[#52BDEC]">
            Australian Tidal Energy - AUSTEn
          </a>
        </li>
        <li className="mb-2">
          <a href="http://www.marine.csiro.au/~griffin/ARENA_tides/tides" className="mx-1 text-[#52BDEC]">
            ARENA Tidal currents and sea level
          </a>
          (a comprehensive archive of the CSIRO tidal model validation results, tidal energy statistics and more)
        </li>
        <li className="mb-2">
          <a href="http://www.tpxo.net/" className="mx-1 text-[#52BDEC]">
            Oregon State University TPXO tidal models
          </a>
        </li>
        <li className="mb-2">
          <a
            href="https://www.aviso.altimetry.fr/en/data/products/auxiliary-products/global-tide-fes/description-fes2014.html"
            className="mx-1 text-[#52BDEC]"
          >
            FES2014
          </a>
        </li>
        <li className="mb-2">
          <a
            href="https://www.researchgate.net/publication/322331188_Assessment_of_the_FES2014_Tidal_Currents_on_the_shelves_around_Australia"
            className="mx-1 text-[#52BDEC]"
          >
            Assessment_of_the_FES2014_Tidal_Currents_on_the_shelves_around_Australia
          </a>
        </li>
        <li className="mb-2">
          <a href="https://www.eoas.ubc.ca/~rich/#T_Tide" className="mx-1 text-[#52BDEC]">
            T-Tide
          </a>
        </li>
        <li className="mb-2">
          <a href="http://www.po.gso.uri.edu/~codiga/utide/utide.htm" className="mx-1 text-[#52BDEC]">
            UTide
          </a>
        </li>
        <li className="mb-2">
          <a href="https://noc.ac.uk/business/marine-data-products/anytide" className="mx-1 text-[#52BDEC]">
            anyTide
          </a>
        </li>
      </ul>
    </div>
  );
};

const CurrentMetersModalData = () => {
  return (
    <div className="p-4 text-gray-800">
      <p className="mb-4">
        The overview map is your entry point to a series of maps showing a few properties of Australia&apos;s ocean
        currents: mean (all-time, annual and seasonal), standard deviation for various layers and time-windows, and
        tidal harmonics for the depth-average flow. The detailed data from all individual instrument deployments is
        plotted in two ways: multi-depth-layer map views of the velocity (with and without tides) and depth-time plots
        of velocity (resolved along subtidal major and minor axes), backscatter, depth and temperature.
      </p>

      <h3 className="mb-4 text-lg font-semibold">Revisions</h3>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">19 August 2024</strong> A refresh with just a few updates since July, the
        motivating one being that AODN had accidentally placed an NRSMAI dataset in the NRSNSI folder, something we
        should have flagged as a fatal error but only flagged it as an issue. With a few other issues (including removal
        of some duplicates) fixed as well, the tally for the shelf array is now 1250 (with only 4 assessed as having
        fatal errors). (our ref: P48)
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">22 July 2024</strong> An update of the Shelf Array, taking the tally of
        individual current meter deployments for that array from 1198 to 1249. This revision includes a correction to
        the way we decide if &lsquo;northward&rsquo; means true north (what we want it to be) or magnetic north (as it
        is in the original data from the instrument). There are three types of files in the archive: 1) old ones which
        are magnetic north (we think, so we apply a rotation ourselves), 2) newer ones which are true north, with a UCUR
        attribute compass_correction_applied to document the processing step, and 3) ones with an attribute
        magnetic_declination, which we take to mean the correction has been applied. We had been treating type 3 files
        as type 1 (so the rotation is applied twice) because they lacked the compass_correction_applied attribute. The
        number of files affected by this error was only about 24, as can be seen by comparing the
        <a
          href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P47/ANMNtable.html#issues"
          className="mx-1 text-[#52BDEC]"
        >
          current
        </a>
        and
        <a
          href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P46/ANMNtable.html#issues"
          className="mx-1 text-[#52BDEC]"
        >
          previous
        </a>
        lists of file-reading issues. So, users be warned: you should check all 3 possibilities to avoid making the same
        error (which is fortunately only a few degrees in most cases, because few are in SE Aust where the correction is
        large) as we were. (our ref: P47)
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">29 February 2024</strong> An update of the Shelf Array, taking the tally of
        individual current meter deployments for that array from 1142 to 1198. Many of the new files are for the Sydney
        &lsquo;Ocean Reference Station&rsquo; ORS065 just off Bondi. (our ref: P46)
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">14 September 2023</strong> An update of the Shelf Array. The tally of
        individual current meter deployments is now 1142+96+186+21 = 1445 for Shelf, Deep(ADCP), Deep(ADV) and Southern
        Ocean arrays, respectively. A minor bug was fixed. Images with hotspots are now more precisely located (so what
        you click is what you get). (our ref: P44)
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">9 June 2023</strong> An update of the Shelf Array. The tally of individual
        current meter deployments is now 1111+96+186+21 = 1414 for Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean
        arrays, respectively. Also, seasonal (e.g., multi-summer) means were added to the maps of all-time and
        annual-mean currents. NB: in the course of this upgrade a bug was fixed - the numbers of device-days listed on
        those plots are now correct. (our ref: P43)
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">15 Feb 2023</strong> An update of the Shelf Array, now with the Signature
        ADCPs reprocessed to include Height_Above_Sensor (see previous lists of Data File Issues). The tally of
        individual current meter deployments is now 1087+96+186+21 = 1390 for Shelf, Deep(ADCP), Deep(ADV) and Southern
        Ocean arrays, respectively. (our ref: P42)
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">24 Nov 2022</strong> A major update of the{' '}
        <strong className="text-[#52BDEC]">deep water</strong> array, adding both the 2019-21 and 2021-22 deployments.
        The tally of individual current meter deployments is now 1039+96+186+21 = 1342 for Shelf, Deep(ADCP), Deep(ADV)
        and Southern Ocean arrays, respectively. (our ref: P40)
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">28 Sept 2022</strong> A routine update of the shelf array. The tally of
        deployments is now 1039+67+134+21 = 1257 for Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean arrays,
        respectively. (for ref: P37)
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">31 March 2022</strong> A routine update of the shelf array. The tally of
        deployments is now 999+67+134+21 = 1217 for Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean arrays,
        respectively. (for ref: P35)
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">21 August 2021</strong> A mostly-routine update focusing on the shelf array.
        The tally of deployments is now 963+67+134+21 = 1181 for Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean arrays,
        respectively. This update includes data from 5 new sites in the NW in addition to recently-uploaded data
        elsewhere.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">11 March 2021</strong> A mostly-routine update focusing on the shelf array.
        The tally of deployments is now 898+67+134+21 = 1120 for Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean arrays,
        respectively. This update corrects a minor error (introduced at the previous update) with some of the tabulated
        tidal constituents.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">16 Nov 2020</strong> As well as now including the 4th deployment of the EAC
        array, the Deep Water Moorings data set has a new address at the AODN. The tally of deployments is now
        875+67+134+21 = 1097 for Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean arrays, respectively.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">11 Feb 2020</strong> This week&apos;s update and re-read extended the data
        base further into 2019. The tally of deployments is now 841+53+110+19 = 1023 for Shelf, Deep(ADCP), Deep(ADV)
        and Southern Ocean arrays, respectively.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">27 Sep 2019</strong> This week&apos;s update and re-read extended the data
        base into 2019, while netting several reprocessed files for PPS and HIS. The tally of deployments is now
        815+53+110+19 = 997 for Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean arrays, respectively.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">26 Apr 2019</strong> This week we performed a re-read of the
        <a
          href="http://thredds.aodn.org.au/thredds/catalog/IMOS/catalog.html"
          target="_blank"
          className="mx-1 text-[#52BDEC]"
          rel="noreferrer"
        >
          AODN
        </a>
        archive after learning that the time vector in the files is NOT a record of the central times of the averaging
        intervals, but the BEGINNING times. To get the central time you have to add half of the averaging interval. In
        some files produced by recent versions of the toolbox, the TIME variable has an attribute
        seconds_to_middle_of_measurement (abbreviated here to &lsquo;shift&rsquo;) so you can do this. For other files,
        however, this information is missing (see the new columns headed &lsquo;dt av shift&rsquo; in the tabulations
        linked above, e.g. for the
        <a href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P28/ANMNtable.html" className="mx-1 text-[#52BDEC]">
          shelf array
        </a>
        ). For short averaging intervals (av=1 or 2 minutes) this is not a big problem, but for instruments that were
        set to do longer averaging intervals (20-60 minutes), it is. In all cases, users wanting to analyse the very
        high-frequency spectral components will want to know the averaging interval (as well as the sampling interval),
        so we hope that a future re-process of the raw data will produce new files with 1) TIME being the center of the
        averaging interval (and confirm this is the case), 2) the averaging interval included, and 3) the number of
        pings averaged during that interval. This week&apos;s re-process also includes a minor bug fix that previously
        affected the &lsquo;dt_start&rsquo; and &lsquo;dt_end&rsquo; columns of the tables. There are now more zeros in
        those columns, indicating correspondence of the dates in the filenames with either the range of the time vector,
        the period of good data, or both.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">21 Jan 2019</strong> Our latest regular re-read of the data archive at
        <a
          href="http://thredds.aodn.org.au/thredds/catalog/IMOS/catalog.html"
          target="_blank"
          className="mx-1 text-[#52BDEC]"
          rel="noreferrer"
        >
          AODN
        </a>
        found 766+54+110+19=949 data files for the Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean arrays, respectively
        (up 145 from 668+39+82+15=804 in May 2018). Navigation around the web site has also been improved.
      </p>

      <h3 className="mb-4 text-lg font-semibold">Definitions</h3>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">ADCP</strong> - Acoustic Doppler Current Profiler. This measures the velocity
        of the water at a range of distances (10s to 100s of meters) from the device. The ANMN and DWM facilities have
        used several types: the RDI Workhorse, RDI Continental and Nortek AWAC units, all deployed as upward- or
        downward-looking units, either rigidly on the bottom, or in taut moorings.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">ADV</strong> - Acoustic Doppler Velocimeter. This measures the velocity of
        the water just at one point very close to the device.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">U, V</strong> - Current velocity components along orthogonal axes. These
        estimates are at a number of equi-spaced vertical distances from the ADCP, i.e., the manufacturer&apos;s
        software has taken the tilt of the unit into account. For ADCPs on short mooring lines (e.g., those of the Shelf
        Array) that do not undergo large vertical displacement, these data can be used directly to estimate velocity at
        a range of depth levels. This is what we
        <a href="https://oceancurrent.aodn.org.au/timeseries/index_201406.htm" className="mx-1 text-[#52BDEC]">
          used to do
        </a>
        here but now we take the vertical motion of the ADCP into account in order to show velocity in depth
        coordinates.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">ABSI</strong> - Acoustic Back-Scatter Intensity, without correction for the
        average range-dependent attenuation.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">ADCP-T</strong> - Temperature at the depth of the ADCP.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">ADCP-P</strong> - Pressure at the depth of the ADCP. This is a measure of
        both the mooring motion and the tidal elevation and is shown to help troubleshoot apparently spurious estimates
        of U and V. In some files, this is a constant. Note that some instruments may suffer drift of the pressure data.
        Note also that mooring lines do stretch with time, so decreasing instrument depth is perfectly plausible.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">ADCP-D</strong> - Depth of the ADCP. For some files, this is missing, so we
        use ADCP-P, or the &lsquo;nominal depth&rsquo; in the global attributes.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">ADCP-tilt</strong> - A combination of the ADCP Pitch and Roll data, which are
        in the ADCP instrumental coordinate system.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">SurfaceBinKnockdown</strong> - This is a diagnostic calculation of the
        approximate depth anomaly of the nominal surface bin resulting from the instrument tilt, also shown just for
        troubleshooting purposes.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">Surface blanking interval</strong> - ADCP velocity estimates are contaminated
        by side-lobe interference with the surface for a significant distance beneath the surface. The thickness of this
        affected layer is about 12% of the nominal instrument depth but also depends on the instrument&apos;s acoustic
        characteristics (frequency, beam width, etc.), the tilt, and the sea state.
      </p>

      <h3 className="mb-4 text-lg font-semibold">Earlier revisions</h3>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">24 May 2018</strong> Another re-read of the thredds server (including the
        Southern Ocean array for the first time) has netted 20 additional Shelf Array deployments and 15 Southern Ocean
        deployments. We have also implemented a new map-based way of navigating around the available data that also
        shows some basic statistics of the velocity data (such as mean, variance, tides, device-days).
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">15 Nov 2017</strong> Another 8 months of new and/or re-processed Shelf Array
        and Deep Array data (including the 2nd EAC deployment) have now been added to our suite of plots. All 648 Shelf
        Array ADCP/ADV deployments, 39 Deep Array ADCP and 82 Deep Array ADV deployments have been reloaded from the
        THREDDS server to ensure that they are current. Users should note that some data files in the archive still have
        erroneous or missing location, timezone (AEST when metadata says UTC) or magnetic declination information. These
        files, and the identified issues are listed in the
        <a href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P22/indexlist.html" className="mx-1 text-[#52BDEC]">
          text index
        </a>
        . The time corrections and magnetic declinations we have used are all listed in the updated
        <a href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P21/datatable.html" className="mx-1 text-[#52BDEC]">
          [details table]
        </a>
        .
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">14 Mar 2017</strong> Another year of new and/or re-processed ANMN data have
        now been added to our suite of plots. All 594 instrument deployments have been reloaded from the THREDDS server
        to ensure that they are current. Users should note that some data files in the archive still have erroneous or
        missing location, timezone (AEST when metadata says UTC) or magnetic declination information. These files, and
        the identified issues are listed in the{' '}
        <a href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P21/indexlist.html" className="mx-1 text-[#52BDEC]">
          text index
        </a>
        . The time corrections and magnetic declinations we have used are all listed in the updated
        <a href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P21/datatable.html" className="mx-1 text-[#52BDEC]">
          [details table]
        </a>
        .
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">19 Jan 2016</strong> Another year of new and/or re-processed ANMN data (55
        instrument deployments) have now been added to our suite of plots. All 494 instrument deployments have been
        reloaded from the THREDDS server to ensure that they are current. Some data files with erroneous or missing
        location, timezone or magnetic declination information have been corrected prior to calculation of tidal
        constituents. The applied time correction and magnetic declinations used are all listed in the updated
        <a href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P20/datatable.html" className="mx-1 text-[#52BDEC]">
          [details table]
        </a>
        .
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">2 Feb 2015</strong> Many new (especially ITF, KIM and PIL arrays) and/or
        re-processed (especially NRSKAI) ANMN data added. The updated
        <a href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P17/" className="mx-1 text-[#52BDEC]">
          [time index]
        </a>
        page shows the magnitude of tidal residual currents after timing errors in a few data sets have been corrected.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">29 Jan 2015</strong> Tidal analysis has now been performed on all the ANMN
        velocity data (using the excellent
        <a href="http://www.po.gso.uri.edu/~codiga/utide/utide.htm" className="mx-1 text-[#52BDEC]">
          uTide
        </a>
        package). Summaries of the analyses have been added to the{' '}
        <a href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P15/datatable.html" className="mx-1 text-[#52BDEC]">
          details table
        </a>
        . See also the
        <a href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P15/tide/" className="mx-1 text-[#52BDEC]">
          [tidal ellipse maps]
        </a>
        . The
        <a href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P15/" className="mx-1 text-[#52BDEC]">
          [time index]
        </a>
        pages now show the magnitude of the tidal-residual velocity as well as the total speed, graphicly demonstrating
        the very large variation that exists around the country of the relative importance of tidal and non-tidal
        velocity components.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">21 Jan 2015</strong> Non-ADCP current meter (Acoustic Doppler Velocimeter, or
        ADV) data are now shown in addition to
        <a href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P15/" className="mx-1 text-[#52BDEC]">
          ANMN
        </a>
        and DWM ADCP data. We now also show the Satellite Remote Sensing Altimeter Calibration sub-facility
        <a href="https://oceancurrent.aodn.org.au/timeseries/SRS_P1/" className="mx-1 text-[#52BDEC]">
          SRS-ALT
        </a>
        ADV data. The DWM ADV data are very numerous so they are plotted separately. Some are much deeper than the ADCPs
        so we have defined a new set of 8 depth-strata for windowing the data.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">15 Jan 2015</strong> We have just re-plotted all the
        <a href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P15/" className="mx-1 text-[#52BDEC]">
          ANMN
        </a>
        ADCP data. 33{' '}
        <a href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P14/" className="mx-1 text-[#52BDEC]">
          new or re-processed
        </a>
        (using toolbox 2.3b) ANMN/NRS deployments have become available since 20 Sep 2014. The DWM deployments have all
        been re-processed (and now re-plotted) to correct an error in the processing of the backscatter data.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">25 Sep 2014</strong> Reprocessed SAIMOS data files (with corrected coordinate
        orientation information), and SA data for 2013 are now available from the IMOS portal. We have refreshed all our
        plots, which now show better alignment of the flow with bathymetry. We also looked a bit more closely at the
        consistency of the metadata and tabulated some diagnostics. See the new [details] link at the top of the
        <a href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P12/indexlist.html" className="mx-1 text-[#52BDEC]">
          text index
        </a>
        page.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">29 Aug 2014</strong> Re-plotted all the
        <a href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P15/" className="mx-1 text-[#52BDEC]">
          ANMN
        </a>
        velocity data. What&apos;s new:
        <ul className="mb-4 list-inside list-disc">
          <li className="mb-2">
            data from the IMOS DWM
            <a href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P10/" className="mx-1 text-[#52BDEC]">
              Deep Array
            </a>
            are added,
          </li>
          <li className="mb-2">
            the Deep Array moorings make large vertical excursions when the flow is fast, obliging the user to regrid
            the data from range coordinates to range+depth coordinates (taking into account that some ADCPs point up and
            some point down). We now pass all data through this re-gridder. For most of the Shelf Array data, however,
            it has little or no effect.
          </li>
          <li className="mb-2">
            for uniformity and to accomodate the Deep Array data, the maps showing velocity in 6 depth-strata now show
            it for 8 strata: 0-2000m (i.e. a vertical-average of the available data), 10-30m, 50-70m, 80-120m, 150-200m,
            250-350m, 400-550m and 600-800m. Note that because ADCPs on long mooring lines only sample some depth levels
            when the current is either very strong or very weak, the time-mean of the available observations in some
            strata is not representative of the time-mean at that depth. Compare the estimates for 150-200m at ITFTIN
            using the
            <a
              href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P10/ITFTIN-2012-WORKHORSE-ADCP-124_xyz.html"
              className="mx-1 text-[#52BDEC]"
            >
              ITFTIN-124
            </a>
            and
            <a
              href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P10/ITFTIN-2012-WORKHORSE-ADCP-142_xyz.html"
              className="mx-1 text-[#52BDEC]"
            >
              ITFTN-142
            </a>
            ADCPs, for example. Users of these data will combine data from all the instuments on the mooring line.
          </li>
          <li className="mb-2">
            minor improvements to the graphics, e.g. variable scaling to accomodate the wide range of variability.
          </li>
        </ul>
      </p>

      <h3 className="mb-4 text-lg font-semibold">For further information</h3>

      <ul className="mb-4 list-inside list-disc">
        <li className="mb-2">
          <a href="https://oceancurrent.aodn.org.au/news.htm#20130417" className="mx-1 text-[#52BDEC]">
            OceanCurrent news item
          </a>
          launching this section (April 2013), with discussion of some early highlights.
        </li>
        <li className="mb-2">
          <a href="http://imos.org.au/facilities/nationalmooringnetwork" className="mx-1 text-[#52BDEC]">
            National Mooring Network
          </a>
          (a.k.a. &lsquo;shelf array&rsquo;)
        </li>
        <li className="mb-2">
          <a href="http://imos.org.au/facilities/deepwatermoorings" className="mx-1 text-[#52BDEC]">
            Deep Water Moorings
          </a>
          (a.k.a. &lsquo;deep array&rsquo;){' '}
        </li>
        <li className="mb-2">
          <a href="https://www.aims.gov.au/imosmoorings/" className="mx-1 text-[#52BDEC]">
            AIMS moorings website
          </a>
        </li>
      </ul>
    </div>
  );
};

const MonthlyMeansModalData = () => {
  return (
    <div className="p-4 text-gray-800">
      <p className="mb-4">
        Monthly means are time-averaged values of sea surface temperature (SST) and Adjusted Sea Level Anomalies (Adj.
        SLA) over a month. They provide a stable representation of ocean conditions by averaging short-term variations,
        useful for identifying long-term trends and patterns.
      </p>
      <div className="mb-4">
        <strong className="text-imos-sea-blue">SST:</strong> Monthly averaged sea surface temperature, providing a
        clearer view of long-term temperature trends.
      </div>
      <div className="mb-4">
        <strong className="text-imos-sea-blue">Adjusted Sea Level Anomalies (Adj. SLA):</strong> Monthly means of sea
        level anomalies adjusted for atmospheric pressure, showing long-term sea level trends.
      </div>
      <div className="mb-4">
        <strong className="text-imos-sea-blue">Data Integration:</strong> The data combines satellite observations and
        in-situ measurements for comprehensive coverage.
      </div>
      <p className="mb-4">
        Monthly means are crucial for understanding seasonal variations and long-term changes in oceanographic
        conditions. They help in tracking climate change and its impact on marine environments.
      </p>
    </div>
  );
};

const SealCtdModalData = () => {
  return (
    <div className="p-4 text-gray-800">
      <p className="mb-4">
        The IMOS Animal Tracking Facility has deployed over 250 SealCTDs (miniaturized CTD sensors with an ARGOS
        antenna) on Elephant Seals, Sea Lions, Fur Seals and Weddell Seals since 2009. The data can now be viewed on
        OceanCurrent. The original motive for the sensors was to provide information about animal behaviour but the
        physical data they have collected has already been valuable in studies of Antarctic bottom water formation, the
        global heat budget, Southern Ocean frontal structure and sea ice formation.{' '}
      </p>

      <p className="mb-4">
        Argo float and seals provide different styles of profiling. Argo floats (in standard configuration) transmit a
        2000m deep profile, with high vertical resolution, every 10 days whereas the SealCTDs transmit a profile every 6
        hours. Each CTD sensor records data from every dive but selects the ascent profile from the deepest dive over
        the last 6 hours. In order to prolong battery life and to ensure the whole profile is transmitted before the
        seal dives again, the profile is also compressed (by calculating break-points) before transmission. The SealCTD
        (or tag) is glued onto the animal&apos;s head and drops off during their moult.{' '}
      </p>

      <p className="mb-4">
        The SealCTD product shows near real time location of seals equipped with CTD instruments, overlaid on SST maps
        and ice coverage. The dots in the maps represent the locations of seals (magenta) and Argo floats (cyan) that
        reached the surface at the date of plotting. Data access
        <a
          href="https://catalogue-imos.aodn.org.au/geonetwork/srv/eng/catalog.search#/metadata/b2548767-514f-4a31-b65e-36bb894382d5"
          className="mx-1 text-[#52BDEC]"
        >
          here
        </a>
        .{' '}
      </p>

      <p className="mb-4">
        The SST and sea ice area fraction data are obtained from
        <a href="https://www.remss.com/" className="mx-1 text-[#52BDEC]">
          REMSS
        </a>
        (Remote Sensing Systems). The SST product used here contains data from microwave (MW) and infrared (IR) sensors,
        optimally interpolated onto a global grid by REMSS.
      </p>

      <p className="mb-4">
        The temperature and salinity profiles (right) during a female Elephant Seal&apos;s journey from Kerguelen Island
        demonstrate the high temporal and spatial resolution possible of the upper 500m of the ocean. During her
        two-month journey this seal travelled through at least four distinct regions before losing her tag in the
        melting ice. The time series are also plotted in 10 day sections with the seal&apos;s location indicated.
      </p>

      <p className="mb-4">
        Some SealCTDs have been deployed in the Great Australian Bight (GAB) and southern New South Wales. The Sea Lions
        in the GAB appear to have a different profiling strategy compared to their cousins in Antarctica. One GAB Sea
        Lion spent 5 months of the 2015/2016 summer repeating a transect across the shelf from the head of the Bight.
        His travels document the degree of uplifted water coming onto the shelf along the bottom and also the
        development of a deep water salinity maximum (right).{' '}
      </p>
    </div>
  );
};

const SurfaceWaveModalData = () => {
  return (
    <div>
      <p className="font-sans leading-relaxed text-gray-800">
        The map represents a snapshot of surface wave conditions around Australia.
      </p>
      <p className="font-sans leading-relaxed text-gray-800">
        The background wavefield (significant wave height and peak wave direction) is extracted from the analysis
        timestep t0 of BoM&apos;s AUSWAVE-R model. This wavefield is generated at 2-hourly analysis timesteps of the
        AUSWAVE-R model. The small black arrows represent peak wave direction.
      </p>
      <p className="font-sans leading-relaxed text-gray-800">
        Wave observations from various sources centred around t0 are also displayed on the map when available. These
        observations are:
      </p>
      <ul className="list-disc pl-5 font-sans leading-relaxed text-gray-800">
        <li>
          Wave measurements from Australia&apos;s coastal wave buoy network at t0 +/- 3 hrs, extracted from AODN&apos;s
          near real time feed of the national waverider buoys observations.
        </li>
        <li>
          Significant wave height measurements from available radar Altimeters (Jason-3, SARAL, Sentinel-3a, and
          Sentinel-3b), displayed along satellite nadir tracks at t0 +/- 3 hr. Applied corrections for j3, sa, 3a, and
          3b are described
          <a href="https://doi.org/10.1038/s41597-019-0083-9" className="text-blue-500">
            here
          </a>
          .
        </li>
        <li>
          Peak wave direction and mean wave period, extracted from Sentinel-1 A and B Synthetic Aperture Radar (SAR)
          wave spectra observations acquired along-track at t0 +/- 3 hr. SAR wave spectra have the wind-sea (or shorter
          waves) part truncated mostly in along-track direction and can only capture energy from longer swell systems in
          this direction. Therefore, peak wave direction and mean wave period from SAR should be viewed with the above
          limitation in mind.
        </li>
      </ul>
      <p className="font-sans leading-relaxed text-gray-800">
        The significant wave height is the average height of the highest third of the waves. Maximum wave heights of
        twice the significant wave height can be expected about three times in 24 hours.
      </p>

      <h3 className="my-2 font-sans text-2xl font-medium text-gray-800">Legend</h3>

      <p className="font-sans leading-relaxed text-gray-800">
        Wave buoy: circle near Australian coastline at location of wave buoy displaying measurement in the window t0 +/-
        3 hrs. The colour shown inside the circles (colourbar) represents significant wave height (SWH). The wedge in
        the middle indicates wave direction, with the wave coming from the broad side of wedge. The wedge thickness
        represents directional spread, and its colour (white, grey, black) represents three regimes of mean wave period
        in sec (T<sub>z</sub> ≤ 8, 8 &lt; T<sub>z</sub> ≤ 12, T<sub>z</sub> &gt; 12, respectively). An empty circle with
        a dot in the middle represents absent or suspect data. Data are classed as suspect if SWH is greater than twice
        the maximum wave height.
      </p>

      <p className="font-sans leading-relaxed text-gray-800">
        Altimeter pass: two parallel lines (along satellite track) with small pink dots in the centre represent
        satellite altimeter passes in the window t0 +/- 3 hr. The colour within the lines indicates corrected altimeter
        SWH.
      </p>

      <p className="font-sans leading-relaxed text-gray-800">
        SAR pass: a circle filled with white, grey, or black colour represents SAR mean wave period (T<sub>z</sub>)
        regimes of T<sub>z</sub> ≤ 8, 8 &lt; T<sub>z</sub>≤ 12, T<sub>z</sub> &gt; 12, respectively. The arrow connected
        to the circle represents the peak wave direction.
      </p>

      <h3 className="my-2 font-sans text-2xl font-medium text-gray-800">Data sources</h3>
      <ol className="list-decimal pl-5 font-sans leading-relaxed text-gray-800">
        <li>
          <a href="http://www.bom.gov.au/nwp/doc/auswave/data.shtml" className="text-blue-500">
            BOM&apos;s AUSWAVE analysis 0000 timestep
          </a>
        </li>
        <li>
          <a href="https://www.star.nesdis.noaa.gov/socd/lsa/RADS.php" className="text-blue-500">
            Radar Altimeter Database System (RADS)
          </a>
        </li>
        <li>
          <a
            href="http://thredds.aodn.org.au/thredds/catalog/IMOS/SRS/Surface-Waves/SAR/catalog.html"
            className="text-blue-500"
          >
            Sentinel-1 A and B wave mode data
          </a>
        </li>
        <li>
          <a
            href="https://catalogue-imos.aodn.org.au/geonetwork/srv/eng/catalog.search#/metadata/b299cdcd-3dee-48aa-abdd-e0fcdbb9cadc"
            className="text-blue-500"
          >
            Waverider near real-time buoy observations (Australia).
          </a>
          The links to the near real time wave data for the buoys shown in the map are listed in the table below.
        </li>
      </ol>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-300 bg-blue-500 p-2 text-white">Site</th>
            <th className="border border-gray-300 bg-blue-500 p-2 text-white">Custodian</th>
            <th className="border border-gray-300 bg-blue-500 p-2 text-white">URL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">Goodrich Banks</td>
            <td className="border border-gray-300 p-2">BoM</td>
            <td className="border border-gray-300 p-2">
              <a href="http://www.bom.gov.au/products/IDD65028.shtml" className="text-blue-600">
                http://www.bom.gov.au/products/IDD65028.shtml
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Cape Sorell</td>
            <td className="border border-gray-300 p-2">BoM</td>
            <td className="border border-gray-300 p-2">
              <a href="http://www.bom.gov.au/products/IDT65014.shtml" className="text-blue-600">
                http://www.bom.gov.au/products/IDT65014.shtml
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Cape du Couedic</td>
            <td className="border border-gray-300 p-2">BoM</td>
            <td className="border border-gray-300 p-2">
              <a href="http://www.bom.gov.au/products/IDS65030.shtml" className="text-blue-600">
                http://www.bom.gov.au/products/IDS65030.shtml
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Maria Island</td>
            <td className="border border-gray-300 p-2">BoM</td>
            <td className="border border-gray-300 p-2">
              <a href="http://www.bom.gov.au/products/IDT65091.shtml" className="text-blue-600">
                http://www.bom.gov.au/products/IDT65091.shtml
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Batemans Bay</td>
            <td className="border border-gray-300 p-2">MHL</td>
            <td className="border border-gray-300 p-2">
              <a href="https://mhl.nsw.gov.au/Station-BATBOW" className="text-blue-600">
                https://mhl.nsw.gov.au/Station-BATBOW
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Byron Bay</td>
            <td className="border border-gray-300 p-2">MHL</td>
            <td className="border border-gray-300 p-2">
              <a href="https://www.mhl.nsw.gov.au/Station-BYRBOW" className="text-blue-600">
                https://www.mhl.nsw.gov.au/Station-BYRBOW
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Coffs Harbour</td>
            <td className="border border-gray-300 p-2">MHL</td>
            <td className="border border-gray-300 p-2">
              <a href="https://mhl.nsw.gov.au/Station-COFHOW" className="text-blue-600">
                https://mhl.nsw.gov.au/Station-COFHOW
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Crowdy Head</td>
            <td className="border border-gray-300 p-2">MHL</td>
            <td className="border border-gray-300 p-2">
              <a href="https://mhl.nsw.gov.au/Station-CRHDOW" className="text-blue-600">
                https://mhl.nsw.gov.au/Station-CRHDOW
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Eden</td>
            <td className="border border-gray-300 p-2">MHL</td>
            <td className="border border-gray-300 p-2">
              <a href="https://mhl.nsw.gov.au/Station-EDENOW" className="text-blue-600">
                https://mhl.nsw.gov.au/Station-EDENOW
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Port Kembla</td>
            <td className="border border-gray-300 p-2">MHL</td>
            <td className="border border-gray-300 p-2">
              <a href="https://mhl.nsw.gov.au/Station-PTKMOW" className="text-blue-600">
                https://mhl.nsw.gov.au/Station-PTKMOW
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Sydney</td>
            <td className="border border-gray-300 p-2">MHL</td>
            <td className="border border-gray-300 p-2">
              <a href="https://mhl.nsw.gov.au/Station-SYDDOW" className="text-blue-600">
                https://mhl.nsw.gov.au/Station-SYDDOW
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Albatross Bay</td>
            <td className="border border-gray-300 p-2">QLD Govt.</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/albatross-bay"
                className="text-blue-600"
              >
                https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/albatross-bay
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">North Moreton Bay</td>
            <td className="border border-gray-300 p-2">QLD Govt.</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/north-moreton-bay"
                className="text-blue-600"
              >
                https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/north-moreton-bay
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Cairns</td>
            <td className="border border-gray-300 p-2">QLD Govt.</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/cairns"
                className="text-blue-600"
              >
                https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/cairns
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Townsville</td>
            <td className="border border-gray-300 p-2">QLD Govt.</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/townsville"
                className="text-blue-600"
              >
                https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/townsville
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Mooloolaba</td>
            <td className="border border-gray-300 p-2">QLD Govt.</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/mooloolaba"
                className="text-blue-600"
              >
                https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/mooloolaba
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Hay Point</td>
            <td className="border border-gray-300 p-2">QLD Govt.</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/hay-point"
                className="text-blue-600"
              >
                https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/hay-point
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Emu Park</td>
            <td className="border border-gray-300 p-2">QLD Govt.</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/emu-park"
                className="text-blue-600"
              >
                https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring-waves-sites/emu-park
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Gold Coast</td>
            <td className="border border-gray-300 p-2">QLD Govt.</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/gold-coast"
                className="text-blue-600"
              >
                https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring-waves-sites/gold-coast
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Tweed Heads</td>
            <td className="border border-gray-300 p-2">QLD Govt.</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/tweed-heads"
                className="text-blue-600"
              >
                https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring-waves-sites/tweed-heads
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Gladstone</td>
            <td className="border border-gray-300 p-2">QLD Govt.</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/gladstone"
                className="text-blue-600"
              >
                https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring-waves-sites/gladstone
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Caloundra</td>
            <td className="border border-gray-300 p-2">QLD Govt.</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/caloundra"
                className="text-blue-600"
              >
                https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring-waves-sites/caloundra
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Bundaberg</td>
            <td className="border border-gray-300 p-2">QLD Govt.</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/bundaberg"
                className="text-blue-600"
              >
                https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring-waves-sites/bundaberg
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Brisbane Offshore</td>
            <td className="border border-gray-300 p-2">QLD Govt.</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/brisbaneoffshore"
                className="text-blue-600"
              >
                https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring-waves-sites/brisbaneoffshore
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Tweed Offshore</td>
            <td className="border border-gray-300 p-2">QLD Govt.</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/tweed-offshore"
                className="text-blue-600"
              >
                https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring-waves-sites/tweed-offshore
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Palm Beach</td>
            <td className="border border-gray-300 p-2">QLD Govt.</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring-waves-sites/palm-beach"
                className="text-blue-600"
              >
                https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring-waves-sites/palm-beach
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Brisbane</td>
            <td className="border border-gray-300 p-2">QLD Govt.</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/brisbane"
                className="text-blue-600"
              >
                https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring-waves-sites/brisbane
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Skardon River Offshore</td>
            <td className="border border-gray-300 p-2">QLD Govt.</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/skardon-offshore"
                className="text-blue-600"
              >
                https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring-waves-sites/skardon-offshore
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Skardon River Outer</td>
            <td className="border border-gray-300 p-2">QLD Govt.</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/skardon-river-outer"
                className="text-blue-600"
              >
                https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring-waves-sites/skardon-river-outer
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Lakes Entrance</td>
            <td className="border border-gray-300 p-2">Gippsland Ports</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://www.gippslandports.vic.gov.au/boating/waves-tides-and-weather/lakes-entrance-waves-tides-and-weather/"
                className="text-blue-600"
              >
                https://www.gippslandports.vic.gov.au/boating/waves-tides-and-weather/lakes-entrance-waves-tides-and-weather/
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Jurien</td>
            <td className="border border-gray-300 p-2">DoT, WA</td>
            <td className="border border-gray-300 p-2">
              <a href="https://www.transport.wa.gov.au/imarine/jurien-bay-wave-data.asp" className="text-blue-600">
                https://www.transport.wa.gov.au/imarine/jurien-bay-wave-data.asp
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Rottnest Island</td>
            <td className="border border-gray-300 p-2">DoT, WA</td>
            <td className="border border-gray-300 p-2">
              <a href="https://www.transport.wa.gov.au/imarine/rottnest-island-wave-data.asp" className="text-blue-600">
                https://www.transport.wa.gov.au/imarine/rottnest-island-wave-data.asp
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Cape Naturaliste</td>
            <td className="border border-gray-300 p-2">DoT, WA</td>
            <td className="border border-gray-300 p-2">
              <a href="https://www.transport.wa.gov.au/imarine/naturaliste-wave-data.asp" className="text-blue-600">
                https://www.transport.wa.gov.au/imarine/naturaliste-wave-data.asp
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Cottesloe</td>
            <td className="border border-gray-300 p-2">DoT, WA</td>
            <td className="border border-gray-300 p-2">
              <a href="https://www.transport.wa.gov.au/imarine/cottesloe-wave-data.asp" className="text-blue-600">
                https://www.transport.wa.gov.au/imarine/cottesloe-wave-data.asp
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Esperance</td>
            <td className="border border-gray-300 p-2">DoT, WA</td>
            <td className="border border-gray-300 p-2">
              <a href="https://www.transport.wa.gov.au/imarine/esperance-wave-data.asp" className="text-blue-600">
                https://www.transport.wa.gov.au/imarine/esperance-wave-data.asp
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Albany</td>
            <td className="border border-gray-300 p-2">DoT, WA</td>
            <td className="border border-gray-300 p-2">
              <a href="https://www.transport.wa.gov.au/imarine/albany-wave-data.asp" className="text-blue-600">
                https://www.transport.wa.gov.au/imarine/albany-wave-data.asp
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Mandurah</td>
            <td className="border border-gray-300 p-2">DoT, WA</td>
            <td className="border border-gray-300 p-2">
              <a href="https://www.transport.wa.gov.au/imarine/mandurah-wave-data.asp" className="text-blue-600">
                https://www.transport.wa.gov.au/imarine/mandurah-wave-data.asp
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Mackay</td>
            <td className="border border-gray-300 p-2">DES,QLD</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/mackay"
                className="text-blue-600"
              >
                https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/mackay
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Albatross Bay</td>
            <td className="border border-gray-300 p-2">DES,QLD</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/albatross-bay"
                className="text-blue-600"
              >
                https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring-waves-sites/albatross-bay
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Wide Bay</td>
            <td className="border border-gray-300 p-2">DES,QLD</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring/waves-sites/wide-bay"
                className="text-blue-600"
              >
                https://www.qld.gov.au/environment/coasts-waterways/beach/monitoring-waves-sites/wide-bay
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Inverloch</td>
            <td className="border border-gray-300 p-2">Deakin Univ.</td>
            <td className="border border-gray-300 p-2">
              <a href="https://vicwaves.com.au" className="text-blue-600">
                https://vicwaves.com.au
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Inverloch Inshore</td>
            <td className="border border-gray-300 p-2">Deakin Univ.</td>
            <td className="border border-gray-300 p-2">
              <a href="https://vicwaves.com.au" className="text-blue-600">
                https://vicwaves.com.au
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Apollo Bay</td>
            <td className="border border-gray-300 p-2">Deakin Univ.</td>
            <td className="border border-gray-300 p-2">
              <a href="https://vicwaves.com.au" className="text-blue-600">
                https://vicwaves.com.au
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Cape Bridgewater</td>
            <td className="border border-gray-300 p-2">Deakin Univ.</td>
            <td className="border border-gray-300 p-2">
              <a href="https://vicwaves.com.au" className="text-blue-600">
                https://vicwaves.com.au
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Central</td>
            <td className="border border-gray-300 p-2">Deakin Univ.</td>
            <td className="border border-gray-300 p-2">
              <a href="https://vicwaves.com.au" className="text-blue-600">
                https://vicwaves.com.au
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Werribee</td>
            <td className="border border-gray-300 p-2">Deakin Univ.</td>
            <td className="border border-gray-300 p-2">
              <a href="https://vicwaves.com.au" className="text-blue-600">
                https://vicwaves.com.au
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Dutton Way</td>
            <td className="border border-gray-300 p-2">Deakin Univ.</td>
            <td className="border border-gray-300 p-2">
              <a href="https://vicwaves.com.au" className="text-blue-600">
                https://vicwaves.com.au, refer to &apos;Portland&apos;
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Indented Head</td>
            <td className="border border-gray-300 p-2">Deakin Univ.</td>
            <td className="border border-gray-300 p-2">
              <a href="https://vicwaves.com.au" className="text-blue-600">
                https://vicwaves.com.au
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Mt Eliza</td>
            <td className="border border-gray-300 p-2">Deakin Univ.</td>
            <td className="border border-gray-300 p-2">
              <a href="https://vicwaves.com.au" className="text-blue-600">
                https://vicwaves.com.au
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Port Fairy</td>
            <td className="border border-gray-300 p-2">Deakin Univ.</td>
            <td className="border border-gray-300 p-2">
              <a href="https://vicwaves.com.au" className="text-blue-600">
                https://vicwaves.com.au
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Rosebud</td>
            <td className="border border-gray-300 p-2">Deakin Univ.</td>
            <td className="border border-gray-300 p-2">
              <a href="https://vicwaves.com.au" className="text-blue-600">
                https://vicwaves.com.au
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Sandringham</td>
            <td className="border border-gray-300 p-2">Deakin Univ.</td>
            <td className="border border-gray-300 p-2">
              <a href="https://vicwaves.com.au" className="text-blue-600">
                https://vicwaves.com.au
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Wilsons Prom</td>
            <td className="border border-gray-300 p-2">Deakin Univ.</td>
            <td className="border border-gray-300 p-2">
              <a href="https://vicwaves.com.au" className="text-blue-600">
                https://vicwaves.com.au
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Bengello</td>
            <td className="border border-gray-300 p-2">DPE, NSW</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://geo.seed.nsw.gov.au/Public_Viewer/index.html?viewer=Public_Viewer&amp;locale=en-AU&amp;runWorkflow=AppendLayerCatalog&amp;CatalogLayer=SEED_Catalog.286.buoy_status"
                className="text-blue-600"
              >
                https://live.seed.nsw.gov.au
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Boambee</td>
            <td className="border border-gray-300 p-2">DPE, NSW</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://geo.seed.nsw.gov.au/Public_Viewer/index.html?viewer=Public_Viewer&amp;locale=en-AU&amp;runWorkflow=AppendLayerCatalog&amp;CatalogLayer=SEED_Catalog.286.buoy_status"
                className="text-blue-600"
              >
                https://live.seed.nsw.gov.au
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Broulee</td>
            <td className="border border-gray-300 p-2">DPE, NSW</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://geo.seed.nsw.gov.au/Public_Viewer/index.html?viewer=Public_Viewer&amp;locale=en-AU&amp;runWorkflow=AppendLayerCatalog&amp;CatalogLayer=SEED_Catalog.286.buoy_status"
                className="text-blue-600"
              >
                https://live.seed.nsw.gov.au
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Collaroy</td>
            <td className="border border-gray-300 p-2">DPE, NSW</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://geo.seed.nsw.gov.au/Public_Viewer/index.html?viewer=Public_Viewer&amp;locale=en-AU&amp;runWorkflow=AppendLayerCatalog&amp;CatalogLayer=SEED_Catalog.286.buoy_status"
                className="text-blue-600"
              >
                https://live.seed.nsw.gov.au
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Merimbula</td>
            <td className="border border-gray-300 p-2">DPE, NSW</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://geo.seed.nsw.gov.au/Public_Viewer/index.html?viewer=Public_Viewer&amp;locale=en-AU&amp;runWorkflow=AppendLayerCatalog&amp;CatalogLayer=SEED_Catalog.286.buoy_status"
                className="text-blue-600"
              >
                https://live.seed.nsw.gov.au
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Wooli</td>
            <td className="border border-gray-300 p-2">DPE, NSW</td>
            <td className="border border-gray-300 p-2">
              <a
                href="https://geo.seed.nsw.gov.au/Public_Viewer/index.html?viewer=Public_Viewer&amp;locale=en-AU&amp;runWorkflow=AppendLayerCatalog&amp;CatalogLayer=SEED_Catalog.286.buoy_status"
                className="text-blue-600"
              >
                https://live.seed.nsw.gov.au
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Dampier</td>
            <td className="border border-gray-300 p-2">Pilbara Ports Authority</td>
            <td className="border border-gray-300 p-2">
              <a href="https://www.pilbaraports.com.au/ports/port-of-dampier" className="text-blue-600">
                https://www.pilbaraports.com.au/ports/port-of-dampier
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Port Headland</td>
            <td className="border border-gray-300 p-2">Pilbara Ports Authority</td>
            <td className="border border-gray-300 p-2">
              <a href="https://www.pilbaraports.com.au/ports/port-of-port-headland" className="text-blue-600">
                https://www.pilbaraports.com.au/ports/port-of-port-headland
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Ashburton</td>
            <td className="border border-gray-300 p-2">Pilbara Ports Authority</td>
            <td className="border border-gray-300 p-2">
              <a href="https://www.pilbaraports.com.au/ports/port-of-ashburton" className="text-blue-600">
                https://www.pilbaraports.com.au/ports/port-of-ashburton
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Torbay West</td>
            <td className="border border-gray-300 p-2">Univ. of WA</td>
            <td className="border border-gray-300 p-2">
              <a href="https://wawaves.org/" className="text-blue-600">
                https://wawaves.org/
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">King George Sound</td>
            <td className="border border-gray-300 p-2">Uni. of WA</td>
            <td className="border border-gray-300 p-2">
              <a href="https://wawaves.org/" className="text-blue-600">
                https://wawaves.org/
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export {
  OceanColourModalData,
  SnapshotModalData,
  SixDaySstModalData,
  AdjustedSeaLevelAnomalyModalData,
  FourHourSstModalData,
  ClimatologyModalData,
  SurfaceWaveModalData,
  MonthlyMeansModalData,
  EACMooringArrayModalData,
  CurrentMetersModalData,
  ArgoModalData,
  TidalCurrentsModalData,
  SealCtdModalData,
};
