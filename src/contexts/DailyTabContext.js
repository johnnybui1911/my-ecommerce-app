import React, {createContext, useState} from 'react';

export const DailyTabContext = createContext();

export default function DailyTabContextProvider({children}) {
  const [tab, setTab] = useState('1');

  return (
    <DailyTabContext.Provider
      value={{
        tab,
        setTab,
      }}>
      {children}
    </DailyTabContext.Provider>
  );
}
