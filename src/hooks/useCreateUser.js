import { useMutation } from 'react-query';
import { createUser } from '../api';

export default function useCreatePost() {
  return useMutation(createUser);
}
