import { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateActiveTasks } from '../../store/reducers/projectSlice';
import {
  removeTask,
  toggleTaskState,
  updateNotificationId
} from '../../store/reducers/taskSlice';
import * as Notifications from 'expo-notifications';

import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';

import { getDeadlineString } from '../../utils/getDeadlineString';
import { runConfirmationTimer } from '../../utils/confirmationTimer';

import { Notification } from '../../models/Notification';
import NewTaskButton from './NewTaskButton';
import TaskActions from './TaskActions';

const updateProjectProgress = async (
  taskData,
  activeProject,
  notificationsActive,
  notificationsTime,
  dispatchFn
) => {
  dispatchFn(toggleTaskState(taskData.id));
  dispatchFn(
    updateActiveTasks({
      id: activeProject.id,
      delta: taskData.finished ? -1 : 1
    })
  );

  if (!taskData.finished) {
    await Notifications.cancelScheduledNotificationAsync(
      taskData.notificationId
    );
  } else if (taskData.finished && notificationsActive) {
    const notificationData = new Notification(taskData, activeProject, {
      hour: +notificationsTime[0],
      minute: +notificationsTime[1],
      repeats: true
    });
    const notificationId = await Notifications.scheduleNotificationAsync(
      notificationData
    );
    dispatchFn(updateNotificationId({ taskId: taskData.id, notificationId }));
  }
};

const removeTaskHandler = async (taskData, activeProject, dispatchFn) => {
  dispatchFn(
    updateActiveTasks({
      id: activeProject.id,
      finished: taskData.finished ? -1 : 0,
      active: taskData.finished ? 0 : -1
    })
  );
  dispatchFn(removeTask({ mode: 'single', id: taskData.id }));
  return await Notifications.cancelScheduledNotificationAsync(
    taskData.notificationId
  );
};

const CalendarTaskSubline = ({ activeProject, accentColor }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text style={[styles.title, styles.calendarTitle]}>
      {activeProject.title}
    </Text>
    <Text
      style={[
        styles.progress,
        styles.calendarProgress,
        { color: accentColor }
      ]}>
      {activeProject.progress === 'NaN' ? '0' : activeProject.progress}%
    </Text>
  </View>
);

const RemoveConfirmation = ({ onPress, accentColor, timer }) => (
  <Pressable
    style={[styles.confirmation, { backgroundColor: accentColor }]}
    onPress={onPress}>
    <Text
      style={{
        ...Fonts.text400
      }}>{`Potwierdź usunięcie (${timer})`}</Text>
  </Pressable>
);

const TaskBar = ({ taskData = {}, calendar, onNewTask }) => {
  const dispatch = useDispatch();
  const [confirmation, setConfirmation] = useState(false);
  const [timer, setTimer] = useState(3);
  const { accentColor, notificationsTime, notificationsActive } = useSelector(
    (state) => state.settingsSlice.options
  );
  const projects = useSelector((state) => state.projectSlice.projects);
  const categories = useSelector((state) => state.projectSlice.categories);
  const deadline = getDeadlineString(taskData.deadline, true);

  const activeProject =
    projects.find((item) => item.id === taskData.projectId) ?? {};

  const activeCategory =
    categories.find((item) => item.id === activeProject?.category) ?? {};

  const updateProjectProgressHandler = () => {
    updateProjectProgress(
      taskData,
      activeProject,
      notificationsActive,
      notificationsTime,
      dispatch
    );
  };

  if (onNewTask)
    return (
      <NewTaskButton
        onNewTask={onNewTask}
        barStyle={styles.bar}
        textStyle={styles.title}
      />
    );

  return (
    <View style={styles.bar}>
      <View style={[styles.iconBox, !calendar && { flexBasis: '10%' }]}>
        <Ionicons
          name={calendar ? activeCategory.icon : 'star'}
          size={calendar ? 24 : 12}
          color={accentColor}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Pressable style={{ flex: 1 }} onPress={updateProjectProgressHandler}>
          <Text style={[styles.task, !calendar && styles.calendarTask]}>
            {taskData.task}
          </Text>
          {!calendar && <Text style={styles.deadline}>{deadline}</Text>}
          {calendar && (
            <CalendarTaskSubline
              activeProject={activeProject}
              accentColor={accentColor}
            />
          )}
        </Pressable>
      </View>
      <TaskActions
        calendar={calendar}
        finished={taskData.finished}
        checkbox
        onUpdate={updateProjectProgressHandler}
      />
      <TaskActions
        calendar={calendar}
        onRemove={runConfirmationTimer.bind(null, setConfirmation, setTimer)}
      />
      {confirmation && (
        <RemoveConfirmation
          accentColor={accentColor}
          timer={timer}
          onPress={removeTaskHandler.bind(
            null,
            taskData,
            activeProject,
            dispatch
          )}
        />
      )}
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
  confirmation: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12
  }
});
