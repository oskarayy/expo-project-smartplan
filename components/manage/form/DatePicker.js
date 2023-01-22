import { useState } from 'react';
import { Platform, View, Text, Pressable, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';

import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({ onDate, date }) => {
  const [showPicker, setShowPicker] = useState(false);

  const dateChangeHandler = (event) => {
    const {
      nativeEvent: { timestamp }
    } = event;
    const date = new Date(timestamp).toISOString().slice(0, 10);
    onDate(date);
    setShowPicker(false);
  };

  if (Platform.OS === 'ios') {
    return (
      <DateTimePicker
        value={new Date(date)}
        mode='date'
        onChange={dateChangeHandler}
        minimumDate={new Date()}
        textColor={Colors.gray500}
        accentColor={Colors.accent}
        themeVariant='dark'
        locale='pl-PL'
        style={{
          width: 100,
          marginHorizontal: 10
        }}
      />
    );
  } else if (Platform.OS === 'android') {
    return (
      <View>
        <Pressable onPress={() => setShowPicker(true)}>
          <Text style={styles.dateText}>
            {date.split('-').reverse().join('-')}
          </Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker
            value={new Date(date)}
            mode='date'
            onChange={dateChangeHandler}
            minimumDate={new Date()}
            textColor={Colors.gray500}
            accentColor={Colors.accent}
            themeVariant='dark'
            locale='pl-PL'
          />
        )}
      </View>
    );
  }
};

export default DatePicker;

const styles = StyleSheet.create({
  dateText: {
    ...Fonts.text400,
    fontSize: 14,
    textAlign: 'center',
    color: Colors.gray500
  }
});
