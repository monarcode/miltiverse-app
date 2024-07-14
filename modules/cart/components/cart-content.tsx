import { AnimatePresence, MotiScrollView } from 'moti';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import CartFooter from './cart-footer';
import CartedItem from './carted-item';

import useCartStore from '~/store/cart.store';

const CartContent = () => {
  const { styles } = useStyles(_styles);
  const cartStore = useCartStore((store) => store);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <MotiScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <AnimatePresence>
              {cartStore.cartedItems.map((item) => (
                <CartedItem key={item.id} cartedProduct={item} />
              ))}
              <CartFooter />
            </AnimatePresence>
          </MotiScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.margins['3xl'],
    paddingTop: theme.margins.md,
  },
  contentContainer: {
    paddingBottom: 140,
    rowGap: theme.margins['3xl'],
  },
}));

export default CartContent;
