export const validateField = (field: string, regex: RegExp) => {
  return regex.test(field);
};
