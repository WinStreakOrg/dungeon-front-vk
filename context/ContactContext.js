import React, { createContext, useState } from 'react';

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  // const [isContactIdFound, setIsContactIdFound] = useState(null);
  const [isContactLoaded, setIsContactLoaded] = useState(false);

  console.log(isContactLoaded);
  const setContactData = () => {
    // setIsContactIdFound(id);
    setIsContactLoaded(true);
  };

  return (
    <ContactContext.Provider value={{ isContactLoaded, setContactData }}>
      {children}
    </ContactContext.Provider>
  );
};

