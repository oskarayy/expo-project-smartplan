import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTaskState } from '../../store/reducers/taskSlice';
import {
  updateActiveTasks,
  updateProject
} from '../../store/reducers/projectSlice';

import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';

import { getDeadlineString } from '../../utils/getDeadlineString';

const TaskBar = ({ taskData, calendar }) => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projectSlice.projects);
  const categories = useSelector((state) => state.projectSlice.categories);

  const activeProject = projects.find((item) => item.id === taskData.projectId);
  const activeCategory = categories.find(
    (item) => item.id === activeProject.category
  );

  const deadline = getDeadlineString(taskData.deadline, true);

  const updateProjectProgress = () => {
    dispatch(toggleTaskState(taskData.id));
    dispatch(
      updateActiveTasks({
        id: activeProject.id,
        delta: taskData.finished ? -1 : 1
      })
    );
  };

  return (
    <Pressable onPress={updateProjectProgress}>
      <View style={styles.bar}>
        <View
          style={[
            {
              flexBasis: '14%',
              alignItems: 'center'
            },
            !calendar && { flexBasis: '10%' }
          ]}>
          <Ionicons
            name={calendar ? activeCategory.icon : 'star'}
            size={calendar ? 26 : 12}
            color={Colors.accent}
          />
        </View>
        <View style={{ flex: 1 }}>
          {calendar && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.title}>{activeProject.title}</Text>
              <Text style={styles.progress}>{activeProject.progress}%</Text>
            </View>
          )}
          <Text
            style={[
              styles.task,
              !calendar && { fontSize: 15, color: Colors.white }
            ]}>
            {taskData.task}
          </Text>
          {!calendar && <Text style={styles.deadline}>{deadline}</Text>}
        </View>
        <View style={styles.checkbox}>
          <Ionicons
            name={
              taskData.finished
                ? 'checkmark-circle'
                : 'checkmark-circle-outline'
            }
            size={calendar ? 26 : 24}
            color={taskData.finished ? Colors.accent : Colors.gray100}
          />
        </View>
      </View>
    </Pressable>
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
    ...Fonts.text300,
    fontSize: 12,
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
    marginHorizontal: 8
  }
});
