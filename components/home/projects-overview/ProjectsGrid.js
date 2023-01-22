import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import GridItem from './GridItem';

const ProjectsGrid = ({ progress, mainConfig }) => {
  const projects = useSelector((state) => state.projectSlice.projects);

  return (
    <FlatList
      scrollEnabled={mainConfig?.scroll ?? false}
      contentContainerStyle={{
        alignItems: 'stretch',
        justifyContent: 'center',
        ...mainConfig?.containerStyle
      }}
      data={mainConfig?.data ?? projects}
      keyExtractor={(item) => item.id}
      numColumns={mainConfig?.numColumns ?? 2}
      renderItem={({ item }) => (
        <GridItem item={item} progress={progress} mainConfig={mainConfig} />
      )}
    />
  );
};

export default ProjectsGrid;
