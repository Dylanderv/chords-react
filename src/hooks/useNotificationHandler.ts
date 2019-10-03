import * as React from "react";
import { NotificationType } from "../components/MySnackbarContentWrapper";

const useNotificationHandler = () => {
  const [message, setMessage] = React.useState<string | undefined>(undefined);
  const [timeout, setTimeout] = React.useState(-1);
  const [type, setType] = React.useState<NotificationType>('info');

  const showNotification = (notificationMessage: string, notificationType: NotificationType = 'info') => {
    if (timeout !== -1) {
      clearTimeout(timeout);
      setTimeout(-1);
    }
    setType(notificationType);
    setMessage(notificationMessage);
    let timeoutValue = window.setTimeout(() => {
      setMessage(undefined);
    }, 3000);
    setTimeout(timeoutValue);
  };

  const closeNotification = () => {
    console.log(timeout);
    if (timeout !== -1) {
      clearTimeout(timeout);
      setTimeout(-1);
    }
    setMessage(undefined);
  };

  return { notification: { message, type }, showNotification, closeNotification };
};

export default useNotificationHandler;