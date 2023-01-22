import { StyleSheet, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const HeaderIconButton = ({ style, icon, onPress }) => {
  return (
    <View style={[styles.button, style]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name={icon} size={36} color={Colors.accent} />
        </View>
      </Pressable>
    </View>
  );
};

export default HeaderIconButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5
  },
  button: {
    paddingTop: 2,
    paddingRight: 8,
    alignItems: 'center'
  }
});
