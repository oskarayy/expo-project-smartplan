import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';

import { Colors } from '../../constants/Colors';
import ActionButtons from '../interface/ActionButtons';

const ColorModal = ({ onFinish, accentColor }) => {
  const [color, setColor] = useState(accentColor);
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <ColorPicker
          color={color}
          onInteractionStart={() => setColor(accentColor)}
          onColorChangeComplete={(color) => setColor(color)}
          onColorChange={(color) => setColor(color)}
        />
      </View>
      <ActionButtons
        onCancel={onFinish.bind(null, null)}
        onSubmit={onFinish.bind(null, color)}
        submitText='OK'
        color={color}
      />
    </View>
  );
};
export default ColorModal;
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.gray50
  },
  container: {
    width: '80%',
    height: '50%',
    marginTop: 50
  }
});
