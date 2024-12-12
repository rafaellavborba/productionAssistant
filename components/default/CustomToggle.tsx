import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';

export default function CustomToggle({
  isEnabledInitial = false, // Estado inicial vindo do pai
  onToggle = (newState:any) => {}, // Callback para enviar mudanças ao pai
  activeColor = '#81b0ff',
  inactiveColor = '#767577',
  size = 30,
}) {
  const [isEnabled, setIsEnabled] = useState(isEnabledInitial);
  const translateX = new Animated.Value(isEnabledInitial ? size : 0);

  // Sincronizar mudanças do estado inicial (caso o pai altere)
  useEffect(() => {
    setIsEnabled(isEnabledInitial);
    translateX.setValue(isEnabledInitial ? size : 0);
  }, [isEnabledInitial]);

  const toggleSwitch = (value:any) => {
    const newState = !isEnabled;
    Animated.timing(translateX, {
      toValue: newState ? size : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setIsEnabled(newState);
    onToggle(newState ?? false); // Envia o novo estado ao pai
  };

  const toggleWidth = size * 2;
  const circleSize = size - 10;

  return (
    <TouchableOpacity
      style={[
        styles.toggle,
        {
          width: toggleWidth,
          height: size,
          borderRadius: size / 2,
          backgroundColor: isEnabled ? activeColor : inactiveColor,
        },
      ]}
      onPress={(value) => toggleSwitch(value)}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
            transform: [{ translateX }],
          },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  toggle: {
    justifyContent: 'center',
    padding: 5,
  },
  circle: {
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
