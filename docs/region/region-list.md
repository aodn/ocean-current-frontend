# Region list

For each product, it has different available region list and there is no pattern.

## 1. Full list

The full list is read from the map polygons. Since every product has the same entrance map, the map polygons decided the final available list.

> Some product might have more region available in the file server, but there is no region polygon on the map so they are not accessible.

```javascript
const stateList = ['Au', 'GAB', 'NE', 'NW', 'NZ', 'SE', 'SO', 'SW'];
```

```javascript
const fullLocalList = [
  'Adelaide',
  'AlbEsp',
  'Bass',
  'Bris-Syd',
  'Brisbane',
  'Brisbane2',
  // map not accessible
  // 'Broome',
  // 'Broome2',
  'CGBR',
  'CLeeu',
  'Coffs',
  'DonPer',
  'Dongara',
  'EGAB',
  'Fiji',
  'Forster',
  'GoC',
  'Indo',
  'JBGulf',
  'Kimberley',
  // map not accessible
  // 'LordHowe',
  'LordHoweS',
  'NewCal',
  'NGBR',
  'Ningaloo',
  'NingLeeu',
  'NWS',
  'NZNI',
  'NZSI',
  'Perth',
  'PNGSol',
  'RechEyre',
  'Rottnest',
  'Rowley',
  'RowleyAtolls',
  'SAgulfs',
  'SGBR',
  'ScottMore',
  'SGoC',
  'SNSW',
  'Solomon',
  'Syd-Hob',
  'Tas',
  // map not accessible
  // 'Tas2',
  'TasE',
  'TasSE',
  'TimorP',
  'TopEnd',
  'Torres',
  'Vanuatu',
  'XmasI',
];
```
