import { StyleSheet, View, Text, Pressable } from 'react-native';
import { sendProjects, sendTasks } from '../utils/storage';

const SettingsScreen = () => {
  const reset = () => {
    sendProjects([]);
    sendTasks([]);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable onPress={reset}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#fff' }}>Settings Screen</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
