// References cited across the Ocean Current about pages.
// Ported from the legacy misc/references.php page. Each entry is one citation,
// with the author/year prefix emphasised.

interface Reference {
  // Author/year prefix, rendered bold-italic (also used as the React key).
  authors: string;
  // Remaining citation text, including its leading punctuation.
  citation: string;
}

const references: Reference[] = [
  {
    authors: 'Baird, M. E. and K. R. Ridgway (2012)',
    citation:
      ', The southward transport of sub-mesoscale lenses of Bass Strait Water in the centre of anti-cyclonic mesoscale eddies, Geophys. Res. Lett., doi:10.1029/2011GL050643, in press.',
  },
  {
    authors: 'Deng, X, D.A. Griffin, K. Ridgway, J.A. Church, W.E. Featherstone, N. White and M. Cahill (2010)',
    citation:
      '. Satellite altimetry for geodetic, oceanographic and climate studies in the Australian region, in: Vignudelli S., A. Kostianoy, and P. Cipollini and J. Benveniste (eds.), Coastal Altimetry, Springer-Verlag, Berlin. ISBN: 978-3-642-12795-3. e-ISBN: 978-3-642-12796-0. doi: 10.1007/978-3-642-12796-0_18',
  },
  {
    authors: 'Griffin, D.A., J. L. Wilkin, C. F. Chubb, A. F. Pearce and N. Caputi (2001)',
    citation:
      '. Ocean currents and the larval phase of Australian western rock lobster, Panulirus cygnus. Marine and Freshwater Research, 52, 1187-99',
  },
  {
    authors: 'Kämpf, J., M. Doubell, D. Griffin, R. L. Matthews and T. M. Ward (2004)',
    citation:
      ': Evidence of a large seasonal coastal upwelling system along the southern shelf of Australia. Geophysical Research Letters 31: L09310, doi:10.1029/2003GL019221.',
  },
  {
    authors:
      'Le Traon, P.Y.,G. Larnicol, S. Guinehut, S. Pouliquen, A. Bentamy, D. Roemmich, C. Donlon, H. Roquet, G. Jacobs, D. Griffin, F. Bonjean, N. Hoeppfner and L.-A. Breivick (2009)',
    citation:
      '. Data assembly and processing for operational oceanography: 10 years of achievements. Oceanography Magazine. 22, 56-69.',
  },
  {
    authors: 'Oke, Peter. R. and Griffin, David A.(2011)',
    citation:
      '. The cold-core eddy and strong upwelling off the coast of New South Wales in early 2007. Deep-Sea Research Part II: Topical Studies in Oceanography. 58, 574-591. doi:10.1016/j.dsr2.2010.06.006',
  },
  {
    authors: 'Ridgway K.R., J.R. Dunn, and J.L. Wilkin',
    citation:
      ', Ocean interpolation by four-dimensional least squares -Application to the waters around Australia, J. Atmos. Ocean. Tech., Vol 19, No 9, 1357-1375, 2002',
  },
  {
    authors: 'Ridgway K. R., and J. R. Dunn (2010)',
    citation:
      ', Using satellite altimetry to correct mean temperature and salinity fields derived from Argo floats in the ocean regions around Australia, Deep Sea Research Part I : Oceanographic Research, 57 (2010) 1137-1151 doi:10.1016/jdsr.2010.05.010',
  },
  {
    authors:
      'Schiller, A., P. R. Oke, G. B. Brassington, M. Entel, R. Fiedler, D. A. Griffin, and J. Mansbridge (2008)',
    citation:
      ' Eddy-resolving ocean circulation in the Asian-Australian region inferred from an ocean reanalysis effort. Progress in Oceanography,76, 334-365. doi:10.1016/j.pocean.2008.01.003.',
  },
];

export const ReferencesData = () => (
  <div className="space-y-4">
    {references.map(({ authors, citation }) => (
      <p key={authors}>
        <strong>
          <em>{authors}</em>
        </strong>
        {citation}
      </p>
    ))}
  </div>
);
