import React, { useContext, useState, createContext } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import endPoints from '@services/api';

const AuthContext = createContext();

export const ProviderAuth = ({ children }) => {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const useProviderAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  if (cookie.get('token-uam')) {
    axios.defaults.headers.Authorization = `${cookie.get('token-uam')}`;
  }

  const options = {
    Headers: {
      accept: '*/*',
      'content-Type': 'aplication/json',
    },
  };

  const signIn = async (body) => {
    try {
      const response = await axios.post(endPoints.auth.login, body, options);
      const { access_token } = response.data;

      if (access_token) cookie.set('token-uam', access_token, { expires: 30 });

      axios.defaults.headers.Authorization = `${cookie.get('token-uam')}`;

      return 'ok';
    } catch (e) {
      if (e.response?.data?.error) {
        setError(e.response.data.error);
      } else {
        console.log(e);
        setError('Error en la API');
      }
    }
  };
  const signUp = async (body) => {
    try {
      const response = await axios.post(endPoints.auth.signUp, body, options);
      return response.data;
    } catch (e) {
      if (e.response?.data?.error) {
        setError(e.response.data.error);
      } else {
        console.log(e);
        setError('Error en la API');
      }
    }
  };

  const logOut = () => {
    cookie.remove('token-uam');
    setUser(null);
    delete axios.defaults.headers.Authorization;
    window.location = '/';
  };
  const auth = async () => {
    try {
      const { data: userProfile } = await axios(endPoints.auth.profile);
      setUser(userProfile);
    } catch (e) {
      window.location = '/';
    }
  };
  return {
    user,
    signIn,
    signUp,
    logOut,
    auth,
    error,
    setError,
  };
};
