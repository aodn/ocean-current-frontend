const isNotNullOrUndefined = <T>(value: T | null | undefined): value is T => value !== null && value !== undefined;

const calculateImageScales = (
  originalWidth: number,
  originalHeight: number,
  displayWidth: number,
  displayHeight: number,
) => {
  const scaleX = displayWidth / originalWidth;
  const scaleY = displayHeight / originalHeight;

  return { scaleX, scaleY };
};

export { isNotNullOrUndefined, calculateImageScales };
