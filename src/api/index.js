import axios from 'axios';

import { baseUrl } from '../config';
import { isQueryEmpty, cleanQuery } from '../utils';

export const getUsers = async (key, query, nextPage = 0) => {
  query = !isQueryEmpty(query) && cleanQuery(query);
  const { data } = await axios.get(`${baseUrl}/users`, {
    params: {
      page: nextPage,
      ...query,
    },
  });

  return data;
};
