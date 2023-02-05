import { StyleSheet, View, Text, Image } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';
const cmimage = require('../../assets/cmimage.png');

const Topbar = () => {
  return (
    <View style={styles.topbar}>
      <View>
        <Text
          style={{
            ...Fonts.text400,
            // color: Colors.black,
            color: Colors.gray400,
            fontSize: 12,
            marginBottom: 1
          }}>
          Witaj!
        </Text>
        <Text
          style={{
            ...Fonts.h3,
            // color: Colors.gray10,
            color: '#ffffff'
          }}>
          Jak tam Twoje postępy?
        </Text>
      </View>
      <View>
        <Image source={cmimage} style={styles.logo} />
      </View>
    </View>
  );
};
export default Topbar;
const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6
  },
  logo: {
    width: 28,
    height: 28
  }
});
