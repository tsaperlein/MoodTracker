import React, { createContext, useState, useRef, useContext } from 'react';

export const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [isChanged, setIsChanged] = useState(false);
  const handleSaveChanges = useRef(null);

  return (
    <ProfileContext.Provider value={{ isChanged, setIsChanged, handleSaveChanges }}>
      {children}
    </ProfileContext.Provider>
  );
};
