export type FishSoopStoreState = {
  /** FishSOOP region code (e.g. 'TasE'); applies to the anomaly products. */
  region: string;
  /** Quarter id like '2025Q2'; empty until resolved from the image list. */
  quarter: string;
  /** Depth layer number as string ('1'–'8'); empty until resolved from the image list. */
  layer: string;
  /** Page of the `tanom_avg_p<N>` whole-dataset overview ('1'–'4'). */
  avgPage: string;
};

export type FishSoopStoreActions = {
  actions: {
    setRegion: (region: string) => void;
    setQuarter: (quarter: string) => void;
    setLayer: (layer: string) => void;
    setAvgPage: (avgPage: string) => void;
    reset: () => void;
  };
};
