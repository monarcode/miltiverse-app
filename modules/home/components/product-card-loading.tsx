import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { View } from '~/components/shared';

const colors = ['rgba(237, 237, 237, 0.67)', 'rgba(237, 237, 237, 0.8)'];

const ProductCardLoading = () => {
  const { styles } = useStyles(_styles);

  return (
    <MotiView
      transition={{
        type: 'timing',
      }}
      style={styles.container}
      animate={{ backgroundColor: 'transparent' }}>
      <View
        style={{
          overflow: 'hidden',
          borderRadius: 8,
          backgroundColor: 'transparent',
        }}>
        <Skeleton colorMode="dark" colors={colors} radius="square" height={190} width="100%" />
      </View>

      <View style={styles.bodyContainer}>
        <Skeleton colorMode="dark" radius="round" colors={colors} height={20} width={80} />
        <Skeleton colorMode="dark" radius="round" colors={colors} height={20} width={130} />
      </View>
    </MotiView>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {
    width: '100%',
    maxWidth: '47%',
    rowGap: theme.margins.md,
  },
  bodyContainer: {
    rowGap: theme.margins.sm,
  },
}));

export default ProductCardLoading;
