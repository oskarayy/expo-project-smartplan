import { StyleSheet, View, Text } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import { Fonts } from '../../constants/Fonts';
import { Colors } from '../../constants/Colors';

const SettingItem = ({ children, extraStyle, title, onPress, itembox }) => {
  return (
    <View style={styles.optionBox}>
      <Text style={styles.optionText}>{title}</Text>
      <Pressable onPress={onPress}>
        <View
          style={[
            styles.optionItem,
            itembox && styles.optionItemBox,
            extraStyle
          ]}>
          {children}
        </View>
      </Pressable>
    </View>
  );
};

export default SettingItem;

const styles = StyleSheet.create({
  optionBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginVertical: 16
  },
  optionText: {
    ...Fonts.text400,
    fontSize: 16
  },
  optionItem: {
    width: 70,
    alignItems: 'center'
  },
  optionItemBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    borderWidth: 0.5,
    borderColor: Colors.gray200,
    borderRadius: 8
  }
});
