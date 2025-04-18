const mapboxInstanceIds = {
  OCEAN_CURRENT_BASIC_MAP_ID: 'oc-basic-map',
  OCEAN_CURRENT_MAIN_MAP_ID: 'oc-main-map',
  SIDEBAR_MINI_MAP_ID: 'sidebar-mini-map',
} as const;

const mapboxSourceIds = {
  ARGO_AS_PRODUCT_SOURCE_ID: 'argo-as-product-source-id',
  PRODUCT_REGION_BOX_SOURCE_ID: 'product-region-box-source-id',
  CURRENT_METERS_DEPLOYMENT_PLOTS_SOURCE_ID: 'current-meters-deployment-plots-source-id',
} as const;

const mapboxLayerIds = {
  ARGO_AS_PRODUCT_POINT_LAYER_ID: 'argo-as-product-point-layer-id',
  ARGO_AS_PRODUCT_SELECTED_POINT_LAYER_ID: 'argo-as-product-selected-point-layer-id',

  PRODUCT_REGION_BOX_LAYER_ID: 'product-region-box-layer-id',
  PRODUCT_REGION_BOX_HIGHLIGHT_LAYER_ID: 'product-region-box-highlight-layer-id',
  PRODUCT_REGION_NAME_LABEL_LAYER_ID: 'product-region-name-label-layer-id',
  PRODUCT_REGION_SELECTED_BOX_LAYER_ID: 'product-region-selected-box-layer-id',

  CURRENT_METERS_BOX_LAYER_ID: 'current-meters-box-layer-id',
  CURRENT_METERS_SELECTED_BOX_LAYER_ID: 'current-meters-selected-box-layer-id',
} as const;

export { mapboxInstanceIds, mapboxSourceIds, mapboxLayerIds };
