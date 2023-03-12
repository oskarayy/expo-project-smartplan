import { useEffect, useLayoutEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { useSharedValue, withTiming } from 'react-native-reanimated';

import { Styles } from '../../constants/Styles';

import HeaderIconButton from '../../components/interface/HeaderIconButton';
import Blur from '../../components/interface/Blur';
import NoItemsFound from '../../components/interface/NoItemsFound';
import ListItem from '../../components/projects/ListItem';

const renderHeaderIcon = (navigation, activeCategory, categoryId) => {
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
};

const ProjectCategoryScreen = ({ route, navigation }) => {
  const { projects, categories } = useSelector((state) => state.projectSlice);
  const categoryId = route.params?.id ?? 'all';
  const activeCategory = categories.find((item) => item.id === categoryId);
  const progress = useSharedValue(0);

  const projectsToDisplay =
    categoryId === 'all'
      ? projects
      : projects.filter((proj) => proj.category === activeCategory.id);

  useLayoutEffect(() => {
    renderHeaderIcon(navigation, activeCategory, categoryId);
  }, [activeCategory]);

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 1500
    });
  }, [progress]);

  if (projectsToDisplay.length < 1)
    return (
      <NoItemsFound
        itemsName='projektów'
        category={activeCategory.id !== 'all' ? activeCategory.id : false}
      />
    );

  return (
    <View style={{ ...Styles.root, paddingTop: 12 }}>
      <FlatList
        data={projectsToDisplay}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListItem item={item} progress={progress} />}
        scrollEnbled={true}
        contentContainerStyle={{ paddingBottom: 140 }}
      />
      <Blur />
    </View>
  );
};

export default ProjectCategoryScreen;
