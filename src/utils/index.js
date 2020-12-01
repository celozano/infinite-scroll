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
  const copy = Object.assign({}, obj);

  Object.keys(copy).forEach(
    (k) => !copy[k] && copy[k] !== undefined && delete copy[k]
  );

  return copy;
};

export const parseError = ({ data }) => {
  const errors = data.map((error) => {
    return (
      <li key={error.field}>
        {error.field} {error.message}
      </li>
    );
  });

  return errors.length ? <ul>{errors}</ul> : null;
};
