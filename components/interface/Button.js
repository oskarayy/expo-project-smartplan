import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Colors } from '../../constants/Colors';

const Button = ({ style, children, onPress, buttonStyle, textStyle }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}>
        <View style={[styles.button, buttonStyle]}>
          <Text style={[styles.text, textStyle]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};
export default Button;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75
  },
  button: {
    padding: 14,
    borderColor: Colors.white,
    borderWidth: 0.5,
    borderRadius: 24,
    backgroundColor: 'transparent'
  },
  text: {
    fontFamily: 'Mulish_400Regular',
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center'
  }
});
