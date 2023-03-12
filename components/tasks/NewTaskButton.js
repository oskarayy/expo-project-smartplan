import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '../../constants/Colors';

const NewTaskButton = ({ textStyle, barStyle, onNewTask }) => {
  const { accentColor } = useSelector((state) => state.settingsSlice.options);

  return (
    <Pressable
      style={({ pressed }) => pressed && { opacity: 0.7 }}
      onPress={onNewTask}>
      <View
        style={[barStyle, styles.taskBarButton, { borderColor: accentColor }]}>
        <Text style={[textStyle, { marginRight: 0, color: accentColor }]}>
          Dodaj zadanie
        </Text>
      </View>
    </Pressable>
  );
};

export default NewTaskButton;

const styles = StyleSheet.create({
  taskBarButton: {
    flexDirection: 'column',
    backgroundColor: Colors.gray10,
    borderWidth: 1.5
  }
});
