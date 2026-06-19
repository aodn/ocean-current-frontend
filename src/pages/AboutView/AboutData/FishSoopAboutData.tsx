export const FishSoopAboutData = () => {
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
