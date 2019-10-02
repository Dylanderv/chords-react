import { NotificationType } from "../components/MySnackbarContentWrapper";

export type Notification = {
  message: string | undefined;
  type: NotificationType;
}