import React, { createContext, useState, useContext, useEffect } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notificationCount, setNotificationCount] = useState(() => {
    // Recuperar el contador de localStorage
    const savedCount = localStorage.getItem('notificationCount');
    return savedCount !== null ? parseInt(savedCount, 10) : 0;
  });

  useEffect(() => {
    // Guardar el contador en localStorage cuando cambie
    localStorage.setItem('notificationCount', notificationCount);
  }, [notificationCount]);

  const incrementNotificationCount = () => {
    setNotificationCount(prevCount => prevCount + 1);
  };

  const resetNotificationCount = () => {
    setNotificationCount(0);
  };

  return (
    <NotificationContext.Provider value={{ notificationCount, incrementNotificationCount, resetNotificationCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
