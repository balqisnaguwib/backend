// utils
import axios from './axios';

// ----------------------------------------------------------------------

export const localStorageAvailable = () => {
  try {
    const key = '__some_random_key_you_are_not_going_to_use__';
    window.localStorage.setItem(key, key);
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};

// ----------------------------------------------------------------------

export const decodeJwt = (token: string | null) => {
  if (token === null) {
    return;
  }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
};

// ----------------------------------------------------------------------

export const isValidToken = (token: string) => {
  if (!token) {
    return false;
  }

  return token === 'zamzamzumzum';
};

// ----------------------------------------------------------------------

export const setSession = (accessToken: string) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common['X-API-Key'] = accessToken;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common['X-API-Key'];
  }
};

export const removeSession = () => {
  localStorage.removeItem('accessToken');
  delete axios.defaults.headers.common.Authorization;
};

// ----------------------------------------------------------------------

// export const getUserDetails = async (token: string) => {
//   try {
//     const response = await axios.get(`${AUTH_ENDPOINT}/me`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const user = response.data;
//     return user;
//   } catch (error) {
//     return error;
//   }
// };
