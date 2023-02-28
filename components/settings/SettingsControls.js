import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import Button from '../interface/Button';

import { Fonts } from '../../constants/Fonts';
import { Colors } from '../../constants/Colors';

const SettingsControls = ({ onReset, onSave }) => {
  const { accentColor } = useSelector((state) => state.settingsSlice.options);

  return (
    <View style={styles.actions}>
      <Button
        onPress={onReset}
        style={{ width: 140, marginTop: 40 }}
        buttonStyle={{
          borderWidth: 1,
          borderColor: accentColor
        }}
        textStyle={{
          ...Fonts.h4,
          color: Colors.gray500
        }}>
        Reset
      </Button>
      <Button
        onPress={onSave}
        style={{ width: 140, marginTop: 40 }}
        buttonStyle={{
          borderWidth: 1,
          borderColor: accentColor,
          backgroundColor: accentColor
        }}
        textStyle={{
          ...Fonts.h4,
          color: Colors.gray500
        }}>
        Zapisz
      </Button>
    </View>
  );
};
export default SettingsControls;

const styles = StyleSheet.create({
  actions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
