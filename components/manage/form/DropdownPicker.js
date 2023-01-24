import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
const myTheme = require('./PickerTheme.js');

DropDownPicker.addTranslation('PL', {
  PLACEHOLDER: 'Wybierz z listy',
  SEARCH_PLACEHOLDER: 'Wpisz frazę...',
  SELECTED_ITEMS_COUNT_TEXT: 'Wybrane elementy: {count}', // See below for advanced options
  NOTHING_TO_SHOW: 'Nic nie znaleziono!'
});
DropDownPicker.setLanguage('PL');

DropDownPicker.addTheme('MyThemeName', myTheme);
DropDownPicker.setTheme('MyThemeName');

const DropdownPicker = ({ data, value, onChange, onValid }) => {
  const route = useRoute();

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(data);
  }, [data]);

  useEffect(() => {
    onValid();
  }, [value]);

  useEffect(() => {
    if (route.params) onChange(route.params?.id);
  }, [route]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={onChange}
      setItems={setItems}
      maxHeight={262}
      zIndex={999}
      zIndexInverse={999}
    />
  );
};

export default DropdownPicker;

const styles = StyleSheet.create({});
