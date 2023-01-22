import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';
import { Styles } from '../../constants/Styles';

const TypeChoice = ({ onType }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center'
      }}>
      <Pressable
        style={({ pressed }) => pressed && { opacity: 0.7 }}
        onPress={() => onType('project')}>
        <View style={styles.choice}>
          <Ionicons name='rocket' size={28} color={Colors.accent} />
          <Text style={styles.choiceText}>Projekt</Text>
        </View>
      </Pressable>
      <Pressable
        style={({ pressed }) => pressed && { opacity: 0.7 }}
        onPress={() => onType('task')}>
        <View style={styles.choice}>
          <Ionicons name='star' size={28} color={Colors.accent} />
          <Text style={styles.choiceText}>Zadanie</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default TypeChoice;

const styles = StyleSheet.create({
  choice: {
    height: 160,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray10
  },
  choiceText: {
    ...Fonts.h2,
    marginTop: 2,
    color: Colors.gray500
  }
});
