const offset = new Date().getTimezoneOffset() * 1000 * 60;
const getLocalDate = (value) => {
  const offsetDate = value - offset; // takes data as milliseconds / timestamp format
  const date = new Date(offsetDate).toISOString();
  return date.substring(0, 16);
};

export const Util = {
  getLocalDate,
};
