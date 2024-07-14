import React, { useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface TextAreaProps extends Omit<TextInputProps, 'multiline'> {
  numberOfLines?: number;
  onChangeText?: (text: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  numberOfLines = 3,
  onChangeText,
  ...rest
}) => {
  const [text, setText] = useState<string>('');
  const { styles, theme } = useStyles(_styles);

  const handleChangeText = (value: string) => {
    setText(value);
    if (onChangeText) {
      onChangeText(value);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline
        numberOfLines={numberOfLines}
        placeholder={placeholder}
        value={text}
        onChangeText={handleChangeText}
        textAlignVertical="top"
        cursorColor={theme.colors.brand}
        {...rest}
      />
    </View>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {},
  textInput: {
    borderWidth: 1,
    borderColor: 'rgba(42, 42, 42, 0.5)',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    minHeight: 80,
  },
}));

export default TextArea;
