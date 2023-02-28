import { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Notifications from 'expo-notifications';
import ToggleSwitch from 'toggle-switch-react-native';

import { updateNotificationId } from '../store/reducers/taskSlice';
import { updateOptions } from '../store/reducers/settingsSlice';

import { Styles } from '../constants/Styles';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

import DatePicker from '../components/manage/form/DatePicker';
import ColorModal from '../components/settings/ColorModal';
import SettingItem from '../components/settings/SettingItem';
import SettingsControls from '../components/settings/SettingsControls';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.taskSlice.tasks);
  const projects = useSelector((state) => state.projectSlice.projects);
  const { accentColor, notificationsTime } = useSelector(
    (state) => state.settingsSlice.options
  );

  const [notifications, setNotifications] = useState(true);
  const [time, setTime] = useState(notificationsTime);
  const [colorModal, setColorModal] = useState(false);
  const [color, setColor] = useState(accentColor);

  const updateNotificationTime = async (hour = 12, minute = 0) => {
    await Notifications.cancelAllScheduledNotificationsAsync();

    tasks.forEach(async (task) => {
      const project = projects.find((pro) => pro.id === task.projectId);

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: task.task,
          body: 'Projekt: ' + project.title,
          data: { taskId: task.id }
        },
        trigger: { hour, minute, repeats: true }
      });

      dispatch(
        updateNotificationId({
          taskId: task.id,
          notificationId
        })
      );
    });
  };

  const getColorHandler = (chosenColor) => {
    if (chosenColor) setColor(chosenColor);
    setColorModal(false);
  };

  const saveOptionsHandler = async () => {
    dispatch(
      updateOptions({
        accentColor: color,
        notificationsTime: time
      })
    );

    if (notifications && time) updateNotificationTime(+time[0], +time[1]);
    else await Notifications.cancelAllScheduledNotificationsAsync();
  };

  const resetOptionsHandler = () => {
    setNotifications(true);
    setTime(['12', '00']);
    setColor('#FE6235');

    dispatch(
      updateOptions({
        accentColor: Colors.accent,
        notificationsTime: ['12', '00']
      })
    );
  };

  return (
    <>
      <View style={{ ...Styles.root, alignItems: 'center' }}>
        <Text style={styles.screenTitle}>Ustawienia</Text>
        <SettingItem title='Powidomienia'>
          <ToggleSwitch
            isOn={notifications}
            onColor={accentColor}
            offColor={Colors.gray5}
            size='medium'
            onToggle={() => setNotifications((prevState) => !prevState)}
          />
        </SettingItem>
        <SettingItem
          title='Czas powiadomień'
          itembox
          extraStyle={{
            backgroundColor:
              Platform.OS === 'ios' ? Colors.gray5 : Colors.gray10
          }}>
          <DatePicker time={time} onValue={setTime} type='time' />
        </SettingItem>
        <SettingItem
          title='Kolor akcentów'
          onPress={setColorModal.bind(null, true)}
          itembox
          extraStyle={{
            backgroundColor: color,
            borderColor: color
          }}></SettingItem>
        <SettingsControls
          onReset={resetOptionsHandler}
          onSave={saveOptionsHandler}
        />
      </View>
      {colorModal && <ColorModal onFinish={getColorHandler} />}
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
