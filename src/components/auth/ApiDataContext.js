import React, { createContext, useState, useContext } from 'react';

const ApiDataContext = createContext();

export const useApiData = () => useContext(ApiDataContext);

export const ApiDataProvider = ({ children }) => {
  const [apiData, setApiData] = useState([]);

  const updateApiData = (data) => {
    setApiData(data);
  };

  return (
    <ApiDataContext.Provider value={{ apiData, updateApiData }}>
      {children}
    </ApiDataContext.Provider>
  );
};

// export const useApiData = () => {
//   return useContext(ApiDataContext);
// };
export default ApiDataContext;