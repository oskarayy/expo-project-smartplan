import { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { Colors } from '../../constants/Colors';
import { Styles } from '../../constants/Styles';

import HeaderIconButton from '../../components/interface/HeaderIconButton';
import ProjectsGrid from '../../components/home/projects-overview/ProjectsGrid';
import Blur from '../../components/interface/Blur';

const ProjectCategoryScreen = ({ route, navigation }) => {
  const projects = useSelector((state) => state.projectSlice.projects);
  const categories = useSelector((state) => state.projectSlice.categories);

  const progress = useSharedValue(0);
  const categoryId = route.params?.id;
  const activeCategory = categories.find((item) => item.id === categoryId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: activeCategory.name,
      headerRight: () => (
        <HeaderIconButton
          icon='add'
          onPress={() =>
            navigation.navigate('manage', {
              mode: 'add',
              type: 'project',
              id: categoryId
            })
          }
        />
      )
    });
  }, [activeCategory]);

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 1500
    });
  }, [progress]);

  let projectsToDisplay = projects;
  if (categoryId !== 'all') {
    projectsToDisplay = projectsToDisplay.filter(
      (proj) => proj.category === activeCategory.id
    );
  }

  return (
    <View style={styles.root}>
      <ProjectsGrid
        progress={progress}
        mainConfig={{
          data: projectsToDisplay,
          dateFormat: 'long',
          numColumns: 1,
          enhanced: true,
          scroll: true,
          itemStyle: styles.project,
          containerStyle: styles.list,
          dateStyle: { fontSize: 10 },
          iconStyle: styles.icon,
          titleStyle: { fontSize: 18 },
          categoryStyle: { fontSize: 11 }
        }}
      />
      <Blur />
    </View>
  );
};

export default ProjectCategoryScreen;

const styles = StyleSheet.create({
  root: {
    ...Styles.root,
    paddingTop: 12
  },
  list: {
    paddingBottom: 130
  },
  project: {
    minHeight: 160,
    backgroundColor: Colors.gray10,
    paddingHorizontal: 16,
    marginBottom: 12
  },
  icon: {
    flexBasis: '12%',
    marginRight: 4,
    alignItems: 'center'
  }
});
