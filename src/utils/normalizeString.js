export const normalizeString = (string) => {
  const result = string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replaceAll(' ', '')
    .replaceAll('-', '')
    .replaceAll(',', '')
    .replaceAll("'", '')
    .toLowerCase();
  return result;
};
