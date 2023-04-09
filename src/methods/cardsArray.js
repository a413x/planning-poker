export const validateCardsArray = (value) => {
  const pattern = /^(\d+(\.\d+)?)+((,\s?\d+(\.\d+)?)+)?$/;
  return pattern.test(value);
};
