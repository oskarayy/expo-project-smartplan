import { useLayoutEffect, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useSelector } from 'react-redux';

import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';
import { Styles } from '../../constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { getFormattedDate } from '../../utils/getFormattedDate';

import ProjectStatus from '../../components/home/projects-overview/ProjectStatus';
import TaskBar from '../../components/tasks/TaskBar';
import Blur from '../../components/interface/Blur';
import HeaderIconButton from '../../components/interface/HeaderIconButton';

const ProjectDetailScreen = ({ route, navigation }) => {
  const tasks = useSelector((state) => state.taskSlice.tasks);
  const projects = useSelector((state) => state.projectSlice.projects);
  const categories = useSelector((state) => state.projectSlice.categories);

  const projectId = route.params.id;
  const project = projects.find((item) => item.id === projectId);
  const category = categories.find((cat) => cat.id === project.category);
  const progress = useSharedValue(0);
  const getTaskTime = (task) => new Date(task.deadline).getTime();

  const filteredTasks = tasks.filter((task) => task.projectId === project.id);
  const tasksInOrder = filteredTasks.sort((a, b) => {
    return getTaskTime(a) - getTaskTime(b);
  });

  let deadline = getFormattedDate(project.deadline, 'long');
  const projectDeadline = new Date(project.deadline);
  const lastTaskDeadline = new Date(
    tasksInOrder[tasksInOrder.length - 1]?.deadline
  );
  if (projectDeadline.getTime() < lastTaskDeadline.getTime())
    deadline = getFormattedDate(lastTaskDeadline, 'long');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: project.title ?? 'Projekt',
      headerRight: () => (
        <HeaderIconButton
          icon='add'
          onPress={() =>
            navigation.navigate('manage', {
              mode: 'add',
              type: 'task',
              id: projectId
            })
          }
        />
      )
    });
  }, []);

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 1500
    });
  }, [progress, project]);

  return (
    <>
      <ScrollView style={styles.root}>
        <View style={[styles.row, styles.header]}>
          <View style={styles.headerItem}>
            <Ionicons name={category.icon} size={28} color={Colors.accent} />
          </View>
          <View style={styles.headerItem}>
            <Text style={styles.date}>{deadline.day}</Text>
            <Text style={styles.date}>{deadline.date}</Text>
          </View>
        </View>
        <ProjectStatus
          progress={progress}
          procent={project.progress}
          prev={project.previousProgress}
        />
        {project.desc?.length > 0 && (
          <Text style={styles.desc}>{project.desc}</Text>
        )}
        {(!project.desc || project.desc?.length === 0) && (
          <Text style={[styles.desc, styles.nocontent]}>
            Nie dodano jeszcze opisu projektu
          </Text>
        )}
        <View style={styles.tasksBox}>
          <Text style={styles.tasks}>Zadania</Text>
          {tasksInOrder.length > 0 &&
            tasksInOrder.map((task) => (
              <TaskBar key={task.id} taskData={task} />
            ))}
          {tasksInOrder.length === 0 && (
            <Text style={styles.nocontent}>
              Nie dodano jeszcze żadnych zadań
            </Text>
          )}
        </View>
      </ScrollView>
      <Blur />
    </>
  );
};

export default ProjectDetailScreen;

const styles = StyleSheet.create({
  root: {
    ...Styles.root,
    paddingTop: 8
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  header: {
    marginBottom: 20
  },
  headerItem: {
    flexBasis: '30%',
    alignItems: 'center'
  },
  date: {
    ...Styles.date,
    marginVertical: 0,
    textAlign: 'center',
    fontSize: 11
  },
  desc: {
    ...Styles.desc,
    marginTop: 12,
    marginBottom: 24,
    fontSize: 15,
    color: Colors.gray500
  },
  nocontent: {
    ...Styles.desc,
    marginTop: 12,
    fontSize: 15,
    color: Colors.gray300,
    textAlign: 'center'
  },
  tasksBox: {
    paddingBottom: 150
  },
  tasks: {
    ...Fonts.h4,
    marginTop: 8,
    marginBottom: 2,
    fontSize: 16,
    textAlign: 'center'
  }
});
