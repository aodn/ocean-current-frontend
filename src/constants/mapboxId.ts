interface MapBoxInstanceIds {
  oceanCurrentBasicMap: string;
  sidebarMiniMap: string;
}

interface MapboxSourceIds {
  argoAsProductSource: string;
  productRegionBoxSource: string;
}

interface MapboxLayerIds {
  argoAsProductPointLayer: string;
  argoAsProductSelectedPointLayer: string;
  productRegionBoxLayer: string;
}

const mapboxInstanceIds: MapBoxInstanceIds = {
  oceanCurrentBasicMap: 'oc-basic-map',
  sidebarMiniMap: 'sidebar-mini-map',
};

const mapboxSourceIds: MapboxSourceIds = {
  argoAsProductSource: 'argo-as-product-source-id',
  productRegionBoxSource: 'product-region-box-source-id',
};

const mapboxLayerIds: MapboxLayerIds = {
  argoAsProductPointLayer: 'argo-as-product-point-layer-id',
  argoAsProductSelectedPointLayer: 'argo-as-product-selected-point-layer-id',
  productRegionBoxLayer: 'product-region-box-layer-id',
};

export { mapboxInstanceIds, mapboxSourceIds, mapboxLayerIds };
