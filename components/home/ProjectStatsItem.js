import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Styles } from '../../constants/Styles';

import ProjectStatus from '../projects/ProjectStatus';

const ProjectStatsItem = ({ item, progress, procent }) => {
  return (
    <View style={styles.item}>
      <Ionicons name={item.icon} size={24} color={Colors.accent} />
      <View style={styles.progress}>
        <ProjectStatus progress={progress} procent={procent} />
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
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
