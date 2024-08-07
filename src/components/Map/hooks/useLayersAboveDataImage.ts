import { useCallback, useState } from 'react';

const useLayersAboveDataImage = () => {
  const [layersAbove, setLayersAbove] = useState<string[]>([]);

  const addLayerAbove = useCallback((layerId: string) => {
    setLayersAbove((prev) => {
      if (!prev.includes(layerId)) {
        return [...prev, layerId];
      }
      return prev;
    });
  }, []);

  const removeLayerAbove = useCallback((layerId: string) => {
    setLayersAbove((prev) => prev.filter((id) => id !== layerId));
  }, []);

  return { layersAbove, addLayerAbove, removeLayerAbove };
};

export default useLayersAboveDataImage;
