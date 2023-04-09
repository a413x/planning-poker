export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandomColor = () => {
  const r = getRandomInt(0, 200);
  const g = getRandomInt(0, 200);
  const b = getRandomInt(0, 200);
  return `rgb(${r},${g},${b})`;
};
