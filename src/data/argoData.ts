const randomFloat = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const argoData = Array.from({ length: 20 }, () => {
  return [randomFloat(-47.7, -4.4), randomFloat(100, 180)];
});

export default argoData;
