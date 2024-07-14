import { router } from 'expo-router';
import { useEffect } from 'react';
import ConfettiCannon from 'react-native-confetti-cannon';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import Success from '~/assets/icons/success.svg';
import { Text, View } from '~/components/shared';
import useCartStore from '~/store/cart.store';
import useCheckoutStore from '~/store/checkout';

const SuccessScreen = () => {
  const { styles } = useStyles(_styles);
  const setStage = useCheckoutStore((v) => v.setStage);
  const clearCart = useCartStore((v) => v.clearCart);

  const onSuccess = () => {
    setStage('address');
    clearCart();
    router.replace('/');
  };

  useEffect(() => {
    setTimeout(() => {
      onSuccess();
    }, 3000);
  });

  return (
    <View style={styles.container}>
      {/* <Image source={require('../../../assets/images/confetti.png')} style={styles.confetti} /> */}
      <ConfettiCannon count={100} origin={{ x: -50, y: 0 }} />

      <Text style={styles.title}>Payment Successful</Text>

      <View style={styles.contentContainer}>
        <Success />

        <View style={styles.textContainer}>
          <Text style={styles.successText}>Payment Successful</Text>
          <Text style={styles.thanksText}>Thanks for your purchase</Text>
        </View>
      </View>
    </View>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 28,
    position: 'relative',
  },
  confetti: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    objectFit: 'cover',
    width: '100%',
  },
  title: {
    fontFamily: theme.fontFamily[600],
    fontSize: theme.fontSizes['xl'],
    marginBottom: 200,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  successText: {
    fontSize: 18,
    fontFamily: theme.fontFamily[600],
    marginBottom: 6,
  },
  thanksText: {
    fontSize: 14,
    fontFamily: theme.fontFamily[400],
  },
}));

export default SuccessScreen;
