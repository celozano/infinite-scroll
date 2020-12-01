import { useMutation, queryCache } from 'react-query';
import { deleteUser } from '../api';

export default function useDeleteUser() {
  return useMutation(deleteUser, {
    onSettled: () => {
      queryCache.invalidateQueries('users');
    },
  });
}
