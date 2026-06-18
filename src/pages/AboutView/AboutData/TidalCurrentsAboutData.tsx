export const TidalCurrentsAboutData = () => {
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
