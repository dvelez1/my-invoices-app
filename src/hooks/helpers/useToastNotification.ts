import {
  SuccessToast,
  ErrorToast,
  InfoToast,
  WarningToast,
} from "../../components/shared/toastNotifications/ToastNotificationTypes";

export const useToastNotification = () => {
  const notificationType = {
    Success: "s",
    Error: "e",
    Warning: "w",
    Info: "i",
  };

  const genericMessage = {
    Success: "Success Transaction.",
    Error:
      "Transaction Failed! Please, try again in a few minutes or contact your IT Administrator.",
  };

  const showNotification = (type: string, message: string) => {
    switch (type) {
      case notificationType.Success:
        SuccessToast(message);
        break;
      case notificationType.Error:
        ErrorToast(message);
        break;
      case notificationType.Info:
        InfoToast(message);
        break;
      case notificationType.Warning:
        WarningToast(message);
        break;
    }
  };

  const notificationApi = {
    notificationType,
    showNotification,
    genericMessage,
  };

  return {
    notificationApi,
  };
};
