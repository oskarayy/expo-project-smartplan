import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '../../constants/Fonts';
import { Colors } from '../../constants/Colors';

const NoItemsFound = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 140
      }}>
      <Ionicons name='alert' size={36} color={Colors.accent} />
      <Text style={{ ...Fonts.h2, fontSize: 32 }}>Ehhh..</Text>
      <Text style={{ ...Fonts.text400, marginVertical: 4, fontSize: 15 }}>
        Nie zaplanowałeś jeszcze żadnych zadań?
      </Text>
      <Text style={{ ...Fonts.text300, fontSize: 13 }}>Zacznij już teraz!</Text>
      <View style={{ alignItems: 'center', position: 'absolute', bottom: 150 }}>
        <Ionicons
          name='chevron-down-outline'
          size={20}
          color={Colors.gray200}
        />
        <Ionicons
          name='chevron-down-outline'
          size={26}
          color={Colors.gray300}
        />
        <Ionicons
          name='chevron-down-outline'
          size={32}
          color={Colors.gray400}
        />
      </View>
    </View>
  );
};

export default NoItemsFound;

const styles = StyleSheet.create({});
