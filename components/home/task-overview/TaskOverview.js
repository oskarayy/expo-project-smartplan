import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Styles } from '../../../constants/Styles';
import { Colors, ChartColors } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';

import PieChart from './PieChart';

const TaskOverview = ({ progress, tasksOverall, onOverall }) => {
  const { accentColor } = useSelector((state) => state.settingsSlice.options);
  const tasks = useSelector((state) => state.taskSlice.tasks);
  const today = new Date().toISOString().slice(0, 10);

  const stats = tasks.reduce(
    (acc, task) => {
      const todayTask = today === task.deadline;

      if (todayTask && task.finished) acc.finished += 1;
      else if (todayTask && !task.finished) acc.active += 1;

      return acc;
    },
    { finished: 0, active: 0 }
  );

  const todayTasksAmount = stats.finished + stats.active;
  const allTodayTasksFinished =
    stats.finished === todayTasksAmount && todayTasksAmount > 0;

  useEffect(() => {
    let timerId;
    if (todayTasksAmount > tasksOverall) {
      timerId = setTimeout(() => {
        onOverall((prevState) => prevState + 1);
      }, 1000 / (todayTasksAmount * 2));
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [tasksOverall, todayTasksAmount, progress.value]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <Text style={styles.title}>Dzisiaj</Text>
        <Ionicons
          name='ribbon-outline'
          size={26}
          color={allTodayTasksFinished ? accentColor : Colors.gray200}
        />
      </View>
      <View style={styles.chart}>
        <PieChart stats={stats} overall={todayTasksAmount} progress={progress}>
          <Text style={styles.chartNumber}>{tasksOverall}</Text>
        </PieChart>
      </View>
      {todayTasksAmount > 0 && (
        <View style={styles.statsContainer}>
          <View>
            <Text style={{ ...styles.statName, color: ChartColors.chart2 }}>
              Aktywne
            </Text>
            <Text style={{ ...styles.statNumber, color: ChartColors.chart2 }}>
              {stats.active}
            </Text>
          </View>
          <View>
            <Text style={{ ...styles.statName, color: ChartColors.chart1 }}>
              Ukończone
            </Text>
            <Text style={{ ...styles.statNumber, color: ChartColors.chart1 }}>
              {stats.finished}
            </Text>
          </View>
        </View>
      )}
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
  chartNumber: {
    ...Fonts.text300,
    textAlign: 'center',
    fontSize: 46
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8
  },
  statName: {
    ...Fonts.text400,
    fontSize: 12,
    marginBottom: 2,
    textAlign: 'center'
  },
  statNumber: {
    ...Fonts.text400,
    fontSize: 16,
    textAlign: 'center'
  }
});
