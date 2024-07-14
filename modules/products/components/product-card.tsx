import { Image } from 'expo-image';
import { Pressable } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import StarRating from '~/assets/icons/stars.svg';
import { Text, View } from '~/components/shared';
import { formatCurrency } from '~/helpers/currencyFormat';
import useCartStore from '~/store/cart.store';
import { TProductCardProps } from '~/types/shared';

const ProductCard = ({ product }: { product: TProductCardProps }) => {
  const { styles } = useStyles(_styles);
  const cartStore = useCartStore((v) => v);

  const onCartClick = () => {
    if (cartStore.isItemInCart(product.id)) {
      cartStore.removeFromCart({
        quantity: 1,
        desciption: product.description,
        id: product.id,
        price: product.price,
        title: product.title,
        image: product.image,
      });
    } else {
      cartStore.addToCart({
        quantity: 1,
        desciption: product.description,
        id: product.id,
        price: product.price,
        title: product.title,
        image: product.image,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: `${process.env.EXPO_PUBLIC_API_URL}/images/${product?.image}`,
          }}
          style={styles.image}
          contentFit="scale-down"
        />
      </View>

      <View style={styles.body}>
        <Text numberOfLines={1} style={styles.title}>
          {product.title}
        </Text>
        <Text numberOfLines={1} style={styles.desc}>
          {product.description}
        </Text>

        <View>
          <StarRating />
        </View>

        <Text style={styles.price}>{formatCurrency(product.price)}</Text>

        <Pressable onPress={onCartClick} style={styles.action}>
          <Text style={styles.label}>
            {cartStore.isItemInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    rowGap: theme.margins.lg,
  },
  imageWrapper: {
    backgroundColor: theme.colors.gray,
    height: 190,
    borderRadius: 8,
  },
  image: {
    width: '80%',
    height: '80%',
    margin: 'auto',
    flex: 1,
  },
  body: {
    rowGap: theme.margins.sm,
  },
  title: {
    color: theme.colors.text,
    fontSize: 12,
    fontFamily: theme.fontFamily[600],
  },
  desc: {
    color: theme.colors.text,
    fontSize: 12,
    fontFamily: theme.fontFamily[400],
  },
  price: {
    color: theme.colors.brand,
    fontSize: 13,
    fontFamily: theme.fontFamily[500],
    marginVertical: theme.margins.md,
  },
  action: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.brand,
    paddingHorizontal: theme.margins.lg,
    paddingVertical: theme.margins.lg,
    alignSelf: 'flex-start',
  },
  label: {
    color: theme.colors.text,
    fontSize: 12,
    fontFamily: theme.fontFamily[500],
  },
}));

export default ProductCard;
