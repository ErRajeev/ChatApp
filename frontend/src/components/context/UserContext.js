// UserContext.js
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [actuser, setActuser] = useState(""); // State to be shared

  return (
    <UserContext.Provider value={{ actuser, setActuser }}>
      {children}
    </UserContext.Provider>
  );
};
