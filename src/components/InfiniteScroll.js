import React from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from '@material-ui/core';
import { useInfiniteQuery } from 'react-query';

import TableHeaders from './TableHeaders';
import TableRows from './TableRows';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const InfiniteScroll = ({ entity, query }) => {
  const { entityName, fetchFunction, headers, order } = entity;
  const {
    data,
    status,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery([entityName, query], fetchFunction, {
    refetchOnWindowFocus: false,
    getFetchMore: (lastGroup) => {
      const {
        pagination: { page, pages },
      } = lastGroup.meta;
      const nextPage = page + 1;

      return nextPage <= pages ? nextPage : false;
    },
  });
  const loadMoreRef = React.useRef();
  const loadMoreMessage =
    status === 'loading'
      ? 'Loading...'
      : isFetchingMore || canFetchMore
      ? 'Loading more...'
      : data && !data[0].data.length
      ? 'No records found'
      : 'Nothing more to load';

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchMore,
  });

  return (
    <TableContainer style={{ maxHeight: 600 }}>
      <Table stickyHeader>
        <TableHead>
          <TableHeaders headers={headers} order={order} />
        </TableHead>
        <TableBody>
          <TableRows data={data} order={order} />
        </TableBody>
      </Table>
      <Typography ref={loadMoreRef} align="center" color="textSecondary">
        {loadMoreMessage}
      </Typography>
    </TableContainer>
  );
};

export default InfiniteScroll;
