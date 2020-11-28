import { useEffect, useState } from 'react';
import { TableCell, TableRow } from '@material-ui/core';

import { formatValue } from '../utils';

const TableRows = ({ data, order }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) {
      const arr = data.reduce((acc, page) => [...acc, ...page.data], []);
      setRows(arr);
    }
  }, [data]);

  return rows.map((row) => {
    const columns = order.map((key) => {
      const value = formatValue(key, row[key]);
      return <TableCell key={key}>{value}</TableCell>;
    });

    return (
      <TableRow hover key={row.id}>
        {columns}
      </TableRow>
    );
  });
};

export default TableRows;
