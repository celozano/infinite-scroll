import axios from 'axios';

import { baseUrl } from '../config';

export const getUsers = async (key, nextPage = 0) => {
  const { data } = await axios.get(`${baseUrl}/users`, {
    params: {
      page: nextPage,
    },
  });

  return data;
};
