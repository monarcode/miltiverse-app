import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text, View } from '~/components/shared';
import { formatCurrency } from '~/helpers/currencyFormat';
import { TProductCard } from '~/types/shared';

const ProductCard = ({ product }: { product: TProductCard }) => {
  const { styles } = useStyles(_styles);
  const router = useRouter();

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/product/[id]',
          params: { id: product?.id },
        })
      }
      style={styles.container}>
      <View style={styles.imageWrapper}>
        <Animated.Image
          sharedTransitionTag={`product-image-${product?.id}`}
          source={{
            uri: `${process.env.EXPO_PUBLIC_API_URL}/images/${product?.image}`,
          }}
          style={styles.image}
        />
      </View>

      <View style={styles.bodyContainer}>
        <Animated.Text sharedTransitionTag={`title-${product?.id}`} style={styles.title}>
          {product?.name}
        </Animated.Text>
        <Text style={styles.price}>{formatCurrency(product?.price)}</Text>
      </View>
    </Pressable>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {
    width: '100%',
    maxWidth: '47%',
    rowGap: theme.margins.sm,
  },
  imageWrapper: {
    backgroundColor: theme.colors.dark,
    width: '100%',
    height: 182,
    borderRadius: 24,
  },
  title: {
    color: 'white',
    fontSize: theme.fontSizes.md,
    fontFamily: 'Sora-Medium',
  },
  price: {
    color: '#fcfaf8',
    fontSize: theme.fontSizes.sm,
    fontFamily: 'Sora-Light',
  },
  bodyContainer: {
    paddingLeft: theme.margins.sm,
  },
  image: {
    width: '80%',
    height: '80%',
    objectFit: 'contain',
    margin: 'auto',
  },
}));

export default ProductCard;
