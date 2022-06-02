import React, { useContext, useState, createContext } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import endPoints from '@services/api';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  const options = {
    Headers: {
      accept: '*/*',
      'content-Type': 'aplication/json',
    },
  };

  const signIn = async (body) => {
    try {
      const response = await axios.post(endPoints.auth.login, body, options);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
    // if (access_token) cookie.set('token', access_token, { expires: 5 });

    // axios.defaults.headers.Authorization = `Bearer ${cookie.get('token')}`;
    // const { data: userProfile } = await axios(endPoints.auth.profile);
    // setUser(userProfile);
  };
  const logOut = () => {
    cookie.remove('token');
    setUser(null);
    delete axios.defaults.headers.Authorization;
    router.push('/');
  };
  const auth = async () => {
    // try {
    //   axios.defaults.headers.Authorization = `Bearer ${cookie.get('token')}`;
    //   const { data: userProfile } = await axios(endPoints.auth.profile);
    //   setUser(userProfile);
    // } catch (e) {
    //   router.push('/');
    // }
  };
  return {
    user,
    signIn,
    logOut,
    auth,
  };
};
