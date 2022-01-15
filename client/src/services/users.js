import apiClient from './apiClient';

const getUsers = () => {
  return apiClient.get('users');
};

const userService = {
  getUsers,
};

export default userService;
