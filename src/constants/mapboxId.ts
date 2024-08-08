interface MapBoxInstanceIds {
  oceanCurrentBasicMapId: string;
  oceanCurrentMainMapId: string;
  sidebarMiniMapId: string;
}

interface MapboxSourceIds {
  argoAsProductSourceId: string;
  productRegionBoxSourceId: string;
  dataImageSourceId: string;
}

interface MapboxLayerIds {
  argoAsProductPointLayerId: string;
  argoAsProductSelectedPointLayerId: string;
  productRegionBoxLayerId: string;
  productRegionBoxHighlightLayerId: string;
  productRegionNameLabelLayerId: string;
  productRegionSelectedBoxLayerId: string;
  dataImageLayerId: string;
}

const mapboxInstanceIds: MapBoxInstanceIds = {
  oceanCurrentBasicMapId: 'oc-basic-map',
  oceanCurrentMainMapId: 'oc-main-map',
  sidebarMiniMapId: 'sidebar-mini-map',
};

const mapboxSourceIds: MapboxSourceIds = {
  argoAsProductSourceId: 'argo-as-product-source-id',
  productRegionBoxSourceId: 'product-region-box-source-id',
  dataImageSourceId: 'data-image-source-id',
};

const mapboxLayerIds: MapboxLayerIds = {
  argoAsProductPointLayerId: 'argo-as-product-point-layer-id',
  argoAsProductSelectedPointLayerId: 'argo-as-product-selected-point-layer-id',
  productRegionBoxLayerId: 'product-region-box-layer-id',
  productRegionBoxHighlightLayerId: 'product-region-box-highlight-layer-id',
  productRegionNameLabelLayerId: 'product-region-name-label-layer-id',
  productRegionSelectedBoxLayerId: 'product-region-selected-box-layer-id',
  dataImageLayerId: 'data-image-layer-id',
};

export { mapboxInstanceIds, mapboxSourceIds, mapboxLayerIds };
