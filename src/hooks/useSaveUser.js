import { useMutation } from 'react-query';
import { saveUser } from '../api';

export default function useSaveUser() {
  return useMutation(saveUser);
}
