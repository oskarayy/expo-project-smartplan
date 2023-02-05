import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Text, Pressable, FlatList } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';

import { Styles } from '../constants/Styles';
import { Fonts } from '../constants/Fonts';

import Topbar from '../components/home/Topbar';
import TaskOverview from '../components/home/task-overview/TaskOverview';
import ProjectStatsItem from '../components/home/ProjectStatsItem';

const defaultCategoriesStats = {
  love: 0,
  health: 0,
  career: 0,
  finances: 0,
  soul: 0,
  relations: 0
};

const HomeScreen = () => {
  const [tasksOverall, setTasksOverall] = useState(1);
  const [categoriesStats, setCategoriesStats] = useState(
    defaultCategoriesStats
  );
  const progress = useSharedValue(0);

  const tasks = useSelector((state) => state.taskSlice.tasks);
  const projects = useSelector((state) => state.projectSlice.projects);
  const categories = useSelector((state) => state.projectSlice.categories);

  const categoriesToDisplay = categories.filter((item) => item.id !== 'all');

  const countCategoriesStats = () => {
    const newStats = tasks.reduce((acc, item) => {
      const activeTaskProject = projects.find(
        (pro) => pro.id === item.projectId
      );
      const activeTaskCategory = activeTaskProject.category;
      acc[activeTaskCategory]++;
      return acc;
    }, defaultCategoriesStats);

    setCategoriesStats(newStats);
  };

  const runChartAnimation = () => {
    setTasksOverall(0);
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 1000
    });
  };

  useEffect(() => {
    countCategoriesStats();
    runChartAnimation();
  }, [tasks]);

  return (
    <View style={styles.root}>
      <Topbar />
      <Pressable onPress={runChartAnimation}>
        <TaskOverview
          progress={progress}
          tasksOverall={tasksOverall}
          onOverall={setTasksOverall}
        />
      </Pressable>
      <View style={styles.projects}>
        <Text style={styles.projectsTitle}>Projekty</Text>
        <View style={styles.list}>
          {categoriesToDisplay.map((item) => {
            const procent = (categoriesStats[item.id] / tasks.length) * 100;
            return (
              <ProjectStatsItem
                key={item.id}
                item={item}
                progress={progress}
                procent={procent.toFixed()}
              />
            );
          })}
        </View>
      </View>
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
