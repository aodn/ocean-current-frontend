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

export { EACMooringArrayAboutData };
