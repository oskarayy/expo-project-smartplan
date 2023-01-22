import React, { forwardRef, createRef, useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';

const FormItem = React.forwardRef(
  ({ itemStyle, inputStyle, inputConfig, label, children }, ref) => {
    return (
      <View style={[styles.formItem, itemStyle]}>
        <Text style={styles.label}>{label}</Text>
        {inputConfig && (
          <TextInput
            ref={ref}
            style={[styles.textInput, inputStyle]}
            placeholderTextColor={Colors.gray200}
            {...inputConfig}
          />
        )}
        {children}
      </View>
    );
  }
);

export default FormItem;

const styles = StyleSheet.create({
  formItem: {
    marginVertical: 4,
    zIndex: -1
  },
  label: {
    ...Fonts.h4,
    marginLeft: 4,
    fontSize: 13,
    lineHeight: 30,
    color: Colors.gray400
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
  }
});
