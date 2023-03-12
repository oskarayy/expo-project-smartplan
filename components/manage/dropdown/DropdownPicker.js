import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const validTheme = require('./ValidTheme.js');
const invalidTheme = require('./InvalidTheme.js');

DropDownPicker.addTranslation('PL', {
  PLACEHOLDER: 'Wybierz z listy',
  SEARCH_PLACEHOLDER: 'Wpisz frazę...',
  SELECTED_ITEMS_COUNT_TEXT: 'Wybrane elementy: {count}', // See below for advanced options
  NOTHING_TO_SHOW: 'Nic nie znaleziono!'
});
DropDownPicker.setLanguage('PL');

DropDownPicker.addTheme('ValidTheme', validTheme);
DropDownPicker.addTheme('InvalidTheme', invalidTheme);

const DropdownPicker = ({ data, value, onValue, isValid }) => {
  const route = useRoute();

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  const newValueHandler = (getValue) => {
    onValue({
      type: 'UPDATE_VALUES',
      values: { dropdown: getValue() }
    });
  };

  useEffect(() => {
    setItems(data);
  }, [data]);

  useEffect(() => {
    DropDownPicker.setTheme(isValid ? 'ValidTheme' : 'InvalidTheme');
  }, [isValid]);

  useEffect(() => {
    onValue({ type: 'VALUES_VALIDATION', dropdown: true });
  }, [value]);

  useEffect(() => {
    if (route.params)
      onValue({
        type: 'UPDATE_VALUES',
        values: { dropdown: route.params?.id }
      });
  }, [route]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={newValueHandler}
      setItems={setItems}
      maxHeight={262}
      zIndex={999}
      zIndexInverse={999}
    />
  );
};

export default DropdownPicker;

const styles = StyleSheet.create({});
