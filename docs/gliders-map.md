# Gliders deployment map

`/map/gliders` shows glider deployment rectangles on the shared Mapbox map beside the product-navigation sidebar.
The toolbar switches between Map view (default) and Table view while keeping the selected year and glider type.
View and filter selections are stored in the URL (`view`, `year`, `platform`, `sort`).

## Data source

Geometry comes from the published `/resource/api/gliders-yearmaps.json` (`schema_version: 1`), fetched once with
`ec2ProxyClient` and cached with TanStack Query (`sharedQueryConfig`). Each entry in `maps` is one yearmap
(`id`, `year`, `platform`, `variable`, `window`, `is_nrt`) with its `deployments`
(`mission_name`, `pixel_rect`, `bbox`, `url`). No mission-endpoint or legacy HTML/image requests are made for geometry.

## Map selection

The page uses the most recent year that has at least one deployment, prefers NRT
maps for that year, then prefers the default variable and window in `src/configs/products/gliders-map.ts`
(`temp`, `04d`).

## Polygons and interaction

Each deployment `bbox` (`[west, south, east, north]`) becomes a polygon via `convertAreaCoordsToGeoJsonCoordinates`.
Deployments with `bbox: null` are skipped on the map. Selecting a polygon opens the existing mission image view.
A map with no bounds shows an empty state; a failed request shows an error with a retry button.

## Table view

The table follows the [legacy deployment index](https://www.cmar.csiro.au/remotesensing/oceancurrent/gliders/)
with Mission, Dates, Latitude, Longitude, Days, Distance (km), Glider (vehicle ID), Processing version,
T-S, Details, Animation and Scientific data columns. Rows come directly from the cached catalogue query to
`/api/v1/gliders/missions`, including missions absent from every yearmap. Pagination continues until the
published `total` is reached; no per-row detail requests are made. Missing values show `—`, coordinates use
hemisphere labels, and the mission column stays visible while scrolling horizontally.

Deployment date defaults to newest first; the sort control also supports oldest first and mission name A–Z/Z–A.
Product links use the catalogue's actual labels and URLs. Details window controls open the existing mission
image view with `window=4d`, `12d` or `30d`, preserving the table return location. OceanCurrent resource destinations use the configured
`/resource` proxy; external scientific-data destinations are preserved. Available window links are grouped with `/`.

### Catalogue contract limitations

The API publishes `start_date`, `end_date`, `glider_id` and product links, but no explicit deployment year or
platform and no year/platform query filters. The frontend filters the complete paginated catalogue locally.
A mission belongs to every year covered by its published date range, matching yearmap behaviour for cross-year
missions (for example Bicheno20100813 continues into 2011). Vehicle ID prefixes `SL` and `SG` resolve Slocum and
Seaglider; published yearmap membership supplies missing date/type metadata. Dates or types are never guessed
from mission names. Missions lacking both usable catalogue metadata and yearmap membership cannot be classified,
and the table reports that limitation. Explicit platform and year membership fields would make this reliable for
future missions with unknown vehicle prefixes or missing dates. The current API catalogue has populated dates
and recognised vehicle prefixes for all inspected missions.

Catalogue failures display a retry action. The toolbar remains available, including for selections with no drawable map.

Browser Back returns from the mission image to the table with its filters and sort order preserved.
