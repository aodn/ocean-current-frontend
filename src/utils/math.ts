export const generateRandomIndices = (targetLength: number, pickLength: number): number[] => {
  if (pickLength > targetLength) {
    throw new Error('Cannot pick more elements than are available');
  }

  const indices = new Set<number>();
  while (indices.size < pickLength) {
    const randomIndex = Math.floor(Math.random() * targetLength);
    indices.add(randomIndex);
  }

  return Array.from(indices);
};

export const pickRandomElements = <T>(elements: T[], pickLength: number): T[] => {
  if (pickLength > elements.length) {
    throw new Error('Cannot pick more elements than array length');
  }

  const indices = generateRandomIndices(elements.length, pickLength);
  return indices.map((index) => elements[index]);
};
