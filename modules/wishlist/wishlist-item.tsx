import { Image } from 'expo-image';
import { Heart } from 'iconsax-react-native';
import { MotiView } from 'moti';
import { Pressable } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text, View } from '~/components/shared';
import { formatCurrency } from '~/helpers/currencyFormat';
import useCartStore from '~/store/cart.store';
import useWishlistStore from '~/store/wishlist.store';
import { TProductCardProps } from '~/types/shared';

const WishlistItem = ({ product }: { product: TProductCardProps }) => {
  const { styles, theme } = useStyles(_styles);
  const cartStore = useCartStore((v) => v);
  const wishListStore = useWishlistStore((v) => v);

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
    <MotiView key={product.id} style={styles.constianer}>
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: `${process.env.EXPO_PUBLIC_API_URL}/images/${product?.image}`,
          }}
          style={styles.image}
          contentFit="scale-down"
        />

        <Pressable onPress={() => wishListStore.toggleItem(product)} style={styles.wishlist}>
          <Heart
            variant={wishListStore.isInWishlist(product.id) ? 'Bold' : 'Outline'}
            size={24}
            color={
              wishListStore.isInWishlist(product.id) ? theme.colors.brand : 'rgba(42, 42, 42, 0.3)'
            }
          />
        </Pressable>
      </View>

      <View style={{ marginTop: 8, rowGap: theme.margins.sm }}>
        <View>
          <Text numberOfLines={1} style={styles.title}>
            {product.title}
          </Text>
          <Text numberOfLines={1} style={styles.desc}>
            {product.description}
          </Text>
        </View>

        <Text style={styles.price}>{formatCurrency(product.price)}</Text>

        <Pressable onPress={onCartClick} style={styles.action}>
          <Text style={styles.label}>
            {cartStore.isItemInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
          </Text>
        </Pressable>
      </View>
    </MotiView>
  );
};

const _styles = createStyleSheet((theme) => ({
  constianer: {
    width: '100%',
    maxWidth: '47%',
  },
  imageWrapper: {
    backgroundColor: theme.colors.gray,
    height: 210,
    borderRadius: 8,
  },
  image: {
    width: '80%',
    aspectRatio: 1,
    margin: 'auto',
  },
  title: {
    fontFamily: theme.fontFamily[600],
  },
  desc: {
    fontFamily: theme.fontFamily[400],
    fontSize: theme.fontSizes.sm,
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
  wishlist: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: theme.margins.lg,
  },
}));

export default WishlistItem;
