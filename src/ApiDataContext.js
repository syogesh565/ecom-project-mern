import React, { createContext, useState, useContext } from 'react';

const ApiDataContext = createContext();

export const ApiDataProvider = ({ children }) => {
  const [apiData, setApiData] = useState([]);

  const updateApiData = (newData) => {
    setApiData(newData);
  };

  return (
    <ApiDataContext.Provider value={{ apiData, updateApiData }}>
      {children}
    </ApiDataContext.Provider>
  );
};

export const useApiData = () => {
  return useContext(ApiDataContext);
};
