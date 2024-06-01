import React, { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { requestPermission, onMessageListener } from '../../firebase/firebase';
import { useNotification } from './NotificationContext';

function Notification() {
  const { incrementNotificationCount } = useNotification();

  useEffect(() => {
    requestPermission();
    const unsubscribe = onMessageListener().then((payload) => {
      console.log('Message received: ', payload);
      toast.success(`${payload?.data?.title}: ${payload?.data?.body}`, {
        duration: 6000,
        position: 'top-right',
      });
      incrementNotificationCount(); // Incrementa el contador
    }).catch(err => console.log('failed: ', err));

    return () => {
      unsubscribe.catch((err) => console.log('failed: ', err));
    };
  }, [incrementNotificationCount]);

  return (
    <div>
      <Toaster />
    </div>
  );
}

export default Notification;
