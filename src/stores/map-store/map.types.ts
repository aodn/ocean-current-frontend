export type State = {
  zoom: number;
};

export type Actions = {
  actions: {
    setZoom: (zoom: number) => void;
    updateZoom: (zoom: number) => void;
  };
};
