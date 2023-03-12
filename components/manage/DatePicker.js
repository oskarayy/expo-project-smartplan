import { useState } from 'react';
import { Platform, View, Text, Pressable, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';

import DateTimePicker from '@react-native-community/datetimepicker';

const valueChangeHandler = (event, type, onValue, onPicker) => {
  const {
    nativeEvent: { timestamp }
  } = event;
  const valueOrigin = new Date(timestamp).toISOString();

  if (type === 'date') {
    const date = valueOrigin.slice(0, 10);
    onValue({ type: 'UPDATE_VALUES', values: { date } });
  } else if (type === 'time') {
    const time = [valueOrigin.slice(11, 13), valueOrigin.slice(14, 16)];
    time[0]++;
    onValue((settings) => ({ ...settings, time }));
  }

  onPicker(false);
};

const IOSPicker = ({ date, time, color, type, onValue, onPicker }) => (
  <DateTimePicker
    value={
      type === 'date'
        ? new Date(date)
        : new Date('2023', '1', '1', time[0], time[1])
    }
    mode={type}
    onChange={(event) => valueChangeHandler(event, type, onValue, onPicker)}
    minimumDate={type === 'date' && new Date()}
    textColor={Colors.gray500}
    accentColor={color}
    themeVariant='dark'
    locale='pl-PL'
    style={{
      width: type === 'date' ? 100 : 70,
      height: type === 'time' ? 35 : null,
      marginHorizontal: 10
    }}
  />
);

const AndroidPicker = ({
  date,
  time,
  color,
  type,
  onValue,
  onPicker,
  showPicker
}) => (
  <View>
    <Pressable onPress={onPicker.bind(null, true)}>
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
        onChange={(event) => valueChangeHandler(event, type, onValue, onPicker)}
        minimumDate={type === 'date' && new Date()}
        textColor={Colors.gray500}
        accentColor={color}
        themeVariant='dark'
        locale='pl-PL'
      />
    )}
  </View>
);

const DatePicker = ({ onValue, date, time, type }) => {
  const { accentColor } = useSelector((state) => state.settingsSlice.options);
  const [showPicker, setShowPicker] = useState(false);

  const basicPickerProps = {
    date,
    time,
    accentColor,
    type,
    onValue,
    onPicker: setShowPicker
  };

  if (Platform.OS === 'ios') return <IOSPicker {...basicPickerProps} />;

  if (Platform.OS === 'android') {
    return <AndroidPicker {...basicPickerProps} showPicker={showPicker} />;
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
