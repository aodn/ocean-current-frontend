# Gliders map MVP

`/map/gliders` displays the shared Mapbox map with blue deployment markers beside the existing product-navigation sidebar. There are no Gliders options, calendar, deployment selectors or rectangle interactions.

The MVP is fixed to the twelve known Slocum NRT missions on the checked 2026 source map. Mission centre coordinates are fetched from `/api/v1/gliders/missions?q=2026&nrt=true&page=0&size=100` using the shared Axios client and TanStack Query. Positions are paginated within this partition if needed.

The existing `convertAreaCoordsToGeoJsonCoordinates` helper builds the rectangle polygons. Mission and marker types live in `src/types/gliders.ts`, and the API function is `fetchGliderMissions`.

Rectangle width and height, in degrees, are hardcoded per mission in `src/configs/products/gliders-map-mvp.ts`. They were derived once from the verified original source rectangles and the independently validated 2026 calibration. `src/utils/gliders-map-utils/mvp-deployments.ts` centres those fixed-size markers on the API's current mission coordinates.

There is no HTML download, GIF download, hidden image, image-size measurement or runtime calibration. The production implementation contains no HTML parser or calibration utilities. Fixtures and the prior calibration investigation are outside the staged MVP.

The rectangles are display markers, not scientific trajectory bounds. This MVP does not add new missions or extend its hardcoded dimensions to other years/platforms automatically. Missing API positions are omitted, and empty/error states do not substitute an old image.

Tests were adjusted for the simplified MVP but were not run, as requested.
