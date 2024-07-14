import { AnimatePresence, View as MView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text, View } from '~/components/shared';
import { useProducts } from '~/hooks/multiverse-products.ts/all-products';
import ProductCardLoading from '~/modules/home/components/product-card-loading';
import ProductsHero from '~/modules/products/components/hero';
import ProductsSlider from '~/modules/products/components/slider';

const colors = ['rgba(237, 237, 237, 0.67)', 'rgba(237, 237, 237, 0.8)'];

export default function Home() {
  const { theme, styles } = useStyles(_styles);
  const bottom = useSafeAreaInsets().bottom;
  const { techgagdets, mensfashion, womensfashion, isLoading, refetch } = useProducts();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        style={{
          flex: 1,
          paddingTop: 0,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.brand}
          />
        }
        contentContainerStyle={{
          paddingBottom: bottom + 120,
        }}>
        <View style={{ marginTop: theme.margins.lg, paddingHorizontal: theme.margins['3xl'] }}>
          <ProductsHero />
        </View>

        <AnimatePresence exitBeforeEnter>
          {isLoading && (
            <MView
              key="loading"
              from={{ opacity: 0, translateY: 100, scale: 0.9 }}
              animate={{
                opacity: 1,
                translateY: 0,
                scale: 1,
              }}
              exit={{ opacity: 0 }}
              style={{ paddingHorizontal: 24, marginTop: 50, rowGap: 20 }}>
              <Skeleton colorMode="dark" radius="round" colors={colors} height={20} width={130} />
              <View
                style={{
                  flexDirection: 'row',
                  columnGap: 20,
                }}>
                {Array.from({ length: 2 }).map((_, i) => (
                  <ProductCardLoading key={i} />
                ))}
              </View>
            </MView>
          )}
          {!isLoading && (
            <MView
              key="products"
              from={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{ opacity: 0, translateY: 100 }}
              style={{ flex: 1 }}>
              <View
                style={[
                  styles.section,
                  {
                    marginTop: 32,
                  },
                ]}>
                <Text style={styles.sectionLabel}>Tech Gagdet</Text>
                <ProductsSlider products={techgagdets} />
              </View>

              {mensfashion?.length !== 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionLabel}>Men's Fashion</Text>
                  <ProductsSlider products={mensfashion} />
                </View>
              )}

              {womensfashion?.length !== 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionLabel}>Women's Fashion</Text>
                  <ProductsSlider products={womensfashion} />
                </View>
              )}
            </MView>
          )}
        </AnimatePresence>
      </ScrollView>
    </View>
  );
}

const _styles = createStyleSheet((theme) => ({
  section: { marginVertical: 30, rowGap: theme.margins.xl },
  sectionLabel: {
    fontSize: theme.fontSizes.xl,
    fontFamily: theme.fontFamily[600],
    paddingHorizontal: theme.fontSizes['2xl'],
  },
}));
