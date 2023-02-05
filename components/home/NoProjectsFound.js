import { StyleSheet, View, Text } from 'react-native';

import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';
import { Styles } from '../../constants/Styles';

const NoProjectsFound = () => {
  return (
    <View style={{ ...Styles.centered, flex: 1 }}>
      <Text style={styles.text}>Brak aktywnych projektów</Text>
      <Text style={styles.text}>
        Stwórz nowy projekt i napisz swoją historię na nowo!
      </Text>
    </View>
  );
};

export default NoProjectsFound;

const styles = StyleSheet.create({
  text: {
    ...Fonts.text300,
    marginVertical: 6,
    marginHorizontal: 24,
    lineHeight: 20,
    color: Colors.gray200,
    textAlign: 'center'
  }
});
