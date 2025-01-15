import { CurrentMetersImageDataPoints } from '@/types/currentMeters';
import { convertCurrentMeterHtmlMapElementStringToObj } from '@/utils/geo-utils/geo';

const htmlString = `<map name="imap">
<area shape="rect" coords="311  306  320  316" href="../SEQ400/index.html" alt="SEQ400" title="SEQ400">
<area shape="rect" coords="271  309  280  319" href="../SEQ200/index.html" alt="SEQ200" title="SEQ200">
<area shape="rect" coords="187  309  196  319" href="../NRSNSI/index.html" alt="NRSNSI" title="NRSNSI">
<area shape="rect" coords="320  303  329  313" href="../EAC0500/index.html" alt="EAC0500" title="EAC0500">
<area shape="rect" coords="348  297  356  307" href="../EAC1520/index.html" alt="EAC1520" title="EAC1520">
<area shape="rect" coords="361  297  369  307" href="../EAC2000/index.html" alt="EAC2000" title="EAC2000">
<area shape="rect" coords="413  283  422  293" href="../EAC3200/index.html" alt="EAC3200" title="EAC3200">
<area shape="rect" coords="472  267  481  277" href="../EAC4200/index.html" alt="EAC4200" title="EAC4200">
<area shape="rect" coords="611  248  620  258" href="../EAC4700/index.html" alt="EAC4700" title="EAC4700">
<area shape="rect" coords="874  204  883  214" href="../EAC4800/index.html" alt="EAC4800" title="EAC4800">
<area shape="rect" coords="320  293  329  303" href="../EAC0500/index.html" alt="EAC0500" title="EAC0500">
<area shape="rect" coords="348  287  356  297" href="../EAC1520/index.html" alt="EAC1520" title="EAC1520">
<area shape="rect" coords="361  287  369  297" href="../EAC2000/index.html" alt="EAC2000" title="EAC2000">
<area shape="rect" coords="413  273  422  283" href="../EAC3200/index.html" alt="EAC3200" title="EAC3200">
<area shape="rect" coords="472  257  481  267" href="../EAC4200/index.html" alt="EAC4200" title="EAC4200">
<area shape="rect" coords="611  238  620  248" href="../EAC4700/index.html" alt="EAC4700" title="EAC4700">
<area shape="rect" coords="874  194  883  204" href="../EAC4800/index.html" alt="EAC4800" title="EAC4800">
<area shape="rect" coords="837  309  890  320" href="../SEQ400/index.html" alt="SEQ400" title="SEQ400">
<area shape="rect" coords="837  323  890  334" href="../SEQ200/index.html" alt="SEQ200" title="SEQ200">
<area shape="rect" coords="837  336  890  347" href="../NRSNSI/index.html" alt="NRSNSI" title="NRSNSI">
<area shape="rect" coords="837  349  899  360" href="../EAC0500/index.html" alt="EAC0500" title="EAC0500">
<area shape="rect" coords="837  363  899  374" href="../EAC1520/index.html" alt="EAC1520" title="EAC1520">
<area shape="rect" coords="837  376  899  387" href="../EAC2000/index.html" alt="EAC2000" title="EAC2000">
<area shape="rect" coords="837  389  899  400" href="../EAC3200/index.html" alt="EAC3200" title="EAC3200">
<area shape="rect" coords="837  403  899  414" href="../EAC4200/index.html" alt="EAC4200" title="EAC4200">
<area shape="rect" coords="837  416  899  427" href="../EAC4700/index.html" alt="EAC4700" title="EAC4700">
<area shape="rect" coords="837  429  899  440" href="../EAC4800/index.html" alt="EAC4800" title="EAC4800">
<area shape="rect" coords="837  442  899  453" href="../EAC0500/index.html" alt="EAC0500" title="EAC0500">
<area shape="rect" coords="837  456  899  467" href="../EAC1520/index.html" alt="EAC1520" title="EAC1520">
<area shape="rect" coords="837  469  899  480" href="../EAC2000/index.html" alt="EAC2000" title="EAC2000">
<area shape="rect" coords="837  482  899  493" href="../EAC3200/index.html" alt="EAC3200" title="EAC3200">
<area shape="rect" coords="837  496  899  507" href="../EAC4200/index.html" alt="EAC4200" title="EAC4200">
<area shape="rect" coords="837  509  899  520" href="../EAC4700/index.html" alt="EAC4700" title="EAC4700">
<area shape="rect" coords="837  522  899  533" href="../EAC4800/index.html" alt="EAC4800" title="EAC4800">
</map>`;

export const seqMapAreas = convertCurrentMeterHtmlMapElementStringToObj(htmlString);

