/* eslint-disable react/no-unescaped-entities */
const currentMetersDescription =
  "The overview map is your entry point to a series of maps showing a few properties of Australia's ocean currents: mean (all-time, annual and seasonal), standard deviation for various layers and time-windows, and tidal harmonics for the depth-average flow.";

const currentMetersDataModal = () => {
  return (
    <div className="p-4 text-gray-800">
      <h3 className="mb-4 text-lg font-semibold">Revisions</h3>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">19 August 2024</strong>A refresh with just a few updates since July, the
        motivating one being that AODN had accidentally placed an NRSMAI dataset in the NRSNSI folder, something we
        should have flagged as a fatal error but only flagged it as an issue. With a few other issues (including removal
        of some duplicates) fixed as well, the tally for the shelf array is now 1250 (with only 4 assessed as having
        fatal errors). (our ref: P48)
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">22 July 2024</strong>
        An update of the Shelf Array, taking the tally of individual current meter deployments for that array from 1198
        to 1249. This revision includes a correction to the way we decide if 'northward' means true north (what we want
        it to be) or magnetic north (as it is in the original data from the instrument). There are three types of files
        in the archive: 1) old ones which are magnetic north (we think, so we apply a rotation ourselves), 2) newer ones
        which are true north, with a UCUR attribute compass_correction_applied to document the processing step, and 3)
        ones with an attribute magnetic_declination, which we take to mean the correction has been applied. We had been
        treating type 3 files as type 1 (so the rotation is applied twice) because they lacked the
        compass_correction_applied attribute. The number of files affected by this error was only about 24, as can be
        seen by comparing the
        <a href="ANMN_P47/ANMNtable.html#issues" className="mx-1 text-[#52BDEC] underline">
          current
        </a>
        and
        <a href="ANMN_P46/ANMNtable.html#issues" className="mx-1 text-[#52BDEC] underline">
          previous
        </a>
        lists of file-reading issues. So, users be warned: you should check all 3 possibilities to avoid making the same
        error (which is fortunately only a few degrees in most cases, because few are in SE Aust where the correction is
        large) as we were. (our ref: P47)
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">29 February 2024</strong>
        An update of the Shelf Array, taking the tally of individual current meter deployments for that array from 1142
        to 1198. Many of the new files are for the Sydney 'Ocean Reference Station' ORS065 just off Bondi. (our ref:
        P46)
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">14 September 2023</strong>
        An update of the Shelf Array. The tally of individual current meter deployments is now 1142+96+186+21 = 1445 for
        Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean arrays, respectively. A minor bug was fixed. Images with
        hotspots are now more precisely located (so what you click is what you get). (our ref: P44)
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">9 June 2023</strong>
        An update of the Shelf Array. The tally of individual current meter deployments is now 1111+96+186+21 = 1414 for
        Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean arrays, respectively. Also, seasonal (e.g., multi-summer) means
        were added to the maps of all-time and annual-mean currents. NB: in the course of this upgrade a bug was fixed -
        the numbers of device-days listed on those plots are now correct. (our ref: P43)
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">15 Feb 2023</strong>
        An update of the Shelf Array, now with the Signature ADCPs reprocessed to include Height_Above_Sensor (see
        previous lists of Data File Issues). The tally of individual current meter deployments is now 1087+96+186+21 =
        1390 for Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean arrays, respectively. (our ref: P42)
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">24 Nov 2022</strong>A major update of the{' '}
        <strong className="text-[#52BDEC]">deep water</strong> array, adding both the 2019-21 and 2021-22 deployments.
        The tally of individual current meter deployments is now 1039+96+186+21 = 1342 for Shelf, Deep(ADCP), Deep(ADV)
        and Southern Ocean arrays, respectively. (our ref: P40)
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">28 Sept 2022</strong>A routine update of the shelf array. The tally of
        deployments is now 1039+67+134+21 = 1257 for Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean arrays,
        respectively. (for ref: P37)
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">31 March 2022</strong>A routine update of the shelf array. The tally of
        deployments is now 999+67+134+21 = 1217 for Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean arrays,
        respectively. (for ref: P35)
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">21 August 2021</strong>A mostly-routine update focusing on the shelf array.
        The tally of deployments is now 963+67+134+21 = 1181 for Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean arrays,
        respectively. This update includes data from 5 new sites in the NW in addition to recently-uploaded data
        elsewhere.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">11 March 2021</strong>A mostly-routine update focusing on the shelf array.
        The tally of deployments is now 898+67+134+21 = 1120 for Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean arrays,
        respectively. This update corrects a minor error (introduced at the previous update) with some of the tabulated
        tidal constituents.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">16 Nov 2020</strong>
        As well as now including the 4th deployment of the EAC array, the Deep Water Moorings data set has a new address
        at the AODN. The tally of deployments is now 875+67+134+21 = 1097 for Shelf, Deep(ADCP), Deep(ADV) and Southern
        Ocean arrays, respectively.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">11 Feb 2020</strong>
        This week's update and re-read extended the data base further into 2019. The tally of deployments is now
        841+53+110+19 = 1023 for Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean arrays, respectively.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">27 Sep 2019</strong>
        This week's update and re-read extended the data base into 2019, while netting several reprocessed files for PPS
        and HIS. The tally of deployments is now 815+53+110+19 = 997 for Shelf, Deep(ADCP), Deep(ADV) and Southern Ocean
        arrays, respectively.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">26 Apr 2019</strong>
        This week we performed a re-read of the
        <a
          href="http://thredds.aodn.org.au/thredds/catalog/IMOS/catalog.html"
          target="_blank"
          className="mx-1 text-[#52BDEC] underline"
          rel="noreferrer"
        >
          AODN
        </a>
        archive after learning that the time vector in the files is NOT a record of the central times of the averaging
        intervals, but the BEGINNING times. To get the central time you have to add half of the averaging interval. In
        some files produced by recent versions of the toolbox, the TIME variable has an attribute
        seconds_to_middle_of_measurement (abbreviated here to 'shift') so you can do this. For other files, however,
        this information is missing (see the new columns headed 'dt av shift' in the tabulations linked above, e.g. for
        the
        <a href="ANMN_P28/ANMNtable.html" className="mx-1 text-[#52BDEC] underline">
          shelf array
        </a>
        ). For short averaging intervals (av=1 or 2 minutes) this is not a big problem, but for instruments that were
        set to do longer averaging intervals (20-60 minutes), it is. In all cases, users wanting to analyse the very
        high-frequency spectral components will want to know the averaging interval (as well as the sampling interval),
        so we hope that a future re-process of the raw data will produce new files with 1) TIME being the center of the
        averaging interval (and confirm this is the case), 2) the averaging interval included, and 3) the number of
        pings averaged during that interval. This week's re-process also includes a minor bug fix that previously
        affected the 'dt_start' and 'dt_end' columns of the tables. There are now more zeros in those columns,
        indicating correspondence of the dates in the filenames with either the range of the time vector, the period of
        good data, or both.
      </p>

      <p className="mb-4">
        <strong className="text-[#52BDEC]">21 Jan 2019</strong>
        Our latest regular re-read of the data archive at
        <a
          href="http://thredds.aodn.org.au/thredds/catalog/IMOS/catalog.html"
          target="_blank"
          className="mx-1 text-[#52BDEC] underline"
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
        estimates are at a number of equi-spaced vertical distances from the ADCP, i.e., the manufacturer's software has
        taken the tilt of the unit into account. For ADCPs on short mooring lines (e.g., those of the Shelf Array) that
        do not undergo large vertical displacement, these data can be used directly to estimate velocity at a range of
        depth levels. This is what we
        <a href="index_201406.htm" className="mx-1 text-[#52BDEC] underline">
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
        use ADCP-P, or the 'nominal depth' in the global attributes.
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
        affected layer is about 12% of the nominal instrument depth but also depends on the instrument's acoustic
        characteristics (frequency, beam width, etc.), the tilt, and the sea state.
      </p>
    </div>
  );
};

export { currentMetersDataModal, currentMetersDescription };
