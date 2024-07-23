import React, { createContext, useState } from "react";

// Create a context with a default value
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [ip, setIp] = useState("http://192.168.180.169:8080");
  const [apikey, setApiKey] = useState(null);

  return (
    <GlobalContext.Provider value={{ ip, setIp, apikey, setApiKey }}>
      {children}
    </GlobalContext.Provider>
  );
};
