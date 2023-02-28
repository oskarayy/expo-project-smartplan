import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';

const Category = ({ name, icon, onPress, id }) => {
  const { accentColor } = useSelector((state) => state.settingsSlice.options);

  return (
    <View style={styles.catBox} id={id}>
      <Pressable
        onPress={onPress.bind(null, id)}
        style={({ pressed }) => pressed && { opacity: 0.7 }}>
        <View style={styles.cat}>
          <View style={styles.label}>
            <Ionicons name={icon} size={22} color={accentColor} />
            <Text style={styles.name}>{name.toUpperCase()}</Text>
          </View>
          <View>
            <Ionicons name='chevron-forward' size={20} color={accentColor} />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  catBox: {
    height: `${75 / 7}%`,
    marginVertical: 8
  },
  cat: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderRadius: 12,
    backgroundColor: Colors.gray10
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '75%'
  },
  name: {
    ...Fonts.h4,
    marginLeft: 10,
    textAlign: 'left',
    color: Colors.gray500,
    letterSpacing: 0.1
  }
});
