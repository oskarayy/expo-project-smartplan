import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

import ProjectStatus from '../projects/ProjectStatus';
import { Fonts } from '../../constants/Fonts';

const ProjectStatsItem = ({ item, progress, stats }) => {
  const { accentColor } = useSelector((state) => state.settingsSlice.options);
  const activeTasks = stats[item.id]['active'];
  const finishedTasks = stats[item.id]['finished'];

  const procent = (100 / (activeTasks + finishedTasks)) * finishedTasks;

  return (
    <View style={styles.item}>
      <Ionicons name={item.icon} size={24} color={accentColor} />
      <View style={styles.progress}>
        {procent.toString() === 'NaN' ? (
          <Text style={styles.noTasksText}>Brak aktywnych zadań</Text>
        ) : (
          <ProjectStatus
            progress={progress}
            procent={procent.toFixed()}
            prev={0}
          />
        )}
      </View>
    </View>
  );
};

export default ProjectStatsItem;

const styles = StyleSheet.create({
  item: {
    flexBasis: '16.66666666666667%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 4,
    marginRight: 4,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  noTasksText: {
    ...Fonts.text300,
    width: '100%',
    textAlign: 'center',
    color: Colors.gray300,
    fontSize: 12
  }
});
