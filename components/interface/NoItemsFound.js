import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '../../constants/Fonts';
import { Colors } from '../../constants/Colors';
import { Styles } from '../../constants/Styles';

const NoItemsFound = ({ itemsName, category }) => {
  const { accentColor } = useSelector((state) => state.settingsSlice.options);
  const categories = useSelector((state) => state.projectSlice.categories);
  const categoryName = categories.find((item) => item.id === category)?.name;

  return (
    <View
      style={{
        ...Styles.centered,
        flex: 1,
        paddingBottom: 140
      }}>
      <Ionicons name='alert' size={36} color={accentColor} />
      <Text style={{ ...Fonts.h2, fontSize: 32 }}>Ehhh..</Text>
      <Text style={styles.info}>
        Nie zaplanowałeś jeszcze żadnych {itemsName}
        {category && (
          <>
            {' w kategorii'}
            <Text style={styles.boldInfoText}>
              {' ' + categoryName.toLowerCase()}
            </Text>
          </>
        )}
        ?
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

const styles = StyleSheet.create({
  info: {
    ...Fonts.text400,
    marginVertical: 8,
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center'
  },
  boldInfoText: { ...Fonts.h4, fontSize: 15 }
});
