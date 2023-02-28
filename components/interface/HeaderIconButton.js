import { StyleSheet, View, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const HeaderIconButton = ({ style, icon, size = 36, onPress }) => {
  const { accentColor } = useSelector((state) => state.settingsSlice.options);

  return (
    <View style={[styles.button, style]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name={icon} size={size} color={accentColor} />
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
