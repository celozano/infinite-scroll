import { TableCell, TableRow } from '@material-ui/core';

const TableHeaders = ({ headers, order }) => {
  const columns = order.map((key) => {
    return (
      <TableCell key={key} style={{ color: '#2783BD' }}>
        {headers[key]}
      </TableCell>
    );
  });
  return <TableRow>{columns}</TableRow>;
};

export default TableHeaders;
