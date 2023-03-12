import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import Button from '../interface/Button';

import { Fonts } from '../../constants/Fonts';
import { Colors } from '../../constants/Colors';

const ActionButtons = ({
  onCancel,
  onSubmit,
  cancelText = 'Anuluj',
  submitText = 'Zapisz',
  color
}) => {
  const { accentColor } = useSelector((state) => state.settingsSlice.options);

  return (
    <View style={styles.boxStyle}>
      <Button
        onPress={onCancel}
        style={{ width: 140, marginTop: 40 }}
        buttonStyle={{
          borderWidth: 1,
          borderColor: color ?? accentColor,
          backgroundColor: Colors.gray10
        }}
        textStyle={{
          ...Fonts.h4,
          color: Colors.gray500
        }}>
        {cancelText}
      </Button>
      <Button
        onPress={onSubmit}
        style={{ width: 140, marginTop: 40 }}
        buttonStyle={{
          borderWidth: 1,
          borderColor: color ?? accentColor,
          backgroundColor: color ?? accentColor
        }}
        textStyle={{
          ...Fonts.h4,
          color: Colors.gray500
        }}>
        {submitText}
      </Button>
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  boxStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
