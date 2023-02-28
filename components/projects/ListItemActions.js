import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '../../constants/Colors';

import Button from '../interface/Button';

const ListItemActions = ({ onRemove, onOpen }) => {
  const { accentColor } = useSelector((state) => state.settingsSlice.options);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 2,
        marginHorizontal: 16
      }}>
      <Button
        onPress={onRemove}
        style={styles.tasksButton}
        buttonStyle={[styles.buttonStyle, { borderColor: accentColor }]}
        textStyle={{ fontSize: 12, color: Colors.gray400 }}>
        Usuń
      </Button>
      <Button
        onPress={onOpen}
        style={styles.tasksButton}
        buttonStyle={styles.buttonStyle}
        textStyle={{ fontSize: 12 }}>
        Szczegóły
      </Button>
    </View>
  );
};

export default ListItemActions;

const styles = StyleSheet.create({
  tasksButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: {
    width: 100,
    paddingVertical: 6
  }
});
