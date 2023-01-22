import { Platform, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors } from '../../constants/Colors';

const Blur = () => {
  if (Platform.OS === 'android')
    return <View style={[styles.blur, styles.blurAndroid]} />;
  else if (Platform.OS === 'ios')
    return <BlurView style={styles.blur} tint='dark' intensity={10} />;
};

export default Blur;

const styles = StyleSheet.create({
  blur: {
    position: 'absolute',
    height: 50,
    left: 0,
    bottom: 0,
    right: 0
  },
  blurAndroid: {
    marginHorizontal: 20,
    backgroundColor: Colors.gray50,
    opacity: 0.7
  }
});
