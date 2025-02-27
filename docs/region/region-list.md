# Regions and Products

Each product has data available from a list of regions that is unique to the product itself. One of the major issue is that there is no standard convention on how they are named and organised in the file server. The chosen solution is that we specify the region list for each (Main) Product and SubProduct in this file - `src/data/regionList.ts`.

# How Region Boxes are Rendered in Map

All regions in the map are rendered by a custom map layer - the `RegionPolygonLayer` component (`src/components/Map/layers/RegionPolygonLayer.tsx`). This component extracts the list of regions for a specific Product/SubProduct from `src/data/regionList.ts`. It then finds the matching region codes in `src/data/regionData.ts` and uses the Bounding Box coordinates to render the boxes for each available region.

**Note: Some product might have more region available in the file server, but there is no region polygon on the map so they are not accessible.**

# Region Name and Image File Path

To access the data images, we have to fetch the image from the file server via their corresponding urls. We have utils that build the urls in here - `src/utils/data-image-builder-utils/dataImgBuilder.ts`, which varies depending on the chosen Product and SubProduct. The region codes in `src/data/regionData.ts` are named specifically to match the region folder where the data images are located in the file server. **The only exceptions to this are the regions `Brisbane-Newcastle` and `Brisbane`.**

## `Brisbane-Newcastle` and `Brisbane` regions

We named these two regions **based on their actual region titles** for better readability and to avoid confusion in code. This is because if we matched their folder names in the file server, `Brisbane-Newcastle` would be `Brisbane` and `Brisbane` would be `Brisbane2`. We do not know the actual reasons for this naming decision.

As the region code is used to build the url for data image fetching, we handle this particular exception in the `ProductContent` component (`src/pages/DataView/product-content/ProductContent.tsx`) by overriding the values before calling the image url builder methods:

```
const getRegionPath = (region: Region | undefined) => {
  if (!region) return 'Au';

  // we have to override the code to get the correct image file path as they have been changed to provide more context in code
  if (region?.code === 'Bris-Newc') {
    return 'Brisbane';
  } else if (region?.code === 'Brisbane') {
    return 'Brisbane2';
  } else {
    return region?.code;
  }
};
```
