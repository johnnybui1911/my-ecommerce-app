import React, {createContext, useState} from 'react';

export const BannerContext = createContext();

export default function BannerContextProvider({children}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [banner, setBanner] = useState(undefined);

  const toggleModal = () => {
    setModalVisible((isVisible) => !isVisible);
  };

  return (
    <BannerContext.Provider
      value={{
        isModalVisible,
        setModalVisible,
        toggleModal,
        banner,
        setBanner,
      }}>
      {children}
    </BannerContext.Provider>
  );
}
