import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '../../constants/Colors';

import { runConfirmationTimer } from '../../utils/confirmationTimer';

import Button from '../interface/Button';

const MainActions = ({ confirmationFn, timerFn, onOpen, color }) => (
  <>
    <Button
      onPress={runConfirmationTimer.bind(null, confirmationFn, timerFn)}
      style={styles.tasksButton}
      buttonStyle={[styles.buttonStyle, { borderColor: color }]}
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
  </>
);
const ConfirmationButton = ({ onRemove, timer, color }) => (
  <Button
    onPress={onRemove}
    buttonStyle={[
      styles.buttonStyle,
      { borderColor: color, backgroundColor: color, width: 150 }
    ]}
    textStyle={{ fontSize: 12, color: 'white' }}>
    {`Potwierdzam (${timer})`}
  </Button>
);

const ListItemActions = ({ onRemove, onOpen }) => {
  const [confirmation, setConfirmation] = useState(false);
  const [timer, setTimer] = useState(3);
  const { accentColor } = useSelector((state) => state.settingsSlice.options);

  const activeActions = confirmation ? (
    <ConfirmationButton onRemove={onRemove} color={accentColor} timer={timer} />
  ) : (
    <MainActions
      confirmationFn={setConfirmation}
      timerFn={setTimer}
      onOpen={onOpen}
      color={accentColor}
    />
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 2,
        marginHorizontal: 16
      }}>
      {activeActions}
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
