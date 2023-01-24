import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';

const FormItem = ({
  itemStyle,
  inputStyle,
  inputConfig,
  label,
  children,
  isValid = true
}) => {
  return (
    <View style={[styles.formItem, itemStyle]}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {!isValid && (
          <Text style={[styles.label, styles.invalid]}>Wymagane pole</Text>
        )}
      </View>
      {inputConfig && (
        <TextInput
          style={[
            styles.textInput,
            inputStyle,
            !isValid && styles.invalidInput
          ]}
          placeholderTextColor={isValid ? Colors.gray200 : Colors.gray400}
          {...inputConfig}
        />
      )}
      {children}
    </View>
  );
};

export default FormItem;

const styles = StyleSheet.create({
  formItem: {
    marginVertical: 4,
    zIndex: -1
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    ...Fonts.h4,
    marginLeft: 4,
    fontSize: 13,
    lineHeight: 30,
    color: Colors.gray400
  },
  invalid: {
    color: '#EA372999',
    fontSize: 10
  },
  textInput: {
    padding: 12,
    minHeight: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray10,
    backgroundColor: Colors.gray10,
    fontSize: 15,
    color: Colors.white
  },
  invalidInput: {
    backgroundColor: '#EA372955',
    borderColor: Colors.gray200
  }
});
