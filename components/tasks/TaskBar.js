import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeTask, toggleTaskState } from '../../store/reducers/taskSlice';
import { updateActiveTasks } from '../../store/reducers/projectSlice';

import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';

import { getDeadlineString } from '../../utils/getDeadlineString';

const TaskBar = ({ taskData, calendar }) => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projectSlice.projects);
  const categories = useSelector((state) => state.projectSlice.categories);

  const activeProject =
    projects.find((item) => item.id === taskData.projectId) ?? {};

  const activeCategory =
    categories.find((item) => item.id === activeProject?.category) ?? {};

  const deadline = getDeadlineString(taskData.deadline, true);

  const updateProjectProgress = () => {
    dispatch(toggleTaskState(taskData.id));
    dispatch(
      updateActiveTasks({
        id: activeProject.id,
        delta: taskData.finished ? -1 : 1,
        mode: 'update'
      })
    );
  };

  const removeTaskHandler = () => {
    dispatch(
      updateActiveTasks({
        id: activeProject.id,
        finished: taskData.finished ? 1 : 0,
        active: taskData.finished ? 0 : 1
      })
    );
    dispatch(removeTask({ mode: 'single', id: taskData.id }));
  };

  return (
    <View style={styles.bar}>
      <View
        style={[
          {
            flexBasis: '14%',
            alignItems: 'center'
          },
          !calendar && { flexBasis: '10%' }
        ]}>
        <Pressable onPress={updateProjectProgress}>
          <Ionicons
            name={calendar ? activeCategory.icon : 'star'}
            size={calendar ? 24 : 12}
            color={Colors.accent}
          />
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        <Pressable style={{ flex: 1 }} onPress={updateProjectProgress}>
          <Text
            style={[
              styles.task,
              !calendar && { fontSize: 15, color: Colors.white }
            ]}>
            {taskData.task}
          </Text>
          {!calendar && <Text style={styles.deadline}>{deadline}</Text>}
          {calendar && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={[
                  styles.title,
                  calendar && { fontSize: 13, color: Colors.gray100 }
                ]}>
                {activeProject.title}
              </Text>
              <Text
                style={[
                  styles.progress,
                  calendar && { fontSize: 9, color: Colors.gray100 }
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
            color={taskData.finished ? Colors.accent : Colors.gray100}
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
  title: {
    ...Fonts.h3,
    marginBottom: 2,
    marginRight: 6,
    fontSize: 17,
    color: Colors.white
  },
  task: {
    ...Fonts.text400,
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 1
  },
  deadline: {
    fontSize: 11,
    lineHeight: 15,
    color: Colors.gray200
  },
  progress: {
    ...Fonts.text400,
    fontSize: 11,
    color: Colors.accent,
    letterSpacing: 0.1
  },
  checkbox: {
    marginRight: 8
  }
});
