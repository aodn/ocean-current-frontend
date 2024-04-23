# Argo as individual product

Argo points show on the map based on the date selected.

## 1. Argo meta data file

### Argo map profiles

Argo meta data saved on the server as plain text file: <https://oceancurrent.aodn.org.au/profiles/map/20240420>. They synced from other place.

The file `20240420` content:

```xml
<map name=imap>
  <area shape="rect" coords="460  311  465  317" href="../1901756/20240320_1901756_153.html" target="_blank" alt="1901756">
  <area shape="rect" coords="49  147   54  153" href="../1902050/20240320_1902050_136.html" target="_blank" alt="1902050">
</map>
```

> For each file, there is a html file aside, e.g. [`20240420.html`](https://oceancurrent.aodn.org.au/profiles/map/20240420.html). The html file has the same element but wrap into a full html element page.

### Argo data image

A gif image with pre drawn Argo circular marker or dots.

`/wmoid/yyyymmdd_wmoid_cycle.gif`

0-2000m: <https://oceancurrent.aodn.org.au/profiles/6902927/20240311_6902927_182.gif>

0-400m: <https://oceancurrent.aodn.org.au/profiles_s/6902927/20240311_6902927_182.gif>

## 2. Data flow

### PHP

1. Read the Argo meta html file and extract the `<map></map>` element.
2. take out the `href="../2903430/20240320_2903430_13.html"` then convert and replace it by `href="cycle.php?wmoid=2903430&cycle=13.&depth=0"` to make it point to the Argo data image.
3. Embedded back to the html file so the Argo circular point clickable.

### React

1. Select Date (default is today)
2. Send request to server fetching plain text file and convert it to object.
3. Extract `coords` attribute and convert them into `GeoJson` data then draw on the map.
4. Extract `href` attribute and generate Argo data image url.
5. Make circular marker clickable with generated image url.

## 3. Date available for meta data file

### PHP

For argo data, normally they don't have file for today. Currently, it use the `latest.html` file links to the file for the latest day.

### React

Recursively send request to check if data available with selected date (default is today), if 404 then resend request to check the day before until meta data file received
