import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const allowsNotificationsAsync = async () => {
  const settings = await Notifications.getPermissionsAsync();
  return (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
};

const requestPermissionsAsync = async () => {
  return await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true
    }
  });
};

export const getNotificationsPermission = async () => {
  const permission = await allowsNotificationsAsync();
  if (permission) return { permission };
  else {
    const settings = await requestPermissionsAsync();
    const response =
      settings.granted ||
      settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
    if (!response)
      console.log(
        'Notifications permission not allowed on this device... (' +
          Platform.OS +
          ')'
      );
    return { permission: response, canAskAgain: settings.canAskAgain };
  }
};
