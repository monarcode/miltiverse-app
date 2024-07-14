import { ComponentProps } from 'react';
import MaskInput from 'react-native-mask-input';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const CustomMaskedInput = ({ value, onChangeText, mask, ...others }: Props) => {
  const { styles, theme } = useStyles(_styles);

  return (
    <MaskInput
      value={value}
      onChangeText={onChangeText}
      mask={mask}
      style={styles.input}
      cursorColor={theme.colors.brand}
      placeholderTextColor="rgba(42, 42, 42, 0.5)"
      {...others}
    />
  );
};

const _styles = createStyleSheet((theme) => ({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(42, 42, 42, 0.5)',
    height: 46,
    borderRadius: 8,
    paddingLeft: 16,
    fontFamily: theme.fontFamily[500],
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text,
  },
}));

export default CustomMaskedInput;

type Props = ComponentProps<typeof MaskInput>;
