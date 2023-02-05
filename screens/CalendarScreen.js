import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { Styles } from '../constants/Styles';

import { getDeadlineString } from '../utils/getDeadlineString';
import DateBox from '../components/calendar/DateBox';
import Blur from '../components/interface/Blur';
import NoItemsFound from '../components/interface/NoItemsFound';

const getCalendarList = (tasks) => {
  const compareNumbers = (a, b) => {
    return a - b;
  };

  const deadlines = tasks.map((task) => +new Date(task.deadline).getTime());
  const listInOrder = [...new Set(deadlines)].sort(compareNumbers);

  const titles = listInOrder.map((date) => getDeadlineString(date, true));
  const filteredTimes = listInOrder.map((date) => new Date(date).getTime());

  return {
    titles,
    times: filteredTimes
  };
};

const CalendarScreen = () => {
  const tasks = useSelector((state) => state.taskSlice.tasks);

  if (tasks.length < 1) return <NoItemsFound itemsName='zadań' />;

  const deadlines = getCalendarList(tasks);

  return (
    <View style={{ ...Styles.root, marginTop: 12 }}>
      <FlatList
        data={deadlines.titles}
        contentContainerStyle={{
          paddingBottom: 130
        }}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <DateBox name={item} tasks={tasks} time={deadlines.times[index]} />
        )}
      />
      <Blur />
    </View>
  );
};
export default CalendarScreen;
