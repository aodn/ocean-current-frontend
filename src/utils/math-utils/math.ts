const generateRandomIndices = (targetLength: number, pickLength: number): number[] => {
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

const pickRandomElements = <T>(elements: T[], pickLength: number): T[] => {
  if (pickLength > elements.length) {
    throw new Error('Cannot pick more elements than array length');
  }

  const indices = generateRandomIndices(elements.length, pickLength);
  return indices.map((index) => elements[index]);
};

const stringToHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

export { generateRandomIndices, pickRandomElements, stringToHash };
