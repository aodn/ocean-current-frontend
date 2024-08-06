const isArrayEqual = <T>(arr1: T[] | undefined, arr2: T[], orderMatters: boolean = true): boolean => {
  if (arr1 === arr2) return true;
  if (!arr1 || !arr2) return false;
  if (arr1.length !== arr2.length) return false;

  if (orderMatters) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
  } else {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    if (set1.size !== set2.size) return false;
    for (const item of set1) {
      if (!set2.has(item)) return false;
    }
  }

  return true;
};

export { isArrayEqual };
