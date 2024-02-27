import React from 'react';

import { Link } from 'react-router-dom';

const products = [
  {
    title: 'Snapshot SST',
    path: 'snapshot-sst',
  },
  {
    title: 'Four hour SST',
    path: 'four-hour-sst',
    children: [
      {
        title: 'SST Filled',
        path: 'sst-filled',
      },
      {
        title: 'SST',
        path: 'sst',
      },
      {
        title: 'SST Age',
        path: 'sst-age',
      },
      {
        title: 'Wind Speed',
        path: 'wind-speed',
      },
    ],
  },
  {
    title: '6-Day SST & Centiles',
    path: '6-day-sst-centiles',
    children: [
      {
        title: 'SST',
        path: 'sst',
      },
      {
        title: 'SST Anomaly',
        path: 'sst-anomaly',
      },
      {
        title: 'Centiles',
        path: 'centiles',
      },
    ],
  },
  {
    title: 'Climatology',
    path: 'climatology',
    children: [
      {
        title: 'SST',
        path: 'sst',
      },
      {
        title: 'Date Count',
        path: 'date-count',
      },
    ],
  },
  {
    title: 'SST Anom vs Time',
    path: 'sst-anom-vs-time',
  },
  {
    title: 'Snapshot Chlorophyll-a',
    path: 'snapshot-chlorophyll-a',
  },
  {
    title: 'Adj. Sea Level Anom.',
    path: 'adj-sea-level-anom',
  },
  {
    title: 'Non-Tidal Sea Level Anom.',
    path: 'non-tidal-sea-level-anom',
  },
];

const SideNavBar: React.FC = () => {
  return (
    <div className=" bg-imos-sea-blue">
      <ul className="grid grid-cols-1 divide-y">
        {products.map((product, index) => (
          <li key={index}>
            <Link to={`${product.path}`}>{product.title}</Link>
            {product.children && (
              <ul>
                {product.children.map((child, index) => (
                  <li key={index} className="pl-6">
                    <Link to={`${product.path}/${child.path}`}>{child.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNavBar;
