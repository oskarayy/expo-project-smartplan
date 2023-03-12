import { StyleSheet, View, Pressable } from 'react-native';
import { useSelector } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const TaskActions = ({ finished, checkbox, calendar, onUpdate, onRemove }) => {
  const { accentColor } = useSelector((state) => state.settingsSlice.options);

  const checkIcon = finished ? 'checkmark-circle' : 'checkmark-circle-outline';

  return (
    <View style={{ marginRight: 8 }}>
      <Pressable onPress={checkbox ? onUpdate : onRemove}>
        <Ionicons
          name={checkbox ? checkIcon : 'close'}
          size={calendar ? 26 : 24}
          color={finished && checkbox ? accentColor : Colors.gray100}
        />
      </Pressable>
    </View>
  );
};

export default TaskActions;

const styles = StyleSheet.create({});
