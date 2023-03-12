import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';

import { Styles } from '../constants/Styles';
import { Fonts } from '../constants/Fonts';

import Topbar from '../components/home/Topbar';
import TaskOverview from '../components/home/task-overview/TaskOverview';
import ProjectStatsItem from '../components/home/ProjectStatsItem';

const getInitialCategoriesStats = (categories) => {
  const initialCategoriesStats = {};
  categories.forEach((category) => {
    if (category.id === 'all') return;
    else initialCategoriesStats[category.id] = { active: 0, finished: 0 };
  });
  return initialCategoriesStats;
};

const countCategoriesStats = (tasks, projects, categories, updateFn) => {
  const newStats = tasks.reduce((acc, item) => {
    const activeTaskProject = projects.find((pro) => pro.id === item.projectId);
    const activeTaskCategory = activeTaskProject.category;

    if (item.finished) acc[activeTaskCategory]['finished']++;
    else acc[activeTaskCategory]['active']++;

    return acc;
  }, getInitialCategoriesStats(categories));

  updateFn(newStats);
};

const runChartAnimation = (progress, updateFn) => {
  updateFn(0);
  progress.value = 0;
  progress.value = withTiming(1, {
    duration: 1000
  });
};

const HomeScreen = () => {
  const tasks = useSelector((state) => state.taskSlice.tasks);
  const { projects, categories } = useSelector((state) => state.projectSlice);
  const initialCategoriesStats = getInitialCategoriesStats(categories);

  const [tasksOverall, setTasksOverall] = useState(1);
  const [categoriesStats, setCategoriesStats] = useState(
    initialCategoriesStats
  );

  const progress = useSharedValue(0);
  const categoriesToDisplay = categories.filter((item) => item.id !== 'all');

  useEffect(() => {
    countCategoriesStats(tasks, projects, categories, setCategoriesStats);
    runChartAnimation(progress, setTasksOverall);
  }, [tasks]);

  return (
    <View style={styles.root}>
      <Topbar />
      <Pressable
        style={{ flex: 1 }}
        onPress={runChartAnimation.bind(null, progress, setTasksOverall)}>
        <TaskOverview
          progress={progress}
          tasksOverall={tasksOverall}
          onOverall={setTasksOverall}
        />
        <View style={styles.projects}>
          <Text style={styles.projectsTitle}>Projekty</Text>
          <View style={styles.list}>
            {categoriesToDisplay.map((item) => {
              return (
                <ProjectStatsItem
                  key={item.id}
                  item={item}
                  stats={categoriesStats}
                  progress={progress}
                />
              );
            })}
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    ...Styles.root
  },
  projects: {
    ...Styles.card,
    flex: 1,
    marginBottom: 140
  },
  projectsTitle: {
    ...Fonts.h4,
    marginBottom: 4
  },
  list: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 12
  }
});
