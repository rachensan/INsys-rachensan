import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ //comes from userPayload,,, should be the same
    fullName: "",
    userId: "",
    schoolId: "",
    role: "",
  });
  const [accessToken, setAccessToken] = useState('');

  return (
    <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);