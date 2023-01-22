import { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { Ionicons } from '@expo/vector-icons';

import TypeChoice from '../components/manage/TypeChoice';
import ProjectForm from '../components/manage/ProjectForm';
const ManageScreen = ({ route, navigation }) => {
  const [activeMode, setActiveMode] = useState('add');
  const [activeType, setActiveType] = useState('');
  const { id: activeId, mode, type } = route.params;

  useEffect(() => {
    // console.log(route.params);
    setActiveType(route.params?.type);
    setActiveMode(route.params?.mode);
  }, [activeId, mode, type]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: activeMode === 'add' ? 'Dodaj' : 'Aktualizuj'
    });
  }, [activeMode, navigation]);

  const activeHeaderTitle =
    activeType === 'project'
      ? 'Co nowego w planach?'
      : 'Jaki będzie kolejny krok?';
  const activeHeaderIcon = activeType === 'project' ? 'rocket' : 'star';

  return (
    <View style={styles.root}>
      {activeType === '' && activeMode === 'add' && (
        <TypeChoice onType={setActiveType} />
      )}
      {activeType && activeType !== '' && (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <Ionicons name={activeHeaderIcon} size={30} color={Colors.accent} />
            <Text style={styles.title}>{activeHeaderTitle}</Text>
          </View>
          <ProjectForm
            type={activeType}
            mode={activeMode}
            onType={setActiveType}
            activeProject={activeId}
          />
        </View>
      )}
      <View style={styles.test}>
        <Text style={{ color: Colors.accent }}>
          mode: {activeMode} --- type: {activeType}
        </Text>
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
  test: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    ...Fonts.h3,
    marginTop: 6
  }
});
