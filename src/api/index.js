import axios from 'axios';

import { baseUrl, accessToken } from '../config';
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

export const createUser = async (user) => {
  const { data } = await axios.post(`${baseUrl}/users`, user, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
};
