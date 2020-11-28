import { Grid } from '@material-ui/core';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';

import { getUsers } from '../api';
import InfiniteScroll from '../components/InfiniteScroll';

const queryCache = new QueryCache();

const entity = {
  entityName: 'users',
  fetchFunction: getUsers,
  headers: {
    id: 'ID',
    name: 'NAME',
    email: 'EMAIL',
    gender: 'GENDER',
    status: 'STATUS',
    created_at: 'CREATED AT',
    updated_at: 'UPDATED AT',
  },
  order: [
    'id',
    'name',
    'email',
    'gender',
    'status',
    'created_at',
    'updated_at',
  ],
};

const Users = () => {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <InfiniteScroll entity={entity} />
    </ReactQueryCacheProvider>
  );
};

export default Users;
