interface MapBoxInstanceIds {
  oceanCurrentBasicMap: string;
  oceanCurrentMainMap: string;
  sidebarMiniMap: string;
}

interface MapboxSourceIds {
  argoAsProductSource: string;
  productRegionBoxSource: string;
  dataImageSource: string;
}

interface MapboxLayerIds {
  argoAsProductPointLayer: string;
  argoAsProductSelectedPointLayer: string;
  productRegionBoxLayer: string;
  productRegionBoxHighlightLayer: string;
  productRegionNameLabelLayer: string;
  productRegionSelectedBoxLayer: string;
  dataImageLayer: string;
}

const mapboxInstanceIds: MapBoxInstanceIds = {
  oceanCurrentBasicMap: 'oc-basic-map',
  oceanCurrentMainMap: 'oc-main-map',
  sidebarMiniMap: 'sidebar-mini-map',
};

const mapboxSourceIds: MapboxSourceIds = {
  argoAsProductSource: 'argo-as-product-source-id',
  productRegionBoxSource: 'product-region-box-source-id',
  dataImageSource: 'data-image-source-id',
};

const mapboxLayerIds: MapboxLayerIds = {
  argoAsProductPointLayer: 'argo-as-product-point-layer-id',
  argoAsProductSelectedPointLayer: 'argo-as-product-selected-point-layer-id',
  productRegionBoxLayer: 'product-region-box-layer-id',
  productRegionBoxHighlightLayer: 'product-region-box-highlight-layer-id',
  productRegionNameLabelLayer: 'product-region-name-label-layer-id',
  productRegionSelectedBoxLayer: 'product-region-selected-box-layer-id',
  dataImageLayer: 'data-image-layer-id',
};

export { mapboxInstanceIds, mapboxSourceIds, mapboxLayerIds };
