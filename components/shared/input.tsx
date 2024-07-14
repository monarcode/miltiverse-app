import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  Text,
  View,
} from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const TextInput = ({ label, style, ...props }: NativeTextInputProps & { label?: string }) => {
  const [isFocused, setIsFocused] = useState(false);
  const borderColor = useRef(new Animated.Value(0)).current;
  const { styles, theme } = useStyles(_styles);

  useEffect(() => {
    Animated.timing(borderColor, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const animatedBorderColor = borderColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(42, 42, 42, 0.7)', theme.colors.brand],
  });

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Animated.View style={[styles.inputContainer, { borderColor: animatedBorderColor }]}>
        <NativeTextInput
          style={[styles.input, style]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={theme.colors.text}
          cursorColor={theme.colors.brand}
          {...props}
        />
      </Animated.View>
    </View>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {
    marginVertical: 10,
    flex: 1,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 55,
  },
  input: {
    fontSize: 16,
    height: 40,
  },
}));

export default TextInput;
