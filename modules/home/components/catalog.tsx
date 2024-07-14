import { RefreshControl, ScrollView } from 'react-native';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

import ProductCard from './product-card';
import ProductCardLoading from './product-card-loading';

import { Text, View } from '~/components/shared';
import { useAllProducts } from '~/hooks/products/all-products';

const bottom = UnistylesRuntime.insets.bottom;

const Catalog = () => {
  const { styles } = useStyles(_styles);
  const { loadingProducts, productsCatalog, refetch } = useAllProducts();

  return (
    <View style={styles.catalogueContainer}>
      <Text style={styles.title}>Catalog</Text>

      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.inner}
        refreshControl={
          <RefreshControl refreshing={loadingProducts} onRefresh={refetch} tintColor="white" />
        }
        contentInset={{ bottom: 10 }}>
        {loadingProducts ? (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <ProductCardLoading key={i} />
            ))}
          </>
        ) : !loadingProducts && productsCatalog.length > 0 ? (
          <>
            {productsCatalog.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  price: parseFloat(product.current_price[0].NGN[0]?.toString() ?? ''),
                  image: product.photos[0].url,
                }}
              />
            ))}
          </>
        ) : null}
      </ScrollView>
    </View>
  );
};

const _styles = createStyleSheet((theme) => ({
  title: {
    fontSize: 24,
    color: theme.colors.white,
    fontFamily: theme.fontFamily['Sora-Regular'],
  },
  catalogueContainer: {
    flex: 1,
    marginBottom: bottom + 70,
    paddingBottom: 10,
    paddingHorizontal: 20,
    rowGap: theme.margins.md,
  },
  inner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: theme.margins['3xl'],
  },
}));

export default Catalog;
