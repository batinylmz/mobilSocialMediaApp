import React, { createContext, useState } from 'react';

// Context'i oluşturuyoruz
export const AuthContext = createContext();

// App.js'te tüm uygulamayı sarmalayacak Provider bileşeni
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Görev belgesinde istenen login fonksiyonu (şimdilik taslak)
  const login = (token, userData) => {
    setUser(userData);
  };

  // Görev belgesinde istenen logout fonksiyonu (şimdilik taslak)
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};