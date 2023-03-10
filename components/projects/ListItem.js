import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Styles } from '../../constants/Styles';
import { getFormattedDate } from '../../utils/getFormattedDate';

import ProjectStatus from './ProjectStatus';

import { useDispatch, useSelector } from 'react-redux';
import { removeProject } from '../../store/reducers/projectSlice';
import { removeTask } from '../../store/reducers/taskSlice';
import ListItemActions from './ListItemActions';

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

const removeProjectHandler = (id, dispatch) => {
  dispatch(removeProject(id));
  dispatch(removeTask({ mode: 'multi', id }));
};

const openProjectHandler = (id, navigation) => {
  navigation.navigate('projects', {
    screen: 'projectDetail',
    params: { id }
  });
};

const ListItem = ({ item, progress }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { accentColor } = useSelector((state) => state.settingsSlice.options);

  const deadline = getFormattedDate(item.deadline, 'long');
  const date = `${deadline.day}, ${deadline.date}`;

  const descriptionText =
    item.desc.length < 1 ? 'Nie dodano jeszcze opisu projektu' : item.desc;

  return (
    <View style={styles.item}>
      <Pressable
        style={({ pressed }) => pressed && { opacity: 0.7 }}
        onPress={openProjectHandler.bind(null, item.id, navigation)}>
        <Text style={{ ...Styles.date, fontSize: 10 }}>{date}</Text>
        <View style={styles.details}>
          <View style={styles.icon}>
            <Ionicons
              name={icons[item.category]}
              size={24}
              color={accentColor}
            />
          </View>
          <View style={styles.info}>
            <Text style={{ ...Styles.title, fontSize: 18 }}>{item.title}</Text>
            <Text style={{ ...Styles.category, fontSize: 11 }}>
              {categoriesPL[item.category]}
            </Text>
          </View>
        </View>
        <Text style={Styles.desc}>{descriptionText}</Text>
        <ProjectStatus progress={progress} procent={item.progress} />
        <ListItemActions
          onRemove={removeProjectHandler.bind(null, item.id, dispatch)}
          onOpen={openProjectHandler.bind(null, item.id, navigation)}
        />
      </Pressable>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    minHeight: 160,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 6,
    marginBottom: 12,
    marginHorizontal: 4,
    backgroundColor: Colors.gray10
  },
  details: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5
  },
  icon: {
    flexBasis: '12%',
    justifyContent: 'center',
    marginRight: 4,
    alignItems: 'center'
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 55
  }
});
