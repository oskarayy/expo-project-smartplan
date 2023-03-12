import { useState } from 'react';
import { StyleSheet, View, Text, Platform, Button, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import ToggleSwitch from 'toggle-switch-react-native';

import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import { getNotificationsPermission } from '../utils/getNotificationsPermission';
import { updateNotificationId } from '../store/reducers/taskSlice';
import { updateOptions } from '../store/reducers/settingsSlice';

import { Styles } from '../constants/Styles';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

import { Notification } from '../models/Notification';

import SettingItem from '../components/settings/SettingItem';
import DatePicker from '../components/manage/DatePicker';
import ActionButtons from '../components/interface/ActionButtons';
import Info from '../components/settings/Info';
import ColorModal from '../components/settings/ColorModal';

const defaultSettings = {
  accentColor: Colors.accent,
  notificationsTime: ['12', '00'],
  notificationsActive: true
};

const updateNotificationTime = async (
  tasks,
  projects,
  dispatchFn,
  hour = 12,
  minute = 0
) => {
  await Notifications.cancelAllScheduledNotificationsAsync();
  const activeTasks = tasks.filter((task) => !task.finished);

  activeTasks.forEach(async (task) => {
    const project = projects.find((pro) => pro.id === task.projectId);
    const notificationTrigger = { hour, minute, repeats: true };
    const notificationData = new Notification(
      task,
      project,
      notificationTrigger
    );
    const notificationId = await Notifications.scheduleNotificationAsync(
      notificationData
    );

    dispatchFn(
      updateNotificationId({
        taskId: task.id,
        notificationId
      })
    );
  });
};

const toggleNotificationsState = (userSettings, updateFn) => {
  const checkPremission = async () => {
    const { permission, canAskAgain } = await getNotificationsPermission();

    if (!permission && !canAskAgain) {
      Alert.alert(
        'Brak uprawnień',
        'Pozwól aplikacji SmartNotes wysyłać powiadomienia w ustawieniach swojego telefonu'
      );
    } else updateFn((settings) => ({ ...settings, notifications: true }));
  };

  if (userSettings.notifications)
    return updateFn((settings) => ({
      ...settings,
      notifications: false
    }));
  else checkPremission();
};

const runSaveAnimation = (type, progress, typeUpdateFn, timingFn) => {
  typeUpdateFn(type);
  let timerId;

  progress.value = 0;
  progress.value = timingFn(1, {
    duration: 500
  });

  clearTimeout(timerId);
  timerId = setTimeout(() => {
    progress.value = timingFn(0, {
      duration: 500
    });
  }, 1500);
};

const saveUserOptions = async (
  userSettings,
  tasks,
  projects,
  progress,
  typeUpdateFn,
  dispatchFn
) => {
  dispatchFn(
    updateOptions({
      accentColor: userSettings.color,
      notificationsTime: userSettings.time,
      notificationsActive: userSettings.notifications
    })
  );

  if (userSettings.notifications && userSettings.time)
    updateNotificationTime(
      tasks,
      projects,
      dispatchFn,
      +userSettings.time[0],
      +userSettings.time[1]
    );
  else await Notifications.cancelAllScheduledNotificationsAsync();

  runSaveAnimation('save', progress, typeUpdateFn, withTiming);
};

const resetUserOptions = (
  updateSettingsFn,
  tasks,
  projects,
  progress,
  updateTypeFn,
  dispatchFn
) => {
  updateSettingsFn({
    notifications: defaultSettings.notificationsActive,
    time: defaultSettings.notificationsTime,
    color: defaultSettings.accentColor
  });
  dispatchFn(updateOptions(defaultSettings));
  updateNotificationTime(tasks, projects, dispatchFn);
  runSaveAnimation('reset', progress, updateTypeFn, withTiming);
};

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.taskSlice.tasks);
  const projects = useSelector((state) => state.projectSlice.projects);
  const storedUserSettings = useSelector(
    (state) => state.settingsSlice.options
  );

  const [userSettings, setUserSettings] = useState({
    notifications: storedUserSettings.notificationsActive,
    time: storedUserSettings.notificationsTime,
    color: storedUserSettings.accentColor
  });
  const [colorModal, setColorModal] = useState(false);
  const [infoType, setInfoType] = useState('save');

  const progress = useSharedValue(0);

  const getColorHandler = (chosenColor) => {
    if (chosenColor)
      setUserSettings((settings) => ({
        ...settings,
        color: chosenColor
      }));
    setColorModal(false);
  };

  const basicDataFunctionsAgruments = [
    tasks,
    projects,
    progress,
    setInfoType,
    dispatch
  ];

  const saveOptionsHandler = () => {
    saveUserOptions(userSettings, ...basicDataFunctionsAgruments);
  };

  const resetOptionsHandler = () => {
    resetUserOptions(setUserSettings, ...basicDataFunctionsAgruments);
  };

  return (
    <>
      <View style={{ ...Styles.root, alignItems: 'center' }}>
        <Text style={{ ...Fonts.h2, marginVertical: 24 }}>Ustawienia</Text>
        <SettingItem title='Powidomienia'>
          <ToggleSwitch
            isOn={
              typeof userSettings.notifications === 'boolean'
                ? userSettings.notifications
                : false
            }
            onColor={storedUserSettings.accentColor}
            offColor={Colors.gray5}
            size='medium'
            onToggle={toggleNotificationsState.bind(
              null,
              userSettings,
              setUserSettings
            )}
          />
        </SettingItem>
        <SettingItem
          title='Czas powiadomień'
          itembox
          extraStyle={{
            backgroundColor:
              Platform.OS === 'ios' ? Colors.gray5 : Colors.gray10
          }}>
          <DatePicker
            time={userSettings.time}
            onValue={setUserSettings}
            type='time'
          />
        </SettingItem>
        <SettingItem
          title='Kolor akcentów'
          onPress={setColorModal.bind(null, true)}
          itembox
          extraStyle={{
            backgroundColor: userSettings.color,
            borderColor: userSettings.color
          }}></SettingItem>
        <ActionButtons
          boxStyle={styles.actions}
          onCancel={resetOptionsHandler}
          onSubmit={saveOptionsHandler}
          cancelText='Reset'
        />
        <Info progress={progress} type={infoType} />
        <Button
          title='show Notif List'
          onPress={async () => {
            console.log(
              await Notifications.getAllScheduledNotificationsAsync()
            );
            console.log(
              await TaskManager.getTaskOptionsAsync(
                'BACKGROUND-NOTIFICATION-TASK'
              )
            );
          }}
        />
      </View>
      {colorModal && (
        <ColorModal
          onFinish={getColorHandler}
          accentColor={userSettings.color}
        />
      )}
    </>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  screenTitle: {
    ...Fonts.h2,
    marginVertical: 24
  }
});
