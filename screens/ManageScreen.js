import { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Fonts } from '../constants/Fonts';
import { Ionicons } from '@expo/vector-icons';

import TypeChoice from '../components/manage/TypeChoice';
import ProjectForm from '../components/manage/ProjectForm';

const ManageScreen = ({ route, navigation }) => {
  const { accentColor } = useSelector((state) => state.settingsSlice.options);
  const projects = useSelector((state) => state.projectSlice.projects);

  const [activeMode, setActiveMode] = useState('add');
  const [activeType, setActiveType] = useState('');
  const { id: activeId, mode, type } = route.params;

  useEffect(() => {
    setActiveType(route.params?.type);
    setActiveMode(route.params?.mode);
  }, [activeId, mode, type]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: activeMode === 'add' ? 'Dodaj' : 'Aktualizuj'
    });
  }, [activeMode, navigation]);

  const activeAddHeaderTitle =
    activeType === 'project'
      ? 'Co nowego w planach?'
      : 'Jaki będzie kolejny krok?';

  const activeUpdateHeaderTitle = 'Mała zmiana planów?';

  const activeHeaderIcon = activeType === 'project' ? 'rocket' : 'star';

  if (activeType === '' && activeMode === 'add')
    return (
      <View style={styles.root}>
        <TypeChoice onType={setActiveType} />
      </View>
    );

  const activeProject = projects.find((project) => project.id === activeId);

  return (
    <View style={styles.root}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <Ionicons name={activeHeaderIcon} size={30} color={accentColor} />
          <Text style={styles.title}>
            {activeMode === 'add'
              ? activeAddHeaderTitle
              : activeUpdateHeaderTitle}
          </Text>
        </View>
        <ProjectForm
          type={activeType}
          mode={activeMode}
          onType={setActiveType}
          activeProject={activeProject}
        />
      </View>
    </View>
  );
};

export default ManageScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 130,
    paddingHorizontal: 34,
    justifyContent: 'center'
  },
  title: {
    ...Fonts.h3,
    marginTop: 6
  }
});
