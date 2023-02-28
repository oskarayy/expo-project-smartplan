import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeTask, toggleTaskState } from '../../store/reducers/taskSlice';
import { updateActiveTasks } from '../../store/reducers/projectSlice';
import * as Notifications from 'expo-notifications';

import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';

import { getDeadlineString } from '../../utils/getDeadlineString';

const TaskBar = ({ taskData = {}, calendar, onNewTask }) => {
  const dispatch = useDispatch();
  const { accentColor, notificationsTime } = useSelector(
    (state) => state.settingsSlice.options
  );
  const projects = useSelector((state) => state.projectSlice.projects);
  const categories = useSelector((state) => state.projectSlice.categories);

  const activeProject =
    projects.find((item) => item.id === taskData.projectId) ?? {};

  const activeCategory =
    categories.find((item) => item.id === activeProject?.category) ?? {};

  const deadline = getDeadlineString(taskData.deadline, true);

  const newNotificationHandler = async (title, body, data, trigger) => {
    return await Notifications.scheduleNotificationAsync({
      content: { title, body, data },
      trigger
    });
  };

  const updateProjectProgress = async () => {
    dispatch(toggleTaskState(taskData.id));
    dispatch(
      updateActiveTasks({
        id: activeProject.id,
        delta: taskData.finished ? -1 : 1,
        mode: 'update'
      })
    );

    /// DO OGARNIĘCIA !!!

    if (!taskData.finished)
      await Notifications.cancelScheduledNotificationAsync(
        taskData.notificationId
      );
    if (taskData.finished) {
      await newNotificationHandler(
        taskData.task,
        'Projekt: ' + activeProject.title,
        { taskId: taskData.id },
        {
          hour: +notificationsTime[0],
          minute: +notificationsTime[1],
          repeats: true
        }
      );
    }
  };

  const removeTaskHandler = async () => {
    dispatch(
      updateActiveTasks({
        id: activeProject.id,
        finished: taskData.finished ? 1 : 0,
        active: taskData.finished ? 0 : 1
      })
    );
    dispatch(removeTask({ mode: 'single', id: taskData.id }));
    return await Notifications.cancelScheduledNotificationAsync(
      taskData.notificationId
    );
  };

  if (onNewTask)
    return (
      <Pressable
        style={({ pressed }) => pressed && { opacity: 0.7 }}
        onPress={onNewTask}>
        <View
          style={[
            styles.bar,
            styles.taskBarButton,
            { borderColor: accentColor }
          ]}>
          <Text style={[styles.title, { marginRight: 0, color: accentColor }]}>
            Dodaj zadanie
          </Text>
        </View>
      </Pressable>
    );

  return (
    <View style={styles.bar}>
      <View style={[styles.iconBox, !calendar && { flexBasis: '10%' }]}>
        <Pressable onPress={updateProjectProgress}>
          <Ionicons
            name={calendar ? activeCategory.icon : 'star'}
            size={calendar ? 24 : 12}
            color={accentColor}
          />
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        <Pressable style={{ flex: 1 }} onPress={updateProjectProgress}>
          <Text style={[styles.task, !calendar && styles.calendarTask]}>
            {taskData.task}
          </Text>
          {!calendar && <Text style={styles.deadline}>{deadline}</Text>}
          {calendar && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.title, calendar && styles.calendarTitle]}>
                {activeProject.title}
              </Text>
              <Text
                style={[
                  styles.progress,
                  calendar && styles.calendarProgress,
                  { color: accentColor }
                ]}>
                {activeProject.progress}%
              </Text>
            </View>
          )}
        </Pressable>
      </View>
      <View style={styles.checkbox}>
        <Pressable onPress={updateProjectProgress}>
          <Ionicons
            name={
              taskData.finished
                ? 'checkmark-circle'
                : 'checkmark-circle-outline'
            }
            size={calendar ? 26 : 24}
            color={taskData.finished ? accentColor : Colors.gray100}
          />
        </Pressable>
      </View>
      <View style={styles.checkbox}>
        <Pressable onPress={removeTaskHandler}>
          <Ionicons
            name='close'
            size={calendar ? 26 : 24}
            color={Colors.gray100}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default TaskBar;

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingVertical: 12,
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: Colors.gray10
  },
  taskBarButton: {
    flexDirection: 'column',
    backgroundColor: Colors.gray10,
    borderWidth: 1.5
  },
  iconBox: { flexBasis: '14%', alignItems: 'center' },
  title: {
    ...Fonts.h3,
    marginBottom: 2,
    marginRight: 6,
    fontSize: 17,
    color: Colors.white
  },
  calendarTitle: { fontSize: 13, color: Colors.gray100 },
  task: {
    ...Fonts.text400,
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 1
  },
  calendarTask: { fontSize: 15, color: Colors.white },
  deadline: {
    fontSize: 11,
    lineHeight: 15,
    color: Colors.gray200
  },
  progress: {
    ...Fonts.text400,
    fontSize: 11,
    letterSpacing: 0.1
  },
  calendarProgress: { fontSize: 9, color: Colors.gray100 },
  checkbox: {
    marginRight: 8
  }
});
