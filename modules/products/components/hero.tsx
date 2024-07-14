import { ImageBackground } from 'expo-image';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text, View } from '~/components/shared';

const ProductsHero = () => {
  const { styles } = useStyles(_styles);

  return (
    <ImageBackground
      source={require('~/assets/images/hero-bg.jpg')}
      contentFit="cover"
      contentPosition="center"
      style={styles.container}>
      <View>
        <Text style={styles.title}>Premium Sound</Text>
        <Text style={styles.title}>Premium Savings</Text>
      </View>

      <Text style={styles.label}>Limited offer, hope on and get yours now</Text>
    </ImageBackground>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {
    height: 230,
    borderRadius: 10,
    backgroundColor: '#B2B2B2',
    position: 'relative',
    overflow: 'hidden',
    paddingHorizontal: theme.margins['3xl'],
    justifyContent: 'center',
    gap: theme.margins.md,
  },
  title: {
    fontSize: theme.fontSizes.xl,
    fontFamily: theme.fontFamily[600],
    color: theme.colors.light,
  },
  label: {
    fontSize: 12,
    color: theme.colors.light,
  },
}));

export default ProductsHero;
