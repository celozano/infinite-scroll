import { useInfiniteQuery, queryCache } from 'react-query';
import { getUsers } from '../api';

export default function useUsers(query) {
  return useInfiniteQuery(['users', query], getUsers, {
    refetchOnWindowFocus: false,
    getFetchMore: (lastGroup) => {
      const {
        pagination: { page, pages },
      } = lastGroup.meta;
      const nextPage = page + 1;

      return nextPage <= pages ? nextPage : false;
    },
    onSuccess: () => {
      console.log('users', queryCache.getQueryData(['users', query]));
    },
  });
}
