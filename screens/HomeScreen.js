import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { Styles } from '../constants/Styles';
import { Fonts } from '../constants/Fonts';

import Topbar from '../components/home/Topbar';
import TaskOverview from '../components/home/task-overview/TaskOverview';
import ProjectsGrid from '../components/home/projects-overview/ProjectsGrid';

const HomeScreen = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 1500
    });
  }, []);

  return (
    <View style={styles.root}>
      <Topbar />
      <TaskOverview progress={progress} />
      <View style={styles.projects}>
        <Text style={styles.projectsTitle}>Projekty</Text>
        <ProjectsGrid progress={progress} />
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
    marginBottom: 120
  },
  projectsTitle: {
    ...Fonts.h4,
    marginBottom: 4
  }
});
