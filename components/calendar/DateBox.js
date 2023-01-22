import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';

import TaskBar from '../tasks/TaskBar';
import { getFormattedDate } from '../../utils/getFormattedDate';

const DateBox = ({ name, tasks, time }) => {
  const tasksToDisplay = tasks.filter(
    (task) => new Date(task.deadline).getTime() === time
  );

  return (
    <View style={styles.deadlineBox}>
      <View style={styles.date}>
        <Text style={styles.day}>{name}</Text>
        <Text style={styles.rest}>{getFormattedDate(time, 'short')}</Text>
      </View>
      <View style={styles.bar} />
      <View style={styles.list}>
        {tasksToDisplay.map((task) => (
          <TaskBar key={task.id} calendar taskData={task} />
        ))}
      </View>
    </View>
  );
};

export default DateBox;

const styles = StyleSheet.create({
  deadlineBox: {
    marginBottom: 20
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 6
  },
  day: {
    ...Fonts.h1,
    fontSize: 18,
    lineHeight: 22,
    color: Colors.gray500
  },
  rest: {
    ...Fonts.text400,
    fontSize: 10,
    lineHeight: 22,
    color: Colors.gray200
  },
  bar: {
    height: 1.5,
    borderRadius: 0.75,
    backgroundColor: Colors.accent
  }
});
