import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Styles } from '../../constants/Styles';
import Category from '../../components/projects/Category';

const ProjectsScreen = ({ navigation }) => {
  const categories = useSelector((state) => state.projectSlice.categories);

  const openCategory = (id) => {
    navigation.navigate('projectsCategory', { id });
  };

  return (
    <View style={styles.root}>
      {categories.map((item) => (
        <Category onPress={openCategory} key={item.id} {...item} />
      ))}
    </View>
  );
};
export default ProjectsScreen;

const styles = StyleSheet.create({
  root: {
    ...Styles.root,
    marginBottom: 120,
    justifyContent: 'center'
  }
});
