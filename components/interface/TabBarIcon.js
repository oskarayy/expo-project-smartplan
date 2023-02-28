import { StyleSheet, View, Text, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const TabBarIcon = ({ icon, label, focused }) => {
  const { accentColor } = useSelector((state) => state.settingsSlice.options);

  return (
    <View style={styles.container}>
      <Ionicons
        name={icon}
        size={24}
        color={focused ? accentColor : Colors.gray200}
        style={styles.icon}
      />
      <Text style={[styles.label, focused && { color: accentColor }]}>
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
