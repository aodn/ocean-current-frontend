# Regions and Products

Each product has data available from a list of regions that is unique to the product itself. One of the major issue is that there is no standard convention on how they are named and organised in the file server. The chosen solution is that we specify the region list for each (Main) Product and SubProduct in this file - `src/data/regionList.ts`.

# How Region Boxes are Rendered in Map

All regions in the map are rendered by a custom map layer - the `RegionPolygonLayer` component (`src/components/Map/layers/RegionPolygonLayer.tsx`). This component extracts the list of regions for a specific Product/SubProduct from `src/data/regionList.ts`. It then finds the matching region codes in `src/data/regionData.ts` and uses the Bounding Box coordinates to render the boxes for each available region.

**Note: Some product might have more region available in the file server, but there is no region polygon on the map so they are not accessible.**

# Region Code vs Region Title

Region Title is used solely for UI of the region boxes as they are human readable.

Region Codes are used everywhere else in the codebase, including for building image filepaths (see below) as well as url parameter.

# Image File Paths

To access the data images, we have to fetch the image from the file server via their corresponding urls. We have utils that build the urls in here - `src/utils/data-image-builder-utils/dataImgBuilder.ts`, which varies depending on the chosen Product and SubProduct. The region codes in `src/data/regionData.ts` are named specifically to match the region folder where the data images are located in the file server.
