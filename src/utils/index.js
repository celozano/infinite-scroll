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