const regionArr: CurrentMetersImageDataPoints[] = [
  { shape: 'rect', coords: [311, 306, 320, 316], href: '../SEQ400/index.html', alt: 'SEQ400', name: 'SEQ400' },
  { shape: 'rect', coords: [271, 309, 280, 319], href: '../SEQ200/index.html', alt: 'SEQ200', name: 'SEQ200' },
  { shape: 'rect', coords: [187, 309, 196, 319], href: '../NRSNSI/index.html', alt: 'NRSNSI', name: 'NRSNSI' },
  { shape: 'rect', coords: [320, 303, 329, 313], href: '../EAC0500/index.html', alt: 'EAC0500', name: 'EAC0500' },
  { shape: 'rect', coords: [348, 297, 356, 307], href: '../EAC1520/index.html', alt: 'EAC1520', name: 'EAC1520' },
  { shape: 'rect', coords: [361, 297, 369, 307], href: '../EAC2000/index.html', alt: 'EAC2000', name: 'EAC2000' },
  { shape: 'rect', coords: [413, 283, 422, 293], href: '../EAC3200/index.html', alt: 'EAC3200', name: 'EAC3200' },
  { shape: 'rect', coords: [472, 267, 481, 277], href: '../EAC4200/index.html', alt: 'EAC4200', name: 'EAC4200' },
  { shape: 'rect', coords: [611, 248, 620, 258], href: '../EAC4700/index.html', alt: 'EAC4700', name: 'EAC4700' },
  { shape: 'rect', coords: [874, 204, 883, 214], href: '../EAC4800/index.html', alt: 'EAC4800', name: 'EAC4800' },
  { shape: 'rect', coords: [320, 293, 329, 303], href: '../EAC0500/index.html', alt: 'EAC0500', name: 'EAC0500' },
  { shape: 'rect', coords: [348, 287, 356, 297], href: '../EAC1520/index.html', alt: 'EAC1520', name: 'EAC1520' },
  { shape: 'rect', coords: [361, 287, 369, 297], href: '../EAC2000/index.html', alt: 'EAC2000', name: 'EAC2000' },
  { shape: 'rect', coords: [413, 273, 422, 283], href: '../EAC3200/index.html', alt: 'EAC3200', name: 'EAC3200' },
  { shape: 'rect', coords: [472, 257, 481, 267], href: '../EAC4200/index.html', alt: 'EAC4200', name: 'EAC4200' },
  { shape: 'rect', coords: [611, 238, 620, 248], href: '../EAC4700/index.html', alt: 'EAC4700', name: 'EAC4700' },
  { shape: 'rect', coords: [874, 194, 883, 204], href: '../EAC4800/index.html', alt: 'EAC4800', name: 'EAC4800' },
  {
    shape: 'rect',
    coords: [837, 309, 890, 320],
    href: '../SEQ400/index.html',
    alt: 'SEQ400',
    name: 'SEQ400',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [837, 323, 890, 334],
    href: '../SEQ200/index.html',
    alt: 'SEQ200',
    name: 'SEQ200',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [837, 336, 890, 347],
    href: '../NRSNSI/index.html',
    alt: 'NRSNSI',
    name: 'NRSNSI',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [837, 349, 899, 360],
    href: '../EAC0500/index.html',
    alt: 'EAC0500',
    name: 'EAC0500',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [837, 363, 899, 374],
    href: '../EAC1520/index.html',
    alt: 'EAC1520',
    name: 'EAC1520',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [837, 376, 899, 387],
    href: '../EAC2000/index.html',
    alt: 'EAC2000',
    name: 'EAC2000',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [837, 389, 899, 400],
    href: '../EAC3200/index.html',
    alt: 'EAC3200',
    name: 'EAC3200',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [837, 403, 899, 414],
    href: '../EAC4200/index.html',
    alt: 'EAC4200',
    name: 'EAC4200',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [837, 416, 899, 427],
    href: '../EAC4700/index.html',
    alt: 'EAC4700',
    name: 'EAC4700',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [837, 429, 899, 440],
    href: '../EAC4800/index.html',
    alt: 'EAC4800',
    name: 'EAC4800',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [837, 442, 899, 453],
    href: '../EAC0500/index.html',
    alt: 'EAC0500',
    name: 'EAC0500',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [837, 456, 899, 467],
    href: '../EAC1520/index.html',
    alt: 'EAC1520',
    name: 'EAC1520',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [837, 469, 899, 480],
    href: '../EAC2000/index.html',
    alt: 'EAC2000',
    name: 'EAC2000',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [837, 482, 899, 493],
    href: '../EAC3200/index.html',
    alt: 'EAC3200',
    name: 'EAC3200',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [837, 496, 899, 507],
    href: '../EAC4200/index.html',
    alt: 'EAC4200',
    name: 'EAC4200',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [837, 509, 899, 520],
    href: '../EAC4700/index.html',
    alt: 'EAC4700',
    name: 'EAC4700',
    isText: true,
  },
  {
    shape: 'rect',
    coords: [837, 522, 899, 533],
    href: '../EAC4800/index.html',
    alt: 'EAC4800',
    name: 'EAC4800',
    isText: true,
  },
];

export default regionArr;
