import { useMutation } from 'react-query';
import { createUser } from '../api';

export default function useCreateUser() {
  return useMutation(createUser);
}
