import React from 'react';
import {
  Box,
  Container,
  Paper,
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

const InfiniteScroll = ({ entity }) => {
  console.log('entity', entity);
  const { entityName, fetchFunction, headers, order } = entity;
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(entityName, fetchFunction, {
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
  const loadMoreMessage = isFetchingMore
    ? 'Loading more...'
    : canFetchMore
    ? 'Load More'
    : 'Nothing more to load';

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchMore,
  });

  return (
    <Box mt={20}>
      <Container>
        <Paper>
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
        </Paper>
      </Container>
    </Box>
  );
};

export default InfiniteScroll;
