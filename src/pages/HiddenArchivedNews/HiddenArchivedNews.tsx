import { useEffect, useRef } from 'react';
import { useScrollToHash } from '@/hooks/useScrollToHash/useScrollToHash';
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */

const BASE_URL = 'https://oceancurrent.aodn.org.au/';

const isAbsoluteUrl = (value: string) => /^(?:[a-zA-Z][a-zA-Z\d+\-.]*:|\/\/|#)/.test(value);

const normalizeUrl = (value: string) => {
  if (!value || isAbsoluteUrl(value)) {
    return value;
  }

  try {
    return new URL(value, BASE_URL).href;
  } catch {
    return `${BASE_URL}${value}`;
  }
};

export const HiddenArchivedNews = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useScrollToHash();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>('[href], [src]');
    elements.forEach((element) => {
      if (element.hasAttribute('href')) {
        const href = element.getAttribute('href');
        if (href) {
          const normalizedHref = normalizeUrl(href);
          if (normalizedHref !== href) {
            element.setAttribute('href', normalizedHref);
          }
        }
      }

      if (element.hasAttribute('src')) {
        const src = element.getAttribute('src');
        if (src) {
          const normalizedSrc = normalizeUrl(src);
          if (normalizedSrc !== src) {
            element.setAttribute('src', normalizedSrc);
          }
        }
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="hiddenArchivedNews mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <h2 className="pl-2">OceanCurrent News</h2>
        <div className="mt-10 flex flex-col gap-y-8">
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Coastal_currents_estimated_from_tide_gauges ">
                  <a href="#Coastal_currents_estimated_from_tide_gauges" className="anchor">
                    Coastal currents estimated from tide gauges
                  </a>
                </h3>
                <em>
                  <h5>David Griffin, Madeleine Cahill, and Gabriela S. Pilo</h5>
                </em>
              </div>

              <div>
                <p className="font-bold">19 March, 2026</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                The main purpose of tide gauges is, of course, to measure sea level at the coast, for which there are
                many good reasons. Less&nbsp;well known is that <em>gradients</em> of sea level are also informative,
                just like gradients of&nbsp;atmospheric pressure. In the southern hemisphere, winds blow with high
                pressure on their left, at a speed proportional to the pressure gradient. This is called the geostrophic
                balance. Analogously, water flowing along the shelf is accompanied by coastal sea level higher on the
                left. Satellite altimeters measure the sea level height in the open ocean. So combining this information
                with tide gauges along the coast is, in principal, a means of estimating coastal currents. We've just
                finished a study, using more than a thousand IMOS Acoustic Doppler Current Profilers (ADCPs, deployed
                across 61 locations over 18 years) to see how well this works in practice. The study used a new version
                <a
                  href="https://thredds.aodn.org.au/thredds/catalog/IMOS/OceanCurrent/GSLA/DM/yearfiles/catalog.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  DM03
                </a>
                of our Gridded Sea Level Anomaly product.
              </p>
              <p>
                Our results are surprisingly good. The ADCP data showed that the 'skill' of geostrophic currents,
                defined (loosely) as
                <em>1-error/signal</em> exceeds 0.7 at a few locations, and 0.5 at about 40% of locations. There are
                also some locations where the geostrophic currents have no usable skill on a daily basis, but statistics
                like the average magnitude, ratio of alongshore:across-shelf current variance, auto-correlation
                time-scale etc, are about right. FFI see
                <a href="../timeseries/DM03_ANMN/" target="_blank">
                  more information
                </a>
                including explanation of what is shown in the example graphics shown here.&nbsp;
                <br />
                <br />
                Consequently, we now know how much confidence can be placed in the geostrophic estimates, the beauty of
                which is that they span the entire Australian coast, for the last 30 years, at daily resolution. This is
                useful if your application needs estimates of currents for a specific time, a time period, or a region
                where there are insufficient direct observations, and you don't have access to a validated ocean model.
                You might need a long record of estimates in order to calculate some sort of probability (of high or low
                speeds, north or south direction, for example).
              </p>
              <img alt="" src="news/20260319/map_03_4_08_2015-2020.gif" style={{ height: '460px', width: '500px' }} />
              <img alt="" src="news/20260319/map_03_4_01_2009-2014.gif" style={{ height: '424px', width: '500px' }} />
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Sydney_to_Hobart_outlook">
                  <a href="#Sydney_to_Hobart_outlook" className="anchor">
                    Sydney to Hobart outlook
                  </a>
                </h3>
                <h5>
                  <em>David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">22 December, 2025</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="Syd-Hob/2025122311.gif" target="_blank" rel="noreferrer">
                  <img src="news/20251222/2025122311.gif" />
                </a>
                The positioning of ocean eddies this year is quite similar to last year. More specifically,
                <br />
                &nbsp;&nbsp;1. The main core of the East Australian Current will not affect the first stage of the race
                because it is presently about 150km east of Sydney. Closer to Sydney, there is possibly a weak adverse
                current. This was the situation last year - see the still below or re-live December 2024 by viewing this
                <a href="SNSW/2024/SNSW202412.mp4" target="_blank" rel="noreferrer">
                  animation
                </a>
                which shows how the eddy off Narooma was formed. The animation also includes measurements by current
                meters off Sydney and Narooma (that are not available in real time) to show the rapid variations of
                coastal currents that we cannot estimate from satellite data very well.
                <br />
                &nbsp;&nbsp;2. The first major ocean feature that yachts are likely to encounter is a warm-core eddy
                that is presently off Jervis Bay but slipping to the south. It is very likely to give a boost to yachts
                in deep enough water to be in the current, the edge of which can be seen in a recent
                <a
                  href="product.php?product=fourhour&amp;region=SNSW&amp;date=20251223180000&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  SST image for southern NSW
                </a>
                . Last year a similar eddy and associated current was off Narooma at race time.
                <br />
                &nbsp;&nbsp;3. There are no significant eddies east of Bass Strait.
                <br />
                &nbsp;&nbsp;4. A warm-core eddy east of northern Tasmania may give yachts that keep well offshore a bit
                of a boost. Last year, this eddy's estimated position changed quite significantly between 20 and 27 Dec.
                <br />
                &nbsp;&nbsp;5. There is potential for adverse coastal currents off southern Tasmania.
                <br />
                <br />
                <img src="news/20251222/2024122602.gif" />
                <br />
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="FishSOOP_taking_the_temperature_of_the_coastal_ocean_from_fishing_vessels">
                  <a
                    href="#FishSOOP_taking_the_temperature_of_the_coastal_ocean_from_fishing_vessels"
                    className="anchor"
                  >
                    FishSOOP: taking the temperature of the coastal ocean, from fishing vessels
                  </a>
                </h3>
                <h5>
                  <em>David Griffin &amp; Gabriela S. Pilo</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">17 December, 2025</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <br />
                Just in time for Christmas, we have a valuable addition to our menu of ocean observations - FishSOOP.
                Run by Moninya Roughan's team at UNSW, FishSOOP serves up temperature profiles in near-real time, fresh
                from the decks of fishing vessels operating in many regions around the country. FishSOOP observations
                are mostly (but not exclusively) in waters less than about 200 m deep, so they complement the Argo array
                perfectly.
                <a
                  href="https://oceancurrent.aodn.org.au/product.php?product=snapshot&amp;region=Brisbane2&amp;date=20251207040000&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20251217/FishSOOP_fig1.gif"
                    style={{ height: '462px', width: '350px' }}
                  />
                </a>
                <br />
                &nbsp;
                <br />
                The FishSOOP program nets very many observations, but they aren't everywhere. You have four ways of
                seeing if there are any in your region of interest. Initially, you should browse our&nbsp;
                <a href="https://oceancurrent.aodn.org.au/fishsoop/index.html" target="_blank" rel="noreferrer">
                  FishSOOP&nbsp;landing page
                </a>
                &nbsp;(linked from our home page), where there is a Data Finder, explanatory material, and some use
                cases, one of which addresses the crucial question&nbsp;'are our coastal waters measurably warmer?'. The
                other ways of seeing if there are FishSOOP data in your region of interest is via some plots you are
                already familiar with: look for magenta squares denoting FishSOOP locations in the various SST plots and
                on the Argo index page. Click on the squares to see the temperature profiles.
                <br />
                <br />
                What's the latest example of how useful FishSOOP data is? Look no further than last week, when an
                extraordinary event occurred in the Northern Rivers region of NSW (south of about 28.5ºS). Locals were
                astonished to see large numbers of sharks and dolphins feasting on 'bait balls' in waters normally full
                of surfers. Satellite imagery showed where cold water was coming to the surface at the coast (
                <a
                  href="https://oceancurrent.aodn.org.au/product.php?product=snapshot&amp;region=Brisbane2&amp;date=20251207040000&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  Figure 1
                </a>
                ), while some FishSOOP data showed that on&nbsp;
                <a
                  href="https://oceancurrent.aodn.org.au/fishsoop_php/fsa.php?region=NNSW&amp;date=20251207"
                  target="_blank"
                  rel="noreferrer"
                >
                  days around the 7 December (Figure 2)
                </a>
                &nbsp;the water was about 3º&nbsp;colder than usual from the surface to at least 18 m. As&nbsp;
                <a
                  href="https://unswscience.substack.com/p/shark-frenzy-empties-popular-byron"
                  target="_blank"
                  rel="noreferrer"
                >
                  Colette Kerry explained in the UNSW Substack article
                </a>
                : cold water is normally submerged (because it is dense) and is high in nutrient (long story). If
                something brings it up to the sun-lit waters, the phytoplankton can grow (see the&nbsp;
                <a
                  href="https://oceancurrent.aodn.org.au/product.php?product=oceancolour.CHL&amp;region=Brisbane2&amp;date=20251210161338&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  chlorophyll-a image
                </a>
                &nbsp;in Figure 3, with high values at the coast). The zooplankton feeds on that, then the small fish
                come to feast on the zooplankton, which attracts the bigger fish, then the sharks. So what&apos;s the
                &apos;something&apos; that brought bottom waters to the surface? A combination of a strong East
                Australian Current, proximity to a cold-core eddy east of the current, and north-easterly winds (which
                reduce sea level at the coast - see the&nbsp;
                <a
                  href="https://oceancurrent.aodn.org.au/product.php?product=swot&amp;region=Brisbane2&amp;date=20251210161338&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  SWOT image
                </a>
                , Figure 3) all contribute.&nbsp;
                <br />
                <br />
                To finish, an apology: We haven&apos;t quite finished getting all the site navigation working the way it
                soon will. But the holiday season is upon us, so we are announcing the site even though some pages are
                still just using plain html.
                <br />
                <br />
                <a
                  href="https://oceancurrent.aodn.org.au/fishsoop_php/fsa.php?region=NNSW&amp;date=20251207"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20251217/FishSOOP_fig3_4_combined.png"
                    style={{ height: '1019px', width: '900px' }}
                  />
                </a>
                <br />
                <a
                  href="https://oceancurrent.aodn.org.au/product.php?product=swot&amp;region=Brisbane2&amp;date=20251210161338&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20251217/FishSOOP_fig2.png"
                    style={{ height: '500px', width: '700px' }}
                  />
                </a>
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Adjusting_the_lenses_in_the_ocean">
                  <a href="#Adjusting_the_lenses_in_the_ocean" className="anchor">
                    Adjusting the lenses in the ocean
                  </a>
                </h3>
                <h5>
                  <em>Gabriela S. Pilo</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">3 October, 2025</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a
                  href="https://oceancurrent.aodn.org.au/product.php?product=swot.SSH&amp;region=CLeeu&amp;date=20240501012721&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20251003/Picture1swot.png"
                    style={{ height: '457px', width: '350px' }}
                  />
                </a>
                <br />
                Whenever we see&nbsp;
                <a
                  href="https://oceancurrent.aodn.org.au/#Maps_of_sea_level_and_surface_currents_like_you_ve_never_seen_before"
                  target="_blank"
                  className="anchor"
                  rel="noreferrer"
                >
                  data from a SWOT pass
                </a>
                &nbsp;over our usual maps of sea surface height (SSH), we feel like we are adjusting our lenses to have
                a clearer view of the ocean. Our traditional SSH maps, built by gridding along-track altimeter data over
                a 10-day period and tide-gauge data near the coast, have&nbsp;allowed us to see large mesoscale features
                (i.e., length scales larger than 100 km) like the eddies from the East Australian Current and the
                Leeuwin Current.&nbsp;
                <a
                  href="https://oceancurrent.aodn.org.au/#SWOT_A_new_type_of_satellite_altimeter_now_in_orbit"
                  target="_blank"
                  className="anchor"
                  rel="noreferrer"
                >
                  Since 2023, SWOT
                </a>
                &nbsp;has given us more information about the shape and intensity of these features, shown us what’s
                between those eddies – smaller scale fronts and sub-mesoscale eddies – and&nbsp;
                <a
                  href="https://oceancurrent.aodn.org.au/#Is_wide_swath_altimetry_useful_for_coastal_applications"
                  target="_blank"
                  className="anchor"
                  rel="noreferrer"
                >
                  measured the SSH near the coast
                </a>
                .&nbsp;
                <br />
                <br />
                We have added a new regional SSH ‘SWOT experimental’ product (Fig. 1) to the website to help us explore
                the SWOT dataset further. These regional SSH maps combine wide-swath altimetry measurements from SWOT
                with the existing IMOS-OceanCurrent Gridded Sea Level Anomaly (GSLA) dataset and with in-situ
                measurements, like surface currents from ocean drifters, and full-depth
                current&nbsp;velocities&nbsp;from moored profilers (blue arrows, Fig. 1).&nbsp;
                <br />
                &nbsp;
                <br />
                The SSH shown in the maps is calculated like this:
                <br />
                <br />
                SSH = SLA + MDT − <span style={{ textDecoration: 'overline' }}>MDT</span>
              </p>
              <p>
                where SLA is the adjusted sea level anomaly (SLA) values (from both SWOT and IMOS-OceanCurrent GSLA),
                MDT is the CNES/CLS Mean Dynamic Topography and
                <span style={{ textDecoration: 'overline' }}>MDT</span>&nbsp;is the 'local mean MDT'.
                <br />
                <br />
                The MDT represents&nbsp;the steady part of the SSH signal linked to ocean dynamics. It’s a mean
                calculated over the 1993-2012 period. The MDT signal is usually one order of magnitude larger than the
                SLA signal. For example, off Perth, the MDT near shore is 10 cm higher than offshore (Figure 2), in
                geostrophic balance with the southward flowing Leeuwin Current. Therefore, when adding MDT to SLA, the
                MDT signal dominates. To allow the visualization of the changing part of the SSH signal, we remove a
                fixed value from all data points in the region. This fixed value is the local mean MDT (
                <span style={{ textDecoration: 'overline' }}>MDT</span>; i.e., the mean MDT value for the region shown
                on the map). This value is&nbsp;shown in parentheses in the title of the colourbar for each map. As a
                result, we have SSH values ranging from negative to positive, making it easier for us to see the
                features with variable SSH in the map (e.g., eddies, fronts, coastal SSH changes).
                <br />
                <a
                  href="https://oceancurrent.aodn.org.au/product.php?product=swot.MDTCMEMS&amp;region=Perth&amp;date=20250813120000&amp;rtype=DR/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20251003/Picture2swot.png"
                    style={{ height: '420px', width: '350px' }}
                  />
                </a>
                <br />
                Showing the SSH in the maps, instead of SLA, allows us to directly compare the sea level information
                with the movement of drifters in the maps, and to compare the values with the velocity of ocean currents
                measured by moored instruments and HF radars, all of which include the mean current, of course. The blue
                arrows off Perth in Fig. 1 show a strong SE flow measured by the moored ADCPs. The direction of the flow
                (averaged over the full depth and over a 25-h period to remove tidal effect) agrees with the SSH
                measurements from SWOT.&nbsp;
                <br />
                &nbsp;
                <br />
                The ‘SWOT experimental’ maps are accessed by the button shown in the orange box in Fig 3. You can choose
                between SSH (at least one daily map) and MDT (one map for 1993-2012) in the drop-down menu shown in the
                red box (Fig 3). The ‘info’ button (purple box) has more information about the data shown on the map.
                <br />
                <br />
                We have selected specific regions for this product. Combined, the regions cover the whole Australian
                coast, zoomed in enough for us to see the sub-10 km ocean features.&nbsp;The SWOT satellite revisits the
                same region every 21 days, with an exception from March to July 2023, when the satellite revisited a
                small number of regions daily. These ‘SWOT experimental’ maps are updated as soon as new SWOT
                near-real-time data is available, but - as this data is still experimental - the latest maps can be over
                a week behind.
                <br />
                <br />
                Choosing one example to be highlighted in this news item was a challenge. We’re still exploring the SWOT
                dataset ourselves. So here’s a list of our favourite SSH maps where SWOT measurements are the main
                attraction:
                <br />
                <br />
                <a
                  href="https://oceancurrent.aodn.org.au/product.php?product=swot.SSH&amp;region=Brisbane2&amp;date=20240305074927&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  Across-shelf gradient of sea level off Brisbane previously described in a news item, now put into
                  context against offshore gridded SSH
                </a>
                <br />
                &nbsp;
                <br />
                <a
                  href="https://oceancurrent.aodn.org.au/product.php?product=swot.SSH&amp;region=Tas&amp;date=20230910120000&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  Tiny cyclonic eddies south of Tasmania, with drifters
                </a>
                <br />
                <br />
                <a
                  href="https://oceancurrent.aodn.org.au/product.php?product=swot.SSH&amp;region=AlbEsp&amp;date=20250722033549&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  Several small eddies grouped off Albany (WA)
                </a>
                <br />
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20251003/Picture3swot.png"
                  style={{ height: '493px', width: '600px' }}
                />
                <a
                  href="https://oceancurrent.aodn.org.au/product.php?product=swot.SSH&amp;region=SGBR&amp;date=20250625181233&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  Drifter following a 50 km-diameter anticyclonic eddy off QLD (the eddy is not evident in the gridded
                  SSH product)
                </a>
                <br />
                &nbsp;
                <br />
                <a
                  href="https://oceancurrent.aodn.org.au/product.php?product=swot.SSH&amp;region=LordHoweS&amp;date=20231222191124&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  Small frontal eddy near EAC meander (154°E, 31°S)
                </a>
                <br />
                &nbsp;
                <br />
                <a
                  href="https://oceancurrent.aodn.org.au/product.php?product=swot.SSH&amp;region=JBGulf&amp;date=20250119120000&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  Improved SSH measurements off the Joseph Bonaparte Gulf. The gridded SSH product has a stationary
                  cyclonic eddy off the Gulf, likely resultant from an interpolation artefact
                </a>
                <br />
                &nbsp;
                <br />
                <a
                  href="https://oceancurrent.aodn.org.au/product.php?product=swot.SSH&amp;region=RechEyre&amp;date=20240109173750&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  SSH in-shelf gradient, with low SSH off Coffin Bay. Another example of SWOT showing in-shelf features
                  that were not resolved in the gridded SL
                </a>
                <br />
                &nbsp;
                <br />
                Re-sampling of a small cyclonic eddy (157°E,34.5°S) over 12 hours, quantifying the decay in eddy
                amplitude and change in shape (
                <a
                  href="https://oceancurrent.aodn.org.au/product.php?product=swot.SSH&amp;region=LordHoweS&amp;date=20250625181233&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  before
                </a>
                &nbsp;and&nbsp;
                <a
                  href="https://oceancurrent.aodn.org.au/product.php?product=swot.SSH&amp;region=LordHoweS&amp;date=20250626050514&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  after
                </a>
                )<br />
                &nbsp;
                <br />
                <a
                  href="https://oceancurrent.aodn.org.au/product.php?product=swot.SSH&amp;region=NGBR&amp;date=20250814120000&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  Data to the west of Torres Strait
                </a>
                , a region not included in the gridded SL product
                <br />
                &nbsp;
                <br />
                <a
                  href="https://oceancurrent.aodn.org.au/product.php?product=swot.SSH&amp;region=Perth&amp;date=20250813120000&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  Beautiful eddy field off WA
                </a>
                <br />
                &nbsp;
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="An_eddy_amp_float_combo_in_the_Great_Australian_Bight">
                  <a href="#An_eddy_amp_float_combo_in_the_Great_Australian_Bight" className="anchor">
                    An eddy &amp; float combo in the Great Australian Bight
                  </a>
                </h3>
                <h5>
                  <em>Gabriela S. Pilo</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">1 September, 2025</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20250901/Picture1.png"
                  style={{ height: '711px', width: '500px' }}
                />
                <br />
                An Argo float (WMO ID&nbsp;<strong>3902460</strong>) has been trapped in an anticyclonic eddy
                propagating through the Great Australian Bight for over one year to date (Figure 1). The float was first
                entrained by the eddy in 7 August 2024 (
                <a href="https://oceancurrent.aodn.org.au/profiles/cycle.php?wmoid=3902460&amp;cycle=60&amp;depth=0">
                  cycle 60
                </a>
                , Fig 2a) and did three full loops at the eddy periphery before settling into the eddy core (Fig 2a,
                float track in red). Since entraining the float, the eddy moved westwards, from 130.8°E, 36.2°S to
                120.2°E, 37.2°S, at a speed of ~3 km per day.
                <br />
                &nbsp;
                <br />
                Over the past year, the float measured 37 profiles (one every 10 days) of temperature (T) and salinity
                (S), with some of these profiles having an interesting pattern. On&nbsp;
                <a href="https://oceancurrent.aodn.org.au/profiles/cycle.php?wmoid=3902460&amp;cycle=65&amp;depth=0">
                  27 Sep 2024
                </a>
                &nbsp;(cycle 65, Fig 2d), for example, the float measured a mid-depth T anomaly maximum at ~900 m, with
                waters 1°C warmer than the satellite-adjusted climatology. Mid-depth anomalies become more evident as
                the eddy propagates, and some of the T and S profiles have a ‘staircase’ pattern, evident in&nbsp;
                <a href="https://oceancurrent.aodn.org.au/profiles/cycle.php?wmoid=3902460&amp;cycle=83&amp;depth=0">
                  cycle 83
                </a>
                &nbsp;(Fig 2b), with large anomalies at 350 and 700-950 m. This and later cycles also show high values
                of T and S&nbsp;&nbsp;well mixed in the top 60 m (top-400 m zoomed in&nbsp;
                <a href="https://oceancurrent.aodn.org.au/profiles/cycle.php?wmoid=3902460&amp;cycle=83&amp;depth=1">
                  here
                </a>
                ). This warm and salty mixed layer indicates the entrainment of coastal waters in the near-surface of
                the eddy. Maps of&nbsp;
                <a href="https://oceancurrent.aodn.org.au/product.php?product=daily.SST&amp;region=AlbEsp&amp;date=20250313120000&amp;rtype=DR">
                  SST from March
                </a>
                , 2 weeks before cycle 83, show a filament of warm water extending from the coast to the open ocean in
                the western flank of the eddy (Fig 2c, pink box), being advected by the eddy rotation.
                <br />
                &nbsp;
                <br />
                The mid-depth maxima in T and S measured within the eddy are similar to the ones we’ve described before
                in&nbsp;
                <a
                  href="https://oceancurrent.aodn.org.au/#Argo_Observed_Bass_Strait_Water_Off_Central_New_South_Wales"
                  className="anchor"
                >
                  eddies in the Tasman Sea
                </a>
                . The profiles suggest that the eddy that trapped this float is a lense – an eddy that had its core
                subducted over time, and another water mass was trapped above its original core.
                <br />
                &nbsp;
                <br />
                Lense-type eddies are observed in maps of adj. SLA, but often don’t have a SST signature. Fig 1 confirms
                that this eddy is indeed a lense: the eddy keeps a strong SLA signal and often a well defined shape (
                <a href="https://oceancurrent.aodn.org.au/product.php?product=swot&amp;region=RechEyre&amp;date=20240928010208&amp;rtype=DR">
                  Fig 1a, beautifully captured by SWOT
                </a>
                ), with no clear signal in SST maps (Fig 1b). We see this eddy in the Adj. SLA maps because the eddy is
                in geostrophic balance (i.e., surfaces with different water densities maintain the circular flow, and
                vice-versa), and altimetry measurements capture the imprint of this flow in the free surface of the
                ocean. Having said that, the eddy’s rotation advects water meridionally, bringing cold waters to the
                north, and hot waters to the south. In frontal regions, the T contrast between waters is seen as
                filaments within the eddy, for example in the coastal entrainment from March described above (Fig 2c).
                <br />
                &nbsp;
                <br />
                Last month, the eddy from our combo merged with another anticyclonic eddy. SWOT took a snapshot of
                <a href="https://oceancurrent.aodn.org.au/product.php?product=swot&amp;region=AlbEsp&amp;date=20250721033518&amp;rtype=DR">
                  the two eddies right before the merge
                </a>
                (Fig 3a), and IMOS-OceanCurrent adj. SLA maps show us the merge happening over 3 days (Fig 3b-d). There
                wasn’t a distinct change in the T and S profiles measured&nbsp;
                <a href="https://oceancurrent.aodn.org.au/profiles/cycle.php?wmoid=3902460&amp;cycle=83&amp;depth=0">
                  before
                </a>
                &nbsp;and&nbsp;
                <a href="https://oceancurrent.aodn.org.au/profiles/cycle.php?wmoid=3902460&amp;cycle=83&amp;depth=0">
                  after
                </a>
                &nbsp;the merge.
                <br />
                &nbsp;
                <br />
                Where did this eddy come from?&nbsp;&nbsp;Clicking backwards in time in our adj. SLA maps will give you
                the answer.&nbsp;&nbsp;Our guess is that it came from the Tasman Sea, like the other eddies that follow
                the&nbsp;
                <a href="https://doi.org/10.1029/2012GL053091">‘Eddy Avenue’</a>&nbsp;from the EAC separation region,
                take a&nbsp;
                <a href="https://oceancurrent.aodn.org.au/#Tracking_EAC_warm_core_eddies" className="anchor">
                  turn westwards south of Tasmania, and keep going
                </a>
                &nbsp;- often entrapping things along the way, like this Argo float.
                <br />
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20250901/Picture2_2.png"
                  style={{ height: '507px', width: '800px' }}
                />
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20250901/Picture3.png"
                  style={{ height: '468px', width: '600px' }}
                />
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Cryptic_upwelling_off_Western_Australia">
                  <a href="#Cryptic_upwelling_off_Western_Australia" className="anchor">
                    Cryptic upwelling off Western Australia
                  </a>
                </h3>
                <h5>
                  <em>Ming Feng, Toan Bui, Chari Pattiaratchi</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">31 May, 2025</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                Earlier this year, the&nbsp;
                <a href="https://imos.org.au/facility/national-mooring-network">National Mooring Network</a>&nbsp;team
                has successfully retrieved the data from the&nbsp;instruments in the mooring array off Western Australia
                (WA).&nbsp;
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20250531/fig1.png"
                  style={{ height: '379px', width: '600px' }}
                />
                <br />
                An exceptional subsurface cooling event that occurred from early January to late March 2024, at 40-160 m
                depths (Figure 1, red box) was recorded by the instruments at the WATR20 mooring (200 m depth; Figure
                2). This event was marked by&nbsp;
                <a href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P51/WATR20/zt/WATR20-2312-Signature100-194_zt.html">
                  temperatures as low as 12oC in January, at 200 m
                </a>
                , with monthly averaged temperature anomalies being about 3°C cooler than climatology (Figure 1b,
                c).&nbsp;
                <br />
                <br />
                These persistently low temperatures are unprecedented in the mooring observations on the Rottnest Shelf
                (Fig. 1b). Previous records of subsurface cooling of less than 2°C below average occurred during the
                summer peaks of the extreme&nbsp;<a href="https://ggweather.com/enso/oni.htm">2015-16 El Niño</a>
                &nbsp;and the weak 2018-19 El Niño.&nbsp;
                <br />
                <a href="https://oceancurrent.aodn.org.au/timeseries/ANMN_P51/mapst/06_Perth_vmean_1.html">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20250531/fig2.png"
                    style={{ height: '394px', width: '400px' }}
                  />
                </a>
                <br />
                The 2024 subsurface cooling event was also sampled during a glider survey a bit farther north, off Two
                Rocks, from 26 to 30 January 2024 (fast forward from&nbsp;
                <a href="https://oceancurrent.aodn.org.au/gliders/4day.php?link=TwoRocks20240115_4d/2024012800.html">
                  here
                </a>
                , or click&nbsp;
                <a href="https://oceancurrent.aodn.org.au/gliders/4day.php?link=TwoRocks20240115_30d/latest.html">
                  here for the entire glider track
                </a>
                ). The glider measurements from 27-29 January (Figure 3) show bottom waters cooler than 18oC encroaching
                upon the shelf, but not reaching the surface, and high values of chlorophyll-<em>a</em>
                &nbsp;concentration.
                <br />
                <br />
                Despite the mooring measurements showing cold temperatures on the shelf for around three months,
                negative sea surface temperature anomalies off the southern WA coast were only seen in satellite data
                from 20/Jan to 18/Feb,&nbsp;
                <a href="https://oceancurrent.aodn.org.au/product.php?product=daily&amp;region=Perth&amp;date=20240206170626&amp;rtype=DR">
                  peaking on 6/Feb
                </a>
                . These conditions characterise a&nbsp;
                <a href="https://www.sciencedirect.com/science/article/abs/pii/S027843430500083X">
                  “cryptic” upwelling
                </a>
                &nbsp;– an upwelling of cold bottom waters on the continental shelf that doesn’t fully reach the sea
                surface, being less visible from satellite data than from sub-surface measurements.
                <br />
                <br />
                These subsurface measurements of a cryptic event show the importance of sustained moored observations
                and glider surveys to monitor marine extremes, especially in a region of high ecological value such as
                the southern coast of WA.
                <br />
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20250531/fig3.png"
                  style={{ borderStyle: 'solid', borderWidth: '0px', height: '413px', width: '450px' }}
                />
                For now, we are unsure what caused this cold event at the mooring site.
                <br />
                <br />
                The earlier 2015-2016 subsurface cooling seen in the mooring measurements was linked to a strong El Niño
                event. Usually, in El Niño years, strong westerly winds at the equator induce low sea level anomalies in
                the tropics that propagate to the WA coast, in the form of coastally trapped waves. Because of the
                propagation of these waves, the El Niño Southern Oscillation has been linked to sea level anomalies off
                Fremantle, WA (
                <a href="https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2002JC001763">Feng et al., 2003</a>).
                In El Niño years, the low sea level anomalies that arrive in WA are seen as an elevated thermocline and
                negative sea surface temperature anomalies.&nbsp;
                <br />
                <br />
                However, the&nbsp;
                <a href="https://www.nature.com/articles/s41612-024-00890-0">2023-2024 El Niño was unusual</a>, with no
                strong westerlies&nbsp;inducing the low sea level anomalies that propagate to the WA coast. So, at the
                moment, we cannot see a direct link between this&nbsp;exceptional subsurface cooling event&nbsp;and the
                2023-2024 El Niño.&nbsp;
                <br />
                We know&nbsp;that regional air-sea interactions off WA&nbsp;
                <a href="https://doi.org/10.1007/s00382-013-1961-z">can be significant at times</a>.&nbsp;Therefore, the
                exceptional cooling in early 2024 could have been caused by a combination of regional ocean dynamics.
                This is still under investigation.
                <br />
                &nbsp;
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="TC_Alfred_rsquo_s_imprint_in_the_deep_ocean">
                  <a href="#TC_Alfred_rsquo_s_imprint_in_the_deep_ocean" className="anchor">
                    TC Alfred’s imprint in the deep ocean
                  </a>
                </h3>
                <h5>
                  <em>Gabriela S. Pilo</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">31 March, 2025</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20250331/Fig1_TCAlfred_1.png"
                  style={{ height: '599px', width: '350px' }}
                />
                <br />
                Tropical Cyclone (TC) Alfred hit the central-east coast of Australia on the 8th&nbsp;of March, after
                generating on the 20th&nbsp;of February and moving south-eastward in the Coral Sea, parallel to the
                coast. As it moved, it drew heat and moisture from the upper ocean, leaving an imprint in the surface of
                the ocean and in the waters below.&nbsp;&nbsp;
                <br />
                We were curious to see how TC Alfred’s imprint in the ocean shows up in the figures of the website. Our
                figures show changes in sea level, surface waves, sea surface temperature, and temperature and salinity
                in the top 50 meters of the ocean.
                <br />
                &nbsp;
                <br />
                <strong>Sea level</strong>
                <br />
                The easiest way to spot TC Alfred in our maps is by looking at the adjusted sea level anomaly (SLA) map
                off northeast Australia (Fig 1), which includes atmospheric isobars. In Figure 1, the colours show
                adjusted SLA values, and the cyan lines are the atmospheric pressure at sea level, spaced at 2 hPa. You
                can see the closed contours isobars&nbsp;(lines of same atmospheric pressure)&nbsp;&nbsp;forming a
                coherent feature centred at 153.5°E, 13.5°S on the&nbsp;23 Feb, that then moves southward over the
                following week (click forward on the maps,
                <a href="http://oceancurrent.aodn.org.au/product.php?product=gsla&amp;region=NE&amp;date=20250223112742&amp;rtype=SR">
                  from 23 Feb
                </a>
                ).
                <br />
                <br />
                Zooming out to the map of Australia, we see different SLA values immediately below TC Alfred when
                comparing the maps of&nbsp;adjusted SLA&nbsp;(~ 0 m; Figure 2) and&nbsp;non-tidal SLA&nbsp;(~0.5 m). The
                values are different because the adjusted SLA has the effect of atmospheric pressure over the ocean
                removed, while the non-tidal SLA doesn’t. The non-tidal SLA below TC Alfred is high because Alfred has
                low atmospheric pressure in its centre compared to the surrounding environment. This localised low
                atmospheric pressure allows the ocean to rise below it.
                <br />
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20250331/Fig2_TCAlfred_2.png"
                  style={{ height: '577px', width: '850px' }}
                />
                <strong>Surface&nbsp;waves</strong>
                <br />
                Cyclones also leave an imprint in the ocean by transferring energy to the ocean through wind friction,
                forming waves. Surface waves below TC Alfred were over 8 m high, as shown in our&nbsp;
                <a href="https://oceancurrent.aodn.org.au/waves/waves3.php?date=20250301120000">
                  surface wave maps from 1st&nbsp;March
                </a>
                &nbsp;– read more about TC Alfred and surface waves at the&nbsp;
                <a href="https://imos.org.au/news/imos-oceancurrent/imos-oceancurrent-wave-tool-monitors-high-waves-from-tc-alfred">
                  IMOS website
                </a>
                .<br />
                <br />
                <strong>Sea Surface Temperature</strong>
                <br />
                TC Alfred drew heat from the ocean as it moved and intensified, cooling the sea surface temperature on
                its wake. There was a ~2°C drop in waters of the Coral Sea between&nbsp;22 February&nbsp;and&nbsp;2
                March&nbsp;(Figure 3). The cooler patch of water after the TC passing is even clearer in maps of&nbsp;
                <a href="https://oceancurrent.aodn.org.au/product.php?product=daily.SST_ANOM&amp;region=NE&amp;date=20250302120000&amp;rtype=SR">
                  SST anomalies
                </a>
                .&nbsp;
                <br />
                &nbsp;
                <br />
                Note that, on the 2 March, there is a dark blue patch at the southeast corner of the figure, indicating
                values below the colourbar threshold. These values are non-realistic and are likely caused by
                difficulties on processing the data near heavy cloud coverage associated with TC Alfred.
                <br />
                <br />
                <strong>Sub-surface temperature and salinity</strong>
                <br />
                An&nbsp;
                <a href="https://oceancurrent.aodn.org.au/profiles/cycle.php?wmoid=5905569&amp;cycle=26&amp;depth=1">
                  Argo float surfaced right below the cyclone on the 4th&nbsp;of March
                </a>
                &nbsp;(red box in Figure 2). We can compare its measurements to the measurements taken by a&nbsp;
                <a href="https://oceancurrent.aodn.org.au/profiles/cycle.php?wmoid=5905663&amp;cycle=235&amp;depth=1">
                  nearby float at the same location, but before the cyclone passed
                </a>
                &nbsp;(blue box in Figure 2).
                <br />
                &nbsp;
                <br />
                Figure 4 shows temperature (top) and salinity (bottom) values measured by both floats. The first column
                shows values plotted against depth (in meters) – showing that the waters at the top 50 meters were
                warmer and saltier before TC Alfred passed.&nbsp;
                <br />
                &nbsp;
                <br />
                The second column shows again temperature and salinity values, but this time plotted against potential
                density (in kg/m3). This is a better way to compare profiles, because it removes the effect of the
                vertical movement of the ocean that happened between the days, leaving only the changes caused by mixing
                and heat exchange.&nbsp;
                <br />
                &nbsp;
                <br />
                The third column shows the difference between the temperature and salinity profiles in potential density
                space – confirming that there was a 0.7°C drop and a 0.1 psu drop in the upper part of the water column
                after the cyclone has passed.&nbsp;
                <br />
                &nbsp;
                <br />
                The freshening seen in the Argo data is a result of heavy rainfall associated with the cyclone,
                ‘diluting’ the salty waters of the Coral Sea. The cooling is linked to the cyclone drawing heat from the
                upper ocean, and strong winds mixing the upper layer.
                <br />
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20250331/Fig3_TCAlfred.png"
                  style={{ height: '523px', width: '875px' }}
                />
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20250331/Fig4_TCAlfred_1.png"
                  style={{ height: '586px', width: '400px' }}
                />
                <br />
                &nbsp;
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Marine_Heatwave_off_WA">
                  <a href="#Marine_Heatwave_off_WA" className="anchor">
                    Marine Heatwave off WA
                  </a>
                </h3>
                <h5>
                  <em>Gabriela S Pilo &amp; David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">30 January, 2025</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <a href="https://oceancurrent.aodn.org.au/product.php?product=daily&amp;region=NingLeeu&amp;date=20250122093814&amp;rtype=DR">
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20250130/fig1_2.png"
                  style={{ height: '584px', width: '300px' }}
                />
              </a>
              <p>
                The ocean off Western Australia is extremely hot right now (Figure 1). The monthly sea surface
                temperature (SST) off Australia’s northwest was up to 2.5°C above the long-term mean over the past few
                months (Figure 2). That is 1°C&nbsp;above the previous summers maxima&nbsp;(Figure 2c). The event has
                been characterised as a Marine Heatwave (MHW), evolving from&nbsp;
                <a href="https://tos.org/oceanography/article/categorizing-and-naming-marine-heatwaves">
                  category 1 (moderate) to 3 (severe)
                </a>
                &nbsp;since September.
              </p>
              <p>
                <br />
                The high temperatures started in September, off Australia’s NW. By November (Figure 3a), the SST
                exceeded 2°C above the seasonal mean (i.e., the average temperature for that time of the year, at that
                location). In that region, by December, the temperature was 3°C over the seasonal mean at the sea
                surface (Figure 3b), and 26°C waters were observed down to 100 metres by&nbsp;
                <a href="https://oceancurrent.aodn.org.au/gliders/4day.php?link=Onslow20241119_12d/2024120400.html">
                  a glider off Onslow
                </a>
                . An intense Leeuwin Current, acompannied by&nbsp;strong winds from&nbsp;tropical cyclone Sean, carried
                that hot water southward along the WA shelf break&nbsp;(Figure 3b, c).
                <br />
                <br />
                Ocean temperatures within the Leeuwin current were up to 3°C above the seasonal mean (Figure 3c) near
                the surface. These anomalously high temperatures extended from the surface to&nbsp;
                <a href="https://oceancurrent.aodn.org.au/profiles/cycle.php?wmoid=1902049&amp;cycle=167&amp;depth=0">
                  400 m off Shark Bay
                </a>
                &nbsp;(25oS) and to&nbsp;
                <a href="https://oceancurrent.aodn.org.au/profiles/cycle.php?wmoid=5905578&amp;cycle=12&amp;depth=0">
                  800 m off Jurien
                </a>
                &nbsp;(30°S), as shown by Argo floats sampling the Leeuwin Current and its eddies.&nbsp;
                <a href="https://oceancurrent.aodn.org.au/profiles/cycle.php?wmoid=5905531&amp;cycle=93.&amp;depth=1">
                  Outside of the Leeuwin current
                </a>
                , however, sub-surface temperatures are still within the climatological mean.
                <br />
                <br />
                On the shelf, the IMOS’&nbsp;<a href="https://imos.org.au/facility/ocean-gliders">Glider</a>
                &nbsp;and&nbsp;
                <a href="https://imos.org.au/facility/ocean-gliders/event-based-sampling">Event-based</a>
                &nbsp;facilities have deployed three gliders to monitor this MHW. One glider is currently off Perth
                doing a routine on-off shelf transect, and two other were&nbsp;deployed off Onslow,
                <a href="https://oceancurrent.aodn.org.au/gliders/4day.php?link=Onslow20250129_nrt_4d/latest.html">
                  one
                </a>
                doing on-off shelf transects, and
                <a href="https://oceancurrent.aodn.org.au/gliders/4day.php?link=Ningaloo20250129_nrt_4d/latest.html">
                  the other
                </a>
                sampling southward along the Ningaloo Coast to be collected in Shark Bay.
                <br />
                <br />
                This year’s MHW has a different onset and timing&nbsp;than the 2011 WA MHW, which had devastating
                effects in kelp, seagrass, and coral reef ecosystems. However, it has already impacted local marine life
                due to thermal stress, including 30,000 dead fish washing ashore&nbsp;
                <a href="https://www.abc.net.au/news/2025-01-28/marine-heatwave-pilbara-mass-fish-deaths/104852574?utm_campaign=abc_news_web&amp;utm_content=link&amp;utm_medium=content_shared&amp;utm_source=abc_news_web">
                  off the Pilbara Coast
                </a>
                . The extent of coral bleaching and further impacts are still being assessed.
                <br />
                <br />
                Possible causes for the current MHW off WA include a combination of local and remote air-sea
                interactions, anomalously weak winds in the NW shelf, and a strong Leeuwin Current bringing the
                anomalous heat southward.&nbsp;
                <br />
                &nbsp;
                <br />
                The SST in some regions off WA were exceeding the range we had set in our maps. We have now changed the
                range of the colourbar in&nbsp;
                <a href="https://oceancurrent.aodn.org.au/product.php?product=snapshot&amp;region=Rowley&amp;date=20250103050000&amp;rtype=DR">
                  some of our regions
                </a>
                &nbsp;off WA for better visualization.
                <br />
                <a href="https://oceancurrent.aodn.org.au/product.php?product=ssta&amp;region=NWS&amp;date=20250131011809&amp;rtype=DR">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20250130/Fig2_1.png"
                    style={{ height: '606px', width: '700px' }}
                  />
                </a>
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20250130/Fig3.png"
                  style={{ height: '443px', width: '700px' }}
                />
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Sydney_to_Hobart_outlook">
                  <a href="#Sydney_to_Hobart_outlook" className="anchor">
                    Sydney to Hobart outlook
                  </a>
                </h3>
                <h5>
                  <em>David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">20 December, 2024</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20241220/2024121605.gif"
                  style={{ height: '342px', width: '300px' }}
                />
                It is an upside-down year, with unusually strong currents off Tasmania&nbsp;and unusually weak currents
                off NSW. This is because the East Australian Current is about 250km&nbsp;off Sydney, skirting around a
                cold-core (cyclonic, low sea level, clockwise rotation) eddy while the opposite is happening off
                Tasmania.&nbsp;Here, a strong warm-core eddy is situated just off the continental slope potentially
                giving yachts a boost of a knot or more.
              </p>
              <p>
                Instead of illustrating the EAC using an image of sea surface temperature, this year we have chosen to
                use a satellite image of chlorophyll concentration, inferred from the colour of the water. Mariners know
                that the colour of the ocean is very variable, with chlorophyll-laden coastal waters sometimes being
                described as 'dirty', in contrast to the warmer, clearer waters brought south by the&nbsp;EAC. The image
                shows that the strongest velocities are to be found at the boundary between the tropical (shown as dark
                blue) and temperate (shades of green) waters. But since those velocities are well clear of the rhumb
                line this year, skippers will not be too concerned about currents for the NSW leg of the race, except
                perhaps near Eden. &nbsp;
              </p>
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20241220/2024121414.gif"
                  style={{ height: '276px', width: '300px' }}
                />
              </p>
              <p>
                The same cannot be said about the Tasmanian leg. The warm-core eddy there now has been in place since
                July, when it was responsible for the surface water temperature setting new records. An Argo float
                sampled this eddy on
                <a
                  href="https://oceancurrent.aodn.org.au/profiles/cycle.php?wmoid=5905513&amp;cycle=93&amp;depth=0"
                  target="blank"
                >
                  11 Dec
                </a>
                , finding water an astonishing 5 degrees warmer than usual at 500m and beyond. Depending on the wind,
                some yachts are bound to keep east of the pack, in search of the western flanks of this eddy.
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20241220/20241211_5905513_93.gif"
                  style={{ height: '193px', width: '300px' }}
                />
              </p>
              <p>
                Click to expand:
                <a href="SNSW_chl/2024121605.gif" target="blank">
                  Fig 1,{' '}
                </a>
                <a href="TasE/2024121414.gif" target="blank">
                  Fig 2
                </a>
              </p>
              <p>
                <strong>Updates:</strong>
              </p>
              <ol>
                <li>
                  A favourable current between Eden and Jervis Bay is now more apparent, as is a fairly weak
                  unfavourable current just north of Jervis Bay.
                  <br />
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20241220/2024122322.gif"
                    style={{ height: '445px', width: '390px' }}
                  />
                </li>
                <li>
                  You might have read our August 2024 news item about a new experimental satellite called SWOT, which
                  gives us very detailed views of ocean current velocities, but not very often. We've shown below the
                  latest-available SWOT data overlain on SST imagery for the time, showing weak currents near Sydney on
                  12 Dec.
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20241220/2024121203.gif"
                    style={{ height: '445px', width: '390px' }}
                  />
                  <br />
                  <a href="https://oceancurrent.aodn.org.au/SWOT/L3/PIC0_10/SSP/sst6/SNSW/" target="blank">
                    [other dates]
                  </a>
                  <a
                    href="https://oceancurrent.aodn.org.au/SWOT/L3/PIC0_10/SSP/sst6/Syd-Hob/2024121214.html"
                    target="blank"
                  >
                    [Syd-Hob]
                  </a>
                  <a
                    href="https://oceancurrent.aodn.org.au/SWOT/L3/PIC0_10/SSP/sst6/Tas/2024121300.html"
                    target="blank"
                  >
                    [Tas]
                  </a>
                </li>
              </ol>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Rogue_waves_battering_Southern_Australia">
                  <a href="#Rogue_waves_battering_Southern_Australia" className="anchor">
                    Rogue waves battering Southern Australia
                  </a>
                </h3>
                <h5>
                  <em>Salman Khan, Marites Canto, and Cagil Kirezci</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">17 September, 2024</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                The couple of weeks of transition from Aug to Sep 2024 have seen relentless westerlies in Southern
                Australia causing widespread disruption and damage in Tasmania and Victoria.&nbsp;
                <br />
                &nbsp;
                <br />
                They have also produced some very big waves!
                <br />
                &nbsp;
                <br />
                Thanks to a newly added feature in our&nbsp;
                <a href="https://oceancurrent.aodn.org.au/waves/waves3.php">Surface Waves maps</a>, we are now able to
                visualise and examine time series of wave characteristics collected by the Australian wave buoys from 01
                Jun 2024 - it’s as simple as clicking a wave buoy symbol on the Surface wave map.
                <br />
                &nbsp;
                <br />
                Tasmanian West coast has seen persistently high waves during these extremes. The&nbsp;
                <a href="https://oceancurrent.aodn.org.au/waves/waves3ts.php?region=Cape_Sorell&amp;date=20240828120000">
                  Cape Sorell buoy
                </a>
                (145E, 42S) recorded significant wave heights close to 8m over a few days over this period and even
                recorded an individual wave as high as ~18 m – about the height of a 6-storey building!&nbsp;
                <br />
                &nbsp;
                <br />
                The wave buoys at Cape Sorell and&nbsp;
                <a href="https://oceancurrent.aodn.org.au/waves/waves3ts.php?region=Cape_Du_Couedic&amp;date=20240828120000">
                  Cape du Couedic
                </a>
                &nbsp;(Southwest of Kangaroo Island) captured significant wave heights upwards of 7 m on 28th&nbsp;Aug
                (Figure&nbsp;1). Offshore, the Bureau of Meteorology’s AUSWAVE-R model (colours) matched well with a
                satellite radar altimeter ascending track (black lines and filled circles) showing significant wave
                heights of 8+ m, while a Sentinel-1 Synthetic Aperture Radar (SAR) satellite pass (black dots straddling
                the altimeter track) revealed dominant wave period of more than 12 s.
                <br />
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20240917/rogue_waves.png"
                  style={{ height: '431px', width: '600px' }}
                />
                Clicking on the Cape Sorell buoy symbol on the map shows a remarkable&nbsp;
                <a href="https://oceancurrent.aodn.org.au/waves/waves3ts.php?region=Cape_Sorell&amp;date=20240828120000">
                  time series of wave data
                </a>
                &nbsp;(Figure&nbsp;2) covering several days of this event. The significant wave height consistently
                stays between 7-8 m, reaching a maximum of ~8.5-9 m with the dominant wave periods around ~12 s,
                reaching up to 16 s. On 29th&nbsp;Aug, around 02:00 local time, a maximum wave height of ~18 m is also
                recorded – exceeding twice the significant wave height – which&nbsp;almost satisfies the rogue wave
                criterion.&nbsp;
                <a href="https://oceanservice.noaa.gov/facts/roguewaves.html">Rogue (or freak) waves</a>&nbsp;have a
                height greater than twice the significant wave height and are a marine hazard.&nbsp;
                <br />
                <br />
                Another potential rogue wave event can be seen at 18:00 local time with a maximum wave height of ~14 m
                with a significant wave height around 6.25 m.
                <br />
                <br />
                <a href="https://www.sciencedirect.com/science/article/pii/S0997754603000724">
                  Several physical mechanisms
                </a>
                &nbsp;may be responsible for generating such extreme rogue wave as observed at Cape Sorrell. While it is
                not always straightforward to pinpoint the exact mechanism, it is well known that during extreme storm
                conditions, increased nonlinearity can lead to the formation of such giant waves. Under certain
                circumstances, strong wind conditions can also contribute to nonlinear instability growth, further
                driving the development of rogue waves.&nbsp;Similar extreme conditions were also observed at Cape
                Sorell consistently during the first few days of Sept and are worth a look.
                <br />
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20240917/rogue_waves2.png"
                  style={{ height: '403px', width: '500px' }}
                />
                The user can flick through the time series of wave buoy data, navigate forward or backward in 2-houly
                steps, use the&nbsp;<em>Permlink</em>&nbsp;button to share a permanent URL of a time series plot with
                others, or jump back to the national Surface Waves map.
                <br />
                &nbsp;
                <br />
                We are looking forward for interested users to explore these tools for wave extremes or interesting
                events and provide us with any feedback.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Is_wide_swath_altimetry_useful_for_coastal_applications">
                  <a href="#Is_wide_swath_altimetry_useful_for_coastal_applications" className="anchor">
                    Is wide swath altimetry useful for coastal applications?
                  </a>
                </h3>
                <h5>
                  <em>David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">28 August, 2024</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                For people interested in using the new, experimental wide-swath altimeter SWOT for coastal applications:
                we've expanded on our
                <a href="./#20240301" target="blank" className="anchor">
                  1 March 2024
                </a>
                assessment of this new instrument, bringing in Australia's tide gauge network and the IMOS array of
                coastal current meters to complement SST and drifter data in an assessment of the 2nd release of the
                SWOT dataset.
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20240828/2024030508.gif"
                  style={{ height: '450px', width: '380px' }}
                />
              </p>
              <p>
                <a href="/SWOT/L3/PIC0_10/SSP/sla3/Bris-Syd/2024030508.html" target="blank">
                  Fig 1
                </a>
                (caption at end of text) shows a comparison of SWOT with tide gauges from Sydney to Tweed Heads on 5
                March 2024, a day when SWOT sampled the track that happens to coincide with the continental shelf from
                Sydney to Brisbane. In colour you see the detided, adjusted sea level anomaly (ASLA) for both SWOT and
                the tide gauges. The agreement of the two types of observation is good, with both showing that ASLA is
                moderately high (15-20cm) at Tweed and Brunswick Heads, near zero at Yamba and Coffs, high again at Port
                Macquarie, Crowdy Head and Forster, then even higher (about 25cm) at Sydney. The SWOT data for this day
                shows, <strong>for the first time</strong>, the details of how sea level changes across the continental
                shelf. The across-shelf gradient of sea level is closely related to the magnitude of the alongshore
                current (via geostrophy). The strong gradient off Yamba (see the sharp change from green to yellow)
                indicates that a strong, narrow, southward flow existed at mid-shelf on this day, while no such flow
                (this strong) existed over the continental shelf off either Coffs or Brunswick Heads, the two closest
                gauges.
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20240828/2024020210.gif"
                  style={{ height: '450px', width: '475px' }}
                />
              </p>
              <p>
                <a href="/SWOT/L3/PIC0_10/SSP/slaQQ/sla_timeseries_p1.html" target="blank">
                  Fig. 2a
                </a>
                and
                <a href="/SWOT/L3/PIC0_10/SSP/slaQQ/sla_timeseries_p2.html" target="blank">
                  b
                </a>
                also compare SWOT and tide gauges, but takes a tide gauge perspective, showing time-series of the tide
                gauge data (black lines) at several sites for a period, overlain with the small number of SWOT estimates
                (which are only made at intervals of 21 days for each track; red circles). This plot also lists 4
                numbers for each gauge: 1) the mean sea level for the study period, relative to the long-term mean, 2)
                the mean difference of the tide gauge from SWOT (the bias), 3) the mean absolute anomaly (MAA) of the
                tide gauge data, and 4) the mean absolute error (MAE) of the de-biased tide gauge relative to SWOT. The
                MAEs are fairly consistent across the east coast gauges, ranging from 3 to 5cm but less so across the
                south coast where they range from 4 to 12cm. Importantly, MAEs are almost always significantly smaller
                than the MAAs, which says that SWOT estimates of coastal sea level have usable skill. Apart from the
                fact that SWOT data is never colocated with the tide gauges, some of the 'error' measured here is due to
                the differences between how the two data sets are de-tided and adjusted for atmospheric effects. The
                biases of the tide gauges relative to SWOT are particularly interesting to us, ranging from -5 to 4cm on
                the east coast and -4 to 11cm on the south and west coasts. These biases, once confirmed, will replace
                the estimates we have been using when we include tide gauge date along with traditional altimeters in
                our gridded sea level anomaly product without erroneous estimates of the mean across-shelf sea level
                gradient causing erroneous estimates of mean alongshore current velocities.
              </p>
              <p>
                <a href="/SWOT/L3/PIC0_10/SSP/sst6/Sydney/2024020210.html" target="blank">
                  Fig. 3
                </a>
                &nbsp;shows an example of a day when the warm (26C) East Australian current flowed strongly (about
                1.5m/s) southward along the mid- to outer continental shelf, while cooler (24C) water within about 10 to
                15km of the coast remained essentially motionless, according to de-tided alongshore velocity
                observations by four Acoustic Doppler Current Profilers off Sydney (two tiny red arrows in the cool
                water, two big ones in the warm water) as well as the geostrophic velocity estimates from SWOT. This is
                a more striking example of SWOT working well over the continental shelf than we found back in March.
              </p>
              <p>
                The northern three ADCPs off Bondi, Sydney are called ORS065, SYD100 and SYD140, while the one 20km
                south off Port Hacking is called PH100. These 4 are often well correlated, as you can see in
                <a href="/SWOT/L3/PIC0_10/SSP/slaQQ/ADCP_timeseries_p3_25h_11km_50pc.html" target="blank">
                  Fig. 4c
                </a>
                . But looking at the first few days of Feb 2024, we see the big difference between the inner moorings
                (PH100 and ORS065) and the outer two (SYD100 and SYD140) discussed above. The main point of Fig 4c,
                however, is to see how typical this good result is. At each mooring, it appears that the errors at the
                exact time of the overpass are not atypical of the 10-month period. Comparing the statistics for the 9
                moorings, we see the Mean Absolute Error of the non-tidal alongshore flow varying from 15cm/s (half the
                mean non-tidal speed) at SYD100 to 52cm/s (twice the mean speed) at BMP070 in southern NSW, with the MAE
                over 9 sites being 23cm/s. These results are obtained using a spatial-averaging stencil that is 0.1 x
                0.1 degrees across. A smaller stencil gives larger errors while a larger stencil (0.18 x 0.18) gives
                smaller errors (18cm/s instead of 23cm/s), but fewer estimates. Neither aggregate MAE is particularly
                small compared to the aggregate mean speed (38cm/s) so let's look into the circumstances of some of the
                big errors.
              </p>
              <p>
                Firstly, the BMP070 mooring is close to and inshore of Montague Island, probably explaining the poor
                result there. The results at ORS065 are also poor, with the MAE being equal to the mean speed at 23cm/s.
                This location is also very close to land, so the number of SWOT 2km x 2km postings within the averaging
                stencil is less than for open-water sites. If this number is less than half the potential (open water)
                maximum, we code the data point red and exclude it from the statistics. For example, the large error on
                <a href="/SWOT/L3/PIC0_10/SSP/sp2/Sydney/2023073006.html" target="blank">
                  30 July is seen
                </a>
                to be because there were very few postings in the stencil for that overpass.
              </p>
              <p>
                A large error is also seen at CH100 (the site with the highest average speed) on
                <a href="/SWOT/L3/PIC0_10/SSP/sp2/Coffs/2024010106.html" target="blank">
                  1 January 2024
                </a>
                , when SWOT measured about 1.5m/s but the ADCP reported only 0.9m/s. We cannot explain this large error
                - the SWOT coverage is good and there is nothing suspicious about the ADCP data (see
                <a
                  href="/timeseries/ANMN_P48/CH100/zt/CH100-2309-Sentinel-or-Monitor-Workhorse-ADCP-94p9_zt.html"
                  target="blank"
                >
                  full profile
                </a>
                ).
              </p>
              <p>
                Moving to NE Australia (
                <a href="/SWOT/L3/PIC0_10/SSP/slaQQ/ADCP_timeseries_p3_25h_11km_50pc.html" target="blank">
                  Fig 4d
                </a>
                ) we see that the MAE at GBRCCH (just 100km SE of Broad Sound where tides reach 5m) is just 4cm/s,
                significantly less than the 9cm/s mean (non-tidal) speed. To get such a small average error two things
                must have been done successfully: 1) removal of tidal sea level gradients (up to 40cm over 60km) from
                the SWOT instantaneous sea level observations before estimation of geostrophic currents and 2) removal
                of tidal velocities (up to 50cm/s) from the ADCP observations. The result is that SWOT is able (after
                some spatial averaging of the 2km postings) to consistently measure weak (non-tidal) currents as well as
                strong ones (
                <a href="/SWOT/L3/PIC0_10/SSP/sp2/SGBR/2023080806.html" target="blank">
                  here at 22.4S, 152E, at least
                </a>
                ) with some usable skill. That said, it remains true that the 14cm/s combined MAE of non-tidal velocity
                across 6 sites within the Great Barrier Reef off NE Australia does exceed the 11cm/s mean non-tidal
                speed.
              </p>
              <p>
                We have also looked at 4 coastal and shelf sites across southern Australia, and 7 sites on the western
                shelf. The MAE of the non-tidal alongshore velocity exceeds the mean speed at all but one (SAM5CB) of
                these sites, regardless of whether the stencil for spatial averaging of the SWOT velocities is 0.04,
                0.1, 0.18 or 0.25 degrees across (follow links from Fig 4 URLs).
              </p>
              <p>
                In conclusion, we find that for applications over the continental shelf, SWOT sea level is certainly
                useful at most locations, aside from the issue of it being only infrequently sampled. SWOT's geostrophic
                velocity estimates also have useful skill in places, principally off NSW where the non-tidal sea level
                and velocity variability are very high, but also at at least one location in the lagoon of the Great
                Barrier Reef (in the Capricorn Channel away from islands), even though the tides are strong and
                non-tidal flows are weak there.
              </p>
              <p>
                <strong>Figure Captions</strong>
              </p>
              <ul>
                <li>
                  Fig 1. A map of de-tided, adjusted sea level anomaly, where 'adjusted' means that the inverse
                  barometer response to atmospheric pressure has been removed. To compute anomaly, we have debiased the
                  tide gauge estimates of the ASLA using a two-step process. The first is the usual one of subtracting
                  the long-term mean of ASL from the data from each gauge. For the 2nd, we evaluate the difference
                  (gauge minus SWOT) from SWOT for every overpass then take the mean over all overpasses. These biases
                  are the first of the two numbers given below the name of each tide gauge. The second number is the
                  remaining difference for the present overpass with this bias removed.
                </li>
                <li>
                  Fig 2. Time-series of SWOT (red dots) and tide gauge (black lines) estimates of de-tided, IB-adjusted
                  sea level on the a) west and south and b) east coast of Australia. In the description of the
                  statistics listed, &lt; &gt; is the time-mean operator, while || is absolute value.
                </li>
                <li>
                  Fig 3. A map of Sea Surface Temperature overlain with SWOT geostrophic velocity estimates (black
                  arrows), as well as ADCP velocity data (available data above 30m, shown in red). SWOT vectors are
                  streamlines integrated over 4h.
                </li>
                <li>
                  Fig 4. Time-series of SWOT (red or green dots) and ADCP (black lines) estimates of de-tided,
                  major-axis component of near-surface current velocity on the west, south, south-east and north-east
                  coast of Australia, each for 4 stencil widths (see title) of the spatial averaging applied to SWOT.
                  The direction of the positive velocity values is listed for each site along with statistics (see
                  definitions above).
                </li>
              </ul>
              <p>
                To get SWOT data:
                <a href="https://doi.org/10.24400/527896/A01-2023.018" target="_blank" rel="noreferrer">
                  [AVISO data repository]{' '}
                </a>
                , or further information
                <a href="https://swot.cnes.fr/en/SWOT/index.htm" target="blank">
                  SWOT at CNES
                </a>
                ,
                <a href="https://swot.jpl.nasa.gov/" target="blank">
                  SWOT at JPL
                </a>
                .
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Swimmer_saved_by_smart_watch">
                  <a href="#Swimmer_saved_by_smart_watch" className="anchor">
                    Swimmer saved by smart watch
                  </a>
                </h3>
                <h5>
                  <em>David Griffin and Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">15 July, 2024</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20240715/n18_2024-07-14_12_35z_-_SST.png"
                  style={{ height: '616px', width: '596px' }}
                />
                On Saturday 13 July, Byron Bay swimmer Rick Shearman was rescued by helicopter 1km offshore Tallow
                Beach, just south of Cape Byron (
                <a
                  href="https://www.abc.net.au/news/2024-07-14/smart-watch-helps-save-swimmers-life-in-rough-seas-off-byron-bay/104096260"
                  target="blank"
                >
                  ABC North Coast
                </a>
                ). He called for help using his smart watch when it became clear to him that this was no ordinary rip he
                was caught in. Satellite imagery for Saturday shows that cold water was near the coast (as happens in
                winter if&nbsp;the warming influence of the East Australian Current is absent - see how cold Morton Bay
                gets in winter!), while images for Sunday show that that cold water had been&nbsp;drawn offshore to the
                south east as a 30km-long plume (Figure 1, made using
                <a href="https://mrs-data.csiro.au/myoceancurrent/sst/" target="blank">
                  MyOceanCurrent
                </a>
                ). We don't think the&nbsp;offshore advection was&nbsp;due to the wave-driven circulation associated
                with the
                <a href="https://oceancurrent.aodn.org.au/waves/waves3.php?date=20240713000000" target="blank">
                  easterly swell
                </a>
                running at the time. At this point, we think the wave-driven rip took Rick far enough offshore to be
                entrained in a larger-scale&nbsp;seaward flow. But why did that flow exist? We think it was&nbsp;because
                there was an extremely strong clockwise-rotating, cold core eddy&nbsp;just offshore (see the patch of
                blue in Figure 2 centred at 30S), diverting the EAC away from the shelf.&nbsp;Whatever the
                reason,&nbsp;Rick might have been about 20km east of Ballina on Sunday if he hadn't been rescued on
                Saturday. So good thing he had that watch.&nbsp;
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20240715/20240713.gif"
                  style={{ height: '400px', width: '625px' }}
                />
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="_Monster_high_engulfing_the_nation">
                  <a href="#_Monster_high_engulfing_the_nation" className="anchor">
                    "Monster high engulfing the nation"
                  </a>
                </h3>
                <h5>
                  <em>David Griffin and Gabriela S. Pilo</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">8 July, 2024</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                You might have heard in the news last week (e.g.
                <a href="https://www.abc.net.au/news/2024-07-04/australias-highest-air-pressure-recorded-weather/104055462">
                  ABC
                </a>
                ) a prediction that sea level would be about "30cm lower than usual under average weather conditions"
                near the centre of a high pressure system. Now that the event has passed, and the data are in, let's see
                what did (and didn't) happen, noting that atmospheric pressure is just one of many things influencing
                sea level.&nbsp;
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20240708/2024070512.gif"
                  style={{ height: '400px', width: '625px' }}
                />
                <br />
                <br />
                Figure 1 shows the sea level measured by a tide gauge at Battery Point (Hobart). The blue line is the
                total sea level, that is, the sum of several signals with different characteristic time scales. The tide
                is the dominant signal, with beating constituents at 12 and 12.5 h period. At that location, the low
                tide of 4 July 2024 was indeed very low - about 0.9 m below mean sea level (MSL - the zero of the
                scale&nbsp;on the left).With the tides removed, the magenta line shows high sea level on
                <a href="https://oceancurrent.aodn.org.au/product.php?product=ntsl&amp;region=Au&amp;date=20240530180000&amp;rtype=SR">
                  30 May
                </a>
                ,
                <a href="https://oceancurrent.aodn.org.au/product.php?product=ntsl&amp;region=Au&amp;date=20240611060000&amp;rtype=SR">
                  11 June
                </a>
                and
                <a href="https://oceancurrent.aodn.org.au/product.php?product=ntsl&amp;region=Au&amp;date=20240629060000&amp;rtype=SR">
                  29 June
                </a>
                . These are wind- and pressure-driven events associated with the rapid passage of localised low pressure
                systems. Then around 1 July we see the sudden drop of sea level into a sustained period of values
                between 0.1&nbsp;and 0.2m below MSL. This is the ocean's ('inverse barometer') response to the large
                high atmospheric pressure system. One of the reasons it does not go as far as 0.3m below MSL (which is
                the effect of pressure alone) is that sea level is gradually
                <a href="https://oceancurrent.aodn.org.au/GSLA_stats/DM02/GSLA_Au_h.html">rising</a>. In just the last
                20 years it has risen 0.06m - offsetting 20% of this nearly-record-breaking high pressure event.
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20240708/Battery_Point.png"
                  style={{ height: '300px', width: '600px' }}
                />
                <br />
                <br />
                <a href="https://oceancurrent.aodn.org.au/product.php?product=ntsl&amp;region=Au&amp;date=20240705120000&amp;rtype=SR">
                  Figure 2
                </a>
                shows the large spatial extent of the high pressure system. You see the low sea levels near the centre
                of the system but you also see isolated regions of either very low or very high sea level, particularly
                off the coast of NSW. Those are ocean eddies unrelated to the weather. You also see that both south-west
                WA and much of Qld have high sea level near the coast. These are both due to the wind blowing
                anti-clockwise around the huge high pressure system, from the north off SW WA, and from the SE off Qld
                (in both cases raising sea level on the left of the wind thanks to the Coriolis effect).&nbsp;
                <br />
                <br />
                FAQ:&nbsp;Why didn't the Bureau of Meteorology's forecast of
                <a href="http://www.bom.gov.au/oceanography/forecasts/idyoc300.shtml?region=Aus&amp;forecast=SLA">
                  sea level anomaly
                </a>
                show this period of low sea level? A: Because the response to pressure forcing is not actually included
                in that forecast. Why not? see the info button at the top of our
                <a href="https://oceancurrent.aodn.org.au/product.php?product=gsla&amp;region=Au&amp;date=20240629060000&amp;rtype=SR">
                  Adjusted Sea Level Anomaly
                </a>
                maps, where we explain&nbsp;the meaning of 'adjusted'.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="The_impact_of_geomagnetic_storms_on_ocean_measurements">
                  <a href="#The_impact_of_geomagnetic_storms_on_ocean_measurements" className="anchor">
                    The impact of geomagnetic storms on ocean measurements
                  </a>
                </h3>
                <h5>
                  <em>Gabriela S. Pilo &amp; Benoit Legresy</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">29 May, 2024</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                On the nights of 11 to 13 of May, the boreal and austral skies were lightened by the ionisation of
                particles from a strong geomagnetic storm. The auroras were seen by the naked eye, and beautifully
                captured by photographers in Australia.
                <br />
                &nbsp;
                <br />
                The way we look at the ocean from space was impacted by the geomagnetic storms that caused the auroras.
                The height of the sea surface is measured globally by radar altimeters onboard satellites. These
                altimeters send microwave pulses that travel from space, reflect on the surface of the ocean, and return
                to the altimeters. The height of the sea surface is then calculated considering the time it took for the
                pulses to travel from the altimeter and back. The higher the surface of the ocean is (e.g., due to ocean
                dynamics), the shorter the path the pulses travel, and therefore, the quicker it takes for the pulses to
                return.
                <br />
                <br />
                &nbsp;
                <a href="https://oceancurrent.aodn.org.au/sourcedata/RADS_last10/20240514.html">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20240529/fig1_aurora_1.png"
                    style={{ height: '515px', width: '700px' }}
                  />
                </a>
                First, there’s the matter that, as the altimeter pulse propagates through space and the atmosphere, it
                interacts with whatever is on its way, including water vapour and ions and electrons in the upper layers
                of the atmosphere (aka: the ionosphere). Because these particles impact the signal travel time, several
                corrections are applied to the data. One of the corrections considers the density of ions and electrons
                in the ionosphere as predicted by models. However, the high solar activity that reached Earth in mid-May
                led to sudden and abrupt changes in the ionosphere, making it difficult to apply the ionospheric
                corrections to the data.
                <br />
                &nbsp;
                <br />
                Second, there’s a lot of work put into determining the precise orbit of the satellite to get the most
                accurate measurement (i.e., within 1 cm!) of the distance between the satellite and the centre of the
                Earth. To get the orbit right, the space agencies use a radio positioning system with ground stations
                called DORIS, and a precision GPS receiver.&nbsp;Higher solar activity not only impacts these
                geopositioning systems, but also abruptly alters forces that impact satellite tracking (like solar winds
                and drag), meddling with their characterisation and prediction.&nbsp;
                <br />
                &nbsp;
                <br />
                Third, - in addition to it all! - the higher ionisation in the atmosphere impacts the electronics
                on-board the satellites too, resulting in noisier measurements too.
                <br />
                <br />
                <a href="https://oceancurrent.aodn.org.au/sst.php?link=ht/20240513.html">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20240529/fig2_aurora.png"
                    style={{ height: '461px', width: '700px' }}
                  />
                </a>
                So, sudden changes in the ionosphere, difficulties in determining the orbit of the satellites precisely,
                and noisier measurements, degraded the sea surface height measurements between the 11 and the 13
                May.&nbsp;
                <br />
                &nbsp;
                <br />
                The result of this degradation is seen in the along-track data for the lower-orbit altimeters – see in
                Figure 1 the higher heights in some of the tracks at 30-60ºS, compared to data from other nearby tracks.
                This along-track data, within a 10-day asymmetric window, is interpolated, together with coastal
                tide-gauge measurements, to build our&nbsp;
                <a href="https://thredds.aodn.org.au/thredds/catalog/IMOS/OceanCurrent/catalog.html">
                  daily Gridded Adjusted Sea Level Anomaly product (GSLA)
                </a>
                . In the gridded product from 1 to 23 May, the degraded data is evidenced by abnormally high or low
                measurements of Adjusted Sea Level Anomalies in north-south tracks, as show in Figure 2 for the
                13th&nbsp;May (compare with&nbsp;
                <a href="https://oceancurrent.aodn.org.au/sst.php?link=ht/20240430.html">
                  a day with high-quality data only
                </a>
                ).
                <br />
                &nbsp;
                <br />
                Because the goal of IMOS-OceanCurrent is to provide up-to-date ocean information around Australia, we
                show the data in near-real time. This means that, sometimes, data that hasn’t been fully corrected can
                be included in our maps, and later replaced once improved corrections are available. For now, keep in
                mind that the&nbsp;
                <a href="https://thredds.aodn.org.au/thredds/catalog/IMOS/OceanCurrent/GSLA/NRT/catalog.html">
                  Near-Real Time GSLA maps
                </a>
                &nbsp;from 1 to 23 of May includes anomalous values.
                <br />
                &nbsp;
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Maps_of_sea_level_and_surface_currents_like_you_ve_never_seen_before">
                  <a href="#Maps_of_sea_level_and_surface_currents_like_you_ve_never_seen_before" className="anchor">
                    Maps of sea level and surface currents like you've never seen before
                  </a>
                </h3>
                <h5>
                  <em>David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">1 March, 2024</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <div>
                <p>
                  Great news for anyone interested in ocean currents: SWOT data is now available, and is much better
                  than expected! SWOT is a new type of satellite altimeter. Instead of just measuring sea level directly
                  below the satellite along a narrow track, it measures sea level out to the side as well. Not nearly as
                  far as a scanning radiometer does (e.g. to measure sea surface temperature) but wide enough to give,
                  for the first time ever, a snapshot view of sea level as a 2-D field. Let's look at some ocean data
                  near Sydney, where the flows are often strong, the skies are often clear and there are 3 IMOS Acoustic
                  Doppler Current Meters.
                  <a href="news/20240301/2023111112.gif">
                    <img
                      alt=""
                      src="https://oceancurrent.aodn.org.au/news/20240301/2023111112.gif"
                      style={{ height: '450px', width: '475px' }}
                    />
                  </a>
                  <a href="news/20240301/2023093015.gif">
                    <img
                      alt=""
                      src="https://oceancurrent.aodn.org.au/news/20240301/2023093015.gif"
                      style={{ height: '450px', width: '475px' }}
                    />
                  </a>
                </p>
              </div>
              <div>
                <p>
                  Fig. 1 (click to expand) shows SWOT data covering the Sydney region on 11 Nov 2023, a day when the
                  three ADCPs all recorded strong (0.5m/s) near-surface flow to the SW. Geostrophic estimates of the
                  surface velocity field are in good agreement with the ADCPs on this occasion, as they are on 30
                  September 2023 (Fig. 2). Fig. 2 also shows that SWOT velocity estimates are consistent with sea
                  surface temperature imagery. The flow velocity of the EAC is quantitatively imaged, as is the
                  circulation around a cyclonic (cold-core) eddy. Zooming out, we see in Fig. 3 that on 20 Oct 2023,
                  SWOT velocities align well with what you might expect (based, for example, on drifter trajectories
                  such as the three shown) the flow field to be, not just at large scales, but at small scales as well.
                </p>
              </div>
              <div>
                <p>
                  We, along with many other groups around the world, will continue to learn more about what SWOT data
                  <a href="https://doi.org/10.24400/527896/A01-2023.018" target="_blank" rel="noreferrer">
                    [AVISO data repository]
                  </a>
                  can tell us, what its limitations are, and how best to integrate it with our regular processing of
                  altimetry data. So stay tuned for more information. In the meantime, we congratulate the SWOT mission
                  scientists and engineers at NASA, CNES and other agencies who designed, built and operate SWOT. And
                  incidentally, SWOT is not just for oceanography. In hydrology mode, it measures lake and river levels
                  - globally!
                  <a href="https://swot.cnes.fr/en/SWOT/index.htm">SWOT at CNES</a>,&nbsp;
                  <a href="https://swot.jpl.nasa.gov/" target="_blank" rel="noreferrer">
                    SWOT at JPL
                  </a>
                  .
                  <a href="news/20240301/2023102022.gif">
                    <img
                      alt=""
                      src="https://oceancurrent.aodn.org.au/news/20240301/2023102022.gif"
                      style={{ height: '300px', width: '440px' }}
                    />
                  </a>
                </p>
              </div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="A_Bonney_Bloom">
                  <a href="#A_Bonney_Bloom" className="anchor">
                    A Bonney Bloom{' '}
                  </a>
                </h3>
                <h5>
                  <em>Gabriela S. Pilo, Larissa Patricio-Valerio, and Edward King</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">2 February, 2024</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <br />
                <span style={{ fontSize: '11pt' }}>
                  Late last year we took note of the&nbsp;
                  <a href="https://oceancurrent.aodn.org.au/#An_early_Bonney_upwelling" className="anchor">
                    persistent upwelling along the Bonney Coast
                  </a>
                  . Indeed, the ocean conditions led to a phytoplankton bloom, evident in our&nbsp;
                  <a href="https://oceancurrent.aodn.org.au/product.php?product=oceancolour.CHL&amp;region=SAgulfs&amp;date=20240121050000&amp;rtype=DR">
                    maps of ocean colour
                  </a>
                  &nbsp;(Figure 1) and in true colour imagery available via the
                  <a href="https://mrs-data.csiro.au/rgb/l1b-5min.true-colour/aqua/2024/01/28/D-20240128.G-0520/A20240128_0520.20240129172022.L1B_QKM.TCfull.jpg">
                    IMOS Satellite Remote Sensing facility
                  </a>
                  &nbsp;(Figure 2).&nbsp;
                  <br />
                  <br />
                  The high resolution of ocean colour imagery provided by the MODIS&nbsp;sensor onboard the Aqua
                  satellite&nbsp;allows us to see a trio of beautiful sub-mesoscale cyclonic eddies.&nbsp;These eddies
                  not only move the water horizontally, as we can see in the rotating filaments in the ocean colour
                  image, but also provide vertical exchanges of properties between the surface and the interior of the
                  ocean.&nbsp;
                  <br />
                  <br />
                  Each eddy in the trio is roughly 18 km in diameter, so we cannot see their signature in our surface
                  geostrophic velocity maps (black arrows in Figure 1). This is because the constellation of nadir
                  altimeters used to build these maps cannot resolve these sub-mesoscale features.
                </span>
                <br />
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20240202/Bonney1.png"
                  style={{ height: '454px', width: '480px' }}
                />
              </p>
              <div>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20240202/Bonney3.png"
                  style={{ height: '368px', width: '570px' }}
                />
              </div>
              <div>&nbsp;</div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Sydney_to_Hobart_race_conditions_exceptional_currents">
                  <a href="#Sydney_to_Hobart_race_conditions_exceptional_currents" className="anchor">
                    Sydney to Hobart race conditions: exceptional currents
                  </a>
                </h3>
                <h5>
                  <em>David Griffin and Gabriela S. Pilo</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">22 December, 2023</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                We have exceptional ocean conditions for this year's race, as far as favourable currents are concerned,
                thanks to the combined effect of four warm-core (anti-clockwise rotating) eddies and one cold-core
                (clockwise) eddy. Indeed, of the past 30 years, this appears to be the one when ocean currents most need
                to be taken into account by competitors (in addition to wind and waves) when choosing a course.&nbsp;
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20231222/2023122111.gif"
                  style={{ height: '400px', width: '285px' }}
                />
              </p>
              <p>
                The first warm-core eddy is centered NE of Sydney and will only potentially affect yachts (positively)
                as far south as Jervis Bay. The second warm eddy is off southern NSW and will also potentially provide a
                boost, all the way to the border.
              </p>
              <p>
                East of Bass Strait is where a difficult decision has to be made. Yachts steering straight for Hobart
                will probably encounter weak adverse current because of the cold core eddy, while yachts running closer
                to due south (near 151E) may encounter strong favourable currents (possibly 2kt or more, breaking
                records for December southward current speed) as far as 40S. This is because of the warm core eddy
                centered near 39.5S 152.5E that is actually record-breaking in terms of surface height anomaly (even
                when 12cm is subtracted to account for sea level rise, and ranked against any month).
                <a href="news/20231222/ASLA_top_16_detrended.gif">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20231222/ASLA_top_16_detrended.gif"
                    style={{ height: '450px', width: '325px' }}
                  />
                </a>
              </p>
              <p>The fourth warm core eddy may give a slight boost for the final stretch off southern Tasmania.</p>
              <p>
                Competitors will also notice that the sea temperatures are
                <a
                  href="https://oceancurrent.aodn.org.au/product.php?product=daily.pctiles&amp;region=SE&amp;date=20231217141347&amp;rtype=SR"
                  target="blank"
                >
                  exceptionally high
                </a>
                , potentially affecting the winds. Tropical species may be seen much farther south than usual - beware
                of basking Mola mola (sunfish).
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="An_early_Bonney_upwelling">
                  <a href="#An_early_Bonney_upwelling" className="anchor">
                    An early Bonney upwelling
                  </a>
                </h3>
                <h5>
                  <em>Hugo Bastos de Oliveira and Jessica Benthuysen</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">11 December, 2023</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20231211/20231202_sst.gif"
                  style={{ height: '350px', width: '396px' }}
                />
                Intense south-easterly storms have recently hit South Australia’s coast, causing strong upwelling events
                along the Bonney coast.
              </p>
              <p>
                The Bonney upwellings are well-known events, with cold, nutrient-rich bottom waters rising to the
                surface, providing a favourable habitat for phytoplankton to grow. We’ve described the Bonney upwelling
                at IMOS-OceanCurrent before, e.g. when it had a late start in 2020, and when it was observed by an ocean
                glider in 2016.
              </p>
              <p>
                What is fascinating about the recent event is that it is so strong so early in the season. Bonney
                upwelling events are usually weak in November because the water is not yet stratified.
              </p>
              <p>
                Low SST anomalies, characteristic of these events, last between 5 and 10 days. This year, the first
                upwelling event was on 15 November.
              </p>
              <p>
                The SST anomalies associated with the Bonney upwelling we’ve seen over the past week are likely the
                lowest we’ve seen in years, for this time of year. This extreme is seen in our maps of SST centiles,
                where the SST of the plume waters are within the
                <a href="https://oceancurrent.aodn.org.au/product.php?product=daily.pctiles&amp;region=SAgulfs&amp;date=20231202183128&amp;rtype=DR">
                  lowest decile of the record (1993-2016)
                </a>
                . The spatial extent of this event was also large compared to previous events.
              </p>
              <p>
                There will be a series of Bonney upwelling events until March next year. It’s likely that the positive
                ENSO and the positive SAM conditions currently in place will enhance the intensity of the events yet to
                come. In addition, the persistence and strength of events might precondition following events, leading
                to stronger temperature anomalies.
              </p>
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20231211/2023120205_chl.gif"
                  style={{ height: '360px', width: '400px' }}
                />
                We’ll keep our eyes out for the beautiful ocean colour satellite imagery we’ll see as a result.
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="How_strong_is_the_East_Australian_Current_The_science_is_finally_in">
                  <a href="#How_strong_is_the_East_Australian_Current_The_science_is_finally_in" className="anchor">
                    How strong is the East Australian Current? The science is finally in.
                  </a>
                </h3>
                <h5>
                  <em>Bernadette Sloyan, David Griffin, and Gabriela Pilo</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">13 October, 2023</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                The East Australian Current (EAC) is Australia’s most influential ocean feature. But do we know its
                vital statistics?
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20231013/Fig1_EAC.png"
                  style={{ height: '619px', width: '700px' }}
                />
                <br />
                Actually, not until now (other than from a handful of brief field campaigns or modelling exercises). In
                recognition of this knowledge gap, IMOS and CSIRO launched a flagship effort between 2012-2022 to
                measure the EAC with a moored array of instruments, continuously, over a decade-long period.&nbsp;To
                complement the publication of this dataset, we are very excited to announce the publication of daily
                visualisations of the moored-array data, seen in the context of satellite observations, here in the
                IMOS-OceanCurrent website.
                <br />
                <br />
                Explore the EAC by clicking on the ‘EAC Mooring Array’ button in the menu on the right, in the website’s
                <a href="https://oceancurrent.aodn.org.au/index.php">frontpage</a>. The ‘
                <a href="https://oceancurrent.aodn.org.au/eac_about.php">About the EAC mooring array dataset</a>’ button
                (Fig. 1A) provides information and references about the mooring and the dataset. The information icon at
                the top menu (Fig. 1E) explains the datasets and what is shown on the graphics. You can explore the data
                in several ways; click on the calendar icon to look at a specific date (Fig. 1B), click on the movie
                icon for a movie of daily images surrounding a particular date (Fig. 1D), or click the table icon to
                select a particular period that you are interested in (Fig. 1C).
                <br />
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20231013/Fig2_EAC_3.png"
                  style={{ height: '659px', width: '700px' }}
                />
                Looking at a particular day,
                <a href="https://oceancurrent.aodn.org.au/eac.php?date=20200707132025">the 7rd&nbsp;July 2020</a>,
                the&nbsp;mooring array shows the&nbsp;strongest southward flow associated with&nbsp;the EAC near the
                shelf break, between the surface and 500 m depth&nbsp;(Fig. 2a, c, d).&nbsp;On that day, the EAC
                southward velocity was 10 Sv&nbsp;in its core (1Sv = 1x106 m3s-1) represented by the number below the
                5th mooring from the left (large black dot, Fig 2a). The total transport, integrated in depth across the
                whole array, was of 18 Sv (Figure 2a, b).&nbsp;In Figure 2, on the&nbsp;plots on&nbsp;the right,
                the&nbsp;two top panels show the temperature and salinity across the array&nbsp;and their anomaly from
                seasonal mean. The two bottom panels show the northward and eastward velocities across the array, and
                their anomaly&nbsp;from&nbsp;seasonal mean. In this gridded product of the EAC mooring array showed
                here, the data gaps are filled using a
                <a href="https://journals.ametsoc.org/view/journals/atot/40/3/JTECH-D-21-0183.1.xml">
                  machine learning technique
                </a>
                .&nbsp;
                <br />
                <br />
                The EAC deep mooring array visualisations provides IMOS-OceanCurrent users with a unique way to deeply
                explore the EAC and its changing nature. Every day presents a different EAC, so dive in and explore.
                <br />
                &nbsp;
              </p>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="When_is_slack_tide">
                  <a href="#When_is_slack_tide" className="anchor">
                    When is slack tide?{' '}
                  </a>
                </h3>
                <h5>
                  <em>David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">2 September, 2023</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20230902/202309012000_1.gif"
                  style={{ height: '698px', width: '900px' }}
                />
                Slack tide is when the tidal current turns from flooding to ebbing, or vice versa. If you need to
                conduct an&nbsp;operation during the&nbsp;period of weakest&nbsp;tidal current, this is when to do it.
                But published predictions of slack tide timings are very few, and there is no universal rule of thumb
                relating the timing of slack tide to the timing of high or low tide. For the case of a narrow strait
                leading into a large bay, slack tide in the strait occurs close to the times of high and low tide within
                the bay. In many places, however, it is far less clear, and slack tide occurs at different times in
                nearby places. In Clarence Strait (between Darwin and Melville Island), for example, slack tide&nbsp;is
                half way between high and low tide at Darwin. Stepping through
                <a href="tides" target="blank">
                  our maps of tidal current speed{' '}
                </a>{' '}
                is one way to find the approximate time of slack tide at an arbitrary location. We are working on a way
                to estimate slack tide more precisely at any&nbsp;location, but in the mean time, have added inset plots
                to each of our maps, showing the tidal velocity (resolved along the stated direction) for a few tidal
                cycles at a single selected point along with height at that point and at a nearby reference point. As
                you step through the maps, 'slack at x' will appear, specifying the exact time of slack tide at the
                point marked with a magenta x. The key to understanding the physics behind slack tides&nbsp;is to know
                that the tide is a mix of waves propagating in various directions, at different amplitudes.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="OceanCurrent_goes_to_the_Gold_Coast">
                  <a href="#OceanCurrent_goes_to_the_Gold_Coast" className="anchor">
                    OceanCurrent goes to the Gold Coast
                  </a>
                </h3>
                <h5>
                  <em>David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">30 June, 2023</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20230630/2023062922.gif"
                  style={{ height: '638px', width: '494px' }}
                />
                Next week is the Australian Marine Science Association conference at the Gold Coast (at 28ºS). Since
                there will be a special IMOS session, and an East Australian Current session, how could we pack our bags
                without checking the state of the EAC? But disappointingly, from a morning dip perspective, the news is
                not good: the water is presently 19.5°C, about 2º&nbsp;less than climatology, sitting somewhere in the
                <a
                  href="https://oceancurrent.aodn.org.au/product.php?product=daily.pctiles&amp;region=Brisbane2&amp;date=20230701120000&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  lowest decile
                </a>
                , i.e. it is only this much colder than usual less than 10% of the time. The culprit is surely the cold
                core eddy, around which the EAC has been diverting for
                <a
                  href="https://oceancurrent.aodn.org.au/product.php?product=fourhour&amp;region=Brisbane2&amp;date=20230701120000&amp;rtype=DR&amp;movie=1"
                  target="_blank"
                  rel="noreferrer"
                >
                  more than a month
                </a>
                . See you next week, either at the beach or between sessions at the conference!
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="West_coast_vs_east_coast_eddies_what_s_the_difference">
                  <a href="#West_coast_vs_east_coast_eddies_what_s_the_difference" className="anchor">
                    West coast vs east coast eddies - what's the difference?
                  </a>
                </h3>
                <h5>
                  <em>David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">29 April, 2023</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20230429/2023041906_chl.gif"
                  style={{ height: '690px', width: '550px' }}
                />
                Our chlorophyll-a images are back! (Sorry about the outage.) To celebrate, let's contemplate one of the
                many riddles of Australian oceanography: what's the biggest difference between chlorophyll-a imagery of
                west coast and east coast eddies?
              </p>
              <p>
                Well, these two images are faily typical of their respective regions, in one regard at least, which is
                the relationship between the sense of rotation and <em>surface</em> chlorophyll-a concentration.
              </p>
              <p>
                West coast eddies usually have high concentration of chl-a near-surface in anticyclonic eddies
                (anticlockwise, warm-core, depressed thermocline), while east coast eddies are more likely to have high
                near-surface chl-a in cyclonic (clockwise, cold-core, raised thermocline) eddies.
              </p>
              <p>
                The west coast image for 19 April shows three anticyclonic eddies with elevated chl-a. But unusually,
                two of these are very close to each other, so there is strong horizontal shear of the north-south flows
                in the gap between them.
              </p>
              <p>
                The east coast image shows the usual relationship of rotation and chl-a, but again, the placement of the
                eddies is unusual (coincidence, I assume): the two eddies are nearly symmetric, with the cyclonic one
                north of the anti-cyclonic eddy, so there is a strong landward flow in the gap between them, bifurcating
                directly off Brisbane. I don't recall ever seeing this before (so good thing the outage was not
                irrecoverable).
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20230429/2023041605_chl.gif"
                  style={{ height: '660px', width: '500px' }}
                />
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="The_East_Australian_Current_summer_2023">
                  <a href="#The_East_Australian_Current_summer_2023" className="anchor">
                    The East Australian Current, summer 2023
                  </a>
                </h3>
                <h5>
                  <em>David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">2 April, 2023</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                New South Wales is where most of the visitors to
                <em>OceanCurrent</em> are from, presumably because the East Australian Current (EAC) makes ocean
                conditions there more variable than anywhere else. The EAC this summer has been particularly odd.
              </p>
              <p>
                The EAC is known for how its path often deviates from the continental slope near or south of Forster
                (32S), wrapping anticlockwise around a warm-core eddy.
              </p>
              <p>
                This summer, however, major deviations of the flow of the EAC have also been <em>clockwise</em> around a
                relatively large
                <em>cold</em>-core eddy. An eastward deviation of the EAC is presently happening at about 30S, with the
                flow reconnecting with the continental shelf at 32S. In early March this eddy was off Byron Bay, where
                an
                <a
                  href="http://oceancurrent.imos.org.au/profiles/cycle.php?wmoid=5905515&amp;cycle=100&amp;depth=0#"
                  target="blank"
                  className="anchor"
                >
                  Argo float
                </a>
                recorded a 100m rise of the isotherms at around 500m depth at the flanks of the eddy. The satellite
                estimates of near-surface chlorophyll-a show elevated levels in the eddy.&nbsp;The eddy appears to have
                originated north of Brisbane in early January, when it appeared that, unusually, very little of the warm
                EAC water was going south. The southward flow resumed later in January and by 9 February the flow was
                unusually continuous from 29S all the way to the Victorian border. Indeed, a satellite-tracked drifter
                went along the continental slope in EAC waters from 30S to 38S in just 9 days (9-18 Feb, 1.1m/s on
                average).
              </p>
              <p>
                What were the impacts of the EAC's odd behaviour? And why did this happen? Maybe we'll hear thoughts at
                this year's AMSA session on the EAC.
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20230402/2023033010_1.gif"
                  style={{ height: '888px', width: '748px' }}
                />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20230402/2023030505_1.gif"
                  style={{ height: '600px', width: '507px' }}
                />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20230402/2023010910_1.gif"
                  style={{ height: '600px', width: '428px' }}
                />
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="The_plume_and_the_bloom_ocean_colour_off_South_Australia_rsquo_s_coast">
                  <a href="#The_plume_and_the_bloom_ocean_colour_off_South_Australia_rsquo_s_coast" className="anchor">
                    The plume and the bloom: ocean colour off South Australia’s coast
                  </a>
                </h3>
                <h5>
                  <em>Larissa Patricio-Valerio, Gabriela S. Pilo, Edward King</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">28 February, 2023</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <br />
                Beautiful&nbsp;
                <a href="https://mrs-data.csiro.au/rgb/olci/S3B-FR/2023/01/26/S3B_OL_1_EFR____20230126T235931_20230127T000231_20230127T015451_0179_075_244_3600_MAR_O_NR_002.SEN3-histeq.jpg">
                  true colour satellite images
                </a>
                &nbsp;from late January&nbsp;(Figure 1)&nbsp;show&nbsp;two interesting events off Long Bay, in South
                Australia – the Murray River plume, and a stirred-up phytoplankton bloom. The Murray’s plume is seen as
                green-ish hues in the northern section of the bay, while the phytoplankton bloom is seen as blue-ish
                hues farther offshore, contrasting with the darker deep waters.&nbsp;
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20230228/Murray1.png"
                  style={{ height: '466px', width: '690px' }}
                />
                <br />
                This large Murray’s plume results from the late-2022 to early-2023 heavy rainfall recorded in the
                Murray-Darling catchments. Riverine floods typically lead to high discharge levels of water rich in
                suspended inorganic particles and dissolved organic substances into the ocean. Because these particles
                absorb and reflect light in the visible spectrum, we can see the coastal impact of the Murray’s flooding
                from space. The plume’s signature is seen as values higher than 3 mg/m3&nbsp;in our Chlorophyll-a
                Snapshot maps from
                <a href="http://oceancurrent.imos.org.au/product.php?product=oceancolour.CHL&amp;region=SAgulfs&amp;date=20221117040000&amp;rtype=DR">
                  early November
                </a>
                (Figure 2), with the outflow often reaching the eastern part of Kangaroo Island.
                <br />
                &nbsp;
                <br />
                In contrast, the phytoplankton bloom is a shorter-lived feature, lasting only a few weeks. This bloom is
                likely linked to the
                <a href="https://www.abc.net.au/news/2023-01-31/phytoplankton-blooms-south-australia-seen-from-space/101910470">
                  local&nbsp;upwelling of deep, cooler, and nutrient-rich waters
                </a>
                .&nbsp;Despite being short-lived, this bloom can also be seen in Chlorophyll-a Snapshot
                maps&nbsp;between&nbsp;
                <a href="http://oceancurrent.imos.org.au/product.php?product=oceancolour.CHL&amp;region=SAgulfs&amp;date=20230121050000&amp;rtype=DR">
                  21
                </a>
                &nbsp;and&nbsp;
                <a href="http://oceancurrent.imos.org.au/product.php?product=oceancolour.CHL&amp;region=SAgulfs&amp;date=20230127060000&amp;rtype=DR">
                  27 Jan
                </a>
                &nbsp;(
                <a href="http://oceancurrent.imos.org.au/product.php?product=oceancolour.CHL&amp;region=SAgulfs&amp;date=20230127050000&amp;rtype=DR">
                  Figure 3
                </a>
                ).
                <br />
                <br />
                High Chlorophyll-a values in the ocean indicate the presence of phytoplankton – a group of micro-algae
                that float in water and carries Chlorophyll-a pigments within their cells, absorbing and reflecting
                sunlight. Multispectral sensors onboard orbital satellites, such as the Sentinel-3 constellation, allow
                us to measure
                <a href="https://mrs-data.csiro.au/rgb/">Ocean Colour from space.</a>
                With the help of well-tuned and validated algorithms, the values of remote sensing reflectance from
                Ocean Colour satellites can be used to estimate Chlorophyll-a concentration and other marine particles
                and substances afloat.
                <br />
                &nbsp;
                <br />
                Having said that, the high Chlorophyll-a values seen off the Murray’s mouth need to be considered with
                care. These high values may be influenced by the presence of not only phytoplankton, but also of fine
                suspended riverine sediments and coloured dissolved organic matter (CDOM). All this suspended material
                absorbs and reflects light in the visible spectrum. When these three ingredients are mixed – a common
                occurrence in coastal waters with river runoff – it’s challenging to separate their individual
                contributions in the satellite imagery. In this case, advanced algorithms are required.&nbsp;&nbsp;
                <br />
                <br />
                The&nbsp;true colour&nbsp;imagery in Figure 1 is a good&nbsp;example of how different particulate
                suspended matter can be seen from space. Both riverine particles and phytoplankton blooms can be
                quantitatively estimated as high Chl-a values – but knowledge of how ocean colour algorithms work is
                crucial to interpret the results we see.
                <br />
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20230228/Murray2_1.png"
                  style={{ height: '431px', width: '670px' }}
                />
                &nbsp; &nbsp; &nbsp;
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20230228/Murray3_4.png"
                  style={{ height: '402px', width: '400px' }}
                />
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Sydney_to_Hobart_race_conditions">
                  <a href="#Sydney_to_Hobart_race_conditions" className="anchor">
                    Sydney to Hobart race conditions
                  </a>
                </h3>
                <h5>
                  <em>David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">23 December, 2022</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20221223/2022122003.gif"
                  style={{ height: '400px', width: '285px' }}
                />
                There looks to be only one region between Sydney and Hobart this year where it is clear that navigators
                might like to factor ocean currents into their race strategy, and that's the far south of NSW, between
                about 36.5S and 37.5S.
              </p>
              <p>
                Seaward of the 200m isobath, yachts may find a knot or two of favourable current, thanks to a warm-core
                (anticlockwise) eddy centered close to 151E. The surface temperature of this eddy is not particularly
                high but its existence over the last month is not in doubt. Apart from glimpses between clouds of SST
                and several altimeter overpasses, the eddy was also observed by a satellite tracked drifter, which got
                caught in the strong northward flow on the eastern flanks of the eddy, between it and a cold core eddy
                farther east.
              </p>
              <p>
                The question is exactly where, and how strong, are favourable currents to be found in this region. See
                the
                <a
                  href="http://www.bom.gov.au/oceanography/forecasts/idyoc300.shtml?region=NSW&amp;forecast=SLACur#"
                  target="blank"
                  className="anchor"
                >
                  Bureau's forecasts
                </a>
                closer to racetime, and watch our site to see if we get a better SST image than we have over the last
                week. Other places to watch are just south of Jervis Bay, where at present there appears to be adverse
                current, and off southern Tasmania, where there appears to be weak favourable current.&nbsp;
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="SWOT_A_new_type_of_satellite_altimeter_now_in_orbit">
                  <a href="#SWOT_A_new_type_of_satellite_altimeter_now_in_orbit" className="anchor">
                    SWOT: A new type of satellite altimeter; now in orbit!
                  </a>
                </h3>
                <h5>
                  <em>Gabriela S. Pilo, David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">20 December, 2022</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                The Surface Water and Ocean Topography (SWOT) satellite altimeter was successfully launched last week,
                on the 16 of December. This altimetric mission was first designed 15 years ago, and the satellite
                altimetry community was really excited to watch SWOT’s launch!
                <br />
                &nbsp;
                <br />
                SWOT is the first satellite altimeter capable of measuring the height of the sea (and lakes and rivers)
                in two dimensions at once. The sensor onboard SWOT measures the sea surface height along a 120 km swath
                (see an animation&nbsp;
                <a href="https://swot.jpl.nasa.gov/resources/167/this-animation-shows-a-simulation-of-swot-collecting-data-over-the-state-of-florida/">
                  here
                </a>
                ). Conventional satellite altimeters could only take this measurement&nbsp;&nbsp;directly below the
                satellite’s orbit. SWOT will enable us, for the first time, to see the submesoscale features of the
                ocean sea level as well as sea surface temperature. These smaller features play an important role in the
                transport of heat, carbon, and nutrients between the ocean’s surface and deeper layers.
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20221220/SWOT_fast_sampling_orbit_with_legend.png"
                  style={{ height: '372px', width: '590px' }}
                />
                <br />
                SWOT will be in a fast-sampling 1-day orbit for one year (Figure 1), covering the Earth’s surface daily,
                before moving to a 21-day orbit for 3 years. During this fast-sampling orbit, several oceanographic
                campaigns will collect&nbsp;<em>in situ</em>&nbsp;data at key locations of the ocean. This data will
                help us to validate SWOT’s measurements. The Australian scientific community (
                <a href="https://auswot.org">AUSWOT</a>) has planned several activities aligned with SWOT objectives,
                including deploying new mooring arrays and conducting scientific voyages. The voyages, planned for 2023,
                will take high resolution measurements of the East Australian Current and of a section of the Antarctic
                Circumpolar Current.&nbsp;&nbsp;
                <br />
                &nbsp;
                <br />
                Here, in IMOS-OceanCurrent, we’ll work towards including the SWOT measurements in our products as soon
                as the data is ready for scientific use.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="MyOceanCurrent">
                  <a href="#MyOceanCurrent" className="anchor">
                    MyOceanCurrent{' '}
                  </a>
                </h3>
                <h5>
                  <em>David Griffin, Edward King, Gabriela S. Pilo and Roger Scott</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">2 November, 2022</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <div>
                <p>
                  <img
                    className="img-responsive"
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20221102/n19_2022-10-30_09_49z_-_SST1024_2.jpg"
                  />
                  When looking at our maps of SST, do you ever wish you could zoom in or out to show whatever region you
                  like, or adjust the temperature scale to enhance a particular feature? Well, now you can. We call it
                  MyOceanCurrent, because you're in control. Access is via the green button on our landing page. Click
                  Help if you need it. If you create a (free) MyOceanCurrent account you will get access to more viewing
                  tools, and your settings will be remembered. Our example image zooming in near Fraser Island where a
                  cyclonic eddy is interacting with the East Australian current shows some striking 'woodgrain' features
                  in the warm waters aligned with the flow.
                </p>
              </div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Following_La_Ni_ntilde_a">
                  <a href="#Following_La_Ni_ntilde_a" className="anchor">
                    Following La Niña
                  </a>
                </h3>
                <h5>
                  <em>David Griffin, Gabriela S. Pilo</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">5 October, 2022</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <div className="row">
                <div className="col-md-8">
                  <p>
                    As we head into a third La Niña summer, more eyes than usual are focussed on the ocean. This is for
                    a host of reasons (coral bleaching and coastal inundation, to name just two) in addition to the
                    ocean's role in the climate system.
                  </p>

                  <p>
                    Being early October, the September averages for surface temperature and sea level have just become
                    available.
                  </p>

                  <p>
                    Sea level in the region of the South Pacific Convergence Zone (SPCZ) is currently particularly high.
                    The centile ranking of the detrended (i.e with about 6cm subtracted) sea level anomaly (Fig. 2) is
                    above 95 for a large region between 20S and 10S, indicating that the temperature anomaly extends
                    hundreds of metres beneath the surface.&nbsp;In particular, the positive anomaly this September was
                    greater than it was&nbsp;
                    <a
                      href="http://oceancurrent.imos.org.au/monthlymeans.php?link=30d_MEAN/SLA30d/20210915.html"
                      target="blank"
                    >
                      at the same time last year
                    </a>
                    .&nbsp;&nbsp;
                  </p>

                  <p>
                    Sea Surface temperature (Fig. 3) is also high in the region of the SPCZ (and higher than
                    <a
                      href="http://oceancurrent.imos.org.au/monthlymeans.php?link=30d_MEAN/SST30d/20210915.html"
                      target="blank"
                    >
                      last year
                    </a>
                    ).
                  </p>

                  <p>
                    These observations agree with BoM forecasts issued earlier, indicating that the La Nina is showing
                    no signs of diminishing, leading to projections of higher-than average rainfall this summer for much
                    of Australia. Please note: our references to last year's conditions do <strong>not</strong> imply
                    that there will definitely be more rain than last summer or autumn, or that the present rains will
                    continue. Please stay tuned to the BoM's forecasts.
                  </p>

                  <p>
                    These monthly maps are reached via the "Maps" dropdown menu on our home page (not via the carousel).
                  </p>
                </div>

                <div className="col-md-4">
                  <a href="30d_MEAN/SLA30d/20220915.gif" target="blank">
                    <img
                      className="img-responsive"
                      src="https://oceancurrent.aodn.org.au/30d_MEAN/SLA30d/20220915.gif"
                    />
                  </a>
                </div>

                <div className="col-md-6">
                  <a href="news/20221005/SLA_cent_20221006.gif" target="blank">
                    <img
                      className="img-responsive"
                      src="https://oceancurrent.aodn.org.au/news/20221005/SLA_cent_20221006.gif"
                    />
                  </a>
                </div>

                <div className="col-md-6">
                  <a href="30d_MEAN/SST30d/20220915.gif" target="blank">
                    <img
                      className="img-responsive"
                      src="https://oceancurrent.aodn.org.au/30d_MEAN/SST30d/20220915.gif"
                    />
                  </a>
                </div>
              </div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Profiling_the_waters_around_the_Kerguelen_Plateau_hard_working_seals_and_drifting_Argo_floats">
                  <a
                    href="#Profiling_the_waters_around_the_Kerguelen_Plateau_hard_working_seals_and_drifting_Argo_floats"
                    className="anchor"
                  >
                    Profiling the waters around the Kerguelen Plateau - hard-working seals and drifting Argo floats.
                  </a>
                </h3>
                <h5>
                  <em>Gabriela S. Pilo</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">8 June, 2022</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <br />
                The Kerguelen Plateau (KP) is located in the Indian sector of&nbsp;the Southern Ocean. It&nbsp;has a
                unique ecosystem, and one of the most valuable fisheries in Antarctic waters – the Patagonian Toothfish.
                There, the ocean circulation is dominated by the strong, eastward flowing Antarctic Circumpolar Current.
                Due to this strong flow, autonomous profilers are often quickly flushed away from the region, making it
                difficult to profile ocean properties surrounding the plateau. Argo floats with altered missions are
                able to remain in the region for a longer time – such as the floats 5906651 and 5905510, deployed in the
                plateau in the past months. By parking at the ocean’s floor, instead of at 1000 m depths, the floats
                were less susceptible to the strong surface flow.
                <br />
                <br />
                What we aim to achieve with Argo floats with a lot of planning and effort, elephant seals seem to
                achieve effortlessly. As we carefully monitored those Argo floats, hoping they wouldn’t drift away too
                quickly, the seals patiently foraged nearby.
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20220608/male_seal.gif"
                  style={{ height: '445px', width: '700px' }}
                />
                <br />
                <br />
                In 2022, several of the elephant seals equipped with CTDs remained close to the KP for most of the time.
                You can see their movements in this
                <a href="http://oceancurrent.imos.org.au/aatams.php?&amp;type=aatamsAnimations&amp;link=AATAMS/POLAR/tracks/tracks_2022.fli">
                  movie
                </a>
                . Most seals spend their time in the Plateau, like this
                <a href="http://oceancurrent.imos.org.au/aatams.php?type=aatamsTag&amp;tag=Q9901554&amp;date=20220301">
                  subadult male seal
                </a>
                &nbsp;(Figure 1), while
                <a href="http://oceancurrent.imos.org.au/aatams.php?type=aatamsTag&amp;tag=Q9901578&amp;date=20220531">
                  others
                </a>
                &nbsp;like to hang to the north of the Kerguelen Island.&nbsp;For as long as the CTDs are stuck in their
                fur, the seals profile temperature and salinity data at the top 800 m of&nbsp;the ocean, every time they
                dive – and the data is transmitted every 6 hours.
                <br />
                <br />
                These hard-working elephant seals provide high-quality, near-real time data of the ocean conditions on
                the plateau. In complement to deeper reaching Argo floats, the profiles of temperature and salinity
                collected help us to monitor and understand how this remote, but important region of the world is
                changing.
                <br />
                <br />
                You can now quickly access the daily maps of seals and Argo locations and the timeseries of sealCTD data
                via the carousel in our frontpage.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Monthly_Mean_SST_Anomalies_ndash_Time_Series_Product_The_Great_Barrier_Reef_and_New_Zealand">
                  <a
                    href="#Monthly_Mean_SST_Anomalies_ndash_Time_Series_Product_The_Great_Barrier_Reef_and_New_Zealand"
                    className="anchor"
                  >
                    Monthly Mean SST Anomalies – Time Series Product: The Great Barrier Reef and New Zealand
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">12 April, 2022</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <div>
                <p>
                  We have developed a new product to complement the maps of SST anomalies – time series of
                  region-averaged Sea Surface Temperature anomaly (‘SST Anom v time’ in the menu). SST anomalies
                  (relative to the SSTAARS climatology), averaged over each of the smaller map regions, are presented as
                  a bar plot of monthly means since 1993. The time series provide a way of putting events in the context
                  of the last three decades. As has been widely reported (but usually for averages over much larger
                  regions), almost all of the time series of temperature anomalies indicate a clear warming trend,
                  including over the Great Barrier Reef.
                  <span> </span>
                </p>

                <p>
                  This summer’s monthly mean temperatures for the northern, central and southern GBR (Fig. 1) indicate
                  the reef experienced anomalous heating at the very beginning of summer with the highest-ever December
                  temperatures in each of the time series. There was an intense burst of heat in early January,
                  particularly in the central region, but heavy cloud in the later part of January and for much of
                  February kept the monthly anomalies relatively low. In early March, however, temperatures rapidly
                  increased to 2°C anomalies by the second week, over much of the Great Barrier Reef, particularly in
                  the central region (Fig. 2) and a high monthly mean anomaly. Sadly, not long after that, observations
                  of bleaching were reported on the outer reef.
                  <br />
                  &nbsp;
                </p>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <a href="news/20220412/MMA_Figure_1.png" target="_blank">
                    <img
                      alt=""
                      className="img-responsive"
                      src="https://oceancurrent.aodn.org.au/news/20220412/MMA_Figure_1.png"
                    />
                  </a>
                </div>

                <div className="col-md-6">
                  <a href="news/20220412/MMA_Figure_2.png" target="_blank">
                    <img
                      alt=""
                      className="img-responsive"
                      src="https://oceancurrent.aodn.org.au/news/20220412/MMA_Figure_2.png"
                    />
                  </a>
                </div>
              </div>
              <div>
                <p>
                  The time series for New Zealand’s north and south islands indicate the past summer has been one to
                  rival the previous hottest ever in 2017/2018, just four years ago (Fig. 3). These high temperature
                  anomalies are even more concerning when viewed spatially, as throughout February and March, the
                  highest anomalies were along the west coast, and over 3°C off South Island (Fig. 4).
                </p>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <a href="news/20220412/MMA_Figure_3.png">
                    <img
                      alt=""
                      className="img-responsive"
                      src="https://oceancurrent.aodn.org.au/news/20220412/MMA_Figure_3.png"
                    />
                  </a>
                </div>

                <div className="col-md-6">
                  <a href="news/20220412/MMA_Figure_4.png">
                    <img
                      alt=""
                      className="img-responsive"
                      src="https://oceancurrent.aodn.org.au/news/20220412/MMA_Figure_4.png"
                    />
                  </a>
                </div>
              </div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Surface_waves_product_added_to_IMOS_OceanCurrent">
                  <a href="#Surface_waves_product_added_to_IMOS_OceanCurrent" className="anchor">
                    Surface waves product added to IMOS-OceanCurrent
                  </a>
                </h3>
                <h5>
                  <em>Salman Saeed Khan &amp; Mark Hemer</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">21 March, 2022</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <br />
                We are pleased to announce the addition of an entirely new product to our suite of visualisations –
                <a href="http://oceancurrent.imos.org.au/waves/waves3.php">2-hourly maps of surface waves</a>. The new
                maps present a combination of near real-time wave information from Australia’s in-situ wave buoy
                network, several satellite platforms (radar altimeter and Synthetic Aperture Radar (SAR) missions), and
                the near real-time modelled wave field from the Australian Bureau of Meteorology’s (BoM) AUSWAVE-R
                model. This combined spatial representation of modelled, in-situ, and satellite data complements buoy
                data time-series available from the State and Commonwealth agencies that operate each buoy. Each
                operator’s buoy data page can be accessed by clicking on the buoy location on the maps.&nbsp;&nbsp;
                <br />
                <a href="http://oceancurrent.imos.org.au/waves/waves3.php?date=20220308200000">
                  <img
                    alt=""
                    className="img-responsive"
                    src="https://oceancurrent.aodn.org.au/news/20220321/fig1_wave_2.png"
                  />
                </a>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20220321/fig2_wave_3.png"
                  style={{ height: '338px', width: '500px' }}
                />
                <br />
                <br />
                <br />
                High seas contributing to the recent significant NSW coastal erosion event, following weeks of intense
                storms and severe weather, were well captured in the new IMOS-OceanCurrent surface waves product (Figure
                1). The BOM-NSW issued a severe weather warning on 9th&nbsp;Mar 2022 for damaging surf on the central
                and southern parts of the NSW coast (Figure 2), following the high waves generated from a low-pressure
                system/east coast low in the Tasman Sea.&nbsp;Significant wave heights of 5-6 m were recorded by wave
                buoys at Eden and Port Kembla (
                <a href="http://oceancurrent.imos.org.au/waves/waves3.php?date=20220308200000">Figure 1a</a>, purple
                arrows). Offshore, the low-pressure system generated even higher wave - heights up to 7 m - as observed
                by satellite altimeter passes and predicted by BoM’s AUSWAVE-R model (
                <a href="http://oceancurrent.imos.org.au/waves/waves3.php?date=20220309100000">Figure 1b</a>). Note that
                buoy measurements nearest in time and all available satellite passes within +/- 3 hours of the
                background AUSWAVE-R wave field are displayed. The 6-hour window allows sufficient buoy measurements and
                satellite passes to be available for spatial display with the caveat that some loss of agreement of wave
                information between various data sources can be expected. The maps also include the mean wave periods
                and peak wave direction of the longer swell waves from Sentinel-1 SAR passes (black, white, and grey
                circles). However, none of these passes coincided over the region of interest to be useful in this
                event.
                <br />
                <br />
                The IMOS-OceanCurrent wave product has been made possible thanks to provision of wave data from several
                sources including State and Commonwealth Government wave buoy custodians, sourced through IMOS-AODN
                National wave buoy data archive, satellite altimeter wave height data from RADS, Sentinel-1 near real
                time SAR wave data from IMOS-AODN, and BoM’s AUSWAVE-R background wave field. The latency of all these
                datasets is variable, but usually less than 24 hours.&nbsp;For a forecast of surface wave height, please
                refer to the
                <a href="http://www.bom.gov.au/marine/waves.shtml">BOM’s website</a>.<br />
                <br />
                &nbsp;
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Sydney_to_Hobart_Outlook">
                  <a href="#Sydney_to_Hobart_Outlook" className="anchor">
                    Sydney to Hobart Outlook
                  </a>
                </h3>
                <h5>
                  <em>Gabriela S. Pilo &amp; David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">15 December, 2021</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="http://oceancurrent.imos.org.au/product.php?product=snapshot&amp;region=Syd-Hob&amp;date=20211215014745&amp;rtype=DR">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20211215/fig1_1.gif"
                    style={{ height: '491px', width: '350px' }}
                  />
                </a>
                After a one-year hiatus, the Sydney to Hobart Yacht Race resumes this year. This year’s key ocean
                features are a large anticyclonic eddy off Sydney and an intense cyclonic eddy off Batemans Bay. This
                cyclonic eddy might provide adverse currents on its shoreside, right along the rhumb line (
                <a href="http://oceancurrent.imos.org.au/product.php?product=snapshot&amp;region=Syd-Hob&amp;date=20211215014745&amp;rtype=DR">
                  Figure 1
                </a>
                ).
                <br />
                <br />
                As soon as competitors leave Sydney Harbour, they might get a small boost from southward currents on the
                western flank of a large anticyclonic (warm) eddy sitting off Sydney. Extending from Jervis Bay to
                Horseshoe Bay, however, sailors could be impacted by a northward current. This current is associated
                with an offshore cyclonic (cold core) eddy, that has been moving towards the coast since mid-September.
                This northward current is now weaker than 1 knot, but it may strengthen if the eddy continues to move
                towards the coast. Competitors might escape some of this adverse flow if they stay close to shore.
                <br />
                &nbsp;
                <br />
                This cyclonic eddy has a negative sea surface height anomaly of 0.5 m, centred offshore of Batemans Bay,
                and it’s the most intense cyclonic eddy we’ve seen in the region this year. In fact, over the last 28
                years, only 3% of the height anomalies in this region were lower than the current conditions. This
                extremely low height anomaly is seen as a large dark blue patch at the eddy location in our
                <a href="http://oceancurrent.imos.org.au/product.php?product=gsla.SLA_pctiles&amp;region=Au&amp;date=20211215012009&amp;rtype=SR">
                  maps of centiles of detrended adjusted sea level
                </a>
                .<br />
                &nbsp;
                <br />
                Of more interest to fishers than to sailors&nbsp;is that the cyclonic eddy has cool, nutrient-rich
                waters raised&nbsp;about 200 m from its usual depth. Satellite-measured sea surface temperature is
                around 3°C cooler than normal at the western flank of the eddy (
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily.SST_ANOM&amp;region=Syd-Hob&amp;date=20211215014745&amp;rtype=DR">
                  Figure 2
                </a>
                ). At depth, the water inside the cyclonic eddy is 1°C to 3°C cooler than normal in the top 1000 m (
                <a href="http://oceancurrent.imos.org.au/profiles/cycle.php?wmoid=5905128&amp;cycle=162&amp;depth=0">
                  Figure 3
                </a>
                ). When competitors leave this patch of cold water, they’ll be free from the cyclonic eddy’s northward
                flow.
                <br />
                &nbsp;
                <br />
                Farther south, a textbook anticyclonic eddy shed by the East Australian Current is lingering off Bass
                Strait. Currently, this eddy provides a strong southward current along the rhumb line that could help
                competitors. However, this eddy is expected to become weaker as it rubs against the slope off Bass
                Strait. So, at the moment, it’s hard to say if sailors will be able to get a strong boost from the
                currents when they reach that latitude.
                <br />
                &nbsp;
                <br />
                Our website will continuously provide up-to-date information of ocean conditions in our 4h SST and
                Snapshot SST products. You can also find more information on how science can inform sailors decisions at
                CSIROscope (<a href="https://blog.csiro.au/sydney-hobart-ocean-science/">here</a>). May all competitors
                be safe and have an exciting race!
                <br />
                <br />
                &nbsp; &nbsp;
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily.SST_ANOM&amp;region=Syd-Hob&amp;date=20211215014745&amp;rtype=DR">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20211215/fig2_2.gif"
                    style={{ height: '479px', width: '350px' }}
                  />
                </a>
                &nbsp; &nbsp;
                <a href="http://oceancurrent.imos.org.au/profiles/cycle.php?wmoid=5905128&amp;cycle=162&amp;depth=0">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20211215/fig3_1.gif"
                    style={{ height: '387px', width: '600px' }}
                  />
                </a>
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="How_anomalous_is_this_anomaly">
                  <a href="#How_anomalous_is_this_anomaly" className="anchor">
                    How anomalous is this anomaly?
                  </a>
                </h3>
                <h5>
                  <em>David Griffin, Gabriela S. Pilo and Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">24 November, 2021</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20211124/20211012.gif"
                  style={{ height: '400px', width: '625px' }}
                />
                This is the question that springs to mind whenever you see that the temperature, sea level, or other
                quantity is different from its 'normal' value. For some time now, we have made it easy for you to see
                how anomalous SST values are, by showing the anomalies in centile form. As of today, we are doing the
                same with the adjusted sea level anomaly (ASLA). A reminder of our intention to do this&nbsp;came on 12
                October 2021 when we noticed that the ASLA over the shelf in the Great Australian Bight was very high
                (because of the strong south-westerly winds associated with a deep low centred that day near 42S 130E).
                By selecting 'Centiles' from the dropdown menu for Australian-region maps of ASLA, you can now see that
                the coastal sea level that day was indeed comparable with the highest few percent of all co-located
                anomalies in our archive of daily maps.
              </p>
              <p>
                <strong>La Nina?</strong>
                <br />
                The 12 Oct ASLA centile map shown here, and indeed all subsequent ones right up to the present, also
                shows that the high sea level in the Coral Sea is about as high as sea level has ever been in that
                region. And that's the detrended sea level. Without detrending, it is even higher.
              </p>
              <p>
                <strong>Details</strong>
                <br />
                The little 'information' button you will find at the top of the page gives more detail on how the
                centile maps are evaluated, including the way we have taken sea level rise into account in the
                calculations. Links are also given to maps of selected centile levels of ASLA, so you can see, for
                example, a map of the highest detrended sea level anomaly (both daily and monthly) in our archive.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Sea_level_and_storms_the_inverted_barometer_effect">
                  <a href="#Sea_level_and_storms_the_inverted_barometer_effect" className="anchor">
                    Sea level and storms: the inverted barometer effect
                  </a>
                </h3>
                <h5>
                  <em>David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">7 September, 2021</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a
                  href="http://oceancurrent.imos.org.au/product.php?product=ntsl&amp;region=Au&amp;date=20210724180000&amp;rtype=SR"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20210907/2021072418_1.gif"
                    style={{ height: '400px', width: '625px' }}
                  />
                </a>
                Many people know that the sea level goes up when the atmospheric pressure goes down. This is called the
                inverted (or sometimes inverse) barometer effect, or IB for short. But did you know that our maps of
                'sea level' (and/or its anomaly) did <strong>not</strong> include the effect of pressure? Realising that
                this may disappoint or surprise some users, we have decided to make two changes to our website:
              </p>
              <p>&nbsp;</p>
              <ol>
                <li>
                  We've added a new graphic for the Australia-wide region that
                  <strong>does</strong> include the effect of atmospheric pressure. We're calling this 'non-tidal sea
                  level anomaly' because that's what it is - sea level anomaly minus the effect of tides. It's also
                  'non-wave-setup' and 'non-tsunami' but there isn't room on the button for all that. Please see the
                  'legend' and 'info' buttons for details.
                </li>
                <li>
                  To indicate that our other maps of sea level anomaly do
                  <strong>not</strong> include the effect of pressure, we are reinstating the traditional term 'adjusted
                  sea level anomaly' for sea level observations that have had the effect of pressure removed. The 'info'
                  button explains why this is the quantity of greater interest to oceanographers, if not to residents of
                  the coast.
                </li>
              </ol>
              <p>
                How important is the pressure effect? It is approximately 1cm per hPa. That is not much most of the time
                but in the centre of a 960hPa low pressure system it amounts to a rise of 50cm. Several deep lows passed
                south of Tasmania in July 2021, resulting, on 25 July, in the highest non-tidal sea level seen for many
                years. At right you see our new 'non-tidal sea level' map for that day.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Argo_float_deployments_around_New_Caledonia">
                  <a href="#Argo_float_deployments_around_New_Caledonia" className="anchor">
                    Argo float deployments around New Caledonia
                  </a>
                </h3>
                <h5>
                  <em>Gabriela S. Pilo, Bernadette Sloyan, David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">27 July, 2021</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20210727/Picture_1_3.png"
                  style={{ height: '462px', width: '500px' }}
                />
              </p>
              <p>
                <span className="normaltextrun">
                  <span lang="EN-GB" style={{ fontFamily: 'calibri, sans-serif' }}>
                    Five new Australian Argo floats funded by CSIRO and IMOS have been deployed over the past t
                  </span>
                  <span>hree</span>
                  <span>&nbsp;weeks&nbsp;</span>
                  <span>from</span>
                  <span>&nbsp;the RV Tangaroa in waters of the South Pacific (Figure 1). These&nbsp;</span>
                  <span>join 7 US-Argo floats also</span>
                  <span>&nbsp;deployed during the voyage – all aiming to sample temperature and salinity&nbsp;</span>
                  <span>in</span>
                  <span>&nbsp;the top 2000 m of the ocean.</span>
                </span>
                <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                  <span className="normaltextrun">
                    <span lang="EN-GB">&nbsp;</span>
                  </span>
                </span>
                <br />
                <span className="normaltextrun">
                  <span lang="EN-GB" style={{ fontFamily: 'calibri, sans-serif' }}>
                    &nbsp;
                  </span>
                </span>
                <br />
                <span className="normaltextrun">
                  <span lang="EN-GB" style={{ fontFamily: 'calibri, sans-serif' }}>
                    Our new 6-day composites for regions of the South Pacific allow us to monitor the location of the
                    floats and&nbsp;
                  </span>
                  <span>the o</span>
                  <span>cean</span>
                  <span>&nbsp;properties and circulation of this area</span>
                  <span>
                    . The Australian floats were deployed in waters surrounding
                    <a href="http://oceancurrent.imos.org.au/product.php?product=daily&amp;region=NewCal&amp;date=20210711104600&amp;rtype=DR">
                      New Caledonia
                    </a>
                  </span>
                  <span>.</span>
                  <span>&nbsp;Temperature and Salinity profiles at each dive (as&nbsp;</span>
                  <span>in Figure 2) can be seen by clicking&nbsp;</span>
                  <span>o</span>
                  <span>n the Argo floats in the map.</span>
                </span>
                <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                  <span className="normaltextrun">
                    <span lang="EN-GB">&nbsp;</span>
                  </span>
                </span>
                <br />
                <br />
                <span className="normaltextrun">
                  <span lang="EN-GB" style={{ fontFamily: 'calibri, sans-serif' }}>
                    We expect these Argo floats to drift westwards
                  </span>
                  <span>&nbsp;with&nbsp;</span>
                  <span>the&nbsp;</span>
                  <span>North</span>
                  <span>&nbsp;Caledonian&nbsp;</span>
                  <span>Jet</span>
                  <span>&nbsp;</span>
                  <span>and the&nbsp;</span>
                  <span>South Caledonian Jet</span>
                  <span>&nbsp;</span>
                  <span>(</span>
                  <a href="https://doi.org/10.1002/2013JC009678">
                    <span style={{ backgroundPosition: '0% 100%', borderBottomColor: 'transparent' }}>Ganachaud</span>
                  </a>
                  <span>
                    <a href="https://doi.org/10.1002/2013JC009678">&nbsp;et al., 2014</a>; Figure&nbsp;
                  </span>
                  <span>3</span>
                  <span>).</span>
                  <span>&nbsp;</span>
                  <span>Over the next four years or so, t</span>
                  <span>he floats will take measurements in the Coral Sea, the Tasman Sea</span>
                  <span>,</span>
                  <span>&nbsp;or wherever the currents&nbsp;</span>
                  <span>t</span>
                  <span>ake</span>
                  <span>&nbsp;them.&nbsp;</span>
                </span>
                <span className="normaltextrun">
                  <span>Tracking the&nbsp;</span>
                  <span>ocean temperature and salinity&nbsp;</span>
                  <span>and the pathway of the floats to Australia’</span>
                  <span>s east coast will provide in</span>
                  <span>sights into the&nbsp;</span>
                  <span>circulation of the western Pac</span>
                  <span>ific Ocean. All data from these floats, as from all Argo floats, is freely available thro</span>
                </span>
                <span className="normaltextrun">
                  <span>ugh</span>
                </span>
                <span className="normaltextrun">
                  <span>&nbsp;the IMOS portal in near-real time (</span>
                </span>
                <a href="https://portal.aodn.org.au/" target="_blank" rel="noreferrer">
                  <span style={{ textDecoration: 'none' }}>https://portal.aodn.org.au/</span>
                </a>
                ).
                <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                  <span className="normaltextrun">
                    <span lang="EN-GB">&nbsp;</span>
                  </span>
                </span>
                <br />
                <br />
                <span className="normaltextrun">
                  <span lang="EN-GB" style={{ fontFamily: 'calibri, sans-serif' }}>
                    The ship that deployed the floats, the RV Tangaroa, is a New Zealand
                  </span>
                  <span>
                    &nbsp;vessel, owned and operated by NIWA (National Institute of Water and Atmospheric Research). The
                    primary purpose&nbsp;
                  </span>
                  <span>of</span>
                  <span>&nbsp;the ship’s voyage&nbsp;</span>
                  <span>w</span>
                  <span>a</span>
                  <span>s to deploy tsunami monitoring buoys. You can find more information abou</span>
                </span>
                <span className="normaltextrun">
                  <span>t the RV Tangaroa</span>
                  <span>
                    &nbsp;at
                    <a href="https://niwa.co.nz/services/vessels/niwa-vessels/rv-tangaroa">NIWA’s website</a>
                  </span>
                </span>
                .
                <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                  <span className="normaltextrun">
                    <span lang="EN-GB">&nbsp;</span>
                  </span>
                </span>
              </p>
              <div style={{ fontStyle: 'italic' }}>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20210727/Picture_3_1.png"
                  style={{ height: '410px', width: '550px' }}
                />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20210727/Picture_2_2.png"
                  style={{ height: '373px', width: '500px' }}
                />
              </div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Contrasting_East_Australian_Current_eddy_interactions">
                  <a href="#Contrasting_East_Australian_Current_eddy_interactions" className="anchor">
                    Contrasting East Australian Current - eddy interactions
                  </a>
                </h3>
                <h5>
                  <em>Amandine Schaeffer, Bernadette Sloyan, Chris Chapman</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">28 May, 2021</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <div>
                <p>
                  The interaction between the East Australian Current (EAC) and eddies is complex and varied. A unique
                  opportunity to observe these complex interactions has been provided to us on board the RV
                  Investigator, during its voyage from Hobart to Brisbane. In the last few weeks, we have directly
                  observed strong interactions between eddies and the EAC. For example, large mesoscale eddies getting
                  over-washed by warm EAC water, and in contrast, smaller frontal eddies being generated and advected by
                  the EAC. While the scale and the nature of the processes differ, the interaction of the warm EAC and
                  swirling denser shelf-water always creates interesting interactions which impact local biological
                  communities.
                </p>

                <p>
                  Near Sydney, the cold core eddy was well defined, geostrophic, and mesoscale (~200 km diameter) but
                  got washed-out by the EAC on its way south as shown in Figure 1. Sub-surface sections through the
                  fading eddy showed lenses of subducted water (positive temperature, salinity, and oxygen anomalies)
                  trapped around 300 m depth (Figure 2). This type of interaction between the EAC and cold core eddies
                  is rarely documented, but these lenses are believed to be trapped below the surface and advected for
                  months, having strong implication for the uptake of atmospheric CO2.
                </p>

                <div>
                  <div className="col-md-6">
                    <img
                      className="img-responsive"
                      src="https://oceancurrent.aodn.org.au/news/20210528/2021050114.gif"
                    />
                  </div>
                  <div className="col-md-6">
                    <img
                      className="img-responsive"
                      src="https://oceancurrent.aodn.org.au/news/20210528/2021051106.gif"
                    />
                  </div>
                </div>
                <div>
                  <div className="col-md-12">
                    <p>
                      Figure 1: Sea surface temperature satellite geostrophic velocities showingthe evolution of the
                      cold core eddy (around 34.5°S, 152.5°E) on the 1st of May (left) and 11th of May (right) when it
                      was sampled by the RV Investigator.
                      <a href="http://oceancurrent.imos.org.au/product.php?product=fourhour.SST&amp;region=SNSW&amp;date=20210517060000&amp;rtype=DR&amp;movie=1">
                        [Animation of all imagery for May]
                      </a>
                    </p>
                  </div>
                </div>

                <div>
                  <div className="col-md-12">
                    <img className="img-responsive" src="https://oceancurrent.aodn.org.au/news/20210528/Triaxus.png" />
                  </div>
                  <div className="col-md-12">
                    <p>
                      Figure 2. Cross section of dissolved oxygen through the cold core eddy (around 34°S) on the 11th
                      of May, showing lenses of anomalously high oxygen water (white blobs). Data isfrom the Triaxus
                      towed by the RV Investigator.
                    </p>
                  </div>
                </div>

                <div>
                  <p>
                    Further north near Brisbane, after a relentless eddy hunt by the science team, a sub-mesoscale
                    (&lt;50 km diameter) elongated frontal eddy (Figure 3) was successfully located and sampled. Here,
                    instead of being detrimental to the development of the cyclonic eddy, the EAC sustains its
                    existence. The nature of the eddy, travelling southward at the inshore front of the EAC, also
                    triggers significant water-mass interaction. EAC water swirls around the structure on one side,
                    shelf water is entrained on the other side, and deep dense water is uplifted around the centre of
                    the structure, leading to temperature changes of 4°C over short distances.
                  </p>

                  <p>
                    Sub-surface measurements provided by this research voyage will be invaluable to understand the
                    magnitude of the mixing, shear, and instabilities in these two case studies, as well as the impact
                    on biological productivity. Additionally, the EAC moorings will provide long term monitoring of
                    these complex interactions after the voyage departs the region.
                  </p>
                </div>

                <div>
                  <div className="col-md-4">
                    <img
                      className="img-responsive"
                      src="https://oceancurrent.aodn.org.au/news/20210528/2021051706.gif"
                    />
                  </div>
                  <div className="col-md-4">
                    <img
                      className="img-responsive"
                      src="https://oceancurrent.aodn.org.au/news/20210528/2021051914.gif"
                    />
                  </div>
                  <div className="col-md-4">
                    <img
                      className="img-responsive"
                      data-main-image="true"
                      src="https://oceancurrent.aodn.org.au/news/20210528/2021052610.gif"
                    />
                  </div>
                </div>
                <div>
                  <div className="col-md-12">
                    <p>
                      Figure 3. Sea surface temperature and satellite geostrophic velocities showing frontal eddies at
                      the inshore edge of the EAC on the 17th of May 2021 (left), before clouds covered the area. The
                      eddy around 25.5°S was successfully located and sampled by the RV Investigator in the following
                      days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="New_regional_areas_added_to_the_6_day_Sea_Surface_Temperature_product">
                  <a href="#New_regional_areas_added_to_the_6_day_Sea_Surface_Temperature_product" className="anchor">
                    New regional areas added to the 6-day Sea Surface Temperature product
                  </a>
                </h3>
                <h5>
                  <em>Gabriela S. Pilo, Bernadette Sloyan, David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">17 May, 2021</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                We are pleased to announce&nbsp;that 11&nbsp;new&nbsp;regions of northern Australia and the South
                Pacific have been added to&nbsp;our 6-day Sea Surface Temperature (SST)&nbsp;maps. The new regions are:
              </p>
              <img
                alt="SST percentiles on the 17 May 2021 in the Joseph Bonaparte Gulf and Tiwi Islands, one of the new regions added to OceanCurrent 6-d SST product"
                src="https://oceancurrent.aodn.org.au/news/20210517/JBGulf.gif"
                style={{
                  caretColor: 'rgb(0, 0, 0)',
                  color: 'rgb(0, 0, 0)',

                  fontFamily: '-webkit-standard',
                  height: '375px',
                  width: '400px',
                }}
              />
              <ul>
                <li>
                  Islands of the South Pacific:
                  <a href="http://oceancurrent.imos.org.au/product.php?product=daily&amp;region=Solomon&amp;date=20210517050520&amp;rtype=DR">
                    Solomon Islands
                  </a>
                  ,
                  <a href="http://oceancurrent.imos.org.au/product.php?product=daily&amp;region=Vanuatu&amp;date=20210517050520&amp;rtype=DR">
                    Vanuatu
                  </a>
                  ,
                  <a href="http://oceancurrent.imos.org.au/product.php?product=daily&amp;region=NewCal&amp;date=20210517050520&amp;rtype=DR">
                    New Caledonia
                  </a>
                  ,
                  <a href="http://oceancurrent.imos.org.au/product.php?product=daily&amp;region=PNGSol&amp;date=20210517050520&amp;rtype=DR">
                    Papua New Guinea
                  </a>
                  , and
                  <a href="http://oceancurrent.imos.org.au/product.php?product=daily&amp;region=Fiji&amp;date=20210517050520&amp;rtype=DR">
                    Fiji
                  </a>
                  .&nbsp;
                </li>
                <li>
                  Reefs off&nbsp;north-west&nbsp;Australia:
                  <a href="http://oceancurrent.imos.org.au/product.php?product=daily&amp;region=RowleyAtolls&amp;date=20210517050626&amp;rtype=DR">
                    Rowley Shoals
                  </a>
                  , and
                  <a href="http://oceancurrent.imos.org.au/product.php?product=daily&amp;region=ScottMore&amp;date=20210517050626&amp;rtype=DR">
                    Scott and Ashmore Reefs
                  </a>
                  .&nbsp;
                </li>
                <li>
                  Regions off the Top End and the Far North Queensland, including the
                  <a href="http://oceancurrent.imos.org.au/product.php?product=daily&amp;region=Torres&amp;date=20210517050702&amp;rtype=DR">
                    Torres Strait
                  </a>
                  , the
                  <a href="http://oceancurrent.imos.org.au/product.php?product=daily&amp;region=SGoC&amp;date=20210517050702&amp;rtype=DR">
                    Southern Gulf of Carpentaria
                  </a>
                  , and the
                  <a href="http://oceancurrent.imos.org.au/product.php?product=daily&amp;region=JBGulf&amp;date=20210517050702&amp;rtype=DR">
                    Joseph Bonaparte Gulf with the Tiwi Islands
                  </a>
                  (Figure 1).
                </li>
              </ul>
              <p>
                All regions can be accessed from&nbsp;IMOS Ocean Current via the direct links provided above or via the
                SST map selection from the main page.
              </p>
              <p>
                The new SST, SST anomaly, and SST percentile&nbsp;maps show&nbsp;gliders, Argo floats, ocean drifters,
                and ships&nbsp;if they are present in the region. Note that gridded sea level anomaly and surface
                geostrophic velocities are not&nbsp;yet&nbsp;presently&nbsp;available, but we plan
                to&nbsp;include&nbsp;these in the future.&nbsp;Quarterly&nbsp;movies of SST, SST anomaly, and SST
                percentiles for the new regions are available from 1 January 2020.
              </p>
              <p>
                You&nbsp;will also notice a&nbsp;change to the front&nbsp;page. Users can now directly access&nbsp;
                <a href="http://oceancurrent.imos.org.au/product.php?product=gsla&amp;region=Au&amp;date=20210517045123&amp;rtype=SR">
                  sea&nbsp;level anomaly and surface geostrophic velocity maps
                </a>
                ,&nbsp;in&nbsp;addition&nbsp;to&nbsp;the familiar SST&nbsp;and&nbsp;ocean&nbsp;colour&nbsp;maps.&nbsp;
              </p>
              <p>
                These changes&nbsp;provide&nbsp;easy&nbsp;access to&nbsp;OceanCurrent&nbsp;information, and&nbsp;improve
                the experience or our users when visiting the website. As always, we value users’ feedback. If you have
                comments or suggestions, please&nbsp;contact&nbsp;
                <a href="mailto:info@aodn.org.au" target="_blank" rel="noreferrer">
                  info@aodn.org.au
                </a>
                .&nbsp;
                <br />
                &nbsp;
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="When_cyclones_collide">
                  <a href="#When_cyclones_collide" className="anchor">
                    When cyclones collide
                  </a>
                </h3>
                <h5>
                  <em>David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">19 April, 2021</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                While TC Seroja and TC Odette were off the coast of WA, two cyclones of a very different kind have come
                together off Newcastle. These are oceanic cyclones - clockwise rotating bodies of water with low
                pressure (i.e. low sea level) and colder water in the centre. One is a 'frontal eddy' or 'freddy' for
                short, that formed off Byron Bay around March 4 (image 1), inshore of the East Australian Current. The
                other&nbsp;has been out in the Tasman Sea off southern NSW since mid February. By March 4 it had moved
                north and intensified off Newcastle (image 1).&nbsp;By 25 March (image 2) the frontal eddy had come
                about 250km south, and the cold core eddy was interacting with the East Australian current - much of the
                flow going around it instead of continuing along the continental slope to Sydney and beyond. Both types
                of eddies have been seen before to behave like this individually. But can anyone recall an instance of
                two such eddies colliding? I can't, but this is what seems to have happened.&nbsp;The next 3&nbsp;weeks
                were&nbsp;extraordinary. By 13 April (image 3) we see an elongated body of cold water had
                extended&nbsp;north from 34S off Sydney&nbsp;to 32S where the frontal eddy had been. The black dots on
                the image show the trajectory of an
                <a href="http://oceancurrent.imos.org.au/gliders/4day.php?link=ForsterA20210329_nrt_30d/2021041400.html">
                  IMOS glider
                </a>
                that was swept north in this flow (after having a very interesting time sampling the record-breaking
                floodwaters in the inner shelf - but that's another story). An Argo float also made some observations, a
                few times&nbsp;
                <a
                  href="http://oceancurrent.imos.org.au/profiles/cycle.php?wmoid=5903622&amp;cycle=386&amp;depth=0#"
                  className="anchor"
                >
                  in the warm core eddy
                </a>
                off SNSW, then
                <a
                  href="http://oceancurrent.imos.org.au/profiles/cycle.php?wmoid=5903622&amp;cycle=393&amp;depth=0#"
                  className="anchor"
                >
                  in the no-man's land
                </a>
                between the eddies, then
                <a href="http://oceancurrent.imos.org.au/profiles/cycle.php?wmoid=5903622&amp;cycle=394&amp;depth=0">
                  in the cold water
                </a>
                that swept the glider northward.To see how the interaction of these eddies with each other and the EAC
                played out, watch the
                <a href="http://oceancurrent.imos.org.au/product.php?product=fourhour&amp;region=SNSW&amp;date=20210413120000&amp;rtype=DR&amp;movie=1">
                  animation
                </a>
                .
              </p>
              <p>&nbsp;</p>
              <div className="col-md-4">
                <img
                  className="img-responsive"
                  src="https://oceancurrent.aodn.org.au/news/20210419/2021030406_BS1.gif"
                />
              </div>
              <div className="col-md-4">
                <img className="img-responsive" src="https://oceancurrent.aodn.org.au/news/20210419/2021032502.gif" />
              </div>
              <div className="col-md-4">
                <img className="img-responsive" src="https://oceancurrent.aodn.org.au/news/20210419/2021041314.gif" />
              </div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="TC_Niran_rsquo_s_cold_core_eddy_heading_for_Lizard_Island">
                  <a href="#TC_Niran_rsquo_s_cold_core_eddy_heading_for_Lizard_Island" className="anchor">
                    TC Niran’s cold core eddy heading for Lizard Island
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">14 March, 2021</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a
                  href="http://oceancurrent.imos.org.au/product.php?product=fourhour.SST&amp;region=NGBR&amp;date=20210312220000&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20210314/Figure_1.png"
                    style={{ height: '335px', width: '400px' }}
                  />
                </a>
                Tropical Cyclone Niran circled in a small region off Cairns for 4-5 days as it developed from a tropical
                storm to a Category 2 tropical cyclone before intensifying as it sped southeast. When a cyclone remains
                in one place for a while the intense winds which drive Ekman pumping, wind-forced currents and vertical
                mixing reinforce and can generate a cold core eddy. Like most cold-core eddies the surface signature is
                a depression in the sea level and cool surface temperatures. Although the sea level anomaly at the
                surface is quite small the sub-surface signal can be significant with deep vertical mixing, elevation of
                the thermocline of the order of 100m and strong currents at depth.
                <br />
                The cold core eddy created by TC Niran is evident, now that the cloud has cleared, in the satellite SST
                about 150km east of Lizard Island,
                <strong>Figure 1</strong>. Sea level anomalies, SLA (white contours), indicate a 30cm depression which
                appears to be off-centre from the SST anomaly. Some of this misalignment may be due to the 4-day lag in
                the gridded sea level anomaly (GSLA) in near-real time because it requires a time window of +/-5 days.
                However, unlike cold core eddies in the East Australia Current, the two anomalies (SST and SLA) will not
                necessarily align because the processes which form them, vertical mixing and the Ekman pumping, do not
                usually have the same spatial structure under a tropical cyclone.
                <br />
                &nbsp;
                <br />
                Once created, disturbances of this size propagate westward. In 2019, we observed a
                <a
                  href="http://oceancurrent.imos.org.au/#Tropical_Cyclone_Oma_a_lasting_ocean_impact"
                  className="anchor"
                >
                  cold-core eddy created by TC Oma
                </a>
                crossed the Pacific from New Caledonia to the Great Barrier Reef in about 5 months. It began with a very
                strong surface expression of 60cm but after 3 months it had eroded to less than 40cm and by the time it
                had negotiated the shoaling passage south of the Coral Sea Islands and reached the shelf break its
                surface expression had reduced to 20cm. The TC Niran eddy is much closer to the Great Barrier Reef so
                will experience much less dissipation before it arrives at the outer shelf. How the eddy will interact
                with the shelf is not known and probably dependant on the prevailing winds and current but it certainly
                has the potential to raise the thermocline at the shelf break for an extended period. The eddy is headed
                straight towards the Lizard Slope mooring in 350m so this is an opportunity to observe the interaction
                through the temperature and velocity profiles. It even has the potential to impact coral studies at the
                nearby Lizard Island Research Station.
                <br />
                &nbsp;
                <br />
                Using an estimate of the TC Oma eddy propagation speed of 10km/day, it could take about two weeks for
                the cold edge (at 147°E in
                <strong>Figure 1</strong>) of the Niran eddy to reach the outer shelf and 25 days for the centre of the
                surface depression (at 148°E) to arrive. Of course, these estimates cannot factor in how this complex
                eddy structure will evolve as it propagates westward which could affect the timing. It is also unknown
                whether the deep ridge (~1200m) which lies just west of the eddy will slow or redirect it, so too, the
                slope current as the eddy approaches the slope.
                <br />
                &nbsp;
                <br />
                &nbsp;
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Drifting_to_shore">
                  <a href="#Drifting_to_shore" className="anchor">
                    Drifting to shore{' '}
                  </a>
                </h3>
                <h5>
                  <em>Amandine Schaeffer, Neil Malan (Coastal and Regional Oceanography Lab, UNSW)</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">22 February, 2021</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <div className="row">
                <div className="col-md-9">
                  <p>
                    For centuries, drifting bottles have been used to map ocean currents, building our understanding of
                    how objects and organisms travel with the flow. In modern times, these drifters are floating buoys,
                    with sensors and built-in satellite trackers to trace their path. Despite their low-tech origins,
                    their exact measurements of the flow make them invaluable tools to understand the drift of floating
                    objects and oil spills, relevant for fisheries, search and rescue and shipping operations.
                  </p>

                  <p>
                    UNSW researchers, in collaboration with NSW DPIE, have been conducting an oceanographic field
                    experiment in the Stockton Bight, near Port Stephens. This is a region of complex flow patterns,
                    known for increased retention and biological productivity. The goal of the experiment is to
                    understand the local dynamics and the factors which transport passive material such as fish larvae
                    or bluebottles from the ocean to the shore.
                  </p>

                  <p>
                    Three biodegradable
                    <a href="https://www.pacificgyre.com/carthe-drifter.aspx" target="_blank" rel="noreferrer">
                      Carthe
                    </a>
                    drifters were deployed using the DPIE <em>RV Bombora</em>, measuring the top 10 cm of the ocean and
                    allowing comparison with the measurements of surface currents from the Newcastle HF radar system.
                    However, the challenge in trying to understand what causes particles to reach the shore is that one
                    ends up with your instruments washed up in all sorts of remote locations. This has meant that little
                    is known about the final process of beaching, due to researchers being worried about losing their
                    instruments!
                  </p>

                  <p>
                    After a month at sea, the first float, named Physalito (after
                    <em>Physalia</em> the bluebottle), ended up on the beach in Jervis Bay (Figure 1). The beaching
                    occurred smoothly, providing valuable information on ocean and wind conditions leading to its
                    arrival to shore. Fortunately, Jeff Miller, skipper of the <em>Bombora</em>, volunteered for the
                    rescue mission. With the help of the ranger and the support of the local military, Physalito was
                    recovered intact.
                  </p>

                  <p>
                    A week later, following a few days of strong onshore winds, the two other drifters landed. Physalita
                    washed up on the beach in Worimi National Park, where she was picked up by NPWS rangers, while the
                    3rd float, Tito, made its way into a narrow gully in the rocks north of Wollongong. Thanks to the
                    help of these local organisations, all three floats are now en-route for another deployment, and
                    hopefully more of this rare data on what causes beaching events.
                  </p>

                  <p>
                    As a more conventional part of the same experiment, another type of drifter was deployed at the same
                    time. Part of the NOAA “Global Drifter Project”, these 10
                    <a href="https://gdp.ucsd.edu/ldl/svp/" target="_blank" rel="noreferrer">
                      SVP
                    </a>
                    drifters track the top layer of the ocean down to 15 m. Their tracks highlighted an interesting
                    oceanographic dipole eddy event in November 2020. Instead of the strong East Australian Current
                    (EAC) flowing southward following the coast, two counter-rotating eddies forced a jet of warm
                    offshore water towards the coast. This feature was recently described as a “larval super-highway” (
                    <a
                      href="https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2019JC015613"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Malan et. al. 2020, <em>JGR Oceans</em>
                    </a>
                    ), and transports offshore water and material from the deep ocean to the coast. It is characterised
                    by complex ocean dynamics and strong instabilities, as seen in the drifters’ trajectories: swirling,
                    diverging paths and quickly evolving currents (Figure 2). These trajectories can be tracked on the
                    <a href="http://oceancurrent.imos.org.au/" target="_blank" rel="noreferrer">
                      Oceancurrent website
                    </a>
                    . Ultimately the goal is to bring our understanding of both the offshore setting, as well as the
                    exact dynamics of the beaching process together to be able to model accurately the transport of
                    particles to the coast and eventually predict the location of their beaching, and predict the
                    possibility of those nasty bluebottle encounters.
                  </p>

                  <p>
                    <em>
                      Acknowledgments: Many thanks to Jeff Miller, Tim Ingleton and Brad Morris from DPIE and to our
                      UNSW land-based team Moninya Roughan and Michael Hemming. Thanks to the Sydney Institute of Marine
                      Science, Coledale lifeguards, NPWS teams, Mark Armstrong and Mitchell Fischer from the Department
                      of Defence. If you see these floats in the ocean, please leave them where they are. If you see
                      them on the beach, please get in touch (
                      <a href="http://www.oceanography.unsw.edu.au/contact.html" target="_blank" rel="noreferrer">
                        http://www.oceanography.unsw.edu.au/contact.html
                      </a>
                      )
                    </em>
                  </p>
                </div>

                <div className="col-md-3">
                  <a href="news/20210222/photo_news_Physalito.jpg" target="_blank">
                    <img
                      className="img-responsive"
                      src="https://oceancurrent.aodn.org.au/news/20210222/photo_news_Physalito.jpg"
                    />
                  </a>

                  <p>Figure 1: Beaching of the drifter Physalito in Jervis Bay</p>
                  <a href="news/20210222/plot_SVPs_Carthe_Dec16_news.png" target="_blank">
                    <img
                      className="img-responsive"
                      src="https://oceancurrent.aodn.org.au/news/20210222/plot_SVPs_Carthe_Dec16_news.png"
                    />
                  </a>

                  <p>
                    Figure 2: Trajectories and beaching locations of Physalito, Physalita and Tito, as well as the paths
                    and sea surface temperature measured by the SVP drifters. Background arrows indicate the geostrophic
                    currents on the 17th of November.
                  </p>
                </div>
              </div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="The_January_2021_lsquo_Marine_Heatwave_rsquo_off_Southern_NSW">
                  <a href="#The_January_2021_lsquo_Marine_Heatwave_rsquo_off_Southern_NSW" className="anchor">
                    The January 2021 ‘Marine Heatwave’ off Southern NSW
                  </a>
                </h3>
                <h5>
                  <em>David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">3 February, 2021</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <div className="row">
                <div className="col-md-9">
                  <p>
                    On 23 January, locals reported “extraordinary water temps at Bar Beach Narooma of up to 24 degrees
                    this week” to the ABC. Let’s look at some imagery, starting two weeks back (Fig. 1), or even better,
                    <a
                      href="http://oceancurrent.imos.org.au/product.php?product=fourhour.SST&amp;region=SNSW&amp;date=20210110100000&amp;rtype=DR&amp;movie=1"
                      target="_blank"
                      rel="noreferrer"
                    >
                      all the imagery for January
                    </a>
                    .
                  </p>

                  <p>
                    The imagery and the trajectories of the buoys shows some 25-26 deg EAC water starting to flow past
                    Sydney on 5 January, continuing along the continental slope rather than heading offshore as it had
                    been just days before. By 11 Jan this water has reached the latitude of Narooma, where it starts to
                    wrap around a warm-core eddy that was already there. On 17-19 Jan, some of this very warm water can
                    be seen flowing onto the continental shelf, right up to the coast. By 21 Jan (Fig 2) there is 24 deg
                    water over the whole shelf for about 100km.
                  </p>

                  <p>
                    So, what’s odd about this? Well,
                    <a
                      href="http://oceancurrent.imos.org.au/product.php?product=daily.SST_ANOM&amp;region=SE&amp;date=20210121220000&amp;rtype=SR"
                      target="_blank"
                      rel="noreferrer"
                    >
                      our plots of the SST anomaly
                    </a>
                    show that while 24 deg is not unusual for Newcastle (zero anomaly), it is for Narooma (+4deg). And
                    how unusual? This is what
                    <a
                      href="http://oceancurrent.imos.org.au/product.php?product=daily.pctiles&amp;region=SE&amp;date=20210121220000&amp;rtype=SR"
                      target="_blank"
                      rel="noreferrer"
                    >
                      the percentile analysis
                    </a>
                    tells you: very unusual (top decile).
                  </p>

                  <p>
                    Looking farther afield we see that these observations at Narooma are by no means indicative of
                    conditions beyond 100 to 300km away – most of the Tasman Sea is not anomalously warm at the moment.
                    But the potential for local effects cannot be denied. Events such as this one can bring warm water
                    species to the region that would not normally be there. And what just occured this year
                    <a
                      href="https://theconversation.com/things-warm-up-as-the-east-australian-current-heads-south-31889"
                      target="_blank"
                      rel="noreferrer"
                    >
                      resembles the April event in 2014.
                    </a>
                  </p>
                </div>

                <div className="col-md-3">
                  <a
                    href="http://oceancurrent.imos.org.au/product.php?product=fourhour.SST&amp;region=SNSW&amp;date=20210110100000&amp;rtype=DR"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="img-responsive"
                      src="https://oceancurrent.aodn.org.au/news/20210203/2021011010.gif"
                    />
                  </a>

                  <p>
                    Figure 1: Sea surface temperature for 10 January 2021, with positions of satellite-tracked surface
                    buoys (‘drifters’) shown at 6h intervals.
                  </p>
                  <a
                    href="http://oceancurrent.imos.org.au/product.php?product=fourhour.SST&amp;region=SNSW&amp;date=20210121220000&amp;rtype=DR"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="img-responsive"
                      src="https://oceancurrent.aodn.org.au/news/20210203/2021012122.gif"
                    />
                  </a>

                  <p>
                    Figure 2: Sea surface temperature for 21 January 2021, with positions of satellite-tracked surface
                    buoys (‘drifters’) shown at 6h intervals.
                  </p>
                </div>
              </div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Launceston_to_Hobart_Currents">
                  <a href="#Launceston_to_Hobart_Currents" className="anchor">
                    Launceston to Hobart Currents
                  </a>
                </h3>
                <h5>
                  <em>Jessica Sweeney, David Griffin &amp; Bernadette Sloyan</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">24 December, 2020</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <div className="row">
                <div className="col-md-9">
                  <p>
                    The race from Sydney has been cancelled, but the fleet racing from Launceston to Hobart remain on
                    track to depart on the 27th of December. This race involves not just the winds, waves and ocean
                    currents, but the coastal challenges of rocks and tides as it hugs the north and east of Tasmania.
                  </p>

                  <p>
                    <a
                      href="http://oceancurrent.imos.org.au/tides/Tas_hv/2020/2020122711.html"
                      target="_blank"
                      rel="noreferrer"
                    >
                      IMOS Tidal Current
                    </a>
                    offers hourly graphical forecasts of the tidal currents for Tasmania and around Australia.
                  </p>

                  <p>
                    The favourable tidal ‘window’ in the Banks Strait will be open between 11 pm on the 27th to 4 am on
                    the 28th of December AEDT (see Figure 1). To make this window, boats must sail an average of 4.4 to
                    6.4 knots along the rhumb line from the start at Beauty Point. Slower boats will encounter adverse
                    current in Banks Strait, which peaks at
                    <a
                      href="http://oceancurrent.imos.org.au/tides/Banks_spd/2020/2020122720.html"
                      target="_blank"
                      rel="noreferrer"
                    >
                      7 am AEDT
                    </a>
                    at nearly 2 knots. Thankfully it is
                    <a
                      href="http://oceancurrent.imos.org.au/tides/monthplots/UTas_ARENA_C1A3_202012.html"
                      target="_blank"
                      rel="noreferrer"
                    >
                      neap tides this week
                    </a>
                    or it would be worse.
                  </p>

                  <p>
                    In previous races most boats prefer to cling to Swan Island, thereby avoiding the main channel in
                    Banks Strait. This saves extra miles of sailing. However, if the winds are light and the currents
                    favourable, yachts may consider a wider route in Banks Straits to enjoy over a knot of extra
                    current.
                  </p>

                  <p>
                    Around the corner on the northeast coast of Tasmania, the tides are weak but (non-tidal) ocean
                    currents may play a part. The warm-core eddy at 42 S 150 E
                    <a
                      href="http://oceancurrent.imos.org.au/#Sydney_to_Hobart_Outlook"
                      target="_blank"
                      className="anchor"
                      rel="noreferrer"
                    >
                      as mentioned last week
                    </a>
                    , sits well offshore, but inside the continental shelf southward currents have persisted in the last
                    few days. These have been temporarily strengthened by northerly winds, with peak flow between the
                    200 m and 1000 m isobaths.
                  </p>

                  <p>
                    Lastly, further south – between Maria Island and Storm Bay – a weak adverse northward current of 0.1
                    to 0.5 knots is sometimes present inshore of the shelf edge. This is bringing cooler 14 °C water up
                    along the coast, compared to the warm 17 °C water flowing southward further offshore (Figure 2). A
                    southwesterly wind change predicted late on the 27th of December may strengthen this current a
                    little further. Depending on the wind conditions, sailors may want to avoid tackling this current
                    head-on during their approach to Tasman Island.
                  </p>

                  <p>We wish good luck and fair winds to all competitors.</p>
                </div>

                <div className="col-md-3">
                  <a
                    href="http://oceancurrent.imos.org.au/tides/Banks_spd/2020/2020122714.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="img-responsive"
                      src="https://oceancurrent.aodn.org.au/news/20201224/Fig1_2020122714.gif"
                    />
                  </a>

                  <p>
                    Figure 1: Tidal current forecast for 01:00 AEDT on the 28th of December. Banks Strait is off the
                    northeastern tip of Tasmania.
                  </p>
                  <a href="http://oceancurrent.imos.org.au/TasE/2020122308.html" target="_blank" rel="noreferrer">
                    <img
                      className="img-responsive"
                      src="https://oceancurrent.aodn.org.au/news/20201224/Fig2_2020122308.gif"
                    />
                  </a>

                  <p>
                    Figure 2: IMOS Snapshot SST analysis from the 23rd of December. Contours show sea level anomalies
                    from
                    <a
                      href="http://oceancurrent.imos.org.au/glossary.php#GSLA"
                      target="_blank"
                      className="anchor"
                      rel="noreferrer"
                    >
                      GSLA (Gridded Sea Level Anomaly)
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Sydney_to_Hobart_Outlook">
                  <a href="#Sydney_to_Hobart_Outlook" className="anchor">
                    Sydney to Hobart Outlook
                  </a>
                </h3>
                <h5>
                  <em>Jessica Sweeney</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">18 December, 2020</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <div className="row">
                <div className="col-md-9">
                  <p>
                    It may have been a strange year for those of us onshore, but the East Australian Current (EAC) is
                    still up to its usual tricks for the upcoming Sydney to Hobart Race. In the lead up to Boxing Day,
                    sailors will be scanning the charts to find favourable currents to take them to Hobart. Here is a
                    preview of three key ocean features along the race track.
                  </p>

                  <p>
                    Firstly, we see the beginnings of an eddy genesis event. The core of the EAC is about 100 nm
                    offshore at Sydney’s latitude but comes much closer to the coast at 35 S where a big lobe, or
                    retroflection, carrying 23 to 25 °C water, curves from the southwest to the south and then into the
                    east-northeast. This retroflection is likely to sharpen further and curve back on itself until a
                    warm core eddy is “cut off” from the main flow. Warm core eddies in this region tend to move
                    southwestward towards the continental shelf edge, and they have favourable currents on their western
                    side. The edge of the eddy is just starting to reach the rhumb line, but the strongest currents of 1
                    to 2 knots will be felt by those boats who choose a more offshore route between 35 and 36 S.
                  </p>

                  <p>
                    The second feature may be a controlling factor in the tactics of the race. It is a strong warm core
                    eddy in Bass Strait, quite far west, currently estimated to be at 39 S 151 E.
                  </p>

                  <p>
                    A
                    <a
                      href="http://oceancurrent.imos.org.au/profiles/cycle.php?wmoid=5906260&amp;cycle=15&amp;depth=0"
                      target="_blank"
                      rel="noreferrer"
                    >
                      recent Argo profile
                    </a>
                    inside this eddy is shown by the small pink circle in Figure 1. The Argo measured a well-mixed
                    surface layer down to 50 m depth, but the bulk of the anomalously warm water sits below that at 50
                    to 250 m depth. This explains why the eddy isn’t obvious in the sea surface temperature (SST) plots,
                    but stands out in the sea level anomaly contours.
                  </p>

                  <p>
                    Also in Figure 1 you can see the small pink arrows of a drifter track skirting anti-clockwise around
                    the bottom of the eddy. There is a slight north-south offset between the drifter track and the black
                    arrows from the IMOS analysis which suggests that the eddy is slightly further south than the
                    analysis has it.
                  </p>

                  <p>
                    This Bass Strait feature may move a little further south-southwestward during the next week. The
                    strongly favourable currents on the western side will encourage the race fleet to keep to the west
                    near the rhumb line, which may limit the tactical options at this point of the race.
                  </p>

                  <p>
                    The third feature is a broader and weaker warm core eddy centred at 42 S 150 E. Favourable currents
                    associated with the eddy extend from the continental shelf edge and up to 70 nm offshore. This will
                    benefit almost all boats on their journey down the Tasmanian coast. However, keep in mind that
                    closer to shore the currents can be wind-driven.
                  </p>

                  <p>
                    Another aspect to consider is the SST along the course. The waters off Sydney are around 1 °C cooler
                    than normal due to a weak cold-core eddy off the central-north NSW coast along with recent
                    upwelling. However, once the boats enter the warmer waters of the EAC at 35 S, the SST anomaly will
                    flip into the positive. From there, along most of the EAC Extension pathway to southern Tasmania the
                    SST anomalies are 1 to 1.5 °C, in contrast to
                    <a
                      href="http://oceancurrent.imos.org.au/#Sydney_Hobart_briefing"
                      target="_blank"
                      className="anchor"
                      rel="noreferrer"
                    >
                      last year
                    </a>
                    . This should encourage more locally consistent winds but may hamper the development of sea breezes
                    closer to land.
                  </p>

                  <p>
                    We wish competitors a safe race and recommend monitoring
                    <a href="http://oceancurrent.imos.org.au/Syd-Hob/latest.html" target="_blank" rel="noreferrer">
                      the imagery that will appear on our website
                    </a>
                    , including our '4-hour SST' products derived from Japan's geostationary satellite Himawari-8.
                  </p>

                  <p>Stay tuned for an update closer to race day.</p>
                </div>

                <div className="col-md-3">
                  <a href="http://oceancurrent.imos.org.au/Syd-Hob/2020121508.html" target="_blank" rel="noreferrer">
                    <img
                      className="img-responsive"
                      src="https://oceancurrent.aodn.org.au/news/20201218/Fig_1_2020121508.gif"
                    />
                  </a>

                  <p>
                    Figure 1: IMOS Snapshot SST analysis from the 15th of December. Contours show sea level anomalies
                    from GSLA. Pink arrows indicate drifter tracks, pink open circle shows Argo profile location. The
                    white dashed line represents the rhumb line.
                  </p>
                  <a href="http://oceancurrent.imos.org.au/TasE/2020121414.html" target="_blank" rel="noreferrer">
                    <img
                      className="img-responsive"
                      src="https://oceancurrent.aodn.org.au/news/20201218/Fig_2_2020121414.gif"
                    />
                  </a>

                  <p>Figure 2: Snapshot SST for Tasmania on the 14th of December 2020.</p>
                </div>
              </div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Chlorophyll_imagery_from_MODIS_is_updating_again">
                  <a href="#Chlorophyll_imagery_from_MODIS_is_updating_again" className="anchor">
                    Chlorophyll imagery from MODIS is updating again
                  </a>
                </h3>
                <h5>
                  <em>David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">5 November, 2020</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/Tas_chl/2020103004.gif"
                  style={{ height: '525px', width: '600px' }}
                />
                <br />
                The processing of MODIS has resumed, in time to see&nbsp;a strong signal&nbsp;in Tasmanian waters. Is
                this a spring bloom, possibly explaining why&nbsp;lots of humpback whales (chasing the zooplankton
                possibly thriving on all the phytoplankton) have been seen on the Tas east coast? If so, there might be
                even more on the west coast. But why is the bloom only on the shelf? Perhaps there is nutrient
                enrichment happening due to upwelling. The winds on 25-26 October were certainly very strong and
                upwelling-favourable. Or could there be enough tannin in the coastal runoff to explain this? The inshore
                waters have certainly been very brown.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Great_Barrier_Reef_Bleaching_2020">
                  <a href="#Great_Barrier_Reef_Bleaching_2020" className="anchor">
                    Great Barrier Reef Bleaching 2020
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill and Andrew Lenton</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">1 September, 2020</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <span>
                  <a href="news/20200901/GBR2020_Fig1.png" target="_blank">
                    <img
                      alt=""
                      src="https://oceancurrent.aodn.org.au/news/20200901/GBR2020_Fig1.png"
                      style={{ height: '458px', width: '600px' }}
                    />
                  </a>
                  The ­ARC COE for Coral Reef Studies has{' '}
                </span>
                <span lang="EN-GB">
                  <a href="https://www.coralcoe.org.au/media-releases/climate-change-triggers-great-barrier-reef-bleaching">
                    <span lang="EN-GB">
                      <span lang="EN-GB">
                        reported that the
                        <span lang="EN-GB">
                          Great Barrier Reef
                          <span lang="EN-GB">
                            <span lang="EN-GB">experienced a severe bleaching event</span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </a>
                </span>
                <span>
                  last summer. An aerial survey indicated bleaching occurred all along the length of the reef (Figure
                  1). This is the third bleaching event in the last 5 years extended much further south than in{' '}
                </span>
                <span lang="EN-GB">
                  <a href="https://theconversation.com/back-to-back-bleaching-has-now-hit-two-thirds-of-the-great-barrier-reef-76092">
                    <span lang="EN-GB">
                      <span lang="EN-GB">2016 and 2017</span>
                    </span>
                  </a>
                </span>
                <span>
                  . Monthly mean sea surface temperature (SST) anomalies, averaged over sub-regions of the Great Barrier
                  Reef (GBR) help quantify the heat stress (Figure 1). Although there can be a lot of variability at the
                  reef-scale within each region, the bleaching events (indicated with grey) mostly coincide with high
                  SST anomalies in January, February or March (indicated with pink) when sea surface temperatures are at
                  their hottest. Some of the largest anomalies have occurred during the winter months (particularly
                  following an El Niño event: 1998, 2010 and 2016). Wintertime anomalies do not cause bleaching as the
                  absolute temperatures are well below the summertime bleaching thresholds, but may contribute to
                  priming warmer waters at the start of the following summer.
                </span>
              </p>
              <p>
                <span>
                  <a href="news/20200901/MHWdays_NE_2020.png" target="_blank">
                    <img
                      alt=""
                      src="https://oceancurrent.aodn.org.au/news/20200901/MHWdays_NE_2020.png"
                      style={{ height: '494px', width: '400px' }}
                    />
                  </a>
                  Bleached reefs were observed from the north to the south predominantly along the coast but many of the
                  outer reefs were spared (Figure 1). The number of days of SST above the 90th percentile in summer (1
                  January – 15 March) provides an estimate of the summer heating pattern (Figure 2). Heating was the
                  most persistent in the south with many places on and off the shelf experiencing 15-30 days of extreme
                  temperatures. The narrow band of yellow (&lt;10 extreme heat days) along the outer edge of the
                  southern GBR may explain the lack of bleaching in this region despite the inshore reefs suffering.
                  Cooling at the outer shelf is a feature of the far northern and southern GBR with mean
                  temperatures{' '}
                </span>
                <span lang="EN-GB">
                  <a href="http://oceancurrent.imos.org.au/product.php?product=climatology&amp;region=CGBR&amp;date=20200212120000&amp;rtype=DR">
                    <span lang="EN-GB">
                      <span lang="EN-GB">up to a degree cooler than surrounding waters</span>
                    </span>
                  </a>
                </span>
                <span>
                  during summer. The source of the cooling is below-thermocline water offshore which is mixed with
                  surface waters by strong tidal currents through the dense outer reef matrix in the far north and
                  southern GBR. This cooling is clearly invaluable in times of severe heating but can be diminished with
                  a deeper surface layer or warmer sub-surface waters.
                </span>
              </p>
              <p>
                <span>
                  Bleaching of inshore reefs in the Northern GBR is not explained with the number of marine heatwave
                  days and this could indicate that cloud has impacted the estimate of the true number of heatwave days
                  in this region or that other factors (e.g. prior bleaching) are implicated. Note, usually when
                  assessing for the presence of a marine heatwave (MHW) only contiguous days are counted but the
                  presence of cloud can make this statistic difficult to calculate using the high-resolution AVHRR SST.
                  In this case we are simply looking for the pattern of heating, noting that using the one-day,
                  night-only composites of SST (L3S-1d.ngt) provides a lower estimate of the number of marine heatwave
                  days due to the presence of cloud. For more information about factors affecting reef survival see the
                  <a href="https://nesptropical.edu.au/index.php/factsheets-round-4/" target="_blank" rel="noreferrer">
                    NESP Tropical Water Quality Factsheets (Round 4)
                  </a>
                  .
                </span>
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="MODIS_Ocean_Colour_Outage">
                  <a href="#MODIS_Ocean_Colour_Outage" className="anchor">
                    MODIS Ocean Colour Outage
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">26 August, 2020</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <span>
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20200826/Figure1.png"
                    style={{ height: '504px', width: '300px' }}
                  />
                  There has been no MODIS Aqua Ocean Colour data since August 16. Communication with the satellite is
                  the issue, otherwise the satellite and sensor seem to be operating as normal. NASA are still
                  investigating the situation and will be attempting a reboot over the coming days. It’s hopeful
                  transmissions will resume shortly.{' '}
                </span>
                <br />
                The good news though is that we are close to producing ocean colour images from NOAA’s two new
                satellites: VIIRS-SNPP and NOAA20 (VIIRS-JPSS1), so look out for it in the coming months. In the
                meantime, I leave you with one of the beautiful images of ocean colour from Northwest Shelf helping to
                delineate the coastal front created by shallow water winter cooling (Figure 1).
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="40h_adrift_in_the_EAC_a_survival_story">
                  <a href="#40h_adrift_in_the_EAC_a_survival_story" className="anchor">
                    40h adrift in the EAC - a survival story
                  </a>
                </h3>
                <h5>
                  <em>David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">28 May, 2020</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20200528/JayDee2.png"
                  style={{ height: '220px', width: '300px' }}
                />
                Late on New Year’s Eve 1995 Mark Beveridge’s prawn trawler, the&nbsp;<em>Jay Dee,</em>&nbsp;was hit by a
                large ship 16 miles or so out from Southport on the Gold Coast. Mark was the only person on board. His
                boat sank quickly. He had no food, no water and was dressed in singlet and shorts. He spent the next 40
                hours drifting southward with a small life raft and an icebox. He knew that he had to get to shore
                before he reached Cape Byron or he would be swept out to sea by the East Australian Current.&nbsp; EAC
                pioneering observer George Cresswell assisted the Australian Transport Safety Bureau's 1996
                investigation into the events&nbsp;surrounding the sinking of the
                <em>Jay Dee</em>. George has now re-examined the question of how Mark was so fortunate to survive.
                Anyone with an interest in survival at sea will find Mark's account of his tribulation, and George's
                contextualization of it, something to ponder deeply.
                <a href="news/20200528/JAYDEE_FINAL_200525.pdf">Where's Mark? He's in the EAC with Nemo</a>&nbsp;
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Glider_reveals_extreme_heating_to_40m_depth_on_the_Southern_GBR">
                  <a href="#Glider_reveals_extreme_heating_to_40m_depth_on_the_Southern_GBR" className="anchor">
                    Glider reveals extreme heating to 40m depth on the Southern GBR
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">16 April, 2020</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="news/20200416/Figure1a.png" target="_blank">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20200416/Figure1a.png"
                    style={{ height: '440px', width: '400px' }}
                  />
                </a>
                An ocean glider, deployed on the southern Great Barrier Reef (GBR), has captured the vertical profile of
                temperature (right) indicating the extreme temperatures at the surface had extended right to the bottom
                during the last days of the marine heatwave. From early February to mid-March, sea surface temperatures
                (SST) were higher than the 90th percentile (based on the SSTAARS climatology) over much of the southern
                half of the Great Barrier Reef, with large regions experiencing temperature anomalies double the 90th
                percentile anomaly for 7-10 days. Aerial surveys of the reef indicate a
                <a
                  href="https://www.coralcoe.org.au/media-releases/climate-change-triggers-great-barrier-reef-bleaching"
                  target="_blank"
                  rel="noreferrer"
                >
                  mass coral reef bleaching
                </a>
                – the third, and the most widespread, mass bleaching event in only five years. This time most of the
                bleaching occurred in the south although coastal and mid-shelf reefs in the north have also suffered.
                <br />
                <br />
                A recently developed temperature climatology (GBR1-SSTAARS¹) for the GBR which combines five years of
                eReefs GBR1 model output with the SSTAARS climatology (based on 25 years of SST, 1992-2016) helps to
                assess the sub-surface glider observations. In the last days of the heatwave temperatures are 2-2.5°C
                above average all the way to the bottom at 40m. The glider was initially piloted to sample between the
                reefs in the Capricorn Bunker (Figure 2) and it stayed in the same region for a few days after the
                southerly winds developed, long enough to observe that it took over 2 days for temperatures at depth to
                drop below an anomaly of 1.5°C.
                <br />
                <br />
                <a href="news/20200416/Figs23a.png" target="_blank">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20200416/Figs23a.png"
                    style={{ height: '479px', width: '600px' }}
                  />
                </a>
                <br />
                <span>
                  When the SST anomaly, (using
                  <span className="MsoHyperlink">
                    <a
                      href="http://thredds.aodn.org.au/thredds/catalog/IMOS/SRS/SST/ghrsst/L3SM-1d/ngt/2020/catalog.html"
                      target="_blank"
                      rel="noreferrer"
                    >
                      L3S-1d
                    </a>
                  </span>
                  night-only SST), along the path of the glider is plotted for February and March we can see that
                  temperature anomalies in the region remained above 1.5°C from early February to 9 March and above 2°C
                  for over 3 weeks. Given the slow build of two weeks to peak SST in mid-February it is very likely
                  these surface temperatures would have extended to the bottom in shallow (&lt;40m) regions. Although
                  there are cloudy periods, temperatures do not appear to have abated at all in that time. The data from
                  this glider mission is available on the
                  <span className="MsoHyperlink">
                    <a href="http://portal.aodn.org.au/" target="_blank" rel="noreferrer">
                      AODN portal
                    </a>
                  </span>
                  or
                  <span className="MsoHyperlink">
                    <a
                      href="http://thredds.aodn.org.au/thredds/catalog/IMOS/ANFOG/REALTIME/slocum_glider/CapricornBunker20200307/catalog.html"
                      target="_blank"
                      rel="noreferrer"
                    >
                      thredds server
                    </a>
                  </span>
                  and will be a valuable resource for ground-truthing model output and bleaching outcomes.
                </span>
                <br />
                <br />
                ¹The mean vertical structure of GBR1-SSTAARS is calculated from the 1km resolution model, GBR1 for every
                location on the SSTAARS 2km grid. This type of projection is particularly useful in a highly frictional
                region like the GBR where bathymetry plays a big part in determining the extent of vertical mixing.
                Seasonal winds strongly affect the mixed layer depth and, with only 5 years of model output available,
                the climatology may not fully represent the long term mean. However, bathymetry and tidal currents also
                contribute significantly to vertical structure, particularly in shallow regions, and these factors can
                be considered persistent. Note: this climatology is yet to be fully evaluated but could provide a
                significant resource not just for assessing observed temperatures but also identifying locally important
                physical processes. The work to produce GBR1-SSTAARS was undertaken under
                <a
                  href="https://nesptropical.edu.au/index.php/round-4-projects/project-4-2/"
                  target="_blank"
                  rel="noreferrer"
                >
                  NESP TWQ Project 4.2.
                </a>
                <br />
                &nbsp;
              </p>
              <p>
                <span>&nbsp;</span>
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Bonney_Coast_Upwelling_2020">
                  <a href="#Bonney_Coast_Upwelling_2020" className="anchor">
                    Bonney Coast Upwelling 2020
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">28 March, 2020</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="news/20200328/Figure_1.png" target="_blank">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20200328/Figure_1.png"
                    style={{ height: '375px', width: '400px' }}
                  />
                </a>
                The Bonney coast upwelling season developed slowly this summer with the first signs of cold coastal
                water appearing in
                <a
                  href="http://oceancurrent.imos.org.au/product.php?product=daily.SST&amp;region=SAgulfs&amp;date=20191223155033&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  late December
                </a>
                but consistent upwelling-favourable winds since early February have resulted in an extremely strong
                upwelling event late in the season. The peak occurred in mid-March (Figure 1) with the plume of water
                extending right across the shelf and well into Long Bay to the northwest. The
                <a
                  href="http://oceancurrent.imos.org.au/product.php?product=daily.SST_ANOM&amp;region=SAgulfs&amp;date=20200316165046&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  SST anomaly
                </a>
                indicates water temperatures were more than 3°C cooler than
                <a
                  href="http://oceancurrent.imos.org.au/product.php?product=climatology&amp;region=SAgulfs&amp;date=20200316165046&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  SSTAARS mean climatology
                </a>
                . The two less reliable upwelling regions, off western Kangaroo Island and western Eyre Peninsula, also
                show significant cold water plumes.
                <br />
                <a href="news/20200328/Figure_2.png" target="_blank">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20200328/Figure_2.png"
                    style={{ height: '364px', width: '400px' }}
                  />
                </a>
                <br />
                When the cold, nutrient-rich water is brought up to the light, phytoplankton in the water are able to
                multiply and this productivity can be seen with images of Chlorophyll-a. The complexity of the response
                is evident in the image from March 11 (Figure 2). The bloom is strong at the edges of the plume while
                there is almost nothing happening at the centre. This pattern probably reflects the strength of the
                upwelling event. Water that is upwelled initially (at the outer edge of the plume in this case) will
                have brought phytoplankton up from the mixed layer (where phytoplankton are often found). Whereas the
                lack of pigment at the centre of the plume suggests the water has come from well below the mixed layer
                and it will take a little time for the phytoplankton response to develop in this water. In later images,
                e.g.
                <a
                  href="http://oceancurrent.imos.org.au/product.php?product=oceancolour&amp;region=SAgulfs&amp;date=20200315040000&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  March 15
                </a>
                , there is a strong chlorophyll-a signal on the Bonney Coast shelf.
              </p>
              <p>
                <span>
                  The beautiful wave-like features all along the outer edge of the cold water plume (Figures 1&amp;2)
                  are most likely due to the shear between the plume and the water offshore. Despite the cloud, we can
                  occasionally see (in
                  <a
                    href="http://oceancurrent.imos.org.au/SST_4hr/SST_Filled/SAgulfs/SAgulfs_SST_Filled_202003.mp4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    video of the SST
                  </a>
                  ) the plume pushing up to the northwest in pulses around March 6-8 and again March 15. Surface
                  velocities (red arrows) from the SA Gulfs radar indicate north-westward velocities of up to 0.4m/s on
                  the shelf. It certainly would have been a good time to have the scheduled Bonney Coast glider
                  deployment, but glider deployments have had to be suspended due to the COVID-19 pandemic.
                </span>
              </p>
              <p>
                <span>
                  (Note, the geostrophic velocities (black vectors) on the shelf, in this region, are unreliable as we
                  have no coastal sea level from the Bonney Coast and non-tidal sea level is found to be poorly
                  correlated between the gulfs and Portland.)
                  <br />
                  &nbsp;
                </span>
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Port_to_Pub_2020">
                  <a href="#Port_to_Pub_2020" className="anchor">
                    Port to Pub 2020{' '}
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">12 March, 2020</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="https://rs-data3-mel.csiro.au/porttopub-swim-live/" target="_blank" rel="noreferrer">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20200312/Figure_1.png"
                    style={{ height: '211px', width: '400px' }}
                  />
                </a>
                <span>
                  The Port to Pub swim from Fremantle to Rottnest is coming up on Saturday March 21. Like last year, we
                  have the
                  <span className="MsoHyperlink">
                    <a href="https://rs-data3-mel.csiro.au/porttopub-swim-live/">‘swim-optimiser’</a>
                  </span>
                  ready to go. The optimiser gives you the hourly forecast currents (from the Oceans Institute of the
                  University of Western Australia) for the next Saturday. Today it’s showing the currents for Saturday
                  March 14 but next Wednesday (Mar 18) it will be updated with the forecast for race day.
                </span>
              </p>
              <p>
                <span>
                  In the water between Perth and Rottnest, the currents are usually strongest near Rottnest Island, and
                  they are
                  <span className="MsoHyperlink">
                    <a
                      href="http://oceancurrent.imos.org.au/#Rottnest_Channel_Swim_pre_race_briefing"
                      className="anchor"
                    >
                      generally either northward or southward
                    </a>
                  </span>
                  . If the current is strong, it pays to adjust your bearing to compensate. The optimiser helps you
                  decide how much of an adjustment you need. The currents usually impact on the Port to Pub swim a
                  little more than the Rottnest swim because of the northward direction of the swim – the currents will
                  either give you a boost or slow you down.
                </span>
              </p>
              <p>
                <span>
                  &nbsp;This coming Saturday the currents are expected to be fairly moderate and in the northward
                  direction so if the race was on then we could expect a pretty fast race – but check in again next
                  Wednesday for the race day forecast! Look for the green 'Port to Pub' button on the OceanCurrent home
                  page.
                </span>
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="The_Great_Barrier_Reef_Cools_A_Little">
                  <a href="#The_Great_Barrier_Reef_Cools_A_Little" className="anchor">
                    The Great Barrier Reef Cools - A Little
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">3 March, 2020</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="news/20200303/Figure_1_final.png" target="_blank">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20200303/Figure_1_final.png"
                    style={{ height: '295px', width: '500px' }}
                  />
                </a>
                As the cloud clears from the coast of Queensland we are just starting to see the impact of the cooling
                on the sea surface temperatures. The SST anomalies from Feb 18 show the southern half of the GBR had
                been suffering with the highest anomalies, particularly in the inshore regions. The most recent SST
                image (Figure 1, right) shows that the temperatures have reduced significantly in the central part of
                the GBR and outer parts of the southern GBR. However, there are still regions in the south, particularly
                in inshore regions, which are over 2°C above average. In the far north, the outer reef stayed relatively
                cool but the waters of Princess Charlotte Bay were 1-2°C above average. The occasional glimpse through
                the clouds indicates Princess Charlotte Bay cooled a little in late February (
                <a
                  href="http://oceancurrent.imos.org.au/product.php?product=daily.SST_ANOM&amp;region=NGBR&amp;date=20200224092125&amp;rtype=DR"
                  target="_blank"
                  rel="noreferrer"
                >
                  e.g. Feb 24
                </a>
                ) but the most recent image shows it has begun to warm again. The AIMS in-water temperature loggers are
                in general agreement with the SST. All loggers indicate that temperatures have fallen below or are close
                to the ‘normal’ range (defined as within 2 standard deviations of the daily average). The exception is
                Square Rocks in the south (near the Keppel Islands) which is still in the ‘at risk of bleaching’ range.
                <br />
                <a href="news/20200303/MHW_NW_Feb2020_v2.mp4" target="_blank">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20200303/Figure_2_v2.png"
                    style={{ height: '474px', width: '400px' }}
                  />
                </a>
                <br />
                <br />
                The build-up of the marine heat wave (MHW) on the GBR and subsequent cooling, throughout February, can
                be expressed in terms of its severity (see movie right). Using the protocol of
                <a href="https://doi.org/10.5670/oceanog.2018.205">Hobday et. al. (2018)</a>
                we have ranked our daily images of SST in terms of how much each observation exceeds the climatology in
                factors of the 90th percentile: from no heatwave (&lt;90th percentile) then increasing from Category I
                (moderate, a factor of 1-2) to Category IV (extreme, more than 4 times the 90th percentile). This
                ranking indicates that a large proportion of the southern half of the GBR experienced a Category II MHW
                for a number of days and most of the rest of the reef experienced Category I for at least 2 weeks. Many
                parts of the reef are still experiencing Category I conditions (and even Category II in places) so those
                areas appear to be still under threat.
                <br />
                <br />
                <span>Temperature records </span>(Figure 3)
                <span>
                  from the
                  <a href="http://oceancurrent.imos.org.au/product.php?product=daily&amp;region=CGBR&amp;date=20200221083619&amp;rtype=DR">
                    glider deployed in the central GBR
                  </a>
                  (off Hinchinbrook Island) indicate significant cooling over 20m of the surface layer. Glider location
                  will often account for variability in glider temperature records however this glider was held in
                  effectively the same location for two periods Feb 14-16 and Feb 20-24. During the first period
                  temperatures of 30.5°C were observed down to 20m depth whereas during the second the by top 20-30m
                  cooled to at least 28.5°C. This represents a cooling of at least 2°C throughout the surface layer.
                  Although autumn has officially begun, further heating is still possible, particularly through
                  advection, as
                  <a href="http://oceancurrent.imos.org.au/product.php?product=daily.SST&amp;region=CGBR&amp;date=20200302080342&amp;rtype=DR">
                    offshore waters appear to remain almost 1°C warmer
                  </a>
                  than shelf waters.
                  <a href="news/20200303/Figure_3.png" target="_blank">
                    <img
                      alt=""
                      src="https://oceancurrent.aodn.org.au/news/20200303/Figure_3.png"
                      style={{ height: '239px', width: '500px' }}
                    />
                  </a>
                  <br />
                  <br />
                  <strong>References</strong>
                  <br />
                  Hobday, A.J.,&nbsp; E.C.J. Oliver,&nbsp; A.Sen Gupta,&nbsp; J.A. Benthuysen,&nbsp; M.T. Burrows,&nbsp;
                  M.G. Donat,&nbsp; N.J. Holbrook,&nbsp; P.J. Moore,&nbsp; M.S. Thomsen,&nbsp; T. Wernberg,&nbsp; D.A.
                  Smale, 2018. Categorizing and naming marine heatwaves. Oceanography 31(2)
                </span>
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Heating_on_the_Great_Barrier_Reef_A_Brief_Reprieve">
                  <a href="#Heating_on_the_Great_Barrier_Reef_A_Brief_Reprieve" className="anchor">
                    Heating on the Great Barrier Reef: A Brief Reprieve?
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill and Craig Steinberg</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">24 February, 2020</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20200224/Figure_1.png"
                  style={{ height: '296px', width: '350px' }}
                />
                Observations of water temperature from the AIMS Davies Reef station, 18.8°S 147.6°E (Figure 1), show
                temperatures have dropped by well over 1°C since Friday. This cooling represents a significant relief
                from the previous 10 days of heatwave conditions and appears to be widespread with similar cooling at
                Heron island (23.5°S) and Yongala (19°S). From the temperature time series we can see that the daily
                pulse of diurnal heating has stopped thanks to the cloud and rain that has developed along the
                Queensland coast, covering much of the GBR (Figure 2).
                <br />
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20200224/Figure_2.png"
                  style={{ height: '274px', width: '350px' }}
                />
                How long can this cooling last? The onshore winds responsible for bringing the moist air from the Coral
                Sea to feed the clouds are driven by the pressure gradient between the low trough in the north
                (including TC Esther in the Gulf) and the high pressure system in the Tasman Sea. The forecast is for
                this pressure gradient to dissipate on Tuesday but that rain may persist for the next few days after
                that.
                <br />
                <br />
                While cloud cover provides great protection for the reef, particularly during this time when reef waters
                are already at their hottest, it clearly blocks observations using satellite AVHRR SST. In-water
                observations, however, are ongoing and
                <a
                  href="http://oceancurrent.imos.org.au/gliders/4day.php?link=GBR20200123_nrt_4d/latest.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  the latest glider observations
                </a>
                from the central GBR offshore from Hinchinbrook Island indicate that surface waters have certainly
                cooled by at least 1°C down to about 15m. The heating looks like it may be spatially patchy, however,
                the moving glider platform makes interpretation difficult. A more complete&nbsp; understanding of these
                observations will require further analysis.
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Rapid_warming_on_the_Great_Barrier_Reef">
                  <a href="#Rapid_warming_on_the_Great_Barrier_Reef" className="anchor">
                    Rapid warming on the Great Barrier Reef
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill and Craig Steinberg</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">21 February, 2020</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a
                  href="http://oceancurrent.imos.org.au/product.php?product=daily.pctiles&amp;region=NE&amp;date=20200217195711&amp;rtype=SR"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20200221/NE_pctiles_20200217.gif"
                    style={{ height: '388px', width: '350px' }}
                  />
                </a>
                <span>
                  Sea surface temperatures on the Great Barrier Reef (GBR) south of latitude 15°S were close to average
                  in the first half of summer but they began to increase in mid-January, and have been above the 90th
                  percentile since Feb 10. Mid-February is the time when water temperatures are usually at their maximum
                  so this is the danger period for coral bleaching. Time series of the last 21 years of SST in two
                  50x50km regions of the reef (Figure 2) show that recent water temperatures have rapidly become extreme
                  and are on a par with those observed in the GBR’s four previous mass coral bleachings in 1998, 2002,
                  2016 and 2017. The routinely scheduled
                  <a href="http://oceancurrent.imos.org.au/gliders/GBR20200123_nrt_4d/GBR20200123_nrt_4d.mp4">
                    glider mission
                  </a>
                  sampling in the central GBR indicates that, since Feb 10, these temperatures of 30-31°C extend down to
                  25m depth.
                </span>
                <br />
                <br />
                The question now is: how long will this last? The Bureau of Meteorology's
                <a
                  href="http://www.bom.gov.au/clim_data/IDCK000071/plots/maps/ssta/AUS/IDCK000071.map.ssta_AUS_mw_ts_0.png"
                  target="_blank"
                  rel="noreferrer"
                >
                  outlook for the next few weeks
                </a>
                is not looking good with anomalies &gt;1ºC expected over most of the reef, particularly in the south.
                <br />
                <a href="news/20200221/Figure_2.png" target="_blank">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20200221/Figure_2.png"
                    style={{ height: '281px', width: '500px' }}
                  />
                </a>
                <br />
                <br />
                &nbsp;
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Tropical_cyclones_and_upwelling_winds_cool_North_West_Shelf_waters">
                  <a href="#Tropical_cyclones_and_upwelling_winds_cool_North_West_Shelf_waters" className="anchor">
                    Tropical cyclones and upwelling winds cool North West Shelf waters
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">19 February, 2020</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20200219/NW_pctiles_20200212.gif"
                  style={{ height: '266px', width: '400px' }}
                />
                <span style={{ fontSize: '11pt' }}>
                  Early summer heating in waters off northwest Australia has been erased with the passage of
                  <a
                    href="https://en.wikipedia.org/wiki/2019%E2%80%9320_Australian_region_cyclone_season#/media/File:2019-2020_Australian_region_cyclone_season_summary.png"
                    target="_blank"
                    className="anchor"
                    rel="noreferrer"
                  >
                    three tropical cyclones
                  </a>
                  : TC Blake, TC Claudia and most recently, TC Damien. By the
                  <a
                    href="http://oceancurrent.imos.org.au/product.php?product=daily.pctiles&amp;region=NW&amp;date=20191226184358&amp;rtype=SR"
                    target="_blank"
                    rel="noreferrer"
                  >
                    end of December
                  </a>
                  last year, surface waters of the North West Shelf (NWS) had reached the 90th percentile over most of
                  the region. Argo temperature profiles (e.g.
                  <a
                    href="http://oceancurrent.imos.org.au/profiles/cycle.php?wmoid=5905213&amp;cycle=78&amp;depth=0"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Dec 26
                  </a>
                  ) indicated the surface layer was quite shallow (10-30m) and overlying a relatively cool subsurface
                  layer, providing a readily available <span>&nbsp;</span>source of cool water. The three cyclones that
                  developed in January and February of this year were not particularly strong (only TC Damien reached
                  Category 2) but each of them left a path of cooled water in its wake.
                  <br />
                  <br />
                  TC Blake (Jan 6-8) travelled north to south between the two largest reef groups on NWS, Rowley Shoals
                  and Scott Reef, closely followed by TC Claudia (Jan 10-18), also passing close to Rowley Shoals and
                  Scott Reef, this time travelling westward. The
                  <a
                    href="http://oceancurrent.imos.org.au/product.php?product=daily.SST_ANOM&amp;region=NW&amp;date=20200113181518&amp;rtype=SR"
                    target="_blank"
                    rel="noreferrer"
                  >
                    weak SST anomaly left in their wake
                  </a>
                  would have provided some relief to the coral reefs from the heat. The stronger winds and
                  <a
                    href="https://en.wikipedia.org/wiki/2019%E2%80%9320_Australian_region_cyclone_season#/media/File:Damien_2020_track.png"
                    target="_blank"
                    className="anchor"
                    rel="noreferrer"
                  >
                    slower propagation speed of TC Damien (Feb 6-9)
                  </a>
                  across the shelf allowed for particularly good vertical mixing and rapid cooling over the western end
                  of NWS. Strong and persistent upwelling winds along the northwest corner of Australia which began in
                  the last week of January brought
                  <a
                    href="http://oceancurrent.imos.org.au/product.php?product=daily.SST_ANOM&amp;region=Ningaloo&amp;date=20200203184815&amp;rtype=DR"
                    target="_blank"
                    rel="noreferrer"
                  >
                    cool water
                  </a>
                  to Shark Bay, Ningaloo Reef and onto the southwestern end of NWS. The Onslow glider, deployed a few
                  days before TC Damien crossed the coast, appears to have been a little too far south for the full
                  cyclone experience but captured the
                  <a
                    href="http://oceancurrent.imos.org.au/product.php?product=daily.SST_ANOM&amp;region=Ningaloo&amp;date=20200203184815&amp;rtype=DR"
                    target="_blank"
                    rel="noreferrer"
                  >
                    strong upwelling
                  </a>
                  .
                </span>
                <br />
                <br />
                <br />
                <br />
                &nbsp;
              </p>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Strong_Upwelling_Again_for_the_West_Coast_of_New_Zealand">
                  <a href="#Strong_Upwelling_Again_for_the_West_Coast_of_New_Zealand" className="anchor">
                    Strong Upwelling Again for the West Coast of New Zealand
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">17 January, 2020</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily.SST_ANOM&amp;region=NZ&amp;date=20200108143359&amp;rtype=SR">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20200117/Figure_1.png"
                    style={{ height: '417px', width: '400px' }}
                  />
                </a>
                Shelf waters all along New Zealand’s west coast are again very cold, even colder than the
                <a
                  href="http://oceancurrent.imos.org.au/#Upwelling_keeps_South_Island_cool_this_summer"
                  className="anchor"
                >
                  January 2019 event
                </a>
                , with anomalies of -2 to -3°C (Figure 1). The same atmospheric conditions that created
                <a
                  href="http://oceancurrent.imos.org.au/#Cold_Start_to_Summer_for_Tasmanian_Coastal_Waters"
                  className="anchor"
                >
                  cooler water around southern Australian
                </a>
                is contributing to the situation. A comparison of the average atmospheric pressure in the last three
                summers (Figure 2) shows that the band of westerly winds over the Southern Ocean was much further north
                in both Jan and Dec 2019 compared to Jan 2018 when there was a marine heatwave off South Island. The
                strong westerly winds with associated fronts cause strong vertical mixing but, also, when interacting
                with the New Zealand land mass, produce upwelling winds on the west coast. South Island west coast winds
                have been upwelling favourable since early December with a recent strong and sustained period in the
                first week of January 2020 (Figure 3).
                <br />
                <a href="news/20200117/Figure_2_1.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20200117/Figure_2_1.png"
                    style={{ height: '247px', width: '900px' }}
                  />
                </a>
                <br />
                <a href="news/20200117/Figure_3.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20200117/Figure_3.png"
                    style={{ height: '256px', width: '600px' }}
                  />
                </a>
                Cool water can also be found off the eastern side of South Island. The cooling has an interesting
                pattern that is not associated with upwelling as it is largely occurs in deep water and east coast winds
                have been mostly downwelling favourable over the last month. The cool water around New Zealand is in
                sharp contrast to the anomalously warm region to the east of New Zealand
                <a href="https://www.theguardian.com/world/2019/dec/27/hot-blob-vast-and-unusual-patch-of-warm-water-off-new-zealand-coast-puzzles-scientists">
                  (The Guardian, 27 Dec 2019).
                </a>
                <br />
                <br />
                The location of the westerly wind band is related to the SAM (
                <a href="https://climatedataguide.ucar.edu/climate-data/marshall-southern-annular-mode-sam-index-station-based">
                  Southern Annular Mode
                </a>
                ) Index. When the SAM is negative the band is found further north than usual, when the SAM is positive
                the westerly band is found further south. The trend for the SAM over the last 60 years has been to
                become increasingly positive and this trend is expected to continue – resulting in the westerly band
                contracting to the south. So these upwelling events are expected to become less frequent rather than
                more so. Upwelling is significant, of course, because it brings nutrient rich water to the phytoplankton
                in the surface layer and so can power the entire food web.
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Sydney_to_Hobart_update">
                  <a href="#Sydney_to_Hobart_update" className="anchor">
                    Sydney to Hobart update
                  </a>
                </h3>
                <h5>
                  <em>Jessica Sweeney</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">24 December, 2019</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="http://oceancurrent.imos.org.au/product.php?product=fourhour&amp;region=Syd-Hob&amp;date=20191223180000&amp;rtype=DR">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20191224/Figure_1a.png"
                    style={{ height: '567px', width: '400px' }}
                  />
                </a>
                This year’s Sydney to Hobart Yacht Race promises to have a fast start in fresh northeasterly winds on
                Boxing Day afternoon. Boat speeds will be assisted by a new lobe of the East Australian Current that has
                moved down past Sydney’s latitude, offering favourable southward currents outside the continental shelf
                edge down to Jervis Bay.
                <br />
                <br />
                Later in the race, ocean currents are likely to play a big part in tactics during times of light and
                variable winds. The weather forecast suggests a region of light winds over the southern NSW coast from
                late on the 26th to early on the 27th of December, almost overhead of a large anti-cyclonic eddy that
                offers southward current of 2 to 2.5 knots on its western side. This eddy is quasi-stationary and can be
                found beyond the 1000 m isobath to the east of Gabo Island.
                <br />
                <br />
                Another large anti-cyclonic eddy lies to the east of Hobart. It has been moving slowly southward and the
                centre of it now lies south of the finish line.&nbsp; However, boats approaching Tasman from a wide
                angle may gain an extra 1 knot of favourable current on the northwestern edge of this feature. This may
                be particularly valuable during another period of variable winds expected on the 29th of December.
                <br />
                &nbsp;
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="A_marine_heatwave_off_Western_Australia">
                  <a href="#A_marine_heatwave_off_Western_Australia" className="anchor">
                    A marine heatwave off Western Australia?
                  </a>
                </h3>
                <h5>
                  <em>Chari Pattiaratchi</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">23 December, 2019</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily.pctiles&amp;region=Au&amp;date=20191218144926&amp;rtype=SR">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20191223/Figure_1.png"
                    style={{ height: '459px', width: '400px' }}
                  />
                </a>
                As temperatures on mainland Australia have been breaking records in the past 2-3 weeks similar
                conditions are also present in the ocean, particularly along Western Australia (WA). Here, the entire
                western part of Australia – from Kimberley to the Great Autralian Bight has warmed significantly with
                temperature anomalies about two degrees warmer than climatology for December. A marine heatwave is
                defined as five or more days when the sea surface temperatures (SST) are warmer than 90 per cent of the
                previous observations at the same time of year. The majority of this coastline has experienced SST
                anomalies at &gt; 90th percentile (Figure 1).
                <br />
                <br />
                The duration of 90th percentile SSTs varies around the coastline. Temperatures have been most severe in
                Shark Bay which has seen 90th percentile SST since early December. In other parts, the extreme
                temperatures have only begun very recently. They have, however, coincided with spring tides which bring
                both extreme high and low sea levels. Solar heating has greatest impact on shallow waters, and the
                combination of strong diurnal heating with low spring tides are believed to have contributed to the
                deaths of tiny crabs in Karratha mudflats, wild oysters at the mouth of the Fortescue River on the
                Pilbara Coast and krill at Town Beach in Exmouth in the state's north-west. Similarly, along the
                south-west, to the north of Yallingup, discovery of ~800 dead abalone and other shellfish species
                including crabs and various molluscs washed up on a beach has been attributed to the heat wave (
                <a href="https://www.abc.net.au/news/2019-12-18/marine-heatwave-kills-fish-as-australia-faces-record-temperature/11808268?fbclid=IwAR0JAyQ2kl17JTuV6yqFSL_6EKPAsP93ExXpl-Mwbl3Y4nVhk_2PCqNA2H4">
                  ABC news article)
                </a>
                . Although tides are generally quite small in the southwest,
                <a href="http://oceancurrent.imos.org.au/tides/monthplots/NTC_Albany_201912.html">
                  the shape of the spring tide this December,
                </a>
                has resulted in extended periods of very low sea level throughout the daytime, allowing maximum heating
                of shallow waters.
                <br />
                <br />
                Ocean temperature time series obtained from the continental shelf region off Two Rocks (~ 50 km north of
                Fremantle) by an ocean glider indicated the warming over a two week period.&nbsp; Initially, the
                temperature on the shelf was &lt; 21°C with a vertically mixed water column.&nbsp; After 2 weeks the
                surface water in the same region was &gt; 22°C (Figure 2).&nbsp; The temperature/salinity diagram and
                the vertical profiles also indicated warmer and less saline water compared to climatology.
                <a href="news/20191223/Figure_2.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20191223/Figure_2.png"
                    style={{ height: '389px', width: '400px' }}
                  />
                </a>
                <br />
                <br />
                <br />
                In Western Australia, warmer air temperatures on land result from the establishment of the trough
                offshore that allows for warmer continental air to be transported to the south by northerly and
                north-easterly winds. The trough inhibits the usually strong southerly winds that bring cooler air from
                the south and which also generate upwelling that mitigates the warming.&nbsp; This can be seen off the
                Ningaloo coast where over the past two days locally strong southerly winds have generated upwelling and
                the Ningaloo Current creating a band of colder water adjacent to the reef thus mitigating the warmer
                temperatures.&nbsp; Shark Bay in contrast remains warm (Figure 3).
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily.pctiles&amp;region=Ningaloo&amp;date=20191220150858&amp;rtype=DR">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20191223/Figure_3.png"
                    style={{ height: '460px', width: '400px' }}
                  />
                </a>
                <br />
                &nbsp;
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Sydney_Hobart_briefing">
                  <a href="#Sydney_Hobart_briefing" className="anchor">
                    Sydney-Hobart briefing
                  </a>
                </h3>
                <h5>
                  <em>Jessica Sweeney and Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">20 December, 2019</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="http://oceancurrent.imos.org.au/product.php?product=snapshot&amp;region=Syd-Hob&amp;date=20191218220000&amp;rtype=DR">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20191220/Figure_1.png"
                    style={{ height: '592px', width: '400px' }}
                  />
                </a>
                Sailors racing to Hobart will be on the lookout for favourable ocean currents to give them an extra knot
                or two in speed. The race course this year offers three good opportunities. A large anti-cyclonic eddy
                sits offshore from Gabo Island, providing favourable southward currents down the western side. The
                centre of the eddy has been quasi-stationary for months and is not expected to move much before start
                time. The strongest flow is over 2 knots and is located several miles outside the continental shelf
                edge, beyond the 1000m isobath. It would be a slight detour from the rhumb line to enjoy this extra
                push.
              </p>
              <p>
                The second feature of interest is a small anti-cyclonic eddy lying midway across the Bass Strait on the
                rhumb line (Figure 2). It is not easy to see on SST charts, but can be seen in
                <a href="http://oceancurrent.imos.org.au/product.php?product=gsla&amp;region=SE&amp;date=20191218120000&amp;rtype=SR">
                  sea surface height anomaly
                </a>
                charts adjacent to the larger eddy. The small eddy is moving eastward and may soon be absorbed by the
                larger one, but before it does there is a weak southward current of up to 1 knot down the western side.
              </p>
              <p>
                <a href="news/20191220/Figure_2.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20191220/Figure_2.png"
                    style={{ height: '336px', width: '400px' }}
                  />
                </a>
              </p>
              <p>
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily&amp;region=TasSE&amp;date=20191215135051&amp;rtype=DR">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20191220/Figure_3.png"
                    style={{ height: '415px', width: '400px' }}
                  />
                </a>
              </p>
              <p>
                A third anti-cyclonic eddy lies to the east of Hobart (on the right hand side of Figure 3). This is a
                well-defined feature that may provide an extra 1 to 1.5 knots to those boats coming into Tasman Island
                from the east. The eddy has been moving south-southwestward over the last six weeks. Depending on how it
                moves in the next few days, by the time of the race it may be either conveniently close to the shelf
                edge adjacent to Tasman Island, or further south and difficult to use.
              </p>
              <p>
                Closer to land, the Tasmanian coast has been experiencing a
                <a
                  href="http://oceancurrent.imos.org.au/#Cold_Start_to_Summer_for_Tasmanian_Coastal_Waters"
                  className="anchor"
                >
                  semi-persistent northward shelf current
                </a>
                for several weeks. The southerly winds, however, have abated recently and the northward current has
                weakened. Coastal currents can respond quickly to the winds so whether or not to avoid the shelf will
                become clear closer to the race.
                <br />
                The last thing to note is that the water along the second half of the race course is
                <a
                  href="http://oceancurrent.imos.org.au/#Cold_Start_to_Summer_for_Tasmanian_Coastal_Waters"
                  className="anchor"
                >
                  1-2°C cooler than normal
                </a>
                for this time of year, particularly in Bass Strait and eastern Tasmania. This may affect how sea and
                land breezes develop.
                <br />
                &nbsp;
                <br />
                We wish competitors a safe but exciting race and we’ll provide an update closer to race day.
                <br />
                &nbsp;
                <br />
                &nbsp;
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Early_summer_heating_and_cooling_extremes">
                  <a href="#Early_summer_heating_and_cooling_extremes" className="anchor">
                    Early summer heating and cooling extremes
                  </a>
                </h3>
                <h5>
                  <em>Jessica Sweeney and Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">15 December, 2019</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="news/20191215/Figure_1.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20191215/Figure_1.png"
                    style={{ height: '231px', width: '350px' }}
                  />
                </a>
                As we head into summer and solar radiation approaches the annual maximum, sea surface temperature
                percentiles show a stark contrast between regions (Figure 1). The matchup with November mean winds
                (Figure 2) is striking and suggests that direct atmospheric forcing is the principal cause as opposed to
                advection. Where November winds were consistently light (generally associated with atmospheric highs and
                clear skies) sea surface temperatures (SSTs) are relatively high (but may be only shallow), whereas
                where winds have been strong, any solar heating will be mixed deeper resulting in cooler surface
                temperatures. Of course, cold fronts and cloud cover will also limit the sea surface temperatures.
                <br />
                <br />
                <a href="news/20191215/Figure_2.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20191215/Figure_2.png"
                    style={{ height: '250px', width: '350px' }}
                  />
                </a>
                <br />
                <br />
                The question then is: how deep does the heat go? Argo floats, particularly when referenced to a 3D ocean
                climatology (e.g.
                <a href="http://www.marine.csiro.au/~dunn/cars2009/">CARS, CSIRO Atlas of Regional Seas</a>), can help
                us understand what is happening in offshore regions.
                <br />
                &nbsp;
                <br />
                In the west and northwest, where winds have been very light, SSTs are in the top 80-90th percentile for
                this time of year. Recent Argo temperature profiles (e.g.
                <a href="http://oceancurrent.imos.org.au/profiles/cycle.php?wmoid=5905417&amp;cycle=43&amp;depth=0">
                  Kimberley
                </a>
                &amp;
                <a href="http://oceancurrent.imos.org.au/profiles/cycle.php?wmoid=5905415&amp;cycle=43&amp;depth=0">
                  Carnarvon
                </a>
                ) in the region indicate a warm surface layer, 20-30m deep, that is at least 2°C warmer than the water
                below. An interesting difference between the two regions however is that in the northwest, the water
                below the surface is much colder (by 2-3°C) than normal. The cold subsurface layer increases the
                stratification and also can provide rapid surface cooling in the event of strong winds. This cold water
                is probably a consequence of the strongly positive
                <a href="http://www.bom.gov.au/climate/iod/">Indian Ocean Dipole (IOD)</a>
                that unfortunately also contributed to the very dry spring that Australia has experienced.
                <br />
                <br />
                Around New Zealand,&nbsp; weak winds have also warmed the surface waters to the north and east. An Argo
                profile from the
                <a href="http://oceancurrent.imos.org.au/profiles/cycle.php?wmoid=5904915&amp;cycle=182&amp;depth=1">
                  southeast, Dec 10
                </a>
                , shows a warm surface layer that is 40m deep and 2°C warmer than average. A profile from
                <a href="http://oceancurrent.imos.org.au/profiles/cycle.php?wmoid=5902394&amp;cycle=158&amp;depth=1">
                  north of NZ, Dec 10
                </a>
                , suggests the heating has been weaker there with only a 20m deep surface layer.
                <br />
                <br />
                In contrast, southern regions, including Bass Strait and around Tasmania, continue to experience
                <a
                  href="http://oceancurrent.imos.org.au/#Cold_Start_to_Summer_for_Tasmanian_Coastal_Waters"
                  className="anchor"
                >
                  unusually cold temperatures
                </a>
                as the strong winds and embedded fronts persist. Surface temperatures are at their coldest 10% and Argo
                profiles (e.g. offshore from Kangaroo Island,
                <a href="http://oceancurrent.imos.org.au/profiles/cycle.php?wmoid=5904846&amp;cycle=70&amp;depth=1">
                  Dec 8
                </a>
                ) indicate the mixed layer has deepened and surface temperatures are 1.5° cooler than usual for this
                time of year. Occasional profiles (e.g.
                <a href="http://oceancurrent.imos.org.au/profiles/cycle.php?wmoid=2901345&amp;cycle=286&amp;depth=1">
                  Nov 19
                </a>
                ) over the last month have shown surface warming due to a break in the clouds but the cold fronts have
                quickly mixed it down.
                <br />
                &nbsp;
                <br />
                Argo floats only operate in the deep ocean and conditions in coastal regions are modified by local
                atmosphere/ocean interactions and can be very different from offshore. However, the large scale offshore
                ocean conditions observed by Argo floats will contribute to determining coastal conditions.
                <br />
                &nbsp;
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Cold_Start_to_Summer_for_Tasmanian_Coastal_Waters">
                  <a href="#Cold_Start_to_Summer_for_Tasmanian_Coastal_Waters" className="anchor">
                    Cold Start to Summer for Tasmanian Coastal Waters
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">22 November, 2019</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20191122/Figure_1.png"
                  style={{ height: '359px', width: '400px' }}
                />
                <br />
                As we head into summer and solar radiation nears its annual maximum, sea surface temperatures around
                Tasmania are not heating up as much as we might expect and the percentiles indicate they are well below
                average (Fig. 1). Over the last few weeks temperatures all around Tasmania have cooled with the strong
                winds associated with the passage of a number of fronts through the region. This atmospheric cooling
                appears to be quite widespread but, depending on the weather of course, may not be very long-lasting. An
                Argo float offshore which profiled on Nov 3 and Nov 13, shows the shallow warm surface layer that had
                developed by
                <a href="http://oceancurrent.imos.org.au/profiles/cycle.php?wmoid=5905402&amp;cycle=58&amp;depth=1">
                  Nov 3
                </a>
                was completely gone
                <a href="http://oceancurrent.imos.org.au/profiles/cycle.php?wmoid=5905402&amp;cycle=59&amp;depth=1">
                  10 days later
                </a>
                and the mixed layer depth had deepened to 90m depth.
                <br />
                &nbsp;
              </p>
              <p>
                For waters off the east coast, however, the atmospheric cooling appears to be assisted by a persistent
                northward shelf current. When a warm core eddy from the East Australian Current comes down past Bass
                Strait and close to the Tasmanian shelf, it raises the sea level offshore driving southward velocities
                on the shelf. Conversely the low sea levels associated with a cold core eddy will drive a northward
                shelf current. The combination of low offshore sea level due to the presence of weak cold-core eddies
                and persistent northward winds for the last 4 weeks has resulted in quite a strong average alongshore
                shelf current peaking at 0.5m/s. This northward current appears to have brought
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily&amp;region=TasSE&amp;date=20191119103722&amp;rtype=DR">
                  cold water from south of Tasmania
                </a>
                all along the east coast shelf. Whether the water is an intrusion of cold offshore water onto the shelf
                or water from the west coast is difficult to tell from the SST but on the east coast the cool water has
                displaced the warm EAC water that was present on the outer shelf in mid-October.
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20191122/Figure_2.png"
                  style={{ height: '367px', width: '800px' }}
                />
                <br />
                &nbsp;
                <br />
                <br />
                &nbsp;
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Harnessing_oceanographic_data_to_explain_spatial_variation_in_fish_condition">
                  <a
                    href="#Harnessing_oceanographic_data_to_explain_spatial_variation_in_fish_condition"
                    className="anchor"
                  >
                    Harnessing oceanographic data to explain spatial variation in fish condition
                  </a>
                </h3>
                <h5>
                  <em>Curtis Champion and Alistair Hobday</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">28 October, 2019</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <br />
                <a href="news/20191028/Figure1.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20191028/Figure1.png"
                    style={{ height: '363px', width: '400px' }}
                  />
                </a>
                Oceanographic data has become an invaluable resource for understanding and predicting when and where
                marine species are likely to be found. This is because, much like goldilocks, mobile marine animals have
                preferences for habitats that aren’t too hot or too cold, and where currents aren’t too strong or
                nutrients too poor, and actively seek out conditions that suit their physiological tolerances.
                Determining species’ environmental habitat preferences is the cornerstone of evaluating habitat
                suitability and species distribution modelling. This field has rapidly evolved over the past 15 years,
                largely due to increased access to oceanographic data (e.g. delivered by IMOS) providing researchers
                with the capacity to determine species’ preferences to different oceanographic factors.
              </p>
              <p>
                To date, habitat suitability models have been broadly applied to estimate species distributions, predict
                climate-driven range shifts and serve as decision-support tools for conservation planning and adaptive
                fisheries management. While these applications rely on the ability of habitat models to estimate where a
                species is likely to be present or absent within the environment, there has been no evidence to suggest
                these models are useful for predicting the health or condition of marine species…until now.
              </p>
              <p>
                <br />
                <a href="news/20191028/Figure2.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20191028/Figure2.png"
                    style={{ height: '470px', width: '400px' }}
                  />
                </a>
                Between 2016 and 2019, we compared oceanographic habitat suitability for the iconic yellowtail kingfish
                with body condition measurements taken using a novel electrical impedance method on kingfish from
                eastern Australia (Figure 1). Our kingfish habitat model incorporated three oceanographic variables, sea
                surface temperature, sea level anomaly and eddy kinetic energy, allowing habitat suitability to be
                estimated at varying time-before-fish-capture periods. Our results revealed a strong correlation between
                modelled oceanographic habitat suitability and field-derived measurements of kingfish body condition
                (Figure 2). This relationship was evident when habitat suitability predictions used oceanographic
                variables measured one to four weeks before fish condition was measured.
              </p>
              <p>
                These results show that oceanographic data can be used to infer the body condition of fish and sets a
                precedent for developing models that not only predict species presence and absence, but also more
                sensitive biological responses, like fish condition.
              </p>
              <p>
                This study was recently published in
                <em>Fisheries Oceanography</em>:<br />
                Champion C, Hobday AJ, Pecl GT, Tracey SR (2019) Oceanographic habitat suitability is positively
                correlated with the body condition of a coastal‐pelagic fish. <em>Fisheries Oceanography</em>.
                <a href="https://onlinelibrary.wiley.com/doi/abs/10.1111/fog.12457">
                  https://onlinelibrary.wiley.com/doi/abs/10.1111/fog.12457
                </a>
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Frontal_eddies_and_the_EAC_array">
                  <a href="#Frontal_eddies_and_the_EAC_array" className="anchor">
                    Frontal eddies and the EAC array
                  </a>
                </h3>
                <h5>
                  <em>Iain Suthers and Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">24 September, 2019</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="news/20190924/Figure1.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190924/Figure1.png"
                    style={{ height: '571px', width: '400px' }}
                  />
                </a>
                Frontal eddies (affectionately known as “freddies”) are small eddies that form from instabilities on
                fronts between two different water masses. These eddies behave very differently from the large East
                Australia Current (EAC) eddies. They are much smaller, shallower and shorter-lived than the deep EAC
                eddies and their pathway is usually determined by the surrounding currents. &nbsp;These characteristics
                make frontal eddies quite elusive, so although they are often seen with satellite SST, their subsurface
                structure has only occasionally been sampled. Interestingly, the small cold-core eddy that is
                contributing to diverting the EAC, is also capturing frontal eddies. The freddies are seen to form just
                east of Fraser Island, then move south along the frontal edge (for about 7 days) until they are
                entrained into the cyclonic (cold-core) eddy (Figure 1).&nbsp;When a freddy interacts with the coast, it
                can entrain shelf waters along with any zooplankton and larval fish that may be present. As cyclonic
                eddies are upwelling favourable, they can sustain the shelf plankton for the first few crucial weeks of
                larval life.&nbsp;
                <br />
                <a href="news/20190924/Figure2.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190924/Figure2.png"
                    style={{ height: '442px', width: '600px' }}
                  />
                </a>
              </p>
              <p>
                The location and timing of these events could not be better for sampling the frontal eddies. All the
                action is happening over IMOS’ deep mooring array just at the time that CSIRO research vessel
                Investigator is in the region. Bernadette Sloyan and her team are retrieving and replacing the mooring
                array and on board, Iain Suthers and a team of biologists are collecting&nbsp;samples of larval fish and
                the fine zooplanktonic food. They will measure the growth and mortality rates of larval fish in
                different ocean habitats, and especially within the freddies. Ensuring the mooring operations are
                completed in time and freddy sampling opportunities are optimised is tricky (Figure 2) but already the
                physical and biological properties of two of these frontal eddies have been sampled. Both of these
                eddies contain an abundance of species spawned inshore, including larval sardine. The working hypothesis
                is that these frontal eddies are an offshore nursery ground&nbsp;that contributes to future recruitment
                to inshore fisheries.
                <a href="https://twitter.com/hashtag/RVInvestigator?src=hashtag_click">#RVInvestigator</a>
                <br />
                &nbsp;
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Cold_core_eddy_diverts_EAC_waters_offshore_replacing_it_with_cold_water">
                  <a href="#Cold_core_eddy_diverts_EAC_waters_offshore_replacing_it_with_cold_water" className="anchor">
                    Cold core eddy diverts EAC waters offshore, replacing it with cold water
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">19 September, 2019</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="news/20190919/Figure1_cold_core_percentiles.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190919/Figure1_cold_core_percentiles.png"
                    style={{ height: '272px', width: '400px' }}
                  />
                </a>
                <br />A cold-core eddy began to develop well offshore from Brisbane in early July. By July 23, the
                <a href="http://oceancurrent.imos.org.au/product.php?product=gsla&amp;region=SE&amp;date=20190723082113&amp;rtype=SR">
                  eddy had become very large
                </a>
                and had developed a patch of
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily.SST_ANOM&amp;region=Brisbane&amp;date=20190723082113&amp;rtype=DR">
                  cooler water along its western side
                </a>
                . In
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily.SST&amp;region=Brisbane&amp;date=20190807103606&amp;rtype=DR">
                  early August
                </a>
                , the eddy moved closer to the outer continental shelf (right over the outer moorings of the EAC array)
                and started to divert part of the East Australia Current (EAC) offshore just north of the array. By
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily.SST&amp;region=Brisbane&amp;date=20190827103955&amp;rtype=DR">
                  late August
                </a>
                , the cold-core eddy had diminished but had moved further inshore, effectively blocking flow along the
                slope and bringing the cooler water with it. Meanwhile a warm-core eddy to the north had strengthened
                and was continuing the diversion of EAC water away from the coast.
              </p>
              <p>
                The combined effect of these events on the waters off northern NSW is most evident in the SST anomalies
                and percentiles. As the eddy was starting to divert the EAC, temperatures all along the shelf and slope
                south of Brisbane were largely in the top 10-20% (Figure 1, left). Four weeks later, with the EAC still
                being diverted and the cold core eddy bringing cool waters into the region, temperatures along the shelf
                were below average and over the slope were in the coldest 10-20% (Figure 1, right). Where the patch of
                cooler water in the cold-core eddy came from, whether advected from elsewhere or even upwelled, is not
                clear from the 6-day composite SST. &nbsp;From the Four-Hour SST, however, it appears the cool water is
                being advected from the east and south, possibly as far south as the cold core eddy at 158E, 32.5S
                (Figure 2).
                <br />
                <a href="news/20190919/Figure_2_source_of_cold_water.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190919/Figure_2_source_of_cold_water.png"
                    style={{ height: '277px', width: '400px' }}
                  />
                </a>
              </p>
              <p>
                With a lot of the action happening right over the EAC array it is an exciting prospect that we will get
                back more information about what was happening below the surface. Even more so, because the RV
                Investigator is currently recovering and replacing the mooring array and making many more sub-surface
                measurements as it does so.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Tidal_current_predictions_go_ahead_and_use_them_conditions_apply">
                  <a href="#Tidal_current_predictions_go_ahead_and_use_them_conditions_apply" className="anchor">
                    Tidal current predictions: go ahead and use them (conditions apply)
                  </a>
                </h3>
                <h5>
                  <em>David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">11 September, 2019</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <img
                alt=""
                src="https://oceancurrent.aodn.org.au/news/20190911/202309012000.gif"
                style={{ height: '698px', width: '900px' }}
              />
              <p>&nbsp;</p>
              <p>
                IMOS has greatly increased Australia's holdings of ocean current observations, allowing us to make a
                fairly comprehensive assessment of the errors of predicted tidal currents. This has shown that in many
                places, particularly where tides are moderate to strong (and internal tides are not significant), the
                predictions of depth-averaged velocity are sufficiently accurate to be of value to many users. This is
                not only true for isolated predictions derived from current meter observations, but also for predictions
                from a model (TPXO9) that uses satellite measurements of sea level to make its predictions more
                accurate.&nbsp;Where tides are moderate to strong, the model predictions generally agree with the
                (independent) predictions from the current meter data.
              </p>
              <p>
                A new
                <a href="http://oceancurrent.imos.org.au/tides/" target="_blank" rel="noreferrer">
                  <strong>tides</strong>
                </a>
                section of our website presents the details of our assessment of the errors of tidal predictions. Users
                will find various sorts of plots and maps to address two important questions: "how much of the
                variability of currents is due to tides?" and "how well can the tidal component of the current be
                predicted?". Hourly maps of the tidal currents and sea levels are also provided, for all of Australia
                and for 13 sub-regions, out to the end of this year.
              </p>
              <p>
                The tides of Australia are much more complex than many people probably realise. A standing wave exists
                off NW Australia, with
                <a
                  href="http://oceancurrent.imos.org.au/tides/Aust_hv/2019/2019090216.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  low tide in Darwin coinciding with high tide in Broome
                </a>
                . The flow oscillates purely parallel to the coast at a point off the northern Kimberley where the tidal
                range&nbsp;is relatively small. East of Darwin, in contrast, the tide is largely progressive, travelling
                eastward (click forward on the map above) into the Gulf of Carpentaria, with a whole wavelength fitting
                into the Arafura Sea. Localised amplification of the tide exists either end of Torres Strait. Continuing
                clockwise around Australia, the next major feature is the amplified tides near Mackay and Rockhampton.
                Tidal currents are relatively weak from Fraser Island to Gabo Island (excepting entrances to harbours)
                so mariners off SE Australia are much more interested in predictions of what the East Australian Current
                is doing. Bass Strait has amplified tides, with
                <a
                  href="http://oceancurrent.imos.org.au/tides/Bass_spd/2019/2019090514.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  strong currents flooding simultaneously in from both east and west
                </a>
                to produce a maximum tidal range near Burnie on the Tasmanian side. The South Australian Gulfs also have
                significant tides,
                <a
                  href="http://oceancurrent.imos.org.au/tides/monthplots/Pringle_Franklinharbour_201910.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  switching weekly from diurnal to semi-diurnal
                </a>
                in Spencer Gulf. Finally, the south west:&nbsp;the tides here are
                <a
                  href="http://oceancurrent.imos.org.au/tides/monthplots/NTC_Hillarys_201909.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  almost always diurnal
                </a>
                and the tidal range is quite small. Tidal currents in the SW are
                <a
                  href="http://oceancurrent.imos.org.au/tides/monthplots/IMOS_WATR04_201704.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  essentially undetectable
                </a>
                so SW mariners will be more interested in the Leeuwin Current and wind-driven motions.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Reversal_of_the_usual_flow_along_the_Great_Barrier_Reef">
                  <a href="#Reversal_of_the_usual_flow_along_the_Great_Barrier_Reef" className="anchor">
                    Reversal of the usual flow along the Great Barrier Reef
                  </a>
                </h3>
                <h5>
                  <em>Jessica Sweeney (Bureau of Meteorology)</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">13 August, 2019</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="news/20190813/Figure1_1.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190813/Figure1.png"
                    style={{ height: '324px', width: '400px' }}
                  />
                </a>
                The cold core eddy generated by Tropical Cyclone Oma near Vanuatu back in February is causing a
                <a href="http://oceancurrent.imos.org.au/product.php?product=climatology&amp;region=CGBR&amp;date=20190813024229&amp;rtype=DR">
                  reversal of surface currents along the outer shelf of the GBR
                </a>
                &nbsp;in August. As described in the OceanCurrent news article on
                <a href="http://oceancurrent.imos.org.au/#20190729" className="anchor">
                  29th of July
                </a>
                , the eddy travelled west through the Coral Sea and now sits on the continental shelf edge just east of
                Innisfail. The feature is weakening and is hard to see on SST images as the cold-core remains under the
                surface, but the eddy can be spotted through sea level anomalies (Figure 1). The eddy is drawing down
                warm South Equatorial Current water on its eastern side. The currents then wrap around and move towards
                the shelf edge on the southern side. When they hit the shelf, the currents bifurcate: some of the flow
                going northward along the coast, and some of it southward. The bifurcation point is
                at&nbsp;19-20°S&nbsp;on the southern side of the eddy.
                <br />
                &nbsp;
              </p>
              <p>
                However, this is not normally the case. Usually the bifurcation point is about 300km further north, near
                14.5°S.&nbsp; Studies show that the SEC forms into two jets: the shallow North Vanuatu Jet (NVJ) which
                reaches the coast at 14.4-14.7°S, and the deeper North Caledonia Jet at 18°S (
                <a href="https://agupubs.onlinelibrary.wiley.com/doi/epdf/10.1029/2018JC014269" target="blank">
                  Ridgway et al 2018
                </a>
                ). The TC Oma eddy seems to be deviating part of the shallow NVJ. Using OceanMAPS (the Bureau of
                Meteorology's ocean model) to compare the ocean currents at depth (Figure 2) we can see that at the same
                time last year the&nbsp;bifurcation at the surface&nbsp;was a lot further north. The currents between
                Bowen and Cooktown have been reversed at the surface and at 205m, but by 610 m depth the TC Oma eddy is
                no longer affecting and the current patterns are very similar.
                <br />
                <a href="news/20190813/Figures2-3.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190813/Figures2-3.png"
                    style={{ height: '470px', width: '700px' }}
                  />
                </a>
              </p>
              <p>
                The reversal in current direction can also be seen in a vertical profile taken on the western side of
                the eddy (Figure 3). In 2018, the profile shows a surface current speed of 0.3 m/s that decreases with
                depth to a layer of minimal current at ~270m before increasing again. This minimum is the interface
                between the southward surface flow and the northward undercurrent. The 2019 profile through the eddy
                shows much stronger currents on the surface at 0.6 m/s and then decreasing steadily with depth to the
                seabed. Notably, the current is all in the same direction. The TC Oma eddy is disrupting the normal flow
                of the North Vanuatu Jet (part of the South Equatorial Current) into the coast. This diversion of
                surface water is contributing to the
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily.SST_ANOM&amp;region=CGBR&amp;date=20190801120000&amp;rtype=DR">
                  SST anomaly pattern
                </a>
                , with warm SST anomalies on the outer southern GBR and neutral to cool anomalies off the central GBR.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Marine_heatwaves_ndash_looking_under_the_surface">
                  <a href="#Marine_heatwaves_ndash_looking_under_the_surface" className="anchor">
                    Marine heatwaves – looking under the surface
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill, Jessica Benthuysen and Amandine Schaeffer</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">1 August, 2019</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                Marine heatwaves have become more frequent around the globe and Australia is no exception. In the ocean,
                heatwaves are usually described by their surface expression through satellite SST but the subsurface
                extent is not so readily discovered. Argo profiles have transformed our knowledge of the deep ocean but,
                with a 2000m dive program, they are not designed to measure in more shallow regions. Coastal regions,
                however, are where our coral reefs, kelp forests and sea grasses grow, providing habitat for much of the
                ocean life, and it is these regions where the marine heatwaves are expected to have the most impact.
                <br />
                <a href="news/20190801/TasEastCoast20190213_temp.mp4">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190801/Figure_1.png"
                    style={{ height: '278px', width: '400px' }}
                  />
                </a>
                <br />
                The IMOS Event-Based Sampling sub-facility was initiated in December 2018 with the goal of monitoring
                marine heatwaves using &nbsp;Slocum gliders. Ocean gliders provide the means to get subsurface
                measurements where they are most needed. The gliders can be deployed within a week, provide real-time
                subsurface data, they are remotely operated and can sample the ocean for periods of 3-5 weeks. The
                coastal IMOS Slocum gliders can dive to 200m measuring temperature, salinity, oxygen concentration,
                chlorophyll fluorescence, CDOM (coloured dissolved organic matter), backscatter, and irradiance at 4
                wavelengths
                <br />
                &nbsp;
                <br />
                The region east of Tasmania is one of the global hotspots where ocean temperatures are rising the
                fastest yet there is limited subsurface data over the continental shelf. A marine heatwave occurred in
                the Tasman Sea (indicated by a period of persistently
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily&amp;region=Au&amp;date=20190213172534&amp;rtype=SR">
                  high SST percentiles
                </a>
                since early January). The sub-facility’s national steering committee met and decided to deploy &nbsp;a
                glider off &nbsp;eastern Tasmania. The February 2019 deployment demonstrates the interplay between
                coastal dynamics and the offshore influence of the East Australia Current (EAC). When the February
                glider (Figure 1,
                <a href="news/20190801/TasEastCoast20190213_temp.mp4">movie</a>) was deployed off St Helens, in the
                northeast of Tasmania, the first transect indicated relatively cool temperatures consistent with the
                northward coastal current and the localised upwelling seen in the
                <a href="http://oceancurrent.imos.org.au/product.php?product=fourhour.SST&amp;region=Tas&amp;date=20190213060000&amp;rtype=DR">
                  Four-hour SST on that day
                </a>
                and the 13°C water the glider sampled at the bottom on the outer shelf. EAC water was not far offshore,
                however, and on the return transect the glider finds a sharp front in temperature (and salinity, not
                shown) as it crosses into the
                <a href="http://oceancurrent.imos.org.au/product.php?product=fourhour.SST&amp;region=Tas&amp;date=20190214220000&amp;rtype=DR">
                  EAC water that had been transported onto the continental shelf
                </a>
                .
                <a href="news/20190801/Figure2.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190801/Figure2.png"
                    style={{ height: '278px', width: '400px' }}
                  />
                </a>
              </p>
              <p>
                An additional glider mission in March 2019 (Figure 2) also revealed cold uplifted water at the shelf
                break all along the northern half of the shelf. The data from these glider missions provides a wealth of
                information to help develop an understanding of the mechanisms that affect temperatures in the waters
                off Tasmania’s east coast: surface heat fluxes, regional circulation, the EAC and upwelling. The glider
                missions are run by the
                <a href="http://www.imos.org.au/oceangliders.html">IMOS glider facility</a>
                and the delayed mode data is available from the AODN THREDDS server (
                <a href="http://thredds.aodn.org.au/thredds/catalog/IMOS/ANFOG/slocum_glider/TasEastCoast20190213/catalog.html">
                  TasEastCoast20190213
                </a>
                and
                <a href="http://thredds.aodn.org.au/thredds/catalog/IMOS/ANFOG/slocum_glider/TasEastCoast20190316/catalog.html">
                  TasEastCoast20190316
                </a>
                ) or from the
                <a href="http://portal.aodn.org.au/search">IMOS data portal</a> (put
                <em>glider</em> in the keyword search).
                <br />
                &nbsp;
                <br />
                &nbsp;
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Tropical_Cyclone_Oma_a_lasting_ocean_impact">
                  <a href="#Tropical_Cyclone_Oma_a_lasting_ocean_impact" className="anchor">
                    Tropical Cyclone Oma: a lasting ocean impact
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">29 July, 2019</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                Before threatening south-eastern Queensland back in February, Tropical Cyclone Oma spent a week causing
                great damage to Vanuatu and New Caledonia, even sinking a bulk carrier&nbsp; with a US$50 million
                clean-up bill. It was the three days, 15-17 Feb, when the cyclone slowed and intensified, that it made a
                deeper, long-lasting impression on the ocean. The
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily.SST_ANOM&amp;region=Au&amp;date=20190220121939&amp;rtype=SR">
                  extensive cooling
                </a>
                can be seen in the SST anomaly after Oma moved on and the clouds cleared. The cyclone also generated a
                cold-core eddy which is evident in the satellite altimetry forming directly under the centre of the
                cyclone (Figure 1).
                <br />
                &nbsp;
              </p>
              <p>
                <a href="http://oceancurrent.imos.org.au/product.php?product=gsla&amp;region=Au&amp;date=20190217123554&amp;rtype=SR">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190729/Figure_1.png"
                    style={{ height: '337px', width: '500px' }}
                  />
                </a>
                <br />
                Ocean eddies, unhindered by a land barrier, propagate westward and TC Oma’s cold-core eddy has travelled
                over 1600km across the Coral Sea in the five months since it formed. Its surface temperature signal has
                almost disappeared but it is still evident in the altimetry although weaker and smaller. By chance it
                came in just south of the Coral Sea Islands and north of Marion Reef, and was corralled into a
                relatively narrow, shoaling ocean channel. The currents associated with the eddy as it crossed the Coral
                Sea were quite strong for this part of the ocean, over 0.5m/s at the surface, and appear to have had an
                unexpected effect on temperatures on the Great Barrier Reef (GBR). The southward current on the eastern
                side of the eddy as it approached the outer shelf appears to have advected anomalously warm Coral Sea
                water not only onto Marion Reef (Figure 2) but
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily.pctiles&amp;region=NE&amp;date=20190711142745&amp;rtype=SR">
                  also to the outer reefs of the southern GBR
                </a>
                .<br />
                <br />
                <a href="news/20190729/Figure_2a.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190729/Figure_2a.png"
                    style={{ height: '386px', width: '800px' }}
                  />
                </a>
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Persistent_Cold_Water_off_Western_Australia">
                  <a href="#Persistent_Cold_Water_off_Western_Australia" className="anchor">
                    Persistent Cold Water off Western Australia
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill, Chari Pattiaratchi and Ming Feng</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">27 May, 2019</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="news/20190527/Figure_1.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190527/Figure_1.png"
                    style={{ height: '520px', width: '275px' }}
                  />
                </a>
                Water temperatures dropped last week all along the west coast of WA. While this is the time of year in
                Australia when the ocean normally starts to lose more heat to the atmosphere than it gains through solar
                radiation, the south west shelf temperatures are up to 3° colder than usual (see
                <a href="http://oceancurrent.imos.org.au/product.php?product=fourhour&amp;region=Dongara&amp;date=20190518080000&amp;rtype=DR">
                  Dongara
                </a>
                and
                <a href="http://oceancurrent.imos.org.au/product.php?product=fourhour&amp;region=DonPer&amp;date=20190519040000&amp;rtype=DR">
                  Perth
                </a>
                ) for this time of year. Indeed, in most of the shelf from Cape Leeuwin to Shark Bay, the temperatures
                are in the coldest 10% (Figure 1). Winter cooling is usually greatest in shallow coastal waters because
                the convective cooling spreads the heat loss throughout the water column, so the same heat loss will
                result in colder temperatures in shallower water.
                <br />
                <a href="news/20190527/Figure_2a.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190527/Figure_2a.png"
                    style={{ height: '246px', width: '850px' }}
                  />
                </a>
                &nbsp;
              </p>
              <p>
                No doubt the recent cold snap with unusually cold overnight temperatures last week (which got down to
                0°C in Fremantle, 1°C in Geraldton,) contributed to the extreme temperatures on the shelf but sea
                surface temperatures have been below average off the west coast, both on and off the shelf, for some
                time now. The monthly-average SST anomaly off WA, between Cape Leeuwin and Northwest Cape and out to
                110°E, (Figure 2) has been decreasing since the extreme La Niña event in 2011. In 2016, the anomalies
                went negative and then hovered around 0.5°C below average until the last few months when they have
                become even cooler,
                <a href="http://oceancurrent.imos.org.au/monthlymeans.php?link=30d_MEAN/SW_mm/20190215.html">
                  particularly February this year
                </a>
                .<br />
                &nbsp;
              </p>
              <p>
                Temperatures off WA are affected by the strength of the Leeuwin Current which transports warm water from
                the tropics southward along the shelf break. The Leeuwin Current partly relies on the warm pool of water
                north of New Guinea which is at a maximum during La Niña events, such as in
                <a href="http://www.bom.gov.au/climate/enso/lnlist/">2010-12</a>, when WA experienced an
                <a href="http://oceancurrent.imos.org.au/monthlymeans.php?link=30d_MEAN/SW_mm/20110115.html">
                  extreme marine heatwave event
                </a>
                . An earlier period of warm SST anomalies occurred in 1999 and 2000, during the 1998-2001 La Niña.
                <br />
                &nbsp;
              </p>
              <p>
                Other factors, particularly local large-scale weather systems will also affect SST and, in the absence
                of a strong Leeuwin Current, variability caused by the weather systems will dominate the SST. This
                summer (2018-19) the
                <a href="http://www.bom.gov.au/climate/enso/indices.shtml">ENSO indices are weakly positive</a>
                and the sea level north of New Guinea has been relatively low,
                <a href="http://oceancurrent.imos.org.au/elnino.php">the lowest since 2016</a>, indicating a weak
                Leeuwin Current and colder than usual ocean temperatures.
                <br />
                &nbsp;
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="IMOS_in_the_wake_of_HMAS_Diamantina">
                  <a href="#IMOS_in_the_wake_of_HMAS_Diamantina" className="anchor">
                    IMOS in the wake of HMAS Diamantina
                  </a>
                </h3>
                <h5>
                  <em>Prof Lynnath Beckley, Murdoch University</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">21 May, 2019</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="news/20190521/Figure_1.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190521/Figure_1.png"
                    style={{ height: '281px', width: '400px' }}
                  />
                </a>
                <br />
                On 14th May 2019, the RV <em>Investigator</em> departed Fremantle on an oceanographic voyage to the
                110°E meridian in the south-east Indian Ocean. This voyage (
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily&amp;region=Au&amp;date=20190515102321&amp;rtype=AR">
                  ship track on OceanCurrent
                </a>
                ) is following in the wake of the HMAS <em>Diamantina</em>, which in the 1960s, took Australian
                scientists to study the physical, chemical and biological oceanography of the same region as part of the
                first International Indian Ocean Expedition. During the 2019 voyage, which is Australia’s major
                contribution to the second International Indian Ocean Expedition (IIOE-2;
                <a href="https://iioe-2.incois.gov.in/">https://iioe-2.incois.gov.in/</a>), a multi-national team of
                scientists is repeating many of the measurements made nearly six decades ago to ascertain if there have
                been significant changes in the pelagic ecosystem near the western extent of Australia’s Exclusive
                Economic Zone. The voyage is led by Professor Lynnath Beckley of Murdoch University and the research is
                supported by a grant of sea time on RV <em>Investigator</em> from the CSIRO Marine National Facility.
                <br />
                &nbsp;
              </p>
              <p>
                During voyage IN2019_V03, in addition to repeating the CTD profiles of temperature and salinity, we will
                carry out a diverse range of water sampling to help measure the foundation of the ocean food chain.
                We’ll be towing an IMOS Continuous Plankton Recorder between stations along the 110°E line and, at each
                station, Claire Davies from CSIRO is deploying a Heron net to sample zooplankton in the surface waters
                in the same way it is collected at the IMOS reference station network around Australia. Water samples
                are being taken to determine their microbial constituents as part of the Australian Marine Microbiome
                Initiative. In addition, water from the Niskin bottles on the CTD rosette is filtered for HPLC analysis
                of pigments by the team of Prof David Antoine of Curtin University for ground truthing of satellite
                ocean colour imagery.
                <br />
                <a href="news/20190521/Figure_1.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190521/Figure_2.png"
                    style={{ height: '318px', width: '400px' }}
                  />
                </a>
                <br />
                We have a single ARGO float to be deployed for IMOS and about a dozen weather drifters onboard for
                regular deployment along the 110°E line for the Bureau of Meteorology and NOAA. We have already deployed
                an APEX deep ARGO float (6000 m depth capability) for our Japanese colleagues at JAMSTEC and have a
                further one to deploy later in the voyage. This exciting addition to the voyage came about from
                discussions during the annual meeting of the IIOE-2 steering committee in March 2019 in Port Elizabeth,
                South Africa. With some careful logistics, including airfreight from Tokyo to Sydney and a road journey
                by truck across the Nullabor, the floats reached Fremantle just in time for the start of RV{' '}
                <em>Investigator</em> voyage!
                <br />
                Be sure to follow our daily Log from One Ten East at
                <a href="https://iioe-2.incois.gov.in/">https://iioe-2.incois.gov.in</a>
                or <a href="https://www.wamsi.org.au/">https://wamsi.org.au</a>
                <br />
                &nbsp;
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Ocean_glider_reveals_the_impact_of_a_break_in_the_clouds">
                  <a href="#Ocean_glider_reveals_the_impact_of_a_break_in_the_clouds" className="anchor">
                    Ocean glider reveals the impact of a break in the clouds
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">9 April, 2019</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <a href="news/20190409/GBR_Fig1.png">
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20190409/GBR_Fig1.png"
                  style={{ height: '269px', width: '400px' }}
                />
              </a>
              <p>
                An ocean glider was deployed offshore from Hinchinbrook Island on the Great Barrier Reef just a few
                weeks after the unprecedented rains in February. It sampled what was left of the fresh water plume and
                unexpectedly revealed the effect of a couple of weeks of clear skies and light winds in the region
                (Figure 1). Despite the 12d delay since the rains the glider found an 8m deep plume of relatively fresh
                water. It also found that water was 3°C warmer than satellite and ship measurements of temperature just
                2 weeks earlier on
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily&amp;region=CGBR&amp;date=20190210220000&amp;rtype=DR">
                  Feb 10
                </a>
                .<br />
                &nbsp;
              </p>
              <p>
                <a href="news/20190409/GBR_Fig2.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190409/GBR_Fig2.png"
                    style={{ height: '378px', width: '400px' }}
                  />
                </a>
                <a href="http://oceancurrent.imos.org.au/product.php?product=fourhour.SST&amp;region=CGBR&amp;date=20190212060000&amp;rtype=DR">
                  Diurnal warming is evident in the <em>Four-hour SST</em>{' '}
                </a>
                over the shelf after the rain stopped. For example, soon after the rain on Feb 14 (Figure 2) SST is well
                over 31°C while just 1.9m below the surface, ship temperatures were up to 4° cooler. The classic
                signature of water column warming through solar heating is also indicated by ship observations from RV
                Cape Ferguson while it
                <a href="http://oceancurrent.imos.org.au/product.php?product=fourhour&amp;region=CGBR&amp;date=20190216100000&amp;rtype=DR">
                  stayed in a channel in the outer reef
                </a>
                for a number of days. Temperatures peak in the afternoon and then reduce overnight (Figure 3) as heat
                loss and convective mixing occurs. The gradual warming of the sub-surface layer is evident in the
                increasing temperature of the overnight low.
                <br />
                &nbsp;
              </p>
              <p>
                <a href="news/20190409/GBR_Fig3.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190409/GBR_Fig3.png"
                    style={{ height: '278px', width: '400px' }}
                  />
                </a>
                Given the freshwater in the glider time series is also very warm, we might assume that the runoff had
                been warm relative to the reef water and contributed to faster heating. Observations from RV Solander in
                early February indicate that the opposite is true. The ship measured a fairly steady 27.5°C everywhere
                that salinity was in the normal range but when the intake was fresh, temperatures were as low as 15°C.
                It is more likely then, that the strong salinity gradient due to the plume and the temperature gradient
                due to surface heating, combined to form a highly stratified system that inhibits mixing, particularly
                given winds were weak at the time. Furthermore, incoming shortwave energy is attenuated in the upper
                1-2m of the river plume water due to its dark color, further enhancing the stratification.
                <br />
                &nbsp;
              </p>
              <p>
                The glider observed the dissipation of the heat with the strong south-easterly change that came through
                after Feb 25 which mixed the entire water column and eventually brought cool water from the outer reef
                into the region. And as the winds calmed in mid-March the beginning of diurnal heating can be seen
                again. As for the fresh plume, it disappears with the strong winds and yet shelf salinity was still
                sub-35 PSU, well below the normal salinity range, for the remainder of the deployment.
                <br />
                &nbsp;
                <br />
                &nbsp;
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Great_Barrier_Reef_gets_a_reprieve_from_the_heat_this_year">
                  <a href="#Great_Barrier_Reef_gets_a_reprieve_from_the_heat_this_year" className="anchor">
                    Great Barrier Reef gets a reprieve from the heat this year
                  </a>
                </h3>
                <h5>
                  <em>Craig Steinberg and Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">27 March, 2019</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily.pctiles&amp;region=NE&amp;date=20190217120000&amp;rtype=SR">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190327/NGBR_percentiles_20190217.gif"
                    style={{ height: '554px', width: '499px' }}
                  />
                </a>
                The GBR has had a welcome reprieve from the heat this year with below-average Sea Surface Temperatures
                particularly in January and February (see right, 17 Feb SST Percentiles), the time when water
                temperatures on the reef are usually at their maximum. Since the damaging coral bleaching summers of
                2016 and 2017 on the GBR, researchers and managers have paid close attention to the seasonal forecast
                for SST as summer approaches. Coming into this summer, the November outlook was for moderate warming
                (0.5°C above average) throughout the GBR but by
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily.pctiles&amp;region=NE&amp;date=20181204213648&amp;rtype=SR">
                  early December
                </a>
                , SST percentiles indicated temperatures turned out to be significantly warmer (in the highest 20%) than
                the forecast.
              </p>
              <p>
                Cyclone Owen, however, put a stop to that when it passed through the region just a few days later and
                then again on Dec 15. Further heating throughout the summer was limited by the stable monsoon trough
                that developed over North Queensland and then Tropical Cyclones Penny, Oma and now Trevor. The cyclones
                and the monsoon both provide heavy cloud cover that blocks solar heating and the strong winds cool the
                surface by vertically mixing cool water from below the thermocline. &nbsp;
                <br />
                <a href="news/20190327/Fig2_1.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190327/Fig2_1.png"
                    style={{ height: '330px', width: '400px' }}
                  />
                </a>
                <br />
                Of course, monsoons and cyclones also bring rain and this season the
                <a href="http://www.bom.gov.au/climate/tropical-note/archive/20190212.archive.shtml">
                  rainfall was unprecedented
                </a>
                . There was runoff onto the reef all along the coast but particularly from the Burdekin River which has
                a catchment area west of the Great Dividing Range. On Feb 11, the sediment laden plume was seen to
                extend 60km across the shelf (Figure 2) and a few days later, after the wind turned offshore, it reached
                <a href="https://worldview.earthdata.nasa.gov/?p=geographic&amp;l=VIIRS_SNPP_CorrectedReflectance_TrueColor(hidden),MODIS_Aqua_CorrectedReflectance_TrueColor(hidden),MODIS_Terra_CorrectedReflectance_TrueColor(opacity=0.99),Reference_Labels(hidden),Reference_Features(hidden),Coastlines&amp;t=2019-02-13-T00%3A00%3A00Z&amp;z=3&amp;v=146.4383737016583,-20.285738979015445,148.82095231035765,-18.39936682435925&amp;ab=off&amp;as=2019-02-13T00%3A00%3A00Z&amp;ae=2019-02-20T00%3A00%3A00Z&amp;av=3&amp;al=false&amp;download=null">
                  all the way to Gould Reef
                </a>
                on the outer shelf. Inshore regions often feel the effects of the runoff plumes but it is unusual for
                them to affect the outer reef. The sediment in the river plumes will eventually settle out, potentially
                smothering seagrasses and corals. The plume waters themselves bring nutrients and often result in large
                increases in microbial and planktonic blooms. On the positive side, benefits include increased prawn
                production and food for other larvae.
                <br />
                &nbsp;
                <br />
                &nbsp;
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Port_to_Pub_Swim_Strong_Northward_Currents_Forecast">
                  <a href="#Port_to_Pub_Swim_Strong_Northward_Currents_Forecast" className="anchor">
                    Port to Pub Swim: Strong Northward Currents Forecast
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">13 March, 2019</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="http://rs-data3-mel.csiro.au/porttopub-swim-live/">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190313/PorttoPub6am.png"
                    style={{ height: '209px', width: '400px' }}
                  />
                </a>
                Swim conditions for the Port-to-Pub this Saturday could be challenging! The ocean current forecast from
                the Oceans Institute of UWA is for strong northward currents for the second half of the course
                throughout the day (check the
                <a href="http://rs-data3-mel.csiro.au/porttopub-swim-live/">swim optimiser</a>
                for hourly ocean currents). From the BoM, the forecast is for fresh southerly winds (up to 20kn)
                throughout the day and total wave height (swell + wind waves) of 1.5-2m from the southwest. So it could
                be quite choppy with a strong push to the north. Air temperatures are forecast to be warm, 27°C at the
                coast, and
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily.SST&amp;region=DonPer&amp;date=20190311133621&amp;rtype=DR">
                  ocean temperatures off Perth have warmed a little lately to 22.5°C
                </a>
                , average for this time of year.
                <br />
                &nbsp;
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Upwelling_keeps_South_Island_cool_this_summer">
                  <a href="#Upwelling_keeps_South_Island_cool_this_summer" className="anchor">
                    Upwelling keeps South Island cool this summer
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">28 February, 2019</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="news/20190228/Figure_1.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190228/Figure_1.png"
                    style={{ height: '253px', width: '400px' }}
                  />
                </a>
                The Tasman Sea experienced another
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily.SST_ANOM&amp;region=Au&amp;date=20190112172506&amp;rtype=AR">
                  burst of solar heating this year
                </a>
                , very similar to January last year, when
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily.SST_ANOM&amp;region=Au&amp;date=20180128172621&amp;rtype=AR">
                  sea surface temperatures were more than 3°C above average
                </a>
                in a large area, around New Zealand. Both heating events occurred under the influence of a blocking high
                in the Tasman but the location of the high and the nature of the disruptions to the high created quite
                different conditions off the west coast of New Zealand (Figure 1). In 2018, satellite SST shows surface
                water off the west coast was more than 3°C above average for the last 10 days of January and coastal
                waters
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily&amp;region=NZ&amp;date=20180217170349&amp;rtype=SR">
                  remained 2-3°C above average
                </a>
                for almost all of February. This year, although the central Tasman peaked at 2-3°C above average,
                coastal temperatures were cooler than average (by up to 3°C) and have remained cool for much of
                February.
                <br />
                &nbsp;
              </p>
              <p>
                In January 2018, the blocking high was at first centred in the Tasman Sea but by mid-January it had
                established itself just east of New Zealand. It was also preceded by a series of weak low pressure cells
                (e.g. Figure 3, left) that created a period of about 10 days of downwelling winds along the west coast
                of South Island (Figure 2, top). In contrast, in January 2019, the blocking high remained over the
                centre of the Tasman and throughout the month and South Island experienced a series of south-westerly
                wind episodes (Figure 2, bottom) caused by disturbances in the air flow south of New Zealand (e.g.
                Figure 3, right). The upwelling induced by the south-westerly winds was quite strong for this time of
                year as the SST percentiles indicate temperatures in the lowest 20% for much of the west coast.
                <a href="news/20190228/Figure_2.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190228/Figure_2.png"
                    style={{ height: '361px', width: '400px' }}
                  />
                </a>
              </p>
              <p>
                The SAM, or Southern Annular Mode, is considered to be the strongest indicator for blocking highs in the
                Tasman (Salinger et al, 2019)¹. There is an increasing trend in the SAM&nbsp; with climate change so it
                is thought that marine heat waves associated with blocking highs could become more prevalent. The
                <a href="https://legacy.bas.ac.uk/met/gjma/sam.html">SAM index</a> was high in both January 2018 (2.72)
                and January 2019 (2.79) and although blocking highs were present in both years they were very different
                in character and produced different local outcomes. Upwelling has always been valued for bringing
                nutrients up to the surface, fuelling ocean production, but as ocean temperatures rise the cooling
                effect is also important. With the prospect of more blocking highs in the Tasman, a predominance of one
                type of block over the other could make a difference to temperatures and productivity in the coastal
                waters of New Zealand.
                <a href="news/20190228/Figure_3.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190228/Figure_3.png"
                    style={{ height: '202px', width: '400px' }}
                  />
                </a>
                <br />
                <br />
                <strong>References</strong>
                <br />
                James Salinger et al 2019 Environ. Res. Lett. in press
                <a href="https://doi.org/10.1088/1748-9326/ab012a">https://doi.org/10.1088/1748-9326/ab012a</a>
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Weak_Northward_Currents_Forecast_for_Rottnest_Swim">
                  <a href="#Weak_Northward_Currents_Forecast_for_Rottnest_Swim" className="anchor">
                    Weak Northward Currents Forecast for Rottnest Swim
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">20 February, 2019</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="http://rs-data3-mel.csiro.au/rottnest-swim-live/">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190220/Rottnest_race_day.png"
                    style={{ height: '263px', width: '400px' }}
                  />
                </a>
                Conditions are looking good for the swim this year. A weak (&lt;0.5knot) northward current in the second
                half of the race that turns&nbsp;northwestward around midday may even provide a gentle push in the
                middle of the race for swimmers still in the water. Neither the wind nor swell look like they will
                create difficult conditions. The Bureau of Meteorology is forecasting light southerly winds in the
                morning turning westerly, becoming moderate in the afternoon. Swell is forecast to be small:&nbsp;0.5-1m
                from the southwest.
                <br />
                &nbsp;
              </p>
              <p>
                The water appears to have warmed up a little near the coast over the last few days. However, when winds
                have been weak, as they have off Perth for a few days, the satellite SST may only represent a shallow
                surface layer. To help identify these situations, we include &nbsp;water temperature from ships with a
                hull-mounted intake whenever it is available. The latest ship SST (Feb 16, bottom right figure) from the
                vessel Sea Flyte indicates water temperature at 0.5m is 21.5°C, 1°C cooler than the satellite estimate
                of 22.5°C. This difference in temperature in the surface layer indicates recent shallow heating and the
                possibility of cooler waters below. However, there have been a few more days of solar heating since
                Feb16 due to clear skies around Perth, so the water is still warming.
                <a href="http://oceancurrent.imos.org.au/product.php?product=fourhour&amp;region=DonPer&amp;date=20190216080000&amp;rtype=DR">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190220/FourHour_SST_2019021608.gif"
                    style={{ height: '320px', width: '400px' }}
                  />
                </a>
                <br />
                <br />
                &nbsp;
              </p>
              <p>
                The forecast, of course, may change.&nbsp;The ocean forecast is updated each morning before the race.
                OceanCurrent wishes all Rottnest swimmers a safe and successful race!
                <br />
                &nbsp;
                <br />
                &nbsp;
                <br />
                &nbsp;
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="The_2019_Rottnest_Swim_could_be_a_cold_one">
                  <a href="#The_2019_Rottnest_Swim_could_be_a_cold_one" className="anchor">
                    The 2019 Rottnest Swim could be a cold one
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">15 February, 2019</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="http://rs-data3-mel.csiro.au/rottnest-swim-live/">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190215/Rottnest_optimiser.png"
                    style={{ height: '273px', width: '400px' }}
                  />
                </a>
                <br />
                The Rottnest swim optimiser is up and running again this year in preparation for race day, Saturday
                February 23. Hourly ocean current forecasts, courtesy of the Oceans Institute of UWA, are shown for the
                coming Saturday. The forecast for tomorrow, February 16, indicates a strong northward current in the
                second half of the swim, getting stronger throughout the day. These conditions are particularly hard on
                swimmers who start the race later in the day and so are more likely to cop the stronger currents. The
                forecast for the actual race day will be available next Wednesday and updated daily. Although, strong
                northward currents are common for this time of year,
                <a href="http://oceancurrent.imos.org.au/#20150213" className="anchor">
                  conditions could be quite different depending on the weather leading up to the race
                </a>
                .<br />
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily.SST&amp;region=Perth&amp;date=20190214134933&amp;rtype=DR">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190215/SST_20190214.png"
                    style={{ height: '485px', width: '400px' }}
                  />
                </a>
              </p>
              <p>
                Between the clouds we can see that coastal
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily.SST_ANOM&amp;region=DonPer&amp;date=20190211134715&amp;rtype=DR">
                  ocean temperatures are 1-2°C cooler than usual off Perth
                </a>
                and have been for most of the summer. The cool temperatures can be put down to a weak Leeuwin Current
                this year and a fairly strong Capes Current. The Leeuwin Current brings warm water south throughout the
                year and is usually strongest in the winter months. The Capes Current is a wind-forced shelf current
                that occurs mainly in the summer. It can be seen in the 14 Feb SST (right) as a cold tongue stretching
                north from Cape Leeuwin and Cape Naturaliste. Given the cause of the cool temperatures it is likely they
                will persist until race day.
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Bluebottles_Upwelling_and_Tasman_Sea_Warming_ndash_that_Blocking_High_is_Back">
                  <a
                    href="#Bluebottles_Upwelling_and_Tasman_Sea_Warming_ndash_that_Blocking_High_is_Back"
                    className="anchor"
                  >
                    Bluebottles, Upwelling and Tasman Sea Warming – that Blocking High is Back.
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">11 January, 2019</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="news/20190111/BlockingHigh_v4.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190111/BlockingHigh_v4.png"
                    style={{ height: '387px', width: '300px' }}
                  />
                </a>
                Masses of bluebottles have been turning up on southern Queensland beaches over the last week with
                <a href="https://www.theguardian.com/environment/2019/jan/07/jellyfish-sting-more-than-5000-holidaymakers-on-queenslands-coast">
                  thousands of people being stung
                </a>
                . Further south, upwelled water has been cooling beach temperatures along the northern and central NSW
                coast and in the Tasman Sea the water is warming. All of these events can be linked to the presence of a
                blocking high over the Tasman (Figure 1). A high-pressure cell becomes a blocking high when it stalls,
                staying in about the same place while the surrounding atmosphere moves around it. These highs can
                persist for several days to weeks causing the areas affected by them to have the same kind of weather
                for an extended period of time.
              </p>
              <p>
                The persistent winds, which blow anticlockwise (in the southern hemisphere) around the blocking high,
                are behind both Queensland’s stinger invasion and the cold upwelling off northern NSW. Bluebottles can
                be found in large armadas floating around the Pacific Ocean and with their buoyant sail float high in
                the water and go wherever the wind takes them. Off southeast Queensland the winds have been persistently
                onshore since Christmas bringing any bluebottles that are out there right in to the beach. Along the NSW
                coast the atmospheric high brought
                <a href="http://oceancurrent.imos.org.au/glossary.php">upwelling</a>
                winds, from the north-east, giving the EAC an assist to lift cold waters from deep offshore to the
                coast. Sea surface temperatures from Lennox Head to Newcastle (Figure 2) have been particularly cold
                (off the scale) and well into the
                <a href="http://oceancurrent.imos.org.au/product.php?product=daily.pctiles&amp;region=Bris-Syd&amp;date=20190103220000&amp;rtype=DR">
                  coldest decile SST for this time of year.
                </a>
                <a href="news/20190111/Filled_SST_4hr_with_text.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20190111/Filled_SST_4hr_with_text.png"
                    style={{ height: '383px', width: '300px' }}
                  />
                </a>
              </p>
              <p>
                Clear skies under a high pressure system also allow for a lot more solar heating so we expect sea
                surface temperatures to warm while the high is in place. Temperatures in the Tasman Sea, particularly
                west of North Island, New Zealand, have increased by 3°C (Figure 1), and once again, waters off SE
                Australia are in the top decile of sea surface temperatures for this time of year. A
                <a href="http://oceancurrent.imos.org.au/#20171204" className="anchor">
                  similar blocking event
                </a>
                occurred in November 2017, although the high was centred further south and west, causing upwelling on
                the south coast of NSW and ocean surface warming closer to Australia. The four-day outlook from the
                Bureau of Meteorology is for the high to be disrupted a little by a front on Sunday but then to
                re-establish itself again so there could be more of the same for a little longer.
                <br />
                &nbsp;
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Sydney_Hobart_briefing">
                  <a href="#Sydney_Hobart_briefing" className="anchor">
                    Sydney-Hobart briefing
                  </a>
                </h3>
                <h5>
                  <em>David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">22 December, 2018</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/Syd-Hob/2018/2018122517.gif"
                  style={{ height: '800px', width: '570px' }}
                />
                <br />
                Sailors in the Sydney-Hobart yacht race almost always benefit from&nbsp;a few knots of favourable
                current at some point in the race. But where this happens is different every year, and the amount of
                favourable current experienced by a yacht sometimes depends a lot on the exact track it takes.
                <br />
                <br />
                On present indications, there is little prospect of yachts finding favourable currents anywhere{' '}
                <strong>north of Ulladulla</strong>. This is because a cold-core eddy is presently off Jervis Bay, so
                there is an adverse current on the western side of the eddy where the yachts will be wanting to go. This
                eddy is not particularly large or intense, but it will probably persist until race time (it was much
                stronger a month ago when it was off Sydney).
                <br />
                <br />
                <strong>South of Ulladulla</strong>&nbsp;is where yachts may find strong favourable currents this
                year.&nbsp;This&nbsp;is the case in about 70% of years, when&nbsp;a warm-core eddy is off
                the&nbsp;southern NSW shelf. This year's eddy does not extend very far south, but there is another
                warm-core&nbsp;eddy farther south, east of
                <strong>Bass Strait.</strong>
                <br />
                <br />
                There does not appear to be any strong features off
                <strong>Tasmania</strong> this year, but this could change, so keep an eye on the{' '}
                <a href="Syd-Hob/latest.html">imagery</a>.<br />
                <br />
                We wish competitors a safe but exciting race, and urge all to monitor the imagery that will appear on
                our website, including our new '4 hour&nbsp;SST' products derived from Japan's geostationary satellite
                Himawari-8.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="How_did_Ella_s_message_in_a_bottle_get_to_Queensland_from_Tasmania">
                  <a href="#How_did_Ella_s_message_in_a_bottle_get_to_Queensland_from_Tasmania" className="anchor">
                    How did Ella's message in a bottle get to Queensland from Tasmania?
                  </a>
                </h3>
                <h5>
                  <em>David Griffin and Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">23 October, 2018</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="news/20181023/OM_af00_AuFiji_tp3l1p2.mp4">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20181023/tracks_20170922.gif"
                    style={{ height: '366px', width: '400px' }}
                  />
                </a>
                <br />
                Oceanographic wisdom is that waters off eastern Tasmania are either south-bound in the ‘Tasman leakage’
                of East Australian Current waters into the Great Australian Bight, or east-bound in the ‘west wind
                drift’ of the Sub-tropical Convergence Zone. What do we make, then, of
                <a href="https://www.abc.net.au/news/2018-09-21/message-in-a-bottle-found-queensland-tasmania/10289798">
                  news
                </a>
                that a bottle dropped 12nm east of Bicheno, Tasmania, in November 2016 was found almost 2 years later in
                Shoalwater Bay, Queensland, in September 2018?
              </p>
              <p>
                <br />
                To investigate the likelihood of this trip, we used the same modelling system that we have used on many
                occasions for simulating or forecasting the long-term drift of items floating on the sea surface (e.g.
                missing flight
                <a href="http://www.marine.csiro.au/~griffin/MH370/">MH370</a>). This system uses global numerical
                models of the ocean and atmosphere, each of which relies on a global network of observing systems to be
                as accurate as possible. Items floating at the surface get an additional boost from the waves; not so
                much the swell, but the very short period waves of 1-4s, which travel in the direction of the wind. This
                effect is called
                <a href="https://en.wikipedia.org/wiki/Stokes_drift">Stokes Drift</a>
                and is about 1.2% of the wind velocity. For anything floating above the surface, wind drag, or windage,
                also becomes important but we can assume it to be negligible for a bottle.
                <br />
                <br />
                We tracked 200 ‘virtual bottles’ dropped in our virtual ocean on 20 Nov 2016 – thought to be the day the
                family were on their fishing trip. We started the virtual bottles in a tight ring (about the size of the
                model grid, which is 10km) around the real bottle, so they would all be equally representative of it.
                The turbulence in the virtual ocean quickly separated the virtual bottles, faster and faster as the
                distances between bottles increased. This is much the same as would happen if 200 real bottles were
                dropped at the one spot.
                <br />
                <br />
                Most of the virtual bottles headed for New Zealand, the first making landfall on 22 Sep 2017. This is
                what we would expect to happen to most of the real bottles if a large number were released. But a small
                proportion of the virtual bottles did make it to Queensland - some going quite far north. One actually
                ended up, of all places, in Shoalwater Bay on 7 July 2018 (just a couple of months earlier than the real
                bottle was located)! Click the image at right to see an animation of the chaotic trajectories of the
                virtual bottles. The background colour indicates the magnitude of the surface velocity, highlighting the
                slow-moving eddies. The effect of passing storms (white vectors indicate the wind) on the bottles is
                evident. Virtual bottles do loops around these eddies, first one, then another, as we know real
                satellite-tracked drifting buoys do. Occurring randomly with respect to eddy centres, wind or
                small-scale turbulence nudge each bottle (similarly for real or virtual bottles) in or out of an eddy if
                the bottle is close to a critical streamline.&nbsp;
                <br />
                <br />
                So, on the face of it, this experiment is consistent with both the existing body of knowledge{' '}
                <em>and </em>
                an observation that seemingly conflicts with that body of knowledge.
                <br />
                <br />
                Is there a paradox? Of course not. When we study the world’s ocean currents, the focus is on where most
                of the water goes, not every molecule. Our simulation showed that going to New Zealand was the most
                likely, but certainly not the only possible, destination of the bottle. We can’t really say if the
                likelihood of going to Queensland was more or less than 1%. But one thing is clear: the trip of that
                bottle was extraordinary.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Sea_Level_Rising_Faster_as_the_Ice_Sheets_Melt">
                  <a href="#Sea_Level_Rising_Faster_as_the_Ice_Sheets_Melt" className="anchor">
                    Sea Level: Rising Faster as the Ice Sheets Melt
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">12 October, 2018</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                Sea level has risen, on average, 8cm over the last 25 years of satellite altimetry (see figure). It
                doesn’t seem that much - so what’s the fuss? Firstly, sea level has been rising since the industrial
                revolution. It is
                <a href="https://www.cmar.csiro.au/sealevel/sl_hist_few_hundred.html">
                  estimated to have risen a total of 25cm since 1880
                </a>
                and already the effect is being felt in the more low lying Pacific islands.
                <a href="https://theconversation.com/sea-level-rise-has-claimed-five-whole-islands-in-the-pacific-first-scientific-evidence-58511">
                  The Solomon Islands has lost 5 islands to coastal erosion
                </a>
                and
                <a href="https://www.theguardian.com/world/2017/oct/23/waiting-for-the-tide-to-turn-kiribatis-fight-for-survival">
                  Kiribati’s fresh water supply below the atolls has been contaminated
                </a>
                with salt water. Secondly,
                <a href="https://theconversation.com/sea-level-is-rising-fast-and-it-seems-to-be-speeding-up-39253">
                  the rate of rise is increasing
                </a>
                . The 8cm rise in the last 25 years happened twice as fast as the 17cm rise that occurred over the 110
                years beforehand.
                <br />
                <a href="news/20181012/GMSL_Figure_1a.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20181012/GMSL_Figure_1a.png"
                    style={{ height: '342px', width: '400px' }}
                  />
                </a>
              </p>
              <p>
                More concerning, however, is that the rate of sea level rise appears to have increased since 2010. The
                trend, or average rise, through 1993-2010 is much smaller (2.62 cm/decade) than the trend for the full
                time series (3.22 cm/decade) as shown in Figure 1. It is tempting to estimate the trend for the 8 years
                since 2010 but the large ENSO signal throughout these years makes it difficult to get an accurate
                estimate. Observations of ice loss, however, give reason to believe the apparent increasing rate of sea
                level rise is real.
                <br />
                &nbsp;
              </p>
              <p>
                <a href="https://www.nature.com/articles/nclimate3325/figures/4">
                  Thermal expansion and glacial ice melt have been the biggest contributors
                </a>
                to sea level rise since 1993 but the amount of
                <a href="https://www.nasa.gov/feature/goddard/warming-seas-and-melting-ice-sheets">
                  ice lost from Greenland and Antarctica
                </a>
                is increasing every year. Greenland is melting faster than anticipated due to
                <a href="https://www.nationalgeographic.com/environment/2018/09/news-greenland-ice-sheet-melting-arctic-algae/">
                  algal blooms in the snow
                </a>
                , which darken the ice, allowing more solar energy to be absorbed. The
                <a href="https://www.eco-business.com/news/sea-level-rise-due-to-antarctic-ice-melt-has-tripled-over-past-five-years/">
                  West Antarctic ice sheet started to melt
                </a>
                much more rapidly after about 2006 and is susceptible to rapid and complete loss because the land mass
                below the ice is below sea level. The response of the earth to the mass change due to ice melt is
                complex. When the weight of ice is removed the earth’s crust rebounds quickly but there is also a slower
                rebound in the mantle below. There is some hope that
                <a href="https://theconversation.com/the-west-antarctic-ice-sheet-is-in-trouble-but-the-ground-beneath-it-may-buy-some-time-98368">
                  the mantle rebound below Antarctica may be rapid enough
                </a>
                to mitigate the collapse of the West Antarctic ice sheet which otherwise
                <a href="http://www.antarcticglaciers.org/question/ice-antarctica-melt-much-global-sea-level-rise-quickly-likely-happen/">
                  would contribute 3m to sea level rise
                </a>
                . Of course, this hope also relies on the world taking
                <a href="http://www.abc.net.au/news/science/2018-10-08/ipcc-climate-change-report/10348720">
                  real action on CO2 emissions, which we are yet to see
                </a>
                .<br />
                &nbsp;
              </p>
              <p>
                Monitoring our changing earth has become critical and satellite altimeters and gravimetric missions
                provide us with unprecedented observations and understanding of sea level rise around the globe. These
                satellite observations rely on ground truthing. One of the three calibration and validation (Cal/Val)
                sites globally which help maintain the accuracy of the observations is located near Burnie in Bass
                Strait, run by the University of Tasmania’s Christopher Watson and CSIRO’s Benoit Legresy. Their work
                forms a part of the global effort to ensure we have accurate knowledge of what is happening on our
                planet.
                <br />
                <br />
                <strong>
                  <em>References</em>
                </strong>
                <br />
                Watson, C. S., N. J. White, J. A. Church, M. A. King, R. J. Burgette and B. Legresy, 2015. Unabated
                global mean sea-level rise over the satellite altimeter era. <em>Nature Climate Change</em>, 5, 565-568.
                <br />
                &nbsp;
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Argo_Observed_Bass_Strait_Water_Off_Central_New_South_Wales">
                  <a href="#Argo_Observed_Bass_Strait_Water_Off_Central_New_South_Wales" className="anchor">
                    Argo-Observed Bass Strait Water Off Central New South Wales
                  </a>
                </h3>
                <h5>
                  <em>Peter Oke and Tatiana Rykova</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">6 September, 2018</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20180906/BSW-news-Fig1.png"
                  style={{ height: '281px', width: '400px' }}
                />
                An Argo float (WMO # 5902378; deployed in 2014) that drifted near the continental shelf off central New
                South Wales on 12 August 2018, showed
                <a href="http://oceancurrent.imos.org.au/profiles/profile.php?link=5902378/20180812_5902378_138.html">
                  cold and slightly fresh waters
                </a>
                below 200 m depth – but nothing remarkable. By 22 August, the same float returned an interesting little
                “spike” in
                <a href="http://oceancurrent.imos.org.au/profiles/profile.php?link=5902378/20180822_5902378_139.html">
                  potential temperature and salinity at about 500 m depth
                </a>
                . This spike was isolated to a few tens of metres, relatively small in amplitude, but quite distinct and
                eye-catching. The
                <a href="http://oceancurrent.imos.org.au/profiles/profile.php?link=5902378/20180901_5902378_140.html">
                  next profile
                </a>
                by the same float (measured on Monday 1 September), performed after the float had drifted offshore,
                shows a massive anomaly of temperature and salinity between 450 and 750 m depth, with waters about 3
                degrees and 0.8 psu above normal (Figure 1). Analysis of the TS properties of these profiles (Figure 2)
                shows that the most recent profile has the signature of cooled Bass Strait Water. First observations of
                the Bass Strait winter cascade were made by Boland (1971) but more recently glider observations
                indicated high oxygen content in the water mass, confirming it to have had recent contact with the
                surface, Baird and Ridgway (2012).
                <br />
                <br />
                <strong>
                  <em>Where did this water come from? </em>
                </strong>
                OceanCurrent Gridded Sea-Level Anomaly (GSLA) maps shows that over the continental shelf off southern
                and central NSW there‘s been&nbsp; persistent northward currents for most of
                <a href="http://oceancurrent.imos.org.au/sst.php?link=SE/20180816.html">August 2018</a>. The presence of
                northward shelf currents, evident in the GSLA, was confirmed by a northward drifting surface drifting
                buoy. This is also reflected in SST with colder than normal waters adjacent to the coast. It appears
                that water originating in Bass Strait, with salinity of 35.4 psu, has cooled over winter, left Bass
                Strait flowing into the Tasman Sea, and drifted northwards along the NSW coast before becoming entrained
                into a passing eddy at ~600 m depth.
              </p>
              <img
                alt=""
                src="https://oceancurrent.aodn.org.au/news/20180906/BSW-news-Fig2.png"
                style={{ height: '311px', width: '400px' }}
              />
              <p>
                <strong>
                  <em>What will happen next? </em>
                </strong>
                Standard Argo floats are programmed to park at a depth of 1000m for 10 days between profiles which is
                almost 300m below the depth of the Bass Strait water recently sampled so it’s drift velocity may differ
                from the Bass Strait water’s velocity. We’ll have to watch this Argo float #5902378 to see if it samples
                the Bass Strait water again. The next profile is due to be available on 11 September 2018.
                <br />
                <br />
                <strong>
                  <em>References</em>
                </strong>
                <br />
                Baird,&nbsp;M. E., and&nbsp;K. R. Ridgway (2012),&nbsp;The southward transport of sub‐mesoscale lenses
                of Bass Strait Water in the centre of anti‐cyclonic mesoscale eddies,&nbsp;<em>Geophys. Res. Lett.</em>
                ,&nbsp;39, L02603, doi:10.1029/2011GL050643.
                <br />
                &nbsp;
                <br />
                Boland, F. M. (1971), Temperature‐salinity anomalies at depths between 200 m and 800 m in the Tasman
                Sea,
                <em>Aust. J. Mar. Freshwater Res.</em>, 22, 55–62.
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Four_Hour_SST_and_a_New_Navigator">
                  <a href="#Four_Hour_SST_and_a_New_Navigator" className="anchor">
                    Four-Hour SST and a New Navigator
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill and Roger Scott</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">4 September, 2018</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="news/20180904/Navigator_SST_2018082808.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20180904/Navigator_SST_2018082808.png"
                    style={{ height: '304px', width: '400px' }}
                  />
                </a>
                <br />
                Our new
                <a href="http://oceancurrent.imos.org.au/#20170907" className="anchor">
                  Four-hour SST
                </a>
                product is now available on OceanCurrent. It uses Himawari-8 SST images (and all other available SST) to
                provide 6 images per day. Four-hour SST, as its name implies, &nbsp;provides an image every 4 hours
                using all 10-minute data within a 4-hr time-window. There is also a parallel product called Filled-SST
                where the cloud gaps are filled with the latest previous SST. We have included the average wind speed
                (courtesy of the Bureau of Meteorology) as well, in order to help identify low-wind regions where the
                SST only represents a thin, extra-warm layer at the surface. The image right demonstrates such a
                phenomenon, often called the afternoon effect because it is usually maximum in the late afternoon. Note
                the time of the image at 0800 UTC is 4pm AWST. We have timed the Four-hour SST to catch peak afternoon
                effect (0600 UTC on the east coast) because it can impact near-surface corals. Although the heating is
                unlikely to cause any problems in winter, it is interesting to see the cooler outline of Scott Reef (at
                approx. 122E and 14S) most likely due to the effect of tides.
                <br />
                &nbsp;
              </p>
              <p>
                We have also re-designed the website so that choosing between our growing list of SST and Chlorophyll-a
                products is easier. With the new navigator it is easy to flip between different types of SST to compare
                and pick the best one for the job. The Four-hour SST is expected to be more reliable and with less cloud
                than the Snapshot SST but because of the averaging the fronts will not be as sharp. The 6-day SST is
                even more smoothed, being an average of all night-time data in a 6-day window. We use the 6-day SST to
                calculate
                <br />
                a conservative estimate of the SST percentiles by referencing the image to the statistics of SSTAARS.
                These statistics are for 1-day night-only averages, so our percentiles are slightly skewed towards the
                median.
                <br />
                &nbsp;
              </p>
              <p>
                Animations of each product are easily accessible through the ‘film’ icon on the navigation bar. The
                ‘Permlink’ button provides an way to send someone the link to an image. Of course, not all SST products
                are available for all times. For example, at this stage, Four-hour SST is only available from 10 August
                2017. Himawari-8 was launched in 2015 so eventually we will be able to backfill to 2015. We have also
                included images of SSTAARS climatology (one per month) for each region.
                <br />
                &nbsp;
                <br />
                &nbsp;
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Frontal_systems_on_the_Australian_north_west_shelf">
                  <a href="#Frontal_systems_on_the_Australian_north_west_shelf" className="anchor">
                    Frontal systems on the Australian north-west shelf
                  </a>
                </h3>
                <h5>
                  <em>Chari Pattiaratchi</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">12 June, 2018</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20180612/20180529_Chla.png"
                  style={{ height: '259px', width: '400px' }}
                />
                Ocean fronts, defined as regions of large horizontal gradients in water properties (temperature,
                salinity etc), are areas of high productivity globally. Recent satellite imagery from the north-west
                shelf indicates the existence of two types of fronts extending over 1000km from North-West Cape to Cape
                Leveque. The nearshore band of high chlorophyl is associated with a
                <a href="http://oceancurrent.imos.org.au/sst.php?link=NWS/2018/2018052820.html">
                  very cold band of water at the coast
                </a>
                &nbsp; that usually develops every May, persists throughout winter, and is evident in the
                <a href="http://oceancurrent.imos.org.au/daily.php?link=DR_SST_CLIM/SST/NWS/07.gif">
                  SSTAARS climatology
                </a>
                . Water in shallow coastal regions become more saline over summer due to evaporation and with winter
                cooling the water becomes much denser than water further offshore. This cool, dense water then flows
                offshore along the bottom as a dense shelf water cascade which has been observed by ocean glider
                deployments in the region and other regions of Australia.
                <br />
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20180612/OceanCurrent20180529.png"
                  style={{ height: '478px', width: '300px' }}
                />
              </p>
              <p>
                On continental shelves, fronts can also develop just through the reduction of tidal currents with depth
                without the influx of different water masses. Simpson and Hunter (1974)¹ showed that a front could
                develop where mixing due to tidal currents was no longer strong enough to overcome stratification. Many
                studies undertaken globally have shown that the ratio of the water depth to nearbed current speed cubed,
                h/|U³| is a good indicator of the location of tidal fronts, in particular where log10 (h/|U³|) = 2.7.
                The band of higher chlorophyll found further offshore, suggesting the presence of a second front, lies
                in close proximity to the predicted Simpson and Hunter tidal front location (indicated with black line).
                Coastal currents transporting different water masses can also contribute to the existence of fronts and
                the frontal location could also be related to the location of the Holloway current that flows towards
                the south-west. The offshore chlorophyll maximum, although much weaker than in the nearshore front, has
                affected about 1000km of the mid-shelf region.
                <br />
                &nbsp;
                <br />
                Recent work by Thums et al. (2017)² demostrated that flatback turtles (<em>Natator depressus</em>)
                followed the location of the predicted Simpson and Hunter tidal front when migrating along the Kimberley
                Coast.
              </p>
              <p>
                ¹Simpson, J. H., and Hunter, J. R. (1974). Fronts in the Irish Sea.
                <em>Nature </em>250, 404–6.
                <br />
                ²Thums M, Waayers D, Zhi H, Pattiaratchi CB, Bernus J &amp; Meekan MG. 2017. Environmental predictors of
                foraging and transit behaviour in flatback turtles (<em>Natator depressus</em>).
                <em>Endangered Species Research</em>, 32, 333–349.
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Severe_Tropical_Cyclone_Marcus">
                  <a href="#Severe_Tropical_Cyclone_Marcus" className="anchor">
                    Severe Tropical Cyclone Marcus
                  </a>
                </h3>
                <h5>
                  <em>David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">29 March, 2018</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="http://oceancurrent.imos.org.au/oceancolour.php?link=MODIScomp/2018032504.html">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/http://oceancurrent.imos.org.au/MODIScomp/2018032504.gif"
                    style={{ height: '400px', width: '588px' }}
                  />
                </a>
                STC Marcus was the strongest tropical cyclone anywhere within the Australian region since STC Monica in
                April 2006 according to the
                <a href="http://www.bom.gov.au/announcements/sevwx/nt/nttc20180316.shtml">BoM</a>. It struck Darwin at
                only category 2 intensity, causing widespread damage, but went on to reach category 5 on 22 March 2018
                well away from land. This&nbsp;MODIS ocean colour image (click to expand)&nbsp;shows that Marcus left a
                distinct trail in the ocean as it tracked west near latitude 15S and turned&nbsp;south near longitude
                108E. It appears that the winds (estimated to have reached 325km/h) and waves caused a lot of vertical
                mixing, bringing nutrients and the deep layer of phytoplankton up to the surface. Apart from coastal
                storm surge and a slight reduction of sea surface temperature along the path of the cyclone, however,
                other ocean impacts are not obvious. Weaker, but slower-moving cyclones have had more impact on the
                ocean.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Bass_Strait_Glider_Reveals_the_Ancient_Bassian_Lake">
                  <a href="#Bass_Strait_Glider_Reveals_the_Ancient_Bassian_Lake" className="anchor">
                    Bass Strait Glider Reveals the Ancient Bassian Lake
                  </a>
                </h3>
                <h5>
                  <em>Mark Baird</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">15 March, 2018</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="news/20180315/BassStraitMC_1.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20180315/BassStraitMC_1.png"
                    style={{ height: '255px', width: '400px' }}
                  />
                </a>
                The
                <a href="http://anfog.ecm.uwa.edu.au/index.php">IMOS Ocean Glider Facility</a>
                has launched the
                <a href="http://oceancurrent.imos.org.au/gliders/yearmaps.php?link=2018_sl_temp_30d_nrt.html">
                  third annual glider across Bass Strait
                </a>
                . It has just
                <a href="http://oceancurrent.imos.org.au/daily.php?link=DR_SST_daily/SST/Adelaide/20180309.gif">
                  completed the transect,
                </a>
                and the presence of a dense cold pool in the deepest part of Bass Strait is evident. The centre of Bass
                Strait (right) is deeper than its surrounds and would have formed a large fresh-water lake
                <a href="http://www.utas.edu.au/library/companion_to_tasmanian_history/A/Aboriginal%20languages.htm">
                  when Bass Strait was exposed 15,000+ years ago
                </a>
                . Nowadays the deepest part of Bass Strait is 80 m deep with the deepest outlet to the north at 70 m.
                Thus the ancient lake continues to act as a place where water can collect – in this case, dense Bass
                Strait water.
                <a href="news/20180315/Glider_Profiles_ANFOG_1.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20180315/Glider_Profiles_ANFOG_1.png"
                    style={{ height: '602px', width: '400px' }}
                  />
                </a>
                <br />
                &nbsp;
              </p>
              <p>
                During winter, strong winds and surface cooling create a well-mixed dense water mass in Bass Strait that
                gradually becomes denser than water of the Tasman Sea to the east because the cooling is confined to the
                depth of the strait. Once the density difference becomes large enough in the winter, the cold dense pool
                exits Bass Strait as a bottom density current at the north-eastern side.
                <br />
                &nbsp;
              </p>
              <p>
                This year, the Bass Strait glider has traversed the lake and found a cold, dense pool of water which is
                low in oxygen, most likely a remnant of last winter. This bottom layer at 70-80 m was the portion of
                Bass Strait water that could not exit last winter because of the 70 m deep ridge across the eastern edge
                of Bass Strait. High chlorophyll-a indicates a bloom has occurred in the deep water where both nutrients
                and some light are present. The oxygen maximum just above the interface shows the bloom is growing. But
                once winter comes, they will be mixed to the surface and then flow northward out of Bass Strait. Only
                the unlucky ones will get trapped for another summer - perhaps to be seen by the fourth Bass Strait
                glider.
                <br />
                &nbsp;
                <br />
                &nbsp;
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="The_Port_to_Pub_swim_could_be_a_tough_one_this_year_Updated">
                  <a href="#The_Port_to_Pub_swim_could_be_a_tough_one_this_year_Updated" className="anchor">
                    The Port to Pub swim could be a tough one this year! Updated
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">14 March, 2018</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="http://rs-data3-mel.csiro.au/porttopub-swim-live/">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20180314/PorttoPub.png"
                    style={{ height: '229px', width: '400px' }}
                  />
                </a>
                <strong>
                  <em>Update:</em>
                </strong>{' '}
                The forecast currents are still expected to be northward but weaker than originally forecast. The wave
                forecast from the Bureau is still predicting a challenging wave field of 1.5-2m waves from the southwest
                throughout the day.&nbsp;
                <em>
                  <strong>Original Forecast:</strong>
                </em>{' '}
                With moderate to strong southerly winds forecast by the Bureau of Meteorology and waves of 1.5-2m from
                the southwest, this years Port to Pub swim will be more challenging than the Rottnest Island swim last
                month. The
                <a href="http://rs-data3-mel.csiro.au/porttopub-swim-live/">ocean forecast</a>
                from the University of Western Australia for Saturday is predicting currents of 1 knot from the south
                throughout the day from the halfway mark out to Rotto. Near the coast, the currents will remain weak
                until late in the day so the 5km swim up to Cottesloe and back should not be affected by the currents
                but the waves could be quite challenging on the southward leg. Of course, the forecast may change over
                the next few days so check again on Friday for the last update!
                <br />
                <br />
                &nbsp;
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Newcastle_radar_monitoring_the_EAC_separation_point">
                  <a href="#Newcastle_radar_monitoring_the_EAC_separation_point" className="anchor">
                    Newcastle radar monitoring the EAC separation point
                  </a>
                </h3>
                <h5>
                  <em>David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">7 March, 2018</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="http://oceancurrent.imos.org.au/SNSW/2018/2018030304.html">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/http://oceancurrent.imos.org.au/SNSW/2018/2018030304.gif"
                    style={{ height: '342px', width: '300px' }}
                  />
                </a>
                The HF RADAR system installed&nbsp;off Newcastle late last year is now working well, as demonstrated by
                this map for 3 March 2018, in which&nbsp;the radar currents are overlain on a Sea Surface Temperature
                image as well as geostrophic currents from altimetry. All three ocean observing systems reveal the main
                flow of the East Australian Current separating from the shelf and heading off towards New Zealand. Only
                the radar and the SST imagery, however, can resolve the details of the submesoscale eddies between the
                EAC and the continental shelf.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Rottnest_Swim_Update_The_Forecast_is_Changing">
                  <a href="#Rottnest_Swim_Update_The_Forecast_is_Changing" className="anchor">
                    Rottnest Swim Update - The Forecast is Changing
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">22 February, 2018</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="http://rs-data3-mel.csiro.au/rottnest-swim-live/">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20180222/Rottnest_6am2pm2.png"
                    style={{ height: '357px', width: '400px' }}
                  />
                </a>
                The Rottnest Swim forecast is changing with the front coming through a little later. Before midday the
                currents will be northward but as the currents start to turn swimmers still in the water will get an
                assist that builds throughout the afternoon. Of course if the front ends up coming through much later
                there won't be any assist from the currents and the flow will be the usual northward flow, getting
                stronger near Rottnest Island. You can keep an eye on the ocean forecast with the
                <a href="http://rs-data3-mel.csiro.au/rottnest-swim-live/">swim optimizer</a>.
              </p>
              <h3>&nbsp;</h3>
              <p>
                <br />
                &nbsp;
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="The_Rottnest_Swim_Forecast_Is_In">
                  <a href="#The_Rottnest_Swim_Forecast_Is_In" className="anchor">
                    The Rottnest Swim Forecast Is In!
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">21 February, 2018</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="http://rs-data3-mel.csiro.au/rottnest-swim-live/">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20180221/Rottnest_6am2pm.png"
                    style={{ height: '383px', width: '400px' }}
                  />
                </a>
                The University of Western Australia has provided the ocean forecast for race day and things are looking
                complicated! For now, the forecast is for northward currents in the morning, changing to southward flow
                by early afternoon. This is easy to see with the
                <a href="http://rs-data3-mel.csiro.au/rottnest-swim-live/">swim optimiser</a>
                and you can use the arrows on the optimiser to see the hourly forecast. The change in current direction
                is due to a change in the wind direction. In fact, this year's forecast is different to any other year
                because it's flipping between the
                <a href="http://oceancurrent.imos.org.au/#20150213" className="anchor">
                  two 'normal' summer regimes
                </a>
                mid-race. Of course, that makes it more unstable because it's accuracy depends on the timing of the
                front. The meteorological forecast may change over the next few days and this will be updated every
                morning heading up to race day. If the forecast does hold it could be a very fast race with the ocean
                currents giving swimmers a push towards Rottnest Island as the currents turn. We’ll be keeping a eye on
                the forecast and post an update if things change.
                <br />
                &nbsp;
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Sea_Surface_Temperatures_around_Tasmania_reached_extremes_this_November_but_how_deep_did_the_heating_go">
                  <a
                    href="#Sea_Surface_Temperatures_around_Tasmania_reached_extremes_this_November_but_how_deep_did_the_heating_go"
                    className="anchor"
                  >
                    Sea Surface Temperatures around Tasmania reached extremes this November but how deep did the heating
                    go?
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">20 December, 2017</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20171220/20171124.gif"
                  style={{ height: '342px', width: '400px' }}
                />
                Sea surface temperatures around Tasmania were
                <a href="http://oceancurrent.imos.org.au/daily.php?link=DR_SST_daily/pctiles/Tas/20171124.gif">
                  above the 90th percentile
                </a>
                for the last 10 days of November, particularly to the west and south. Temperatures were hottest off the
                northeast associated with a weak EAC eddy but more unusual were the high temperatures off the west coast
                (see right) that also peaked at over 18°C, which is more than 3-4°C above the
                <a href="http://oceancurrent.imos.org.au/daily.php?link=DR_SST_CLIM/SST/Tas/11.gif">November mean</a>.
                The blocking high in the Tasman that directed northeasterly winds over Tasmania and brought a record 6
                days of temperatures over 26°C also created the conditions for a week or more of cloudless skies.
                Cloud-free conditions allow maximum solar heating particularly at this time of year when UV radiation is
                reaching its peak. SST indicates that off the west coast temperatures increased by up to 4°C over 3
                weeks.
              </p>
              <p>
                Satellite SST, however, is a measure of only a very thin surface layer (or surface skin) and when winds
                are very weak there is not much vertical mixing and the SST may only represent a shallow surface layer.
                Without modeling it is impossible to know how deep this surface layer extends. The unusual weather
                conditions meant that not only was the sky around Tasmania cloud-free but the west coast, in the lee of
                the wind, was almost becalmed as well (photo courtesy of Emlyn Jones, oceanographer and self-described
                fishing tragic). The ‘hot spot’ off the west coast suggests that in this region the heating may only be
                shallow. The consequence of shallow heating is not only that the extreme temperatures only affect
                animals and plants near the surface but also that the temperatures will be short-lived and quickly
                reversed with the next windy day.
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20171220/img_7720.JPG"
                  style={{ height: '300px', width: '400px' }}
                />
                <br />
                Argo floats can provide a window to what is happening beneath the surface and there happened to be one
                off the west coast shelf (pink circle on SST image) that profiled the water column every 10 days through
                November. The development of a warm mixed-layer throughout the month can be seen in the Argo temperature
                profiles. The closest satellite SST for each profile is also plotted to indicate any discrepancy between
                the surface and water below. In early November the water was well-mixed down to 60m and the Argo
                temperature at 5m was very close to the mixed layer temperature.&nbsp; For all days the float profiled,
                the satellite SST was within 0.7°C of the temperature at 10m. After the weather changed the surface heat
                was mixed down to 40m reducing the surface temperature significantly but resulting in an increase of at
                least 2°C in the mixed layer since the beginning of November.
              </p>
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20171220/Argo_profiles_SST_200_1.gif"
                  style={{ height: '367px', width: '600px' }}
                />
                <br />
                <br />
                Based on the SST anomalies, the west coast surface waters were 3-4°C above average for at least 10 days
                during November. From the Argo profile on Nov 24 it is clear the lack of wind was creating a shallow
                surface layer so at the peak of the event it is most likely the sub-surface temperatures would not have
                reached the 4°C anomaly but probably an anomaly of 3°C. In any case, with a 2° increase in temperature
                of the top 40m, the event created a strong injection of heat into surface waters around Tasmania. The
                system can be considered to have been primed so that a repeat period of cloudless conditions, in the
                near future, could build on the heat that has been stored.
                <br />
                <br />
                Unlike the west coast, water temperatures on the east coast, away from sheltered regions, were
                unaffected by the heating because the atypical north-easterly winds drove an upwelling event that kept
                the shelf waters cool despite the warm EAC water just offshore.
                <br />
                &nbsp;
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Sydney_Hobart_briefing">
                  <a href="#Sydney_Hobart_briefing" className="anchor">
                    Sydney-Hobart briefing
                  </a>
                </h3>
                <h5>
                  <em>David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">19 December, 2017</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/http://oceancurrent.imos.org.au/Syd-Hob/2017/2017121506.gif"
                  style={{ height: '800px', width: '570px' }}
                />
                <a href="http://www.marine.csiro.au/oceancurrent/Syd-Hob/2017/2017121509.html">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/http://www.marine.csiro.au/oceancurrent/Syd-Hob/2017/2017121509.gif"
                    style={{ height: '421px', width: '300px' }}
                  />
                </a>
                We have an interesting situation this year, with an unusually strong, cyclonic (clockwise rotating,
                cold-core) eddy off north east Tasmania. This is quite likely to persist until race time, in which case
                yachts sailing through its western side (presently on the rhumbline) may encounter adverse currents of
                1kt. If winds are light, this could be an important consideration. Conversely, favourable currents may
                be found on the eastern side of the eddy – but that would require quite an extensive detour off the
                rhumbline. It might be possible to avoid the adverse current by sailing very close to land but that is
                difficult to assess, let alone foretell this far in advance.
              </p>
              <p>
                Currents off NSW are more typical. There is presently a large warm core eddy off southern NSW, causing
                strong favourable currents along the continental margin (i.e. beyond the 200m isobath). This eddy will
                probably slowly migrate south between now and race-time.
              </p>
              <p>
                We wish competitors a safe but exciting race, and cross fingers that we suffer no power outage – the
                usual culprit that stops our website updating unattended while we are all on leave.
                <br />
                Look out for an update closer to race day.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="NSW_beaches_have_felt_the_cold_this_November">
                  <a href="#NSW_beaches_have_felt_the_cold_this_November" className="anchor">
                    NSW beaches have felt the cold this November
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">4 December, 2017</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="http://oceancurrent.imos.org.au/sst.php?link=SNSW/2017/2017112317.html">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20171204/2017112317_SST.gif"
                    style={{ height: '456px', width: '400px' }}
                  />
                </a>
                <br />
                Upwelled water has cooled the beaches along the coast of NSW from Coffs Harbour to southeastern Victoria
                for more than two weeks. &nbsp;Beach water temperatures from Coffs to Jervis Bay have been
                disappointingly cool at 16-17C but it’s been really cold (12-13C) on the southeast corner around Eden
                and East Gippsland. What is unusual about this event, however, is not so much the cold but how long it
                has lasted and how much of the coastline it affected. And it looks like we can blame
                <a href="http://www.abc.net.au/news/2017-12-01/why-south-east-australia-is-expecting-a-tropical-deluge/9210656">
                  the same blocking high in the Tasman Sea that brought record-breaking air temperatures in Tasmania
                </a>
                and parts of Victoria with a healthy contribution from the East Australian Current (EAC).
                <br />
                &nbsp;
              </p>
              <p>
                Upwelling is a coastal response to an alongshore wind and off the NSW coast an upwelling favourable wind
                is from the northeast. However, northeasterly winds in this region are relatively weak and short lived
                so upwelling events often only occur when the EAC gives the wind an assist by lifting the cold deep
                water closer to the surface. Throughout November, the EAC was close to the coast and a huge warm core
                eddy was sitting offshore between Sydney and Jervis Bay but there wasn’t any upwelling until the
                blocking high established itself in mid-November in the Tasman Sea.
                <br />
                <br />
                Winds around this blocking high, brought upwelling favourable winds to the entire southern NSW coast,
                strongest in the southeast corner and through Bass Strait.&nbsp; Although a blocking high in the Tasman
                is not at all unusual, it is unusual for one to stay for more than a week. This high stayed for two
                weeks and in that time winds were persistently from the northeast quadrant all along the southern NSW
                coast, decreasing northward. At the same time the EAC/eddy influence which was mostly from Jervis Bay
                northward created conditions so that even weakly upwelling winds would bring cool water to the surface.
                <br />
                <br />
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20171204/2017120220_4hr.gif"
                  style={{ height: '457px', width: '400px' }}
                />
              </p>
              <p>&nbsp;</p>
              <p>
                Along with the cold water, upwelling brings nutrients up to the surface where the phytoplankton can use
                it and grow.
                <a href="http://oceancurrent.imos.org.au/oceancolour.php?link=SNSW_chl/2017/2017112504.html">
                  Ocean colour images
                </a>
                indicate high chlorophyll-a concentration in the upwelled water. Near the coast, river runoff can
                contaminate the reading but in this case the colour is clearly associated with upwelling and indicates a
                strong phytoplankton response along much of the coastline. For a rich ecosystem, a persistent upwelling
                event is more important than a strong one as it allows the zooplankton time to respond to the
                phytoplankton growth and in turn provide food for the next step in the food chain.
                <br />
                <br />
                The blocking high looks like it is moving on now but not before a burst of upwelling favourable winds
                from Eden to Coffs in the first few days of December resulting in yet another cold pulse in beach
                temperatures!
                <br />
                &nbsp;
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="New_SST_images_with_Himawari_8_ndash_coming_soon">
                  <a href="#New_SST_images_with_Himawari_8_ndash_coming_soon" className="anchor">
                    New SST images with Himawari-8 – coming soon!
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">7 September, 2017</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="news/20170907/SST_Filled_DonPer_2017082308_v2.gif">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20170907/SST_Filled_DonPer_2017082308_v2.gif"
                    style={{ height: '360px', width: '450px' }}
                  />
                </a>
                Himawari-8 is Japan’s advanced geostationary weather satellite that provides a ‘full disc’ scan of Earth
                every 10 minutes. Fortunately for us, the centre of this view (at longitude 140.7°) is close to
                us.&nbsp; The result is an SST product spanning 80°E to 200°E with a resolution (2-4 km at the equator)
                that is nearly as good as the low-earth orbit NOAA satellites. Cloud is, of course, the bane of
                observers of satellite SST and Himawari-8 cannot see through cloud, but with so many looks there is a
                much better chance to piece together a clear view.
              </p>
              <p>
                OceanCurrent has developed 4-hour composite SST* based on the Bureau of Meteorology’s experimental
                Himawari-8 product. The first images are very promising - the animated gif (right) of 48 hours of the 4
                hour composites offshore from Perth shows tiny eddies, about 10km in diameter, being swirled around the
                large cyclonic eddy in the centre of the image. There are also a couple of tiny eddies just to the
                southeast of the central eddy. Eddies of this size have certainly been seen before but the presence of
                so many suggests they are much more prevalent than we thought and that they play an important part in
                mixing between two water masses. Also, the movement of these tiny eddies demonstrates not just the
                complexity of the SST but also of the surface velocity field. Note, the black vectors indicate the
                geostrophic surface velocity and the white vectors indicate wind direction. See also: the Bureau’s
                <a href="http://satview.bom.gov.au/">viewer</a> and
                <a href="http://www.bom.gov.au/australia/satellite/himawari.shtml">information page</a>.<br />* All
                available satellite SST (including NOAA15, NOAA18, NOAA19, VIIRS and MODIS) is used in the composites to
                get the best coverage to the coast.
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Jason_2_begins_a_new_phase_The_king_is_dead_long_live_the_king">
                  <a href="#Jason_2_begins_a_new_phase_The_king_is_dead_long_live_the_king" className="anchor">
                    Jason-2 begins a new phase: The king is dead, long live the king!
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill and Benoit Legresy</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">28 July, 2017</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="news/20170728/SLA_20170723.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20170728/SLA_20170723.png"
                    style={{ height: '639px', width: '400px' }}
                  />
                </a>
                Jason-2 has entered its End-of-Life phase – the Long Repeat Orbit (LRO) – having provided over 8 years
                of almost uninterrupted service since its launch in June 2008 until October 2016, when Jason-3 was ready
                to take over the exact-repeat orbit. Jason-2 and Jason-3 are part of the Ocean Surface Topography
                Mission (OSTM) that began when Topex/Poseidon was launched in September 1992 and completely changed our
                knowledge and understanding of ocean variability. Ocean sea level height from satellite altimeters is
                now an essential variable, routinely assimilated into global ocean models and wave models. Sea level
                anomaly (SLA) from satellite altimetry (tracks are indicated on the SLA) also provides the basis for
                knowing the
                <a href="http://oceancurrent.imos.org.au/sst.php?link=SE/20170723.html">
                  geostrophic ocean surface currents shown in OceanCurrent
                </a>
                .<br />
                &nbsp;
              </p>
              <p>
                <a href="news/20170728/alt_gmsl_seas_rem.jpeg">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20170728/alt_gmsl_seas_rem.jpeg"
                    style={{ height: '286px', width: '400px' }}
                  />
                </a>
                <br />
                &nbsp; Importantly, the 10 day exact-repeat orbit of the OSTM provides the backbone for certainty in our
                <a href="https://www.cmar.csiro.au/sealevel/sl_hist_last_decades.html">estimates of sea level rise</a>.
                In maintaining the same orbit with a succession of altimeters then all altimeter measurements can be
                referenced to the same level resulting in a 25 year record of global sea level (above). Also, by
                repetition, the geoid, and therefore the mean sea surface, can be more accurately defined making the
                observations more precise. The handover between missions, however, is an important part of our
                confidence and it relies on a short period of time when the two satellites follow the same orbit. So far
                NASA and CNES have jointly managed to maintain an incredible 25 unbroken years but this time it got a
                little close.
                <br />
                &nbsp;
              </p>
              <p>
                Jason-2 was put into an interleaving orbit once Jason-3 was established and managed to last another 6
                months before one of the gyroscopes that help maintain the satellite orbit and pointing started to fail
                and steering became occasionally problematic. It has now been nudged 27 km lower than its original
                altitude of 1,336 km so that should it fail it won’t interfere with its successor. It has been put into
                a 17 day almost-repeat orbit ensuring &nbsp;high quality global mesoscale coverage every 17 days but it
                will not be repeating the same track each cycle. Now that Jason-2 has handed the reference orbit baton
                to Jason-3 it can provide data in new regions of the ocean, in between the reference tracks, to improve
                and fill the gaps of bathymetry and mean sea surface. The longer it spends in this new orbit the more
                improvement it will bring to geophysical applications while still fulfilling the operational
                oceanography needs.
                <br />
                &nbsp;
                <br />
                &nbsp;
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Oceanographer_seals">
                  <a href="#Oceanographer_seals" className="anchor">
                    Oceanographer seals{' '}
                  </a>
                </h3>
                <h5>
                  <em>David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">18 May, 2017</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/http://oceancurrent.imos.org.au/SNSW_chl/2014/2014092404.gif"
                  style={{ height: '685px', width: '600px' }}
                />
                &nbsp;We recently added the tracks of our well-equipped seals to our archive of high-res satellite
                imagery (chlorophyll, SST and surface current). A 2014 trip by a male New Zealand Fur Seal from Montague
                Island to Jervis Bay – the long way - is particularly intriguing. The image at right&nbsp;shows the
                final 2 days of his trip around a warm-core, low surface chlorophyll eddy of the East Australian
                Current. His voyage started on 8 September and if you step through
                <a href="http://www.marine.csiro.au/oceancurrent/oceancolour.php?link=SNSW_chl/2014/2014092404.html">
                  the images
                </a>
                it’s hard not to think he has the imagery in front of him, or that he is laying on his back and just
                drifting with the current, occasionally
                <a href="http://oceancurrent.imos.org.au/aatams.php?type=aatamsTag&amp;tag=Q9900705&amp;date=20140923">
                  diving
                </a>
                down to 100m to&nbsp; check the stratification. Is the edge of the eddy better fishing? Does he like the
                <a href="http://oceancurrent.imos.org.au/sst.php?link=SNSW/2014/2014092214.html">warm</a>
                water? Can he sense his drift velocity? Do seals talk all day about ocean currents, fishing, or both?
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Fish_Die_Off_Continues_Now_on_Tasmanian_Beaches">
                  <a href="#Fish_Die_Off_Continues_Now_on_Tasmanian_Beaches" className="anchor">
                    Fish Die-Off Continues; Now on Tasmanian Beaches
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">27 April, 2017</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20170427/Leatherjacket_AnnaGeorge.jpg"
                  style={{ height: '735px', width: '400px' }}
                />
                It has been over a month since the tropical leatherjacket species started washing up on the beaches of
                far-eastern Victoria.&nbsp;
                <a href="http://agriculture.vic.gov.au/fisheries/policy-and-planning/marine-pests-and-diseases/mallacoota-fish-death-investigation">
                  Fisheries Victoria concluded
                </a>
                that the event was most likely due to the extreme temperature change associated with the upwelling event
                off East Gippsland. Fishers reported a sharp ‘temperature break’ with 25° clear water alongside 16°C
                cloudy water, evidence of which could be seen from the air on March 31. Since then there have been
                reports of leatherjackets washing up in large numbers on Tasmanian beaches all along the eastern
                coastline,
                <a href="http://www.redmap.org.au/region/tas/sightings/2892/">
                  most recently as far south as Fortescue Bay
                </a>
                .&nbsp; The fish are often observed to be alive but struggling. There have been no strong upwelling
                events off Tasmania to cause the same dramatic temperature front as seen off Victoria. Indeed,
                <a href="http://oceancurrent.imos.org.au/daily.php?link=DR_SST_daily/pctiles/Syd-Hob/20170421.gif">
                  surface temperatures off eastern Tasmania are close to median (50th percentile)
                </a>
                values. However, since this species is
                <a href="http://bie.ala.org.au/species/urn:lsid:biodiversity.org.au:afd.taxon:0f002cd0-1d91-4988-9b25-7848c3118372">
                  most commonly found off northern Australia and less frequently along the NSW coastline
                </a>
                , Fisheries Tasmania has concluded that they have simply reached the extent of their temperature range
                and are dying when they encounter the cooler southern waters.
                <br />
                &nbsp;
              </p>
              <p>
                <a href="http://www.abc.net.au/radionational/programs/bushtelegraph/tropical-leatherjackets-wash-up-in-record-numbers-in-bay-of-fir/5500028">
                  The last event like this in Tasmania
                </a>
                happened in 2014 when the East Australian Current had extended unusually far south
                <a href="http://theconversation.com/things-warm-up-as-the-east-australian-current-heads-south-31889">
                  bringing with it a number of tropical species
                </a>
                . This year John McGiveron from the Tasmanian Game Fishing Association says fishers have seen a lot of
                dead fish floating offshore and that a lot of them are found in the stomachs of bluefin tuna. Events
                like this have been more common previously off NSW but if the EAC continues its push south we will
                probably see more of them on Tasmanian beaches. Apparently, though, even last weekend there were still a
                lot of leatherjackets that hadn’t yet succumbed to the cold. CSIRO oceanographer, Alistair Hobday,
                reported seeing large schools of leatherjackets swimming in waters off the Tasman Peninsula.
                <br />
                &nbsp;
                <br />
                *FishyQuestionMark courtesy of Anna &amp; George Cresswell, made on Taylor's Beach, Tasmania
                <br />
                &nbsp;
              </p>
              <p>&nbsp;</p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Mass_Fish_Die_Off_at_Mallacoota_Upwelling_and_the_EAC">
                  <a href="#Mass_Fish_Die_Off_at_Mallacoota_Upwelling_and_the_EAC" className="anchor">
                    Mass Fish Die-Off at Mallacoota: Upwelling and the EAC?
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">4 April, 2017</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20170404/Deadfish2.PNG"
                  style={{ height: '225px', width: '400px' }}
                />
                Thousands of dead fish have been washing up on the shores of far eastern Victoria and southern NSW. They
                started appearing on the beach in small numbers around March 11 but came in en masse in the last few
                weeks of March. Although most of the fish appear to be leatherjackets, there are also whiting, black
                sole, puffer fish, boxfish, sea urchins, flathead and even some penguins.
                <a
                  href="http://www.merimbulanewsweekly.com.au/story/4548520/wave-of-dead-fish-washing-up-at-mallacoota/#slide=1"
                  className="anchor"
                >
                  Locals noticed the die-off coincided with a drop in ocean surface water temperature
                </a>
                of 7°C and a lot of algae (described as a browny-green sludge) in the ocean.
              </p>
              <p>
                These observations are consistent with the satellite imagery. Cold upwelled water is evident from
                <a href="http://oceancurrent.imos.org.au/daily.php?link=DR_SST_daily/SST/Syd-Hob/20170308.gif">Mar 8</a>
                and persists for the rest of the month. SST images,
                <a href="http://oceancurrent.imos.org.au/daily.php?link=DR_SST_daily/SST/Syd-Hob/20170312.gif">
                  Mar 12
                </a>
                &amp;
                <a href="http://oceancurrent.imos.org.au/daily.php?link=DR_SST_daily/SST/Syd-Hob/20170325.gif">
                  Mar 25
                </a>
                , indicate the upwelled water extended for 50 – 100km along the coast and across Bass Strait.&nbsp;
                These images also show the water offshore is a warm 22°C and at times is separated by only 25km from the
                14°C upwelled water. The
                <a href="http://oceancurrent.imos.org.au/oceancolour.php?link=Syd-Hob_chl/2017/2017031404.html">
                  Modis Chl-a image for March 14
                </a>
                shows an intense algal bloom associated with the upwelled water extending for almost 200km along the
                Victorian coast that persists throughout the month.
                <br />
                <br />
                The northeastern corner of Bass Strait is a well-known upwelling region and, as for the NSW coast, the
                two drivers for bringing cold, nutrient rich waters to the ocean surface are wind forcing and dynamic
                uplift created when EAC currents encroach on the continental slope*. This March these two drivers seem
                to have combined for maximum effect. Winds were persistently upwelling favorable for the far eastern
                Victorian coastline and a large EAC eddy sat just offshore for most of the month (Mar 12).
                <a href="http://oceancurrent.imos.org.au/daily.php?link=DR_SST_daily/pctiles/Syd-Hob/20170312.gif">
                  SST percentiles (Mar 12)
                </a>
                show the upwelled water was within the coldest 10% of temperatures observed in March for that region
                while the EAC waters just offshore were in the top 10% of temperatures. Colder upwelled water implies a
                higher nutrient concentration as it is likely to have come from deeper in the water column. Warm EAC
                water on the other hand, though depleted in nutrients, allows for rapid phytoplankton growth, so there
                may be increased algal growth where the two water masses meet.
                <br />
                <br />
                The cause of the fish deaths is still to be established but could include hypoxia caused through oxygen
                depletion when the algae die off or suffocation due to the algae blocking the fish gills or even shock
                due to the rapid change in temperature. The Victorian EPA is investigating the event to determine the
                exact cause of the deaths and the various factors could be complex. Whatever the cause of this fish kill
                it appears that
                <a href="http://oceancurrent.imos.org.au/#20160825" className="anchor">
                  increased southward extension of the EAC
                </a>
                that has become apparent since at least 2014 has contributed to creating both a stronger upwelling event
                and higher gradients in temperature.
                <br />
                &nbsp;
              </p>
              <p>
                *Roughan, M.<cite>, and</cite> J. H. Middleton <cite>(</cite>2004<cite>)</cite>
                <cite>, </cite>On the East Australian Current: Variability, encroachment, and upwelling<cite>, </cite>J.
                Geophys. Res.<cite>, </cite>109<cite>, </cite>
                <cite>C07003, doi:</cite>
                <cite>
                  <a href="http://dx.doi.org/10.1029/2003JC001833">10.1029/2003JC001833</a>
                </cite>
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Final_Port_to_Pub_Ocean_Forecast">
                  <a href="#Final_Port_to_Pub_Ocean_Forecast" className="anchor">
                    Final Port-to-Pub Ocean Forecast
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">24 March, 2017</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <br />
                <a href="http://rs-data3-mel.csiro.au/porttopub-swim-live/">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20170324/Final_10hrs.png"
                    style={{ height: '186px', width: '400px' }}
                  />
                </a>
                The <a href="http://coastaloceanography.org/">ocean forecast</a> for the Port-to-Pub swim remains for
                strong northward flow on Saturday, persisting throughout the day. This strong cross current will
                increase the swim times for all swimmers by about 15 minutes for the fastest to up to an hour for the
                slower swimmers. In order to stay close to the buoys but not get swept north of Rottnest we advise
                heading almost westward at the start and then gradually increasing your southward heading as you
                approach Rottnest Island and the current becomes stronger. Your best heading will depend on your
                swimming speed and the
                <a href="http://rs-data3-mel.csiro.au/porttopub-swim-live/">swim-optimizer</a>
                can help you with that.&nbsp; The good news is that the Bureau of Meteorology is forecasting weak winds
                from the east so the sea chop should not affect your swim time. Of course, our advice is based on
                forecasts which may turn out to be different on the day so all swimmers are advised to adjust their plan
                to the conditions on the day. Good luck to all swimmers from the OceanCurrent team!
                <br />
                &nbsp;
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="The_Port_to_Pub_Ocean_Forecast">
                  <a href="#The_Port_to_Pub_Ocean_Forecast" className="anchor">
                    The Port-to-Pub Ocean Forecast
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">21 March, 2017</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                The ocean forecast for the Port-to-Pub swim on Saturday is for strong and persistent northward currents,
                weakly northward near Freemantle but ramping up to almost 1kn about half way through the crossing. There
                is also predicted to be a slight shoreward push in the currents, which will make the swim take that
                little bit longer. It’s early days yet though and the
                <a href="http://rs-data3-mel.csiro.au/porttopub-swim-live/">swim-optimizer</a>
                will be updated every morning with forecasts from the
                <a href="http://coastaloceanography.org/" target="_blank" rel="noreferrer">
                  Oceans Institute of University of Western Australia
                </a>
                with the final forecast coming out on Friday.&nbsp; Note, we do not factor in the 5 km loop for the
                ultra-marathoners but you can still use the optimizer for the channel crossing.
                <br />
                <br />
                <a href="http://rs-data3-mel.csiro.au/porttopub-swim-live/">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20170321/Swim_Optimizer.png"
                    style={{ height: '227px', width: '400px' }}
                  />
                </a>
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Rottnest_Swim_Forecast">
                  <a href="#Rottnest_Swim_Forecast" className="anchor">
                    Rottnest Swim Forecast
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">22 February, 2017</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <div className="row">
                <div className="col-md-6">
                  <p>
                    The forecast for the Rottnest swim this Saturday is for southward currents getting stronger
                    throughout the day, particularly near Rottnest Island. So at this point, our advice is to stay close
                    to the northern buoys, throughout the race, particularly those swimmers who will still be in the
                    water after 11am. Winds are expected to be light and from the north-east. You can
                    <a href="http://rs-data3-mel.csiro.au/rottnest-swim-live/" target="_blank" rel="noreferrer">
                      optimise your swim time
                    </a>
                    based on the ocean current predictions by the
                    <a href="http://coastaloceanography.org/">
                      Oceans Institute of the University of Western Australia
                    </a>
                    . The ocean forecast depends on the weather forecast, which may change. Our last update is Friday
                    morning.
                  </p>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <a href="http://rs-data3-mel.csiro.au/rottnest-swim-live/">
                      <img
                        alt=""
                        className="img-responsive"
                        src="https://oceancurrent.aodn.org.au/news/20170222/ScreenShot.png"
                        style={{ height: '197px', width: '400px' }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Sydney_Hobart_ocean_currents">
                  <a href="#Sydney_Hobart_ocean_currents" className="anchor">
                    Sydney-Hobart ocean currents
                  </a>
                </h3>
                <h5>
                  <em>David Griffin</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">22 December, 2016</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <a href="http://oceancurrent.imos.org.au/SNSW/2016/2016121916.html">
                  <img
                    src="https://oceancurrent.aodn.org.au/http://oceancurrent.imos.org.au/SNSW/2016/2016121916.gif"
                    style={{ height: '300px' }}
                  />
                </a>
                <a href="http://www.rolexsydneyhobart.com/news/2016/pre-race/rolex-sydney-hobart-yacht-race-looks-like-a-quick-race-this-year/">
                  Today's weather briefing
                </a>
                for the Rolex Sydney Hobart yacht race foreshadowed a quick race with northerly winds at first then a
                southerly when the fleet are in southern NSW waters. Ocean currents (on present indications) are also
                favourable for a quick race, especially at first, when a tail current associated with a large
                anti-clockwise (warm-core) eddy off Sydney will add a few knots to the fleet's speed over the ground.
              </p>
              <p>
                The challenge here will be deciding how far offshore it is best to go to optimize current as well as
                wind. The first image at right (click to expand) shows the cooler coastal temperatures that we often see
                under these conditions and associate with reduced southward speed. This eddy has been off Sydney since
                about
                <a href="http://oceancurrent.imos.org.au/SE/20161207.html">7 Dec</a>
                and is quite likely to still be there on race day.
              </p>
              <p>
                The first image at right also shows a small clockwise eddy south of Jervis Bay. This will either grow in
                place or be swept southwards in coming days. In either case, it will mean that inshore and offshore
                yachts may experience very different currents off southern NSW while also dealing with the southerly
                wind change presently forecast.
              </p>
              <p>
                <a href="http://oceancurrent.imos.org.au/Syd-Hob/2016/2016122120.html">
                  <img
                    src="https://oceancurrent.aodn.org.au/http://oceancurrent.imos.org.au/Syd-Hob/2016/2016122120.gif"
                    style={{ height: '300px' }}
                  />
                </a>
                Currents east of Bass Strait do not appear to be particulary strong this year. The rhumbline (2nd image
                at right) presently cuts across a large but fairly weak clockwise eddy that is likely to persist until
                race day.
              </p>
              <p>
                As in past years, anyone wishing to overlay the
                <a href="http://www.rolexsydneyhobart.com/tracker/google-earth/">yachts' positions</a>
                on
                <a href="http://oceancurrent.imos.org.au/GE.php">our maps of ocean currents</a>
                can do this using Google Earth.
              </p>
              <p>
                We wish the competitors a safe but exciting race, and cross our fingers that our computers keep running
                unattended through our Christmas Shutdown. If our images stop updating, it probably means there has been
                a power interruption in Hobart.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="SealCTDs_Temperature_and_Salinity_Profiles_from_Ocean_Mammals">
                  <a href="#SealCTDs_Temperature_and_Salinity_Profiles_from_Ocean_Mammals" className="anchor">
                    SealCTDs: Temperature and Salinity Profiles from Ocean Mammals
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">7 December, 2016</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                The IMOS Animal Tracking Facility has deployed over 250 SealCTDs (miniaturized CTD sensors with an ARGOS
                antenna) on Elephant Seals, Sea Lions, Fur Seals and Weddell Seals since 2009. The data can now be
                viewed on OceanCurrent. The original motive for the sensors was to provide information about animal
                behaviour but the physical data they have collected has already been valuable in studies of Antarctic
                bottom water formation, the global heat budget, Southern Ocean frontal structure and sea ice formation.
              </p>
              <p>
                <br />
                <a href="news/20161207/SealCTD_graphic.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20161207/SealCTD_graphic_2.png"
                    style={{ height: '259px', width: '400px' }}
                  />
                </a>
                <br />
                Argo float and seals provide different styles of profiling. Argo floats (in standard configuration)
                transmit a 2000m deep profile, with high vertical resolution, every 10 days whereas the SealCTDs
                transmit a profile every 6 hours. Each CTD sensor records data from every dive but selects the ascent
                profile from the deepest dive over the last 6 hours. In order to prolong battery life and to ensure the
                whole profile is transmitted before the seal dives again, the profile is also compressed (by calculating
                break-points) before transmission. The SealCTD (or tag) is glued onto the animal's head and drops off
                during their moult.
                <br />
                <br />
                The temperature and salinity profiles (right) during a female Elephant Seal’s journey from Kerguelen
                Island demonstrate the high temporal and spatial resolution possible of the upper 500m of the ocean.
                During her two-month journey this seal travelled through at least four distinct regions before losing
                her tag in the melting ice. The time series are also plotted in 10 day sections with the seal’s location
                indicated.&nbsp;
                <br />
                &nbsp;
                <br />
                Some SealCTDs have been deployed in the Great Australian Bight (GAB) and southern New South Wales. The
                Sea Lions in the GAB appear to have a different profiling strategy compared to their cousins in
                Antarctica. One GAB Sea Lion spent 5 months of the 2015/2016 summer repeating a transect across the
                shelf from the head of the Bight. His travels document the degree of uplifted water coming onto the
                shelf along the bottom and also the development of a deep water salinity maximum (right).
                <br />
                <br />
                <a href="news/20161207/GAB_10d_20160301.gif">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20161207/GAB_10d_20160301.gif"
                    style={{ height: '255px', width: '400px' }}
                  />
                </a>
              </p>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
              <p>
                <br />
                &nbsp;
                <br />
                &nbsp;
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="EAC_Eddies_are_coming_to_Tasmania">
                  <a href="#EAC_Eddies_are_coming_to_Tasmania" className="anchor">
                    EAC Eddies are coming to Tasmania
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">25 August, 2016</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                Around the globe 2015 was an exceptionally warm year for both land and ocean temperatures. For Tasmania
                though, the heat continues with sea surface temperatures off the east coast hotter than ever this year.
                Much of the warming can be attributed to the unusual presence of EAC eddies south of Bass Strait. For
                example (right) the eddy off NE Tasmania encountered by the
                <a href="http://www.setfia.org.au/survey-finds-10-million-orange-roughy-off-eastern-tasmania/">
                  Orange Roughy survey team
                </a>
                during July this year.
                <a href="http://oceancurrent.imos.org.au/#20160428" className="anchor">
                  Eddies have been tracked travelling down the coast of Tasmania
                </a>
                before - what is unusual is the dramatic increase in the size and frequency of these eddies over the
                last few years.
                <br />
                <br />
                <a href="http://oceancurrent.imos.org.au/sst.php?link=TasE/2016/2016071323.html">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20160825/Eddy_13072016.png"
                    style={{ height: '381px', width: '400px' }}
                  />
                </a>
              </p>
              <p>
                An estimate of the spatially-averaged eddy kinetic energy¹ (EKE) in the waters off eastern Tasmania
                shows how much the eddy climate has varied over the last 24 years. Throughout the 1990s, EKE south of
                Bass Strait (blue line) is much lower than that in the EAC extension region just north of Bass Strait
                (red line). Prior to the 1990s few eddies got past Bass Strait. After the 1990s EKE increased gradually
                both north and south of Bass Strait. In the summer of 2014, Tasmanian waters saw a huge spike in eddy
                activity (8 times the average EKE of the 1990s) and since then it has peaked a number of times to levels
                much higher than those seen before 2014. In that time, EKE in the EAC extension has also increased,
                consistent with an
                <a href="http://www.oceanclimatechange.org.au/content/images/uploads/EAC.pdf">
                  increase in the strength of the EAC.
                </a>
                <br />
                <a href="news/20160825/EKE_fig_final.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20160825/EKE_fig_final.png"
                    style={{ height: '205px', width: '400px' }}
                  />
                </a>
              </p>
              <p>
                The influence of these eddies goes well beyond the sea surface temperature. Argo floats sampled the eddy
                pictured above both at its centre and at its outer edge near the continental slope. Temperatures at the
                centre of the eddy were more than 2° warmer than the year round average between 100 and 400m depth and
                almost 1° warmer down to 1200m depth. How much the eddy properties impinge on the shelf is highly
                dependent on the size and path of each eddy but with their greater frequency and size, these eddies will
                inevitably impact coastal waters.
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20160825/Argo_vs_CARS_p2.gif"
                  style={{ height: '600px', width: '400px' }}
                />
              </p>
              <p>
                In July of both 2015 and 2016 there were large eddies off the NE of Tasmania impacting on the eastern
                <a href="http://www.sciencedirect.com/science/article/pii/S0165783615000880">
                  Orange Roughy spawning ground during their spawning time
                </a>
                . The eddy velocities of over 2 knots (Rudy Kloser, pers comm) persisted for much of the survey² in July
                this year. How the spawning ground preference and larvae are impacted by the increased temperatures and
                velocities due to the eddies is unknown at this stage but given that it has occurred now two years in a
                row we may well find out in the future.
                <a href="http://onlinelibrary.wiley.com/doi/10.1002/2014JC010550/abstract">
                  Transport within the EAC extension has increased between 1948 and 2014
                </a>
                and is predicted to
                <a href="http://onlinelibrary.wiley.com/doi/10.1002/jgrc.20202/abstract">
                  increase further with climate change
                </a>
                . The observed trend in eddy activity over the last 24 years, particularly off Tasmania,
                <a href="http://onlinelibrary.wiley.com/doi/10.1002/jgrc.20202/abstract">
                  is in agreement with the direction of the trend predicted with climate change.
                </a>
                The sudden pulses of eddies, which we have seen over the last few years, may be temporary but at this
                point we cannot be sure. Impacts on the state’s aquaculture and fisheries are similarly unclear at this
                point but it does appear that the risk of a continuation of recent trends should be taken seriously.
                <br />
                <br />¹ Eddy kinetic energy was estimated using geostrophic currents from the IMOS OceanCurrent gridded
                sea level anomaly (
                <a href="http://thredds.aodn.org.au/thredds/catalog/IMOS/OceanCurrent/GSLA/DM00/catalog.html">
                  GSLA DM00
                </a>
                ).
                <br />² The Orange Roughy survey is part of the SETFIA/AFMA/CSIRO ongoing monitoring program.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Is_La_Ni_ntilde_a_coming">
                  <a href="#Is_La_Ni_ntilde_a_coming" className="anchor">
                    Is La Niña coming?
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">4 July, 2016</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                The Niño indices have turned.
                <a href="http://www.weatherzone.com.au/climate/indicator_enso.jsp?c=nino34&amp;p=weekly">Nino3.4</a>
                and the
                <a href="http://www.weatherzone.com.au/climate/indicator_enso.jsp?c=soi&amp;p=weekly">
                  Southern Oscillation Index
                </a>
                (SOI) have been in the El Niño phase for almost 2 years but they have both just moved weakly into the La
                Niña phase and everyone is waiting to see what the future holds.&nbsp;
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20160704/SLA_WEqPac.png"
                  style={{ height: '188px', width: '400px' }}
                />
                <br />
                During La Niña the trade winds are stronger than usual, allowing a warm pool of water to pile up north
                of New Guinea, and altimeter data is showing us that the sea level is starting to rise (right).&nbsp;
                Sea level anomalies north of New Guinea (SLA-NNG) are strongly negatively correlated with Nino3.4 and
                both indices have recently jumped sharply.
              </p>
              <p>
                Warm water is more easily evaporated, providing more moisture to weather systems passing over it. With
                La Niña’s stronger trade winds this moisture is directed over eastern and northern Australia
                particularly during
                <a href="http://www.bom.gov.au/climate/enso/ninacomp.shtml">winter and spring</a>. For Australia, the La
                Niña event of 2010-2011 was one of the strongest on record, bringing devastating floods to southeast
                Queensland and Victoria.
                <br />
                &nbsp;
                <br />
                The high western Pacific sea level anomaly associated with La Niña has consequences for the west coast
                of Australia: inducing a strong Leeuwin Current and warmer ocean temperatures. In early 2011, the west
                coast experienced an unprecedented marine heat wave (
                <a href="http://www.nature.com/srep/2013/130214/srep01277/full/srep01277.html">Ningaloo Niño</a>)
                largely due to the strengthening of the Leeuwin Current during the summertime, when it is usually at
                it’s weakest, assisted by an anomalous heat flux into the ocean. This warming event caused
                <a href="http://www.fish.wa.gov.au/Documents/research_reports/frr222.pdf">
                  drastic changes in the marine ecosystem and strongly impacted fisheries
                </a>
                off the west coast. The Niño indices can give us some indication of what is to come for the summer of
                2017 but leading CSIRO scientist, Ming Feng, warns that the contribution of local air-sea coupling
                remains unpredictable.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="June_6_East_Coast_Low_Epic_Waves">
                  <a href="#June_6_East_Coast_Low_Epic_Waves" className="anchor">
                    June 6 East Coast Low - Epic Waves
                  </a>
                </h3>
                <h5>
                  <em>Madeleine Cahill and Mark Hemer</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">8 June, 2016</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <img
                alt=""
                src="https://oceancurrent.aodn.org.au/http://www.marine.csiro.au/remotesensing/oceancurrent/SWH/SE_ww3/2016060612.gif"
                style={{ height: '529px', width: '400px' }}
              />
              <p>
                The satellite altimeters that we use in OceanCurrent for estimating ocean currents also measure the
                height of the waves. The East Coast Low that has brought flooding to parts of Qld, NSW and Tasmania has
                also
                <a href="http://www.coastalwatch.com/surfing/17101/magnificent-monday-6th-june-nsw-in-pictures">
                  generated huge swell
                </a>
                . The downside to these magnificent waves is highlighted by the
                <a href="https://twitter.com/BOM_au/status/738852298298957825">Bureau of Meteorology</a>
                putting the coastal regions on high alert. The potential for coastal property damage is increased when
                the large waves and storm surge occur during king tides. At 8m, the altimeter estimate of significant
                wave height falls a little short of the predicted 9m but, as the
                <a href="http://www.swellnet.com/news/swellnet-analysis/2016/06/03/black-noreaster-historical-study">
                  Swellnet team report
                </a>
                , the atmospheric build up for this storm set it apart.
              </p>
              <p>
                Significant wave height measured by altimeters (Jason-2, Cryosat-2 and AltiKa) is plotted over the
                wavewatch3 forecast heights in the Tasman Sea on 6 June (right). The wave field changes quite quickly so
                we don't expect a perfect match as the altimeter passes included in this plot are up to 9 hours after
                and 7 hours before the forecast. The satellite wave measurements complement in-situ wave measurements
                (e.g., the NSW Manly Hydraulics Lab waverider buoys), by resolving the spatial variability of the wave
                field over a larger domain. Together, they are used to assess and ultimately improve wave forecast
                models.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Slocum_gliders_track_sub_surface_warming_in_the_Great_Barrier_Reef">
                  <a href="#Slocum_gliders_track_sub_surface_warming_in_the_Great_Barrier_Reef" className="anchor">
                    Slocum gliders track sub-surface warming in the Great Barrier Reef
                  </a>
                </h3>
                <h5>
                  <em>Jessica Benthuysen and Madeleine Cahill</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">24 May, 2016</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <div className="row">
                <div className="col-md-7">
                  <p>
                    <br />
                    In recent months, widespread
                    <a href="http://www.gbrmpa.gov.au/managing-the-reef/threats-to-the-reef/climate-change/what-does-this-mean-for-species/corals/what-is-coral-bleaching">
                      coral bleaching
                    </a>
                    has been reported from the Northern to the Central Great Barrier Reef (GBR). The main cause of coral
                    bleaching is persistently high sea temperatures. This bleaching event has coincided with a marine
                    heat wave on the GBR where the monthly average sea surface temperature (SST) anomaly for March was
                    greater than 1º for much of the Central GBR, and reaching 2º for much of the Northern GBR.
                    <br />
                    &nbsp;
                  </p>

                  <p>
                    Since October 2015, IMOS and CSIRO Slocum gliders have traversed this region, tracking the seasonal
                    evolution of coastal waters. The intensive missions were principally planned to help validate the{' '}
                    <a href="https://research.csiro.au/ereefs/">eReefs</a> model but have also provided unprecedented
                    observations of the formation, persistence and now waning of the thermal stress of the GBR waters.
                    Glider pilots remotely navigate the gliders through complex pathways between reefs, which can be
                    challenging with strong currents and tides. Gliders are capable of making observations in places
                    difficult for ships and can stay at sea for several weeks. By sampling the water in see-saw manner,
                    the gliders can reveal how deep the warming extends. By April 2016,
                    <a href="http://oceancurrent.imos.org.au/gliders/Cairns20160324_nrt_4d/Cairns20160324_nrt_4d.fli">
                      glider observations
                    </a>
                    indicated water throughout the water column on the inner shelf was still warmer than
                    <a href="http://oceancurrent.imos.org.au/gliders/missionts.php?link=sl_Cooktown20160322_nrt.html">
                      historical observations
                    </a>
                    .
                  </p>
                </div>

                <div className="col-md-5">
                  <img
                    alt=""
                    className="img-responsive"
                    src="https://oceancurrent.aodn.org.au/news/20160524/Screen_Shot_2016-05-23_at_5.22.12_pm_1.png"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-7">
                  <p>
                    <br />
                    While revealing where the warming occurs, the gliders can also show where cooling occurs. A glider
                    transect in Palm Passage, on the outer Central GBR,&nbsp;
                    <a href="http://oceancurrent.imos.org.au/gliders/GBR20151103_nrt_12d/latest.html">
                      detected upwelling
                    </a>
                    , in which cooler water lifts up onto the shelf from offshore. This cool water may provide relief to
                    marine ecosystems sensitive to the marine heatwave. SST from 27 March (below) indicate the outer
                    reef of the Northern GBR, 2-3 degrees cooler, than the inner reef, may be buffered by a
                    <a href="http://www.gbrmpa.gov.au/__data/assets/pdf_file/0016/4444/chpt-3-Steinberg-2007.pdf">
                      combination of upwelling and tidal mixing
                    </a>
                    .
                  </p>

                  <p>
                    In May 2016 two gliders identified the existence of
                    <a href="https://www.researchgate.net/publication/298253427_Factors_influencing_the_occurrence_of_Dense_Shelf_Water_Cascades_in_Australia">
                      dense shelf water cascades
                    </a>
                    for the first time in the Central and Northern GBR. These cascades can occur when heat loss during
                    autumn causes waters to cool and become more dense near the coast. Both cascades occurred nearly at
                    the same time off&nbsp;
                    <a href="http://oceancurrent.imos.org.au/gliders/Cooktown20160503_nrt_12d/latest.html">
                      Port Douglas
                    </a>
                    and the other off
                    <a href="http://oceancurrent.imos.org.au/gliders/Cooktown20160503_nrt_12d/latest.html">
                      Mission Beach
                    </a>
                    south of Cairns. These cascades flow offshore and can cool the communities living near the sea bed.
                    Ongoing glider deployments into winter will inform how long the warming lasts.
                  </p>
                </div>

                <div className="col-md-5">
                  <img
                    alt=""
                    className="img-responsive"
                    src="https://oceancurrent.aodn.org.au/news/20160524/Screen_Shot_2016-05-24_at_12.44.32_pm.png"
                  />
                </div>
              </div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Tracking_EAC_warm_core_eddies">
                  <a href="#Tracking_EAC_warm_core_eddies" className="anchor">
                    Tracking EAC warm core eddies
                  </a>
                </h3>
                <h5>
                  <em>Gabriela Semolini Pilo, PhD candidate at UTAS/CSIRO</em>
                </h5>
              </div>

              <div>
                <p className="font-bold">28 April, 2016</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                The EAC is the ocean boundary current that flows from Queensland to northern NSW. The current usually
                separates from coast somewhere north of Sydney and then heads west. During the separation process, the
                EAC forms a large meander that can close off and release large, O(100km)&nbsp; rotating structures
                called eddies. These eddies carry the warm and salty EAC waters as they move along the
                <a href="http://onlinelibrary.wiley.com/doi/10.1029/2012GL053091/abstract">“Eddy Avenue”</a>, from their
                formation region down to Tasmania. They can bring
                <a href="http://www.smh.com.au/environment/weather/come-in-sydney-the-waters-sublime-20120510-1yfor.html">
                  warm water to swimmers in Bondi
                </a>
                but also
                <a href="https://earthdata.nasa.gov/user-resources/sensing-our-planet/pedestrians-of-eddy-avenue">
                  relocate some tropical species down to temperate Tasmanian waters
                </a>
                . What happens to these eddies when they reach Tasmania? Do they just dissipate or do they keep going?
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20160428/EAC_retroflex.png"
                  style={{ height: '229px', width: '400px' }}
                />
              </p>
              <p>
                To answer these questions, ocean eddies were tracked in weekly satellite altimetry gridded maps. This
                tracking is possible due to their signature in Sea Level Anomaly (SLA) fields. As a result of their
                dynamics and rotation sense, warm core eddies appear in SLA fields as positive anomalies (i.e. their
                surface height is larger than the ocean’s mean height).
                <br />
                &nbsp;
                <img
                  alt=""
                  data-main-image="true"
                  src="https://oceancurrent.aodn.org.au/news/20160428/eddies_altimetry.png"
                  style={{ height: '215px', width: '400px' }}
                />
                <br />
                The tracks (see right) of 12 eddies formed in the EAC show their propagation down the east coast of
                Tasmania, sometimes moving around the island and heading westward towards the Great Australian Bight.
                This means that the EAC water trapped inside these eddies can reach regions farther than expected. These
                results suggest that warm core eddies can carry heat and salt from the tropics all the way to the Great
                Australian Bight. These warm core eddies rotate at ~20 cm/s at formation and propagate at 3-8 cm/s. They
                can live up to 4 years before slowing down and dissipating completely.
                <br />
                &nbsp;
                <br />
                Recently, since February, a warm core eddy carrying surface waters of 18ºC has been slowly cruising
                along the Eastern Tasmanian coast. This eddy has a diameter of ~250 km and could be as deep as 1000 km.
                That is equivalent to 6.5 Sydney Towers! Now, the eddy is about to move beyond Tasmania’s southern tip
                and continue its journey to the far west&nbsp; (bottom figure).
                <br />
                &nbsp;
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20160428/IMOS_2016041920_eddy_tassie.gif"
                  style={{ height: '350px', width: '400px' }}
                />
                <br />
                The full paper on warm core eddies is available here:
                <br />
                Pilo, G. S., P. R. Oke, T. Rykova, R. Coleman, and K. Ridgway (2015), Do East Australian Current
                anticyclonic eddies leave the Tasman Sea?, J. Geophys. Res. Oceans, 120, 8099–8114, doi:
                <a href="http://dx.doi.org/10.1002/2015JC011026">10.1002/2015JC011026</a>.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="The_EAC_Array_Revealing_the_Boundary_Current">
                  <a href="#The_EAC_Array_Revealing_the_Boundary_Current" className="anchor">
                    The EAC Array - Revealing the Boundary Current
                  </a>
                </h3>
              </div>

              <div>
                <p className="font-bold">31 March, 2016</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20160331/EAC_Array_SS_1.png"
                  style={{ height: '276px', width: '400px' }}
                />
                Ocean western boundary currents redistribute heat around the world and have a profound effect on the
                world’s climate. The East Australian Current (EAC) is the major pole-ward flowing current of the South
                Pacific. It provides the dominant mechanism for transporting heat from the equatorial Pacific to the
                cooler mid-latitudes. Satellite observations show the spatial extent and variability at the surface but
                the subsurface velocities and properties can extend to depths of thousands of meters and remain largely
                unknown.
              </p>
              <p>
                Data from the first deployment, April 2012-August 2013, reveal the complexity and dynamic nature of the
                EAC, including the offshore return flow and the episodic nature of the deep northward undercurrent. The
                EAC array was designed to capture the entire breadth and depth of the flow. For this reason it was
                placed off Brisbane where the current is almost at full strength and still in jet form rather than as a
                complex eddy field found further south. Even so, there are a few days in June 2012 when a rarely
                occurring eddy pushes the main stream of the EAC further offshore than the 150km extent of the array.
                <a href="http://oceancurrent.imos.org.au/sst.php?link=SE/2012R00/20120525.html">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20160331/EAC_Array_20120525_v1.png"
                    style={{ height: '285px', width: '180px' }}
                  />
                </a>
              </p>
              <p>
                Data from the initial 18-month deployment has been calibrated and extensively quality controlled. Tidal
                signals have been filtered out and for ease of interpretation the data have been interpolated onto a
                regular grid (10m vertical, 2km horizontal resolution).&nbsp; These data provide a significant advance
                in our understanding and begin to expose the complexity of the system. The original dataset is available
                for download from IMOS.&nbsp;Further details of the deployment, initial results and data preparation are
                presented in
                <a href="http://journals.ametsoc.org/doi/pdf/10.1175/JPO-D-15-0052.1">Sloyan et al, 2016</a>
              </p>
              <video width="320px">
                <source src="https://oceancurrent.aodn.org.au/news/20160331/EAC_array_transport.mp4" type="video/mp4" />
                <source src="https://oceancurrent.aodn.org.au/news/20160331/EAC_array_transport.ogg" type="video/ogg" />
                <track kind="captions" />
              </video>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Port_to_Pub_Swim_Ocean_Forecast">
                  <a href="#Port_to_Pub_Swim_Ocean_Forecast" className="anchor">
                    Port to Pub Swim - Ocean Forecast
                  </a>
                </h3>
              </div>

              <div>
                <p className="font-bold">17 March, 2016</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                The inaugural Port to Pub race, from Fremantle to Rottnest, is on this Saturday and we have adjusted our
                <a href="http://rs-data3-mel.csiro.au/porttopub-swim/" target="_blank" rel="noreferrer">
                  swim optimizer
                </a>
                to help swimmers make the ocean work for them.&nbsp; The forecast is in and, as for the Rottnest swim in
                February, conditions are looking good for a fast swim. The currents are forecast to be weak (less than
                half a knot) and the winds from the east so the waves will be small. The hourly forecast velocity
                fields, provided once again by the
                <a href="http://www.oceans.uwa.edu.au/" target="_blank" rel="noreferrer">
                  Oceans Institute of the University of Western Australia
                </a>
                , can be viewed using the arrows at the top of the optimizer. The fastest swimmers will find the
                currents very weak most of the way and may even get a slight assist as they approach Rottnest. Slower
                swimmers will feel the effects of a weak southward flow, which is expected to develop from 1pm onwards.
              </p>
              <a href="http://rs-data3-mel.csiro.au/porttopub-swim/" target="SwimOptimizer">
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20160317/SwimOptimizer_1.png"
                  style={{ height: '275px', width: '400px' }}
                />
              </a>
              <br />
              <p>
                We have not factored in the extra 5km loop for those brave swimmers who are taking on the extra
                challenge but you can still use the optimizer for the remainder of the race across the channel by
                adjusting the start time of your swim. Of course, the forecast currents may differ from those that are
                experienced on the day. We wish all swimmers a safe swim and a great day.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Rottnest_Channel_Swim_Forecast_Update">
                  <a href="#Rottnest_Channel_Swim_Forecast_Update" className="anchor">
                    Rottnest Channel Swim - Forecast Update
                  </a>
                </h3>
              </div>

              <div>
                <p className="font-bold">26 February, 2016</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <div className="row">
                <div className="col-md-6">
                  <p>
                    Today’s updated forecast is for weaker northward currents than previously forecast and only occuring
                    in the morning. Later in the day, the forecast is for westward flow providing a small boost to
                    slower swimmers and those starting in the later wave times. The westward flow, however, is highly
                    dependent on small scale weather features which are hard to predict.
                  </p>
                  <p>
                    For the early wave times heading slightly south may still pay off but for anyone who will be still
                    be swimming after noon then heading straight for the finish line is probably your best bet.
                  </p>
                  <p>
                    You can
                    <a href="http://rs-data3-mel.csiro.au/rottnest-swim/" target="_blank" rel="noreferrer">
                      optimize your swim time
                    </a>
                    based on the ocean current predictions by the
                    <a href="http://www.oceans.uwa.edu.au/" target="_blank" rel="noreferrer">
                      Oceans Institute of the University of Western Australia
                    </a>
                    . The ocean forecast depends on the weather forecast, which may change. Our last update is Friday
                    morning.
                  </p>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <a href="http://rs-data3-mel.csiro.au/rottnest-swim/">
                      <img
                        alt=""
                        className="img-responsive"
                        src="https://oceancurrent.aodn.org.au/news/20160226/ScreenShot.png"
                        style={{ height: '197px', width: '400px' }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Rottnest_Channel_Swim_The_Forecast_Is_In">
                  <a href="#Rottnest_Channel_Swim_The_Forecast_Is_In" className="anchor">
                    Rottnest Channel Swim - The Forecast Is In
                  </a>
                </h3>
              </div>

              <div>
                <p className="font-bold">25 February, 2016</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <div className="row">
                <div className="col-md-6">
                  <p>
                    Forecast currents for the race on Saturday are weak currents inshore with northward flow gradually
                    increasing in strength across the approach to Rottnest Island. If these conditions prevail on the
                    day most swimmers will benefit by heading slightly south of the finish line until within a few
                    kilometers of Rottnest. You can
                    <a href="http://rs-data3-mel.csiro.au/rottnest-swim/" target="_blank" rel="noreferrer">
                      optimize your swim time
                    </a>
                    based on the ocean current predictions by the
                    <a href="http://www.oceans.uwa.edu.au/" target="_blank" rel="noreferrer">
                      Oceans Institute of the University of Western Australia
                    </a>
                    . The ocean forecast depends on the weather forecast, which may change. Our last update is Friday
                    morning.
                  </p>
                </div>

                <div className="col-md-6">
                  <a href="http://rs-data3-mel.csiro.au/rottnest-swim/">
                    <img
                      alt=""
                      className="img-responsive"
                      src="https://oceancurrent.aodn.org.au/news/20160225/ScreenShot.png"
                      style={{ height: '197px', width: '400px' }}
                    />
                  </a>
                  <br />
                  &nbsp;
                  <p>&nbsp;</p>
                </div>
              </div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="The_Bonney_Coast_Upwelling_biological_hotspot_sampled_by_an_IMOS_glider">
                  <a href="#The_Bonney_Coast_Upwelling_biological_hotspot_sampled_by_an_IMOS_glider" className="anchor">
                    The Bonney Coast Upwelling: biological hotspot sampled by an IMOS glider
                  </a>
                </h3>
              </div>

              <div>
                <p className="font-bold">17 February, 2016</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <div className="row">
                <a href="https://oceancurrent.aodn.org.au/gliders/Portland20160128_nrt_12d/2016021312.html">
                  <img
                    src="https://oceancurrent.aodn.org.au/gliders/Portland20160128_nrt_12d/2016021312.gif"
                    style={{ width: '350px' }}
                  />
                </a>
                <p>
                  &nbsp;An IMOS Slocum glider is presently making the most detailed survey ever conducted of the
                  bio-physical properties of a&nbsp;Bonney Coast upwelling event. The dissolved oxygen data are perhaps
                  the most exciting: percent saturation values exceeded 150 within the upwelled water on 3 Feb,
                  confirming that the phytoplankton were very actively photo-synthesizing, producing much more oxygen
                  than was lost to the atmosphere. You can step through the mission seeing either
                  <a
                    href="https://oceancurrent.aodn.org.au/gliders/4day.php?link=Portland20160128_nrt_4d/latest.html"
                    target="blank"
                  >
                    4 days
                  </a>
                  or
                  <a
                    href="https://oceancurrent.aodn.org.au/gliders/4day.php?link=Portland20160128_nrt_12d/latest.html"
                    target="blank"
                  >
                    12 days
                  </a>
                  of the mission track at a time.
                </p>

                <p>
                  Excepting some spurious measurements affected by bio-fouling, values this high have not been seen in
                  Australian waters by the glider fleet. The closest comparison was in upwelled waters inshore of the
                  East Australian Current near Coffs Harbour in Dec 2010, but these may have been affected by
                  bio-fouling. The present mission DO data are not suspicious, because the high readings occurred early
                  in the mission.
                </p>
              </div>
              <div className="row">
                <a href="http://oceancurrent.imos.org.au/oceancolour.php?link=SAgulfs_chl/2016/2016020904.html">
                  <img
                    src="https://oceancurrent.aodn.org.au/SAgulfs_chl/2016/2016020904.gif"
                    style={{ width: '350px' }}
                  />
                </a>

                <p>
                  <span style={{ lineHeight: '20.8px' }}>
                    The Bonney Coast is the 200km-long stretch of narrow continental shelf near Portland, Vic, that is
                    famous (especially, but not only, in marine scientist circles) for its periods of summer-time
                    wind-driven upwelling. Upwelling events&nbsp;are routinely evident in satellite imagery but rarely
                    sampled extensively at sea.&nbsp;
                  </span>
                  MODIS estimates of chlorophyll-a show that the present event is not an extraordinary one. The track of
                  the glider can be seen in the image at left as a blue line at bottom right. See also the chlorophyll-a
                  images for
                  <a href="https://oceancurrent.aodn.org.au/SAgulfs_chl/2016/2016020104.html" target="blank">
                    1 Feb
                  </a>
                  and onwards, and/or
                  <a href="https://oceancurrent.aodn.org.au/SAgulfs/2016/2016020104.html" target="blank">
                    sea surface temperature images
                  </a>
                  .
                </p>
              </div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Sydney_Hobart_ocean_currents">
                  <a href="#Sydney_Hobart_ocean_currents" className="anchor">
                    Sydney-Hobart ocean currents
                  </a>
                </h3>
              </div>

              <div>
                <p className="font-bold">24 December, 2015</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <br />
                This year, there are two anticlockwise-rotating&nbsp;warm-core eddies and
                one&nbsp;clockwise-rotating&nbsp;cold-core eddy influencing the current speeds that the competitors in
                the Sydney-Hobart yacht race will encounter. The cold eddy is off Sydney-Jervis Bay and tending to block
                the southward flow of warm East Australian Current water. If it has moved little, or west since this 18
                Dec image was acquired then yachts may encounter very little current during the first section of the
                race. South of Jervis Bay, however, the situation is probably very different, because of the detached
                warm-core eddy off southern NSW, where yachts are likely to find strong tail-current. The third player
                is the large, but possibly not very energetic, warm-core eddy spanning much of Bass Strait as well as
                much of the east coast of Tasmania. In between, or embedded within, these large systems are several
                smaller cold-core features which should also be watched. We wish all competitors a safe but challenging
                race.
                <br />
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/SNSW/2015/2015121815.gif"
                  style={{ height: '342px', width: '300px' }}
                />
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="A_record_of_record_sea_surface_temperatures">
                  <a href="#A_record_of_record_sea_surface_temperatures" className="anchor">
                    A record of record sea surface temperatures
                  </a>
                </h3>
              </div>

              <div>
                <p className="font-bold">21 December, 2015</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <br />
                    Sea surface temperatures around the globe have been exceptionally warm this year. The 2015
                    ‘godzilla’ El Niño is responsible for much of the warming in the equatorial Pacific, but the Indian
                    Ocean has been quite warm too. Both oceans contribute to Australia’s climate and a record warming
                    year could have dire consequences for already dry regions of our continent and our neighbours.
                  </p>
                  <br />
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20151221/SSTrecordsglobal.png"
                    style={{ height: '286px', width: '450px' }}
                  />
                </div>
                &nbsp;
                <div className="col-md-6">
                  <p>
                    The warming has been so significant that record warm temperatures have been reached in many places
                    (red contours in plot). In fact this year, more of the ocean has broken records than any other year
                    since 1981.
                    <br />
                    Figures compliment of Phil Reid at the Bureau of Meteorology.
                  </p>
                  <br />
                  <a href="https://oceancurrent.aodn.org.au/news/20151221/percent_record.png">
                    <img
                      alt=""
                      src="https://oceancurrent.aodn.org.au/news/20151221/percent_record.png"
                      style={{ height: '247px', width: '378px' }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="MH370_Are_they_searching_in_the_right_place">
                  <a href="#MH370_Are_they_searching_in_the_right_place" className="anchor">
                    MH370: Are they searching in the right place?
                  </a>
                </h3>
              </div>

              <div>
                <p className="font-bold">13 November, 2015</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                <img
                  alt=""
                  src="https://oceancurrent.aodn.org.au/news/20151113/MH370_39-32S_undrog_drifters_500d.gif"
                  style={{ height: '326px', width: '500px' }}
                />
                There has been speculation in the media that the on-going sea-floor search for MH370 is being conducted
                in the wrong area. This speculation rests on modelling that suggested that the flaperon found on La
                Reunion on 29 July 2015 probably entered the ocean more than 1000km north of the present sea floor
                search area. This speculation is at odds with CSIRO, who concluded that the finding of the flaperon “did
                not cast doubt” on the sea-floor search area.
              </p>
              <p>
                The difference of opinion depends on whether the flaperon is assumed to drift at the average velocity of
                the ocean’s surface mixed-layer, or whether winds and waves impart an additional velocity. CSIRO argue
                that the effect of winds and waves cannot be ignored, because the flaperon must have floated within the
                uppermost few meters of the ocean, where it would have been subject to the Stokes drift, no matter how
                little freeboard it had to prevent it from sinking.
              </p>
              <p>
                Perhaps confusingly, ‘surface drifters’ do not measure surface drift. They are fitted with sub-surface
                sea-anchors (‘drogues’) to avoid the effects of winds and waves (i.e. the Stokes Drift). But these
                drifters inevitably lose their drogues, at which point, argue CSIRO, their trajectories become the best
                available guide to the likely drift of the flaperon. But the number of drifters traversing the Indian
                Ocean in the last 30 years is not large, especially if the data set is sub-setted for the times of year
                appropriate to the drift of the flaperon. Joining near-intersecting trajectories together, however,
                provides a much larger number of 508d-long trajectories, which is how long the flaperon was in the
                water.
                <br />
                Analysis of these composite trajectories suggests that the present sea floor search area is certainly
                within the area of likely origin of the flaperon, as shown below.
                <br />
                <a href="http://www.marine.csiro.au/~griffin/MH370/drifters_joinedV2/joined_RI_538d3_undrog_Jun-Sep_N60_density.html">
                  http://www.marine.csiro.au/~griffin/MH370/drifters_joinedV2/joined_RI_538d3_undrog_Jun-Sep_N60_density.html
                </a>
                <br />
                For more information, see
                <a href="http://www.marine.csiro.au/~griffin/MH370/index.html">
                  http://www.marine.csiro.au/~griffin/MH370/index.html
                </a>
                <br />
                &nbsp;
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Sea_level_in_the_western_equatorial_Pacific_drops_dramatically">
                  <a href="#Sea_level_in_the_western_equatorial_Pacific_drops_dramatically" className="anchor">
                    Sea level in the western equatorial Pacific drops dramatically
                  </a>
                </h3>
              </div>

              <div>
                <p className="font-bold">15 July, 2015</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                &nbsp;
                <a href="https://oceancurrent.aodn.org.au/news/20150715/latest_meanSLA_1.gif">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20150715/latest_meanSLA_1.gif"
                    style={{ height: '180px', width: '300px' }}
                  />
                </a>
                The month-average of sea level north of New Guinea has dropped to levels not seen since the ‘super El
                Niño’ of 1997/1998. An El Niño event occurs when sea surface temperatures in the central and eastern
                Pacific become sufficiently warm that the atmospheric circulation shifts resulting in weaker equatorial
                trade winds. Low sea levels north of New Guinea (a result of weak equatorial trade winds) are strongly
                correlated with Nino3.4, the El Niño index that relates best to Australian climate.
                <br />
                &nbsp;
              </p>
              <p>
                The Bureau of Meteorology
                <a href="https://theconversation.com/bom-were-calling-it-the-2015-el-nino-is-here-41598">
                  declared 2015 an El Niño year
                </a>
                in mid-May. Sea levels north of New Guinea have continued to drop sharply since then. The map at right
                shows the June 2015 SLA for the Australasian region, while the time-series below shows that the average
                for the region north of PNG &nbsp;(boxed on the map) has only been lower once before since 1992 when
                satellite sea level observations commenced.
                <br />
                <a href="https://oceancurrent.aodn.org.au/news/20150715/SLA_WeqPac.png">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/news/20150715/SLA_WeqPac.png"
                    style={{ height: '150px', width: '300px' }}
                  />
                </a>
                <br />
                Low sea levels in the western equatorial Pacific are also strongly
                <a
                  href="https://theconversation.com/the-good-news-el-nino-story-for-western-australias-oceans-41744#comment_672454"
                  className="anchor"
                >
                  correlated with the strength of the Leeuwin Current
                </a>
                . There is a two month delay between the sea level anomaly off Perth and the region north of New Guinea.
                The low sea level signal propagates southward along the west coast of Australia weakening the Leeuwin
                Current and causing water temperatures to be cooler.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Extraordinary_eddies_of_the_East_Australian_Current_probed_by_RV_Investigator">
                  <a
                    href="#Extraordinary_eddies_of_the_East_Australian_Current_probed_by_RV_Investigator"
                    className="anchor"
                  >
                    Extraordinary eddies of the East Australian Current probed by RV Investigator
                  </a>
                </h3>
              </div>

              <div>
                <p className="font-bold">17 June, 2015</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                Australia's new research vessel RV<em> Investigator</em> has performed brilliantly this month during a
                voyage&nbsp;led by Prof Iain Suthers of UNSW. The&nbsp;
                <br />
                principal objective of the voyage was an ambitious one: to locate then study the ecological role of one
                or more frontal eddies. Frontal eddies&nbsp;
                <br />
                ('freddies') are small, short-lived, rapidly-rotating cyclonic (clockwise) eddies that form inshore of
                the main flow of the East Australian&nbsp;
                <a href="Bris3_/2015/2015060507.html" target="_blank">
                  <img
                    alt=""
                    src="https://oceancurrent.aodn.org.au/Bris3_/2015/2015060507.gif"
                    style={{ height: '200px', width: '197px' }}
                  />
                </a>
                Current.
              </p>
              <p>
                Larger mesoscale eddies associated with the meandering of the EAC itself were also the subject of the
                voyage, and since an extraordinary example of a large cold-core eddy happened to be off Brisbane at the
                start of the voyage, <em>Investigator</em> sampled it from 3 June to 6 June, as shown at right. Note the
                northward flow where the EAC normally flows southward along the continental margin.
              </p>
              <p>
                On&nbsp;
                <span style={{ lineHeight: '20.7999992370605px' }}>
                  <a href="https://oceancurrent.aodn.org.au/SNSW/2015060615.html" target="blank">
                    6 June
                  </a>
                </span>
                Iain and his team were&nbsp;excited to see evidence in IMOS SST imagery of the formation of a
                ~30km-diameter freddy at 32° 20'S, 153° 30'E (50km off Forster) and by
                <a href="https://oceancurrent.aodn.org.au/SNSW/2015060903.html" target="blank">
                  9 June
                </a>
                several transects of it had been completed, delivering a wealth of information from the ship's suite of
                sensors and nets. As anticipated, the ship recorded elevated levels of
                <a href="https://oceancurrent.aodn.org.au/SNSW_chl/2015060904.html">fluorescence</a>
                in the freddy, indicative of higher concentrations of chlorophyll-a. See our
                <a href="https://oceancurrent.aodn.org.au/technews.php">technical news item</a>
                if you wish to explore the voyage in more detail.
              </p>
              <p>
                By massive coincidence, the French-Indian AltiKa satellite (one of the altimeter missions on which{' '}
                <em>OceanCurrent</em> depends for sea level information) overflew the centre of the freddy on 9 June, so
                the matchup of ship and satellite observations will help us interpret the combined dataset in the light
                of the historical archive of altimetry. The freddy is too small to be resolved in our 2D gridded maps
                but the central depression of 15cm is clear in the raw along-track data, consistent with ship
                observations of ~1m/s rotational speed.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Slocum_glider_missions_reveal_pools_of_dense_shelf_water_the_winter_cascade">
                  <a
                    href="#Slocum_glider_missions_reveal_pools_of_dense_shelf_water_the_winter_cascade"
                    className="anchor"
                  >
                    Slocum glider missions reveal pools of dense shelf water - the 'winter cascade'
                  </a>
                </h3>
              </div>

              <div>
                <p className="font-bold">5 June, 2015</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <div className="row">
                <div className="col-md-3">
                  <a href="https://oceancurrent.aodn.org.au/news/20150605/SpencerGulfFinal.png">
                    <img
                      className="img-responsive"
                      width="100%"
                      src="https://oceancurrent.aodn.org.au/news/20150605/SpencerGulfFinal.png"
                    />
                  </a>
                </div>

                <div className="col-md-9">
                  <p>
                    The Australian National Facility for Ocean Gliders has recently found pockets of dense ‘winter
                    cascade’ water at a surprising number of locations over the continental shelf. These dense pools of
                    shelf water have increasingly been revealed with the high-resolution repeat sampling possible with
                    ocean gliders.
                  </p>

                  <p>
                    The Winter Cascade was first described by Godfrey et al, 1980, with reference to Bass Strait. The
                    mechanism is simple. Sea temperatures are significantly warmer than air temperatures in winter so
                    the ocean loses heat to the atmosphere. Cooled surface water sinks as a consequence of its density
                    increasing. In shallow water, where there is no deep reservoir of heat, the whole water column can
                    cool down nearly to air temperature. Once dense enough, the cold coastal water slides down the
                    sloping sea floor as a ‘gravity current’ to form a distinct layer underneath the warmer offshore
                    waters.
                  </p>

                  <p>
                    Four recent
                    <a href="http://anfog.ecm.uwa.edu.au/?page=slocum%5C">Slocum glider missions</a>
                    around Australia (Spencer Gulf, Two Rocks in WA, the Kimberley and Yamba NSW) have all just recently
                    encountered dense shelf water pools. How do we distinguish the winter cascade from upwelling? Its
                    not always clear-cut, but distinguishing features of winter cascade are that 1) the coldest,
                    saltiest water is at the coast, 2) it usually occurs on a wide shallow shelf and 3) it is found
                    after cold winds occur, typically off the land, rather than from the upwelling-favourable direction.
                  </p>
                </div>
              </div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="What_does_a_warm_North_Pacific_mean_for_us">
                  <a href="#What_does_a_warm_North_Pacific_mean_for_us" className="anchor">
                    What does a warm North Pacific mean for us?
                  </a>
                </h3>
              </div>

              <div>
                <p className="font-bold">7 May, 2015</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <div className="row">
                <div className="col-md-4">
                  <a
                    href="http://www.oceannetworks.ca/warm-northeast-pacific-ocean-conditions-continue-2015"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      alt=""
                      src="https://oceancurrent.aodn.org.au/news/20150507/SST.jpg"
                      style={{ width: '100%' }}
                    />
                  </a>
                  Figure from http://www.oceannetworks.ca/warm-northeast-pacific-ocean-conditions-continue-2015
                </div>

                <div className="col-md-8">
                  <p>
                    Early analysis of the warm SST in the North East Pacific is showing temperature anomalies exceeding
                    4 standard deviations above the mean. This warming began in 2013 and it has been suggested that this
                    may be a new sort of phenomenon not seen before in modern records
                    (http://www.oceannetworks.ca/warm-northeast-pacific-ocean-conditions-continue-2015). Given there is
                    such a significant warming over a long time period, will this have any effect on Australia and our
                    surrounding oceans?
                  </p>

                  <p>
                    Warming patterns in the north Pacific are often associated with the Pacific Decadal Oscillation
                    (PDO). The PDO is also linked to ENSO and hence Australian climate. There are no indications to
                    suggest, however, that the PDO or ENSO were drivers of this exceptional warming. Early analysis and
                    discussion on forums are linking this warming to a weaker than average Aleutian Low pressure system
                    in the atmosphere.
                  </p>

                  <p>
                    Such a big change in the state of the north Pacific could have indirect effects on the development
                    of other climate modes such as ENSO and the PDO, particularly through changes in the strength of the
                    Aleutian Low. Without historical analogues it is difficult to anticipate how the coming year will
                    play out and whether this warming amplifies later this year if an El Niño develops.
                  </p>
                </div>
              </div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="NSW_floodwaters_seen_from_space_and_by_an_IMOS_glider">
                  <a href="#NSW_floodwaters_seen_from_space_and_by_an_IMOS_glider" className="anchor">
                    NSW floodwaters seen from space and by an IMOS glider
                  </a>
                </h3>
              </div>

              <div>
                <p className="font-bold">1 May, 2015</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <a href="https://oceancurrent.aodn.org.au/sst.php?link=SNSW_chl/2015/2015042504.html" target="blank">
                <img src="https://oceancurrent.aodn.org.au/SNSW_chl/2015/2015042504.gif" style={{ height: '200px' }} />
              </a>
              <a
                href="https://oceancurrent.aodn.org.au/gliders/4day.php?link=Yamba20150416_4d/2015050100.html"
                target="blank"
              >
                <img
                  src="https://oceancurrent.aodn.org.au/gliders/Yamba20150416_4d/2015050100.gif"
                  style={{ height: '200px' }}
                />
              </a>
              <p>
                The storms that hit the Hunter Valley region of NSW on 21-22 April 2015 caused much flooding as well as
                damage from winds and
                <a
                  href="http://www.swellnet.com/news/swellnet-analysis/2015/04/23/biggest-waves-ever-recorded-sydney/"
                  target="blank"
                >
                  huge waves
                </a>
                . River discharge mixes with seawater to form a buoyant mixture that can take some time to disperse,
                depending on the influence of winds and ocean currents. The MODIS satellite image for 25 April says much
                about the way dispersal works in the ocean. A thin tendril of floodwater, coded yellow-orange in this
                image, can be seen stretched out along the boundary that already existed between the low-chlorophyll
                waters of the East Australian Current (coded blue) and the Tasman Sea waters shown in green. Most of the
                buoyant plume was still close to the coast on 25 April, its seaward edge marked by a sharp but irregular
                boundary. We will see over the next few weeks where this mass of water goes.
              </p>
              <p>
                The satellite is not our only way of investigating this significant event.
                <a href="https://oceancurrent.aodn.org.au/misc/Derwent25805Ditylum.jpg" target="blank">
                  <img
                    src="https://oceancurrent.aodn.org.au/misc/Derwent25805Ditylum.jpg"
                    style={{ height: '200px' }}
                  />
                </a>
                An IMOS Slocum glider was also on the job. Its track is shown in magenta overlain on the MODIS images.
                Its sensors very clearly distinguish the floodwaters from the ocean waters, especially through the
                impact on the water's salinity and fluorescence. Click forward from
                <a
                  href="https://oceancurrent.aodn.org.au/gliders/4day.php?link=Yamba20150416_4d/2015042612.html"
                  target="blank"
                >
                  26 April
                </a>
                to see the glider encounter, then depart from, the buoyant pool of floodwaters. The observations during
                the latter half of
                <a
                  href="https://oceancurrent.aodn.org.au/gliders/4day.php?link=Yamba20150416_4d/2015050100.html"
                  target="blank"
                >
                  30 April
                </a>
                show how the seaward edge of the plume is over-ridden by the EAC water because the temperature effect on
                density is winning against the freshness effect. High estimates of Coloured Dissolved Organic Matter
                (CDOM, shown on the
                <a href="http://anfog.ecm.uwa.edu.au/index.php" target="blank">
                  ANFOG site
                </a>
                ) in the low-salinity water suggest that the MODIS estimates of Chlorophyll are probably being 'tricked'
                by high levels of CDOM as well as by the suspended sediments, but nevertheless, can be used to monitor
                the dispersal of floodwaters. One very important consequence of the runoff may be the input of nutrients
                (nitrate, phosphate and silicate) to the Tasman Sea ecosystem. A bloom of diatoms (the preferred prey of
                many zooplankton, but rarely abundant off NSW) may result from this flood. Shown at right is the diatom
                <em>Ditylum brightwellii</em>.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="El_Nino_Brewing">
                  <a href="#El_Nino_Brewing" className="anchor">
                    El Nino Brewing{' '}
                  </a>
                </h3>
              </div>

              <div>
                <p className="font-bold">24 April, 2015</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <a href="https://oceancurrent.aodn.org.au/news/20150424/fig1.html" target="blank">
                <img
                  src="https://oceancurrent.aodn.org.au/news/20150424/elnino2015_fig1.png"
                  style={{ height: '200px' }}
                />
              </a>
              <p>
                In the March-April-May period it is difficult to reliably predict the upcoming ENSO phase (known as the
                Spring Persistence Barrier) until sometime in June or July. Nevertheless, all the signs are there.
              </p>
              <p>
                The big indicator for an upcoming El Nino is warmer than average temperatures along the equatorial
                thermocline. This is a necessary, but not sufficient, condition for an El Nino to develop. March
                subsurface temperatures from the Bureau of Meteorology appear to be 4°C above average in the central
                Pacific. What we are waiting for now is to see if the atmosphere will couple to the ocean to kick off
                the event. Often this can occur when a Madden Julian Oscillation (MJO) develops over the western Pacific
                creating a downwelling equatorial Kelvin wave, and giving the already deepened thermocline an extra
                push.
              </p>
              <a href="news/20150424/fig2.html" target="blank">
                <img
                  src="https://oceancurrent.aodn.org.au/news/20150424/elnino2015_fig2.png"
                  style={{ height: '200px' }}
                />
              </a>
              <p>
                Warm Sea Surface Temperature anomalies are also appearing, but only in the central Pacific. Typical El
                Nino events require a warming in the eastern Pacific as well. Recently however the 'central-Pacific'
                type El Ninos have appeared where the warming is primarily in the central regions.
              </p>
              <p>
                On a cautionary note, very similar conditions appeared in April of 2014 and El Nino events were
                predicted with a 70% chance of occurring. The warm anomalies dissipated however, though the reasons why
                are still being explored.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Shelf_edge_fronts_and_boundary_currents">
                  <a href="#Shelf_edge_fronts_and_boundary_currents" className="anchor">
                    Shelf-edge fronts and boundary currents
                  </a>
                </h3>
              </div>

              <div>
                <p className="font-bold">16 April, 2015</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <a href="sst.php?link=SNSW_chl/2013/2013121804.html" target="blank">
                <img src="https://oceancurrent.aodn.org.au/SNSW_chl/2013/2013121804.gif" style={{ height: '200px' }} />
              </a>
              <a href="sst.php?link=DonPer_chl/2009/2009032704.html" target="blank">
                <img
                  src="https://oceancurrent.aodn.org.au/DonPer_chl/2009/2009032704.gif"
                  style={{ height: '200px' }}
                />
              </a>
              <p>
                We have just finished updating all our high-resolution imagery
                <a href="tech#20150416" className="anchor">
                  [technical news item]
                </a>
                . Two ocean colour images caught our eye. Both show very sharp colour changes between the clear
                (low-chlorophyll) waters of Australia's warm, southward-flowing boundary currents and higher-chlorophyll
                coastal waters that are being drawn offshore by the meanderings of those boundary currents.
              </p>
              <p>
                Off Perth, the coastal waters were being drawn into a large anticyclonic Leewin Current eddy on 27 Mar
                2009. Two IMOS Slocum gliders
                <a
                  href="https://oceancurrent.aodn.org.au/gliders/4day.php?link=TwoRocks20090313_4d/2009032700.html"
                  target="blank"
                >
                  [1]
                </a>
                <a
                  href="https://oceancurrent.aodn.org.au/gliders/4day.php?link=TwoRocks20090327_4d/2009033100.html"
                  target="blank"
                >
                  [2]
                </a>
                sampled the water over the continental shelf out to the front, confirming that what we see from the
                surface is indicative of the higher chlorophyll at depth (measured via fluorescence) but certainly not
                the whole story.
              </p>
              <p>
                Off Sydney, three IMOS current meter moorings recorded northward motion of the inner-shelf waters on 18
                Dec 2013. This is something our estimation of geostrophic velocities is blind to, but is key to
                understanding the way the eddy-shedding process of the East Australian Current and shelf-slope exchange
                are linked.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Summer_sea_surface_temperature_summary">
                  <a href="#Summer_sea_surface_temperature_summary" className="anchor">
                    Summer sea surface temperature summary
                  </a>
                </h3>
              </div>

              <div>
                <p className="font-bold">26 February, 2015</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <img src="https://oceancurrent.aodn.org.au/sst_anom/2015/20150219.png" style={{ height: '200px' }} />
              <p>
                Summer is often the time when unusual ocean temperatures have the widest range of impacts, from
                recreational to life-threatening. Tropical Cyclones Marcia and Lam have just left trails of destruction
                in Queensland and the Northern Territory and, as usual, the question is whether anomalous ocean
                temperatures contributed to their strength.
              </p>
              <p>
                The answer to this question lies not in analysis of just the ocean's
                <em>surface</em> temperature (e.g. our maps of
                <a href="https://oceancurrent.aodn.org.au/sst.php?link=sst_anom/2015/20150219.html">
                  6-day-average anomalies
                </a>
                ), because a cyclone needs a deep reservoir of heat for growth, not just a shallow one. That said, the
                <a href="https://oceancurrent.aodn.org.au/profiles/map.php?link=map/20150224.html">
                  Argo measurements of sub-surface temperature
                </a>
                , like the satellite images of surface temperature, were close to normal off NE Australia. The areas of
                significant temperature anomalies (not all positive) were farther west and/or south. The most
                conspicuous of these are the positive anomalies off the NW and SE, and some isolated negative anomalies
                near the coast.
              </p>
              <p>
                The
                <a href="https://oceancurrent.aodn.org.au/sst.php?link=TasE/2015/2015022208.html">Tasmanian</a>
                anomaly is mainly due to the East Australian Current continuing to bring more warm water southwards than
                usual (see
                <a href="https://theconversation.com/things-warm-up-as-the-east-australian-current-heads-south-31889">
                  https://theconversation.com/things-warm-up-as-the-east-australian-current-heads-south-31889
                </a>
                ). The graph at right shows that the difference from usual in summer was positive, but not as great as
                the previous winter, when average sea surface temperature (SST) of the ocean off Eastern Tasmania
                remained over 1 degree above average. The result of this sustained anomaly was a change in marine life
                with more tuna and unusual species such as jellyfish appearing on Tasmanian beaches.
                <img src="https://oceancurrent.aodn.org.au/misc/SST_TasE_2014.png" style={{ height: '200px' }} />
              </p>
              <p>
                <a href="https://oceancurrent.aodn.org.au/sst.php?link=SAgulfs/2015/2015020619.html">South Australia</a>
                , on the other hand, has had strong wind-driven upwelling since mid-January. Cold water due to upwelling
                is a usual summer occurence, but this year it was particularly strong.
              </p>
              <video width="320px">
                <source src="https://oceancurrent.aodn.org.au/SAgulfs/2015/SAgulfs201503.mp4" type="video/mp4" />
                <track kind="captions" />
              </video>
              <p>
                Less commonly observed are the relatively cold shelf temperatures seen several times this summer as far
                north of
                <a href="https://oceancurrent.aodn.org.au/sst.php?link=Perth/2015/2015022218.html">Perth</a>
                as Jurien, where coastal upwelling appears to have been happening.
              </p>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Northward_Currents_predicted_and_observed_for_the_Rottnest_Channel_Swim">
                  <a href="#Northward_Currents_predicted_and_observed_for_the_Rottnest_Channel_Swim" className="anchor">
                    Northward Currents predicted and observed for the Rottnest Channel Swim
                  </a>
                </h3>
              </div>

              <div>
                <p className="font-bold">25 February, 2015</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                The
                <a href="http://www.oceans.uwa.edu.au/">Oceans Institute of the University of Western Australia</a>
                have now compared the IMOS HF radar measurements of surface currents (made during the race) with the
                model forecast issued before the race. These maps below (click to see them enlarged) show the 'bigger
                picture', showing how the currents in the shallower waters of the continental shelf were going
                northwards while the currents off the continental shelf were going southwards, as is often the case. The
                radar does not have such fine spatial detail as the model but does confirm the general pattern, as well
                as the increasing northward velocities that were forecast. See also the
                <a href="https://oceancurrent.aodn.org.au/sst.php?link=DonPer/2015022106.html">satellite image</a>
                closest to the time (06:56Z=1456WST) of the race. The radars (northern system in magenta, southern
                system in red) have detected the northward shelf flow. The altimetry (black vectors) is often blind to
                these reversals, and is not yet available for the day of the race. The thermal image confirms the usual
                association of northward winds and flow with upwelling of waters from depth.
              </p>
              <div className="col-md-4">
                <a href="https://oceancurrent.aodn.org.au/misc/Rottnest_swim_2015/bg_roms_radar_09hr_21feb.png">
                  <img
                    src="https://oceancurrent.aodn.org.au/misc/Rottnest_swim_2015/bg_roms_radar_09hr_21feb.png"
                    width="300"
                  />
                </a>
              </div>
              <div className="col-md-4">
                <a href="https://oceancurrent.aodn.org.au/misc/Rottnest_swim_2015/bg_roms_radar_12hr_21feb.png">
                  <img
                    src="https://oceancurrent.aodn.org.au/misc/Rottnest_swim_2015/bg_roms_radar_12hr_21feb.png"
                    width="300"
                  />
                </a>
              </div>
              <div className="col-md-4">
                <a href="https://oceancurrent.aodn.org.au/misc/Rottnest_swim_2015/bg_roms_radar_15hr_21feb.png">
                  <img
                    src="https://oceancurrent.aodn.org.au/misc/Rottnest_swim_2015/bg_roms_radar_15hr_21feb.png"
                    width="300"
                  />
                </a>
              </div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Northward_Currents_predicted_for_the_Rottnest_Channel_Swim">
                  <a href="#Northward_Currents_predicted_for_the_Rottnest_Channel_Swim" className="anchor">
                    Northward Currents predicted for the Rottnest Channel Swim
                  </a>
                </h3>
              </div>

              <div>
                <p className="font-bold">20 February, 2015</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <p>
                The Bureau of Meteorology is forecasting southerly winds (15-20 km/h) at dawn then turning south to
                south-westerly and strengthening (20-30 km/h) in the late morning.
              </p>
              <p>
                The
                <a href="http://www.oceans.uwa.edu.au/">Oceans Institute of the University of Western Australia</a>
                ocean current forecast is for northward currents throughout the race, weak near the coast and strongest
                (0.25 m/s at midday) after the 15 km mark, as shown in the images below.
              </p>
              <p>
                Northward currents are anticipated to increase from midday due to the sea breeze, making the approach to
                the island most difficult near the cutoff time.
              </p>
              <p>Click on the images below to see them enlarged.</p>
              <div className="col-md-4">
                <a href="https://oceancurrent.aodn.org.au/misc/fct0900WST_21Feb.png">
                  <img src="https://oceancurrent.aodn.org.au/misc/fct0900WST_21Feb.png" width="300" />
                </a>
              </div>
              <div className="col-md-4">
                <a href="https://oceancurrent.aodn.org.au/misc/fct1200WST_21Feb.png">
                  <img src="https://oceancurrent.aodn.org.au/misc/fct1200WST_21Feb.png" width="300" />
                </a>
              </div>
              <div className="col-md-4">
                <a href="https://oceancurrent.aodn.org.au/misc/fct1500WST_21Feb.png">
                  <img src="https://oceancurrent.aodn.org.au/misc/fct1500WST_21Feb.png" width="300" />
                </a>
              </div>
            </div>
          </article>
          <article className="p-2">
            <div className="flex items-center justify-between rounded bg-[#F1F6F9] p-4">
              <div>
                <h3 id="Rottnest_Channel_Swim_pre_race_briefing">
                  <a href="#Rottnest_Channel_Swim_pre_race_briefing" className="anchor">
                    Rottnest Channel Swim pre-race briefing
                  </a>
                </h3>
              </div>

              <div>
                <p className="font-bold">13 February, 2015</p>
              </div>
            </div>

            <div className="rounded-b bg-white p-4">
              <a href="misc/CP_Rottnest_fig1.gif">
                <img src="https://oceancurrent.aodn.org.au/misc/CP_Rottnest_fig1.gif" height="150" />
              </a>
              <p>
                On Friday 20 February we will show the
                <a href="http://www.oceans.uwa.edu.au/">Oceans Institute of the University of Western Australia</a>
                ocean current forecast for the following day's race. In the mean time, see our constantly-updated maps
                of ocean data for the
                <a href="https://oceancurrent.aodn.org.au/sst.php?link=Rottnest/latest.html">Rottnest Island</a>
                region and the following introductory material by Prof Chari Pattiaratchi of UWA:
              </p>
              <p>
                Currents along the Perth Metropolitan coastal area respond to wind patterns. The tides have little
                influence. During the summer months, the wind pattern between Cottesloe and Rottnest Island is usually
                dominated by the land/sea breeze system. In the morning, the wind is easterly (i.e. blows from the land
                to the ocean). During the late morning to early afternoon, the sea breeze changes direction to blow from
                the south or south-southwest. The sea breeze is usually both much stronger and longer lasting over the
                ocean than over the land. All of these factors mean that the prevailing currents are usually northward,
                particularly after several days of sea breezes. This dominant pattern is illustrated above right.
                <a href="https://oceancurrent.aodn.org.au/misc/CP_Rottnest_fig2.gif">
                  <img src="https://oceancurrent.aodn.org.au/misc/CP_Rottnest_fig2.gif" height="150" />
                </a>
              </p>
              <p>
                The next most common weather pattern for the region features strong easterly winds. The current at these
                times flows southwards (below right). This happens when we have several really hot days (i.e. high
                30's+) in a row. This is what happened in
                <a href="https://oceancurrent.aodn.org.au/news_archive.php#20140220" className="anchor">
                  last year's race{' '}
                </a>
                .
              </p>
              <p>
                The current accelerates locally as it flows around Rottnest Island, so currents are stronger along both
                ends of the island. As the swimmers start off from Cottesloe, the currents will probably be weak and not
                have much influence. However, as the swimmers get closer to Rottnest Island (about 2-3 km away) they are
                more likely to experience strong currents. The direction of the currents would depend on the prevailing
                wind conditions (see above). These currents may be strong (up to 1 knot or 0.5 m/s).
              </p>
            </div>
          </article>

          <a
            href="https://oceancurrent.aodn.org.au/technews.php"
            className="flex h-[56px] w-[240px] items-center justify-center rounded bg-white text-[20px] text-[#3B6E8F] no-underline"
          >
            News Archive
          </a>
        </div>
      </div>
    </div>
  );
};
