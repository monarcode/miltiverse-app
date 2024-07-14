import { Image } from 'expo-image';
import { Add, Minus, Trash } from 'iconsax-react-native';
import { MotiView } from 'moti';
import { Pressable } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text, View } from '~/components/shared';
import { formatCurrency } from '~/helpers/currencyFormat';
import useCartStore from '~/store/cart.store';
import { CartItem } from '~/types/cart';

const CartedItem = ({ cartedProduct }: { cartedProduct: CartItem }) => {
  const { styles, theme } = useStyles(_styles);
  const cartStore = useCartStore((v) => v);

  return (
    <MotiView
      from={{ opacity: 0, scale: 1 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      key={cartedProduct.id}
      exit={{ opacity: 0, scale: 0.8 }}
      style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: `${process.env.EXPO_PUBLIC_API_URL}/images/${cartedProduct.image}`,
          }}
          style={styles.image}
        />
      </View>

      <View style={styles.bodyContainer}>
        <View>
          <Text numberOfLines={1} style={styles.title}>
            {cartedProduct.title}
          </Text>
          <Text style={styles.desc} numberOfLines={2}>
            {cartedProduct.desciption}
          </Text>
        </View>

        <View style={styles.btnWrapper}>
          <Pressable
            onPress={() => cartStore.updateCart(cartedProduct, 'decrement')}
            style={styles.btn}>
            <Minus size={16} color={theme.colors.text} />
          </Pressable>

          <View>
            <Text>{cartedProduct.quantity}</Text>
          </View>

          <Pressable
            onPress={() => cartStore.updateCart(cartedProduct, 'increment')}
            style={styles.btn}>
            <Add size={16} color={theme.colors.text} />
          </Pressable>
        </View>
      </View>

      <View style={styles.priceColumn}>
        <Pressable onPress={() => cartStore.removeFromCart(cartedProduct)}>
          <Trash size={20} color={theme.colors.text} opacity={0.5} />
        </Pressable>

        <View>
          <Text style={{ fontFamily: theme.fontFamily[600] }}>
            {formatCurrency(cartedProduct.price * cartedProduct.quantity)}
          </Text>
        </View>
      </View>
    </MotiView>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'rgba(42, 42, 42, 0.1)',
    height: 140,
    flexDirection: 'row',
  },
  imageWrapper: {
    flex: 0.2,
    height: '100%',
  },
  image: {
    height: '80%',
    width: '80%',
    resizeMode: 'contain',
    margin: 'auto',
  },
  bodyContainer: {
    flex: 0.5,
    rowGap: 20,
    justifyContent: 'center',
    marginLeft: 4,
  },
  title: {
    fontSize: 14,
    color: theme.colors.text,
    fontFamily: theme.fontFamily[600],
  },
  desc: {
    fontSize: 12,
    color: theme.colors.text,
    fontFamily: theme.fontFamily[400],
  },
  btnWrapper: {
    flexDirection: 'row',
    gap: 20,
  },
  btn: {
    borderWidth: 1,
    height: 22,
    width: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.text,
  },
  priceColumn: {
    flex: 0.3,
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    paddingRight: 8,
  },
}));

export default CartedItem;
