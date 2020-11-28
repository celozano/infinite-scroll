const isDate = (key) => {
  return ['created_at', 'updated_at'].includes(key);
};

export const formatValue = (key, value) => {
  if (isDate(key)) {
    var date = new Date(value);
    return date.toLocaleDateString();
  }
  return value;
};

export const isQueryEmpty = (obj) => {
  return Object.values(obj).every((x) => x === null || x === '');
};

export const cleanQuery = (obj) => {
  Object.keys(obj).forEach(
    (k) => !obj[k] && obj[k] !== undefined && delete obj[k]
  );

  return obj;
};
