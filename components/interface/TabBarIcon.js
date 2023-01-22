import { StyleSheet, View, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const TabBarIcon = ({ icon, label, focused }) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name={icon}
        size={24}
        color={focused ? Colors.accent : Colors.gray200}
        style={styles.icon}
      />
      <Text style={[styles.label, focused && { color: Colors.accent }]}>
        {label}
      </Text>
    </View>
  );
};

export default TabBarIcon;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    paddingTop: Platform.OS === 'ios' ? 26 : 0
  },
  label: {
    paddingTop: Platform.OS === 'ios' ? 4 : 2,
    fontSize: 12,
    textAlign: 'center',
    color: Colors.gray200
  }
});
