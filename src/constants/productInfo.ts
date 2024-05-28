import { ProductInfo } from '@/types/product';

const list: ProductInfo[] = [
  {
    id: 'snapshotSst',
    summary: '',
    description:
      'This is our legacy system for displaying the long archive of SST images from the NOAA Polar-Orbiting Environmental Satellites (and MODIS and VIIRS recently). Snapshot SST, as the name suggests, shows individual SST images without any time-averaging. Where the sky is clear, these images provide great detail. Unfortunately, individual SST images almost always have some gaps due to cloud. For this product, we fill those gaps using the last-available view of the ocean, no matter how old that is. The gap filling helps when viewing the animations as the eye is drawn to the movement of the water in cloud-free areas and not the cloud gaps',
  },
  {
    id: 'oceanColour',
    summary:
      'Daily images of chlorophyll-a estimates from the MODIS sensor on NASA’s Aqua satellite indicating the amount of phytoplankton in the water.',
    description:
      "Daily images of chlorophyll-a estimates from the MODIS sensor on NASA's Aqua satellite indicating the amount of phytoplankton in the water. Chlorophyll-a can be detected by satellite by measuring the relative amounts of light coming from the ocean at different wavelengths. The Ocean Colour model (OC3) that converts the satellite observations to chlorophyll-a concentration assumes that chlorophyll-a is the only thing in the water affecting the measurements. This is largely true in the open ocean but in coastal waters tannin from rivers and suspended sediments can be present and cannot be differentiated from chlorophyll-a.\nIn the open ocean we can be confident the satellite images represent productivity, but in very shallow coastal waters or over reefs, bottom reflectance and bottom vegetation can also contribute to the estimate. There are times when a large chlorophyll-a signal in coastal waters can be relied on to infer productivity. For example, any summertime upwelling event off the Bonney Coast, where the shelf is deep and there is little river runoff. Conversely, there are times when we can be confident the satellite images are representing something else, such as the beautiful outline of the reefs on the central Great Barrier Reef or suspended sediment and dissolved organic matter in the aftermath of Cyclone Debbie.",
  },
  {
    id: 'sixDaySst',
    summary: 'Sea Surface Temperature (°C) 6-day ngt-only comp QL3',
    description:
      'Sea Surface Temperature (SST) products are derived from the temperature of the ocean surface. SST is an important variable for monitoring the health of the ocean and the distribution of marine species. SST products are used to monitor the temperature of the ocean and the distribution of marine species.',
  },
];

const productDescription = list.map((item) => {
  return item;
});

export { productDescription };
