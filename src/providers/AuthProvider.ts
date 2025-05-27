// Next, React, Tw
import React, { useEffect, ReactNode } from 'react';
import { useDispatch } from 'react-redux';

// Others
import { login } from '../stores/auth';
import { localStorageAvailable, isValidToken } from '../utils/jwt';

// Interface
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Standard
  const storageAvailable = localStorageAvailable();
  const dispatch = useDispatch();

  // Others

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = storageAvailable ? await localStorage.getItem('accessToken') : null;

        if (token && isValidToken(token)) {
          dispatch(
            login({
              user: {
                username: 'admin',
              },
              token,
            })
          );
        }
      } catch {}
    };
    initialize();
  }, []);

  return children;
};

export default AuthProvider;
