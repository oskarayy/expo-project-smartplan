import { useState } from 'react';
import { Platform, View, Text, Pressable, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';

import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({ onValue, date, time, type }) => {
  const { accentColor } = useSelector((state) => state.settingsSlice.options);
  const [showPicker, setShowPicker] = useState(false);

  const valueChangeHandler = (event) => {
    const {
      nativeEvent: { timestamp }
    } = event;
    const valueOrigin = new Date(timestamp).toISOString();
    if (type === 'date') {
      const date = valueOrigin.slice(0, 10);
      onValue(date);
      setShowPicker(false);
    }
    if (type === 'time') {
      const time = [valueOrigin.slice(11, 13), valueOrigin.slice(14, 16)];
      onValue(time);
      setShowPicker(false);
    }
  };

  if (Platform.OS === 'ios') {
    return (
      <DateTimePicker
        value={
          type === 'date'
            ? new Date(date)
            : new Date('2023', '1', '1', time[0], time[1])
        }
        mode={type}
        onChange={valueChangeHandler}
        minimumDate={type === 'date' && new Date()}
        textColor={Colors.gray500}
        accentColor={accentColor}
        themeVariant='dark'
        locale='pl-PL'
        style={{
          width: type === 'date' ? 100 : 70,
          height: type === 'time' ? 35 : null,
          marginHorizontal: 10
        }}
      />
    );
  } else if (Platform.OS === 'android') {
    return (
      <View>
        <Pressable onPress={() => setShowPicker(true)}>
          <Text style={styles.valueText}>
            {type === 'date'
              ? date.split('-').reverse().join('-')
              : time[0] + ':' + time[1]}
          </Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker
            value={
              type === 'date'
                ? new Date(date)
                : new Date('2023', '1', '1', time[0], time[1])
            }
            mode={type}
            onChange={valueChangeHandler}
            minimumDate={type === 'date' && new Date()}
            textColor={Colors.gray500}
            accentColor={accentColor}
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
  valueText: {
    ...Fonts.text400,
    fontSize: 14,
    textAlign: 'center',
    color: Colors.gray500
  }
});
