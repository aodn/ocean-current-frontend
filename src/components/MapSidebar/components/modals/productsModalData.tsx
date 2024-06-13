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
        <strong className="text-[#52BDEC]">SST:</strong> 6-day composite SST (L3S-6d, QL≥2) using night-only SST in a
        6-day window centred on <strong>t0</strong>, the analysis time. The 6-day window is used to maximise coverage
        and night-only SST is used to minimise bias due to diurnal heating. The 6d composites are produced by the BoM
        for IMOS using GHRSST protocol on a 2x2km grid. All SST is adjusted by the SSES bias before compositing and an
        offset of 0.17C is added to obtain the bulk SST.
      </p>
      <p className="mb-4">
        <strong className="text-[#52BDEC]">SST Anomaly:</strong> The SSTAARS climatology, calculated for each 2x2km
        pixel for the analysis date, <strong>t0</strong>, is removed from the SST.
      </p>
      <p className="mb-4">
        <strong className="text-[#52BDEC]">Percentiles:</strong> The SST anomalies are ranked against almost 25 years of
        anomalies (1992-2016). The percentiles have been evaluated at each pixel for every day of the year. Anomalies
        falling in the &lt;10 rank (dark blue) are the coldest 10% of observed anomalies at that pixel for that day of
        the year. Similarly, anomalies ranked &gt;90 are the hottest 10% of observed anomalies. Green percentiles (two
        shades) represent the average 20% of temperature anomalies.
      </p>
    </div>
  );
};

const AdjustedSeaLevelAnomalyModalData = () => {
  return (
    <div className="p-4 text-gray-800">
      <p className="mb-4">
        <strong className="text-[#52BDEC]">Adjusted Sea Level:</strong> We used to call this Gridded Sea Level but
        changed the name in Sep 2021. Adjusted Sea level (like GSL) is sea level minus two rapidly-varying sea level
        signals mostly due to barotropic dynamics: astronomical tides and the ocean&apos;s response to atmospheric
        pressure (which is to rise about 10 cm for each 10 hPa fall of pressure). Adjusted Sea Level is thus a measure
        of the slow modes of the ocean. The slow modes are largely in geostrophic balance, so we can estimate the
        near-surface velocity from the gradients of ASL. ASL is also a measure of depth-integrated density (and thus
        ocean heat content), as shown on our Argo pages where ASL is compared with in-situ determinations of steric
        height anomaly.
      </p>
      <p className="mb-4">
        <strong className="text-[#52BDEC]">Terminology:</strong> The once-traditional term &apos;adjusted&apos; is
        commonly omitted by many agencies and oceanographers. We did this, too, then regretted it, because dropping the
        &apos;adjusted&apos; leaves no short name for &apos;unadjusted sea level&apos;, which is the quantity most
        relevant to users interested in coastal inundation (see our Australia/NZ maps of Non-tidal Sea Level). Another
        candidate name for Adjusted Sea Level is
        <a
          href="https://link.springer.com/article/10.1007/s10712-019-09525-z"
          target="_blank"
          rel="noreferrer"
          className="text-[#52BDEC]"
        >
          ocean dynamic sea level
        </a>
        . Related names include: dynamic height, dynamic topography, and subsurface pressure.
      </p>
      <p className="mb-4">
        <strong className="text-[#52BDEC]">Adjusted Sea Level Anomaly:</strong> By &apos;anomaly&apos;, we mean the
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
        <strong className="text-[#52BDEC]">Centile rankings of (daily, detrended) Adjusted Sea Level Anomaly:</strong>{' '}
        This is a way of seeing &apos;how anomalous&apos; the anomaly at a particular place and time is, compared with
        past anomalies at the same place. But sea level anomalies are not randomly distributed about a mean value,
        because sea level has a significant trend; about 100mm in the last 28 years (~3.7mm/year). Nor does it have a
        very regular annual cycle{' '}
        <a
          href="https://oceancurrent.aodn.org.au/GSLA_stats/DM02/GSLA_Au_h.html"
          target="_blank"
          rel="noreferrer"
          className="text-[#52BDEC]"
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
        <strong className="text-[#52BDEC]">Centile levels of the 28-year, detrended data set:</strong> This is the
        reference data set against which the detrended anomalies for a particular day are compared. For efficiency, it
        is not re-computed every day. Consequently, and because eddies do not follow in each other&apos;s tracks, new
        observations can fall outside the range of the
        <a
          href="https://oceancurrent.aodn.org.au/GSLA_stats/DM02/"
          target="_blank"
          rel="noreferrer"
          className="text-[#52BDEC]"
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
        <strong className="text-[#52BDEC]">Method:</strong> Step 1: 4-hour composites of Him8 SST (with 2-4km
        resolution) are made, taking the median SST at every pixel. Step 2: the final composite is made using the Him8
        composite and all other available AVHRR and VIIRS SST. The composite is made in two steps so that if the BoM
        Him8 SST is unavailable we can replace it with NOAA hourly Him8 composites. All SST is adjusted by the SSES bias
        before compositing and an offset of 0.17C is added to obtain the bulk SST.
      </p>
      <div className="mb-4">
        <strong className="text-[#52BDEC]">Available:</strong> 11 Aug 2017 to present
      </div>
      <div className="mb-4">
        <strong className="text-[#52BDEC]">SST:</strong> All SST of QL&gt;=4 (QL=4 or 5 are the BoM&apos;s highest
        Quality Levels)
      </div>
      <div className="mb-4">
        <strong className="text-[#52BDEC]">Filled SST:</strong> the gaps in the SST are filled with the most recent
        previous composites
      </div>
      <div className="mb-4">
        <strong className="text-[#52BDEC]">SST Age:</strong> the age of the Filled SST
      </div>
      <div className="mb-4">
        <strong className="text-[#52BDEC]">Wind Speed:</strong> BoM ACCESS-R 3hr average wind speed and direction for
        the analysis time
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
        <strong className="text-[#52BDEC]">SST:</strong> the annual mean and monthly evaluations of SSTAARS SST (without
        the trend)
      </div>
      <div className="mb-4">
        <strong className="text-[#52BDEC]">Data Count:</strong> the total number of days of cloud free SST at each pixel
        that were available for the climatology for each month - out of a possible 750 days.
      </div>
      <div className="mb-4">
        Sea level height: seasonal GSLA + OFAM3 mean sea level height, white contours every 0.1m.
      </div>
      <div className="mb-4">Geostrophic velocity: estimated from the sea level height</div>
      <p className="mb-4">
        Bathymetry: We have included a few more bottom contours to help interpret the climatology. The 10m, 200m and
        1000m contours of bathymetry in cyan and the 50m contour in dark blue.
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
};
