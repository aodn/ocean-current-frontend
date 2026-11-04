# Gliders deployment map

`/map/gliders` shows glider deployment rectangles on the shared Mapbox map beside the product-navigation sidebar.

## Data source

Geometry comes from the published `/resource/api/gliders-yearmaps.json` (`schema_version: 1`), fetched once with
`ec2ProxyClient` and cached with TanStack Query (`sharedQueryConfig`). Each entry in `maps` is one yearmap
(`id`, `year`, `platform`, `variable`, `window`, `is_nrt`) with its `deployments`
(`mission_name`, `pixel_rect`, `bbox`, `url`). No mission-endpoint or legacy HTML/image requests are made for geometry.

## Map selection

The page uses the most recent year that has at least one deployment with bounds, prefers NRT
maps for that year, then prefers the default variable and window in `src/configs/products/gliders-map.ts`
(`temp`, `04d`).

## Polygons and interaction

Each deployment `bbox` (`[west, south, east, north]`) becomes a polygon via `convertAreaCoordsToGeoJsonCoordinates`.
Deployments with `bbox: null` are skipped. Deployment polygons are display-only; clicking them does not navigate or open a new tab.
A map with no bounds shows an empty state; a failed request shows an error with a retry button.
