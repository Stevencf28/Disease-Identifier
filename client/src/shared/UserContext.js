import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(user));
  }, [user])
  
  const login = (userId, type, token) => {
    setUser({
      userId: userId,
      type: type,
      token: token,
      auth: true,
    });
  };

  const logout = () => {
    console.log('logging out');
    setUser({
      userId: '',
      token: '',
      type: '',
      auth: false,
    });
    setTimeout(() => {}, 1000);
  };

  return (
    <UserContext.Provider value={{user, login, logout}}>
      {children}
    </UserContext.Provider>
  )
}