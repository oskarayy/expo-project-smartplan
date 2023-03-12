import { useLayoutEffect, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import * as Notifications from 'expo-notifications';

import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';
import { Styles } from '../../constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { getFormattedDate } from '../../utils/getFormattedDate';

import ProjectStatus from '../../components/projects/ProjectStatus';
import TaskBar from '../../components/tasks/TaskBar';
import Blur from '../../components/interface/Blur';
import HeaderIconButton from '../../components/interface/HeaderIconButton';

const getTaskTime = (task) => new Date(task.deadline).getTime();

const getActiveProjectData = (tasks, projects, categories, projectId) => {
  const project = projects.find((item) => item.id === projectId) ?? {};
  const category = categories.find((cat) => cat.id === project.category) ?? {};

  const filteredTasks = tasks.filter((task) => task.projectId === project.id);
  const tasksInOrder = filteredTasks.sort((a, b) => {
    return getTaskTime(a) - getTaskTime(b);
  });

  return { project, categoryIcon: category.icon, tasksInOrder };
};

const getProjectDeadline = (project, tasksInOrder) => {
  const projectDeadline = new Date(project.deadline);
  const lastTaskDeadline = new Date(
    tasksInOrder[tasksInOrder.length - 1]?.deadline
  );

  if (projectDeadline.getTime() < lastTaskDeadline.getTime()) {
    return getFormattedDate(lastTaskDeadline, 'long');
  } else return getFormattedDate(project.deadline, 'long');
};

const renderHeaderButton = (navigation, project, projectId) => {
  navigation.setOptions({
    title: project.title ?? 'Projekt',
    headerRight: () => (
      <HeaderIconButton
        icon='pencil'
        size={24}
        style={{ paddingRight: 12 }}
        onPress={() =>
          navigation.navigate('manage', {
            mode: 'update',
            type: 'project',
            id: projectId
          })
        }
      />
    )
  });
};

const TaskList = ({ tasks }) => {
  if (tasks.length > 0) {
    return tasks.map((task) => <TaskBar key={task.id} taskData={task} />);
  } else
    return <Text style={styles.notasks}>Nie dodano jeszcze żadnych zadań</Text>;
};

const ProjectDetailScreen = ({ route, navigation }) => {
  const tasks = useSelector((state) => state.taskSlice.tasks);
  const { projects, categories } = useSelector((state) => state.projectSlice);
  const { accentColor } = useSelector((state) => state.settingsSlice.options);
  const progress = useSharedValue(0);
  const projectId = route.params.id;

  const [projectData, setProjectData] = useState(
    getActiveProjectData(tasks, projects, categories, projectId)
  );

  const deadline = getProjectDeadline(
    projectData.project,
    projectData.tasksInOrder
  );

  const newTaskButtonHandler = () => {
    navigation.navigate('manage', {
      mode: 'add',
      type: 'task',
      id: projectId
    });
  };

  useLayoutEffect(() => {
    renderHeaderButton(navigation, projectData.project, projectId);
  }, [projectData, projectId, navigation, renderHeaderButton]);

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 1500
    });

    setProjectData(
      getActiveProjectData(tasks, projects, categories, projectId)
    );
  }, [
    progress,
    projectId,
    tasks,
    projects,
    categories,
    getActiveProjectData,
    withTiming
  ]);

  return (
    <>
      <ScrollView style={styles.root}>
        <View style={[styles.row, styles.header]}>
          <View style={styles.headerItem}>
            <Ionicons
              name={projectData.categoryIcon}
              size={28}
              color={accentColor}
            />
          </View>
          <View style={styles.headerItem}>
            <Text style={styles.date}>{deadline.day}</Text>
            <Text style={styles.date}>{deadline.date}</Text>
          </View>
        </View>
        <ProjectStatus
          progress={progress}
          procent={projectData.project.progress}
          prev={projectData.project.previousProgress}
        />
        {projectData.project.desc?.length > 0 && (
          <Text style={styles.desc}>{projectData.project.desc}</Text>
        )}
        {(!projectData.project.desc ||
          projectData.project.desc?.length === 0) && (
          <Text style={[styles.desc, { color: Colors.gray300 }]}>
            Nie dodano jeszcze opisu projektu
          </Text>
        )}
        <View style={styles.tasksBox}>
          <TaskBar onNewTask={newTaskButtonHandler} />
          <TaskList tasks={projectData.tasksInOrder} />
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
    color: Colors.gray500,
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
  },
  notasks: {
    ...Styles.desc,
    marginTop: 16,
    fontSize: 14,
    color: Colors.gray300,
    textAlign: 'center'
  }
});
