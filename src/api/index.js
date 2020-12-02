import axios from 'axios';
import { baseUrl, accessToken } from '../config';

export const getUsers = async (key, query, nextPage = 1) => {
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

export const deleteUser = async (userId) => {
  const { data } = await axios.delete(`${baseUrl}/users/${userId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
};

export const saveUser = async (user) => {
  const { data } = await axios.put(`${baseUrl}/users/${user.id}`, user, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
};
