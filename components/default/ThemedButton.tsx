import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  button: {
    backgroundColor: '#606a55',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55
  },
  label: {
    color: '#fff',
    fontSize: '10@s',
    fontWeight: 'bold',
  },
});

const ThemedButton = ({ onPress, label, style, value, labelStyle }:any) => {
  const handlePress = () => {
    if (onPress) {
      onPress(value);
    }
  };

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={handlePress}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};



export default ThemedButton;
