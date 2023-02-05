import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Notifications from 'expo-notifications';

import { updateNotificationId } from '../store/reducers/taskSlice';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.taskSlice.tasks);
  const projects = useSelector((state) => state.projectSlice.projects);

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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable onPress={updateNotificationTime.bind(null, 19, 19)}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#fff' }}>{'Settings Screen'}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
