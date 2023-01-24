import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors';
import { Styles } from '../../../constants/Styles';
import { getFormattedDate } from '../../../utils/getFormattedDate';

import Button from '../../interface/Button';
import ProjectStatus from '../../home/projects-overview/ProjectStatus';

import { useDispatch } from 'react-redux';
import { removeProject } from '../../../store/reducers/projectSlice';
import { removeTask } from '../../../store/reducers/taskSlice';

const icons = {
  love: 'heart-outline',
  health: 'pulse-outline',
  career: 'briefcase-outline',
  finances: 'wallet-outline',
  soul: 'rose-outline',
  relations: 'people-outline'
};

const categoriesPL = {
  love: 'miłość',
  health: 'zdrowie',
  career: 'kariera',
  finances: 'finanse',
  soul: 'dusza',
  relations: 'relacje'
};

const GridItem = ({ item, progress, mainConfig = {} }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const openProjectHandler = () => {
    navigation.navigate('projects', {
      screen: 'projectDetail',
      params: { id: item.id }
    });
  };

  const removeProjectHandler = () => {
    dispatch(removeProject(item.id));
    dispatch(removeTask({ mode: 'multi', id: item.id }));
  };

  let date = getFormattedDate(item.deadline, 'short');
  if (mainConfig.dateFormat === 'long') {
    const today = getFormattedDate(item.deadline, 'long');
    date = `${today.day}, ${today.date}`;
  }

  return (
    <View style={[styles.item, mainConfig.itemStyle]}>
      <Pressable onPress={mainConfig.enhanced ? () => {} : openProjectHandler}>
        <Text style={[{ ...Styles.date }, mainConfig.dateStyle]}>{date}</Text>
        <View style={styles.details}>
          <View style={[styles.icon, mainConfig?.iconStyle]}>
            <Ionicons
              name={icons[item.category]}
              size={24}
              color={mainConfig.enhanced ? Colors.accent : Colors.gray500}
            />
          </View>
          <View style={styles.info}>
            <Text style={[{ ...Styles.title }, mainConfig.titleStyle]}>
              {item.title}
            </Text>
            <Text style={[{ ...Styles.category }, mainConfig.categoryStyle]}>
              {categoriesPL[item.category]}
            </Text>
          </View>
        </View>
        {mainConfig.enhanced && (
          <Text style={{ ...Styles.desc }}>
            {item.desc.length < 1
              ? 'Nie dodano jeszcze opisu projektu'
              : item.desc}
          </Text>
        )}
        <ProjectStatus progress={progress} procent={item.progress} />
        {mainConfig.enhanced && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 2,
              marginHorizontal: 16
            }}>
            <Button
              onPress={removeProjectHandler}
              style={styles.tasksButton}
              buttonStyle={[styles.buttonStyle, { borderColor: Colors.accent }]}
              textStyle={{ fontSize: 12, color: Colors.gray400 }}>
              Usuń
            </Button>
            <Button
              onPress={openProjectHandler}
              style={styles.tasksButton}
              buttonStyle={styles.buttonStyle}
              textStyle={{ fontSize: 12 }}>
              Szczegóły
            </Button>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default GridItem;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    minHeight: '45%',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: 6,
    marginHorizontal: 4,
    backgroundColor: Colors.gray50
  },
  details: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5
  },
  icon: {
    flexBasis: '28%',
    justifyContent: 'center'
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 55
  },
  tasksButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: {
    width: 100,
    paddingVertical: 6
  }
});
