import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Styles } from '../../../constants/Styles';
import { Colors } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';
import PieChart from './PieChart';

const dummy_tasks = {
  overall: 7,
  finished: 5,
  running: 2
};

const TaskOverview = ({ tasks = dummy_tasks, progress }) => {
  const [overall, setOverall] = useState(1);

  useEffect(() => {
    let timerId;
    if (tasks.overall > overall) {
      timerId = setTimeout(() => {
        setOverall((prevState) => prevState + 1);
      }, 1000 / tasks.overall);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [overall, tasks]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <Text style={styles.title}>Zadania</Text>
        <Ionicons name={'color-wand-outline'} size={24} color={Colors.gray50} />
      </View>
      <View style={styles.chart}>
        <PieChart tasks={tasks} progress={progress}>
          <Text style={[styles.statNumber, { fontSize: 46 }]}>{overall}</Text>
        </PieChart>
      </View>
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: Colors.chart2 }]}>
            {tasks.running}
          </Text>
          <Text style={styles.statName}>w toku</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: Colors.accent }]}>
            {tasks.finished}
          </Text>
          <Text style={[styles.statName, { color: Colors.accent }]}>
            ukończone
          </Text>
        </View>
      </View>
    </View>
  );
};
export default TaskOverview;
const styles = StyleSheet.create({
  container: {
    ...Styles.card
  },
  title: {
    ...Fonts.h4
  },
  chart: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 6
  },
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 6
  },
  statItem: {
    minWidth: 100,
    marginTop: 2,
    padding: 2,
    borderRadius: 8,
    backgroundColor: Colors.gray5
  },
  statNumber: {
    textAlign: 'center',
    ...Fonts.h3
  },
  statName: {
    ...Fonts.text400,
    color: Colors.chart2,
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center'
  }
});
