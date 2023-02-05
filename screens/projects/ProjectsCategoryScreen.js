import { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { useSharedValue, withTiming } from 'react-native-reanimated';

import { Styles } from '../../constants/Styles';

import HeaderIconButton from '../../components/interface/HeaderIconButton';
import Blur from '../../components/interface/Blur';
import NoItemsFound from '../../components/interface/NoItemsFound';
import ListItem from '../../components/projects/ListItem';

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

  if (projectsToDisplay.length < 1)
    return (
      <NoItemsFound
        itemsName='projektów'
        category={activeCategory.id !== 'all' ? activeCategory.id : false}
      />
    );

  return (
    <View style={styles.root}>
      <FlatList
        data={projectsToDisplay}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListItem item={item} progress={progress} />}
        scrollEnbled={true}
        listStyle={styles.list}
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
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingBottom: 130
  }
});
