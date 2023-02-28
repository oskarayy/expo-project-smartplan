import { useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';

import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';

import Button from '../interface/Button';

const ColorModal = ({ onFinish }) => {
  const [color, setColor] = useState();
  return (
    <View style={styles.root}>
      <Pressable
        onPress={() => console.log(color)}
        style={{ flex: 1, alignItems: 'center' }}>
        <View style={styles.container}>
          <ColorPicker
            color={color}
            onColorChangeComplete={(color) => setColor(color)}
            onColorChange={(color) => setColor(color)}
          />
        </View>
        <Button
          onPress={() => onFinish(color)}
          buttonStyle={{
            width: 150,
            marginTop: 50,
            backgroundColor: color,
            borderColor: color
          }}
          textStyle={{
            ...Fonts.h4,
            color: '#000'
          }}>
          OK
        </Button>
        <Button
          onPress={() => onFinish()}
          buttonStyle={{
            width: 150,
            marginTop: 20,
            borderColor: 'white'
          }}
          textStyle={{
            ...Fonts.h4
          }}>
          Anuluj
        </Button>
      </Pressable>
    </View>
  );
};
export default ColorModal;
const styles = StyleSheet.create({
  root: {
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
