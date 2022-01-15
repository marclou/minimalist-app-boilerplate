import apiClient from './apiClient';

const register = (name, email, password, tz) => {
  return apiClient
    .post('auth/register', {
      name,
      email,
      password,
      tz,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('tokens', JSON.stringify(response.data.tokens));
      }

      return response.data;
    });
};

const login = (email, password) => {
  return apiClient
    .post('auth/login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('tokens', JSON.stringify(response.data.tokens));
      }

      return response.data;
    });
};

const refreshTokens = (refreshToken) => {
  return apiClient
    .post('auth/refresh-tokens', {
      refreshToken,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem('tokens', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const forgotPassword = (email) => {
  return apiClient.post('auth/forgot-password', {
    email,
  });
};

const resetPassword = (token, password) => {
  return apiClient.post(`auth/reset-password?token=${token}`, {
    password,
  });
};

const logout = (refreshToken) => {
  return apiClient
    .post('auth/logout', {
      refreshToken,
    })
    .then((response) => {
      localStorage.removeItem('user');
      localStorage.removeItem('tokens');
    });
};

const authService = {
  register,
  login,
  refreshTokens,
  forgotPassword,
  resetPassword,
  logout,
};

export default authService;
