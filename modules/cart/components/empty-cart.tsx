import { useStyles } from 'react-native-unistyles';

import { Text, View } from '~/components/shared';

const EmptyCart = () => {
  const { theme } = useStyles();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
      }}>
      <Text
        style={{
          fontSize: theme.fontSizes.xl,
          fontFamily: theme.fontFamily[500],
          color: theme.colors.text,
          marginBottom: 100,
        }}>
        No Item in Cart
      </Text>
    </View>
  );
};
export default EmptyCart;
