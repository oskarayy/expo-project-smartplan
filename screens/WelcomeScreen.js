import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native';
import Button from '../components/interface/Button';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

const cmImage = require('../assets/cmimage.png');
const backgroundImage = require('../assets/splash-bg-md.jpg');

const Welcome = ({ navigation }) => {
  const openDashboard = () => {
    navigation.navigate('dashboard');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode='cover'
        style={styles.bg}>
        <View style={styles.textContainer}>
          <View style={styles.logo}>
            <Image source={cmImage} style={{ width: 36, height: 36 }} />
          </View>
          <Text style={styles.subtext}>Zbyt długo czekasz na szczęście?</Text>
          <Text style={styles.title}>Czas zacząć działać!</Text>
        </View>
        <Button style={styles.button} onPress={openDashboard}>
          Do dzieła!
        </Button>
      </ImageBackground>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bg: {
    flex: 1,
    paddingVertical: 80,
    justifyContent: 'space-between'
  },
  textContainer: {
    paddingHorizontal: 24
  },
  logo: {
    alignItems: 'center',
    marginBottom: 20
  },
  subtext: {
    ...Fonts.text300,
    textAlign: 'center'
  },
  title: {
    ...Fonts.h1
  },
  button: {
    width: '60%',
    alignSelf: 'center',
    marginBottom: 6
  }
});
