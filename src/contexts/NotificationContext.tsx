import React from 'react';
import { UserAuth } from '../model/UserAuth';
import { DEFAULT_NOTIFICATION } from '../utils/consts';
import useAuthHandler from '../hooks/AuthHandler';
import { getStoredUserAuth } from '../utils/authUtils';
import { Notification } from '../model/Notification';
import { NotificationType } from '../components/MySnackbarContentWrapper';
import useNotificationHandler from '../hooks/useNotificationHandler';

interface INotificationContextInterface {
  notification: Notification;
  showNotification: (notificationMessage: string, notificationType: NotificationType) => void;
  closeNotification: () => void;
}

export const notificationContext =
  React.createContext<INotificationContextInterface>({
    notification: DEFAULT_NOTIFICATION,
    showNotification: () => {},
    closeNotification: () => {}
  })

const { Provider } = notificationContext;

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { notification, showNotification, closeNotification } = useNotificationHandler();

  return (
    <Provider value={{ notification, showNotification, closeNotification }}>
      {children}
    </Provider>
  );

};

export default NotificationProvider;
