import { router, useLocalSearchParams } from 'expo-router';
import { Skeleton } from 'moti/skeleton';
import { useState } from 'react';
import { ActivityIndicator, Pressable, RefreshControl, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

import BackIcon from '~/assets/icons/arrow-left.svg';
import HeartIcon from '~/assets/icons/favourite.svg';
import { Button, Text, View } from '~/components/shared';
import { formatCurrency } from '~/helpers/currencyFormat';
import { useProductDetails } from '~/hooks/products/details';

const insets = UnistylesRuntime.insets;
const colors = ['#353535', '#444'];

const ViewProduct = () => {
  const { id } = useLocalSearchParams();
  const { data, loadingProduct, refetch } = useProductDetails(id);
  const [refreshing, setRefreshing] = useState(false);

  const { styles, theme } = useStyles(_styles);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="white" />
      }
      style={{ backgroundColor: theme.colors.background }}>
      <View style={[styles.container]}>
        <View style={styles.controls}>
          <Pressable onPress={router.back}>
            <BackIcon />
          </Pressable>

          <Pressable>
            <HeartIcon />
          </Pressable>
        </View>

        {/* product image */}
        <View style={styles.imageContainer}>
          {loadingProduct ? (
            <ActivityIndicator />
          ) : (
            <Animated.Image
              source={{
                uri: `https://api.timbu.cloud/images/${data?.photos[0].url}`,
              }}
              sharedTransitionTag={`product-image-${data?.id}`}
              style={styles.image}
            />
          )}
        </View>

        {/* detals body */}
        <View style={styles.body}>
          {loadingProduct ? (
            <View style={styles.description}>
              <Skeleton width={120} height={20} colors={colors} radius="square" />
            </View>
          ) : (
            <Text style={styles.title}>{data?.name}</Text>
          )}

          {loadingProduct ? (
            <View style={styles.description}>
              <Skeleton width={300} height={60} colors={colors} radius="square" />
            </View>
          ) : (
            <Text style={styles.description}>{data?.description}</Text>
          )}

          <View style={styles.meta}>
            <Text>Availabale in:</Text>

            <View style={styles.metaContainer}>
              <View style={[styles.metaItem, { backgroundColor: '#FF9500' }]} />
              <View style={[styles.metaItem, { backgroundColor: '#5AC8FA' }]} />
              <View style={[styles.metaItem, { backgroundColor: '#D5C7AF' }]} />
            </View>
          </View>

          {/* footer */}
          <View style={styles.footer}>
            <View>
              <Text style={styles.label}>Price per unit</Text>
              <Text style={styles.price}>{formatCurrency(data?.current_price ?? 0)}</Text>
            </View>

            <Button>Add to trolley</Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: 'rgba(26, 26, 26, 0.376)',
  },
  title: {
    fontSize: theme.fontSizes.xl,
    color: theme.colors.white,
    fontFamily: 'Sora-Medium',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    paddingHorizontal: theme.margins['3xl'],
    paddingTop: insets.top + theme.margins.lg,
    width: '100%',
    zIndex: 5,
  },
  imageContainer: {
    height: '40%',
    zIndex: 1,
  },
  image: {
    margin: 'auto',
    width: '80%',
    height: '80%',
    objectFit: 'contain',
  },
  body: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    padding: theme.margins['3xl'],
  },
  description: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.light,
    fontFamily: 'Sora-Light',
    marginTop: theme.margins.md,
    lineHeight: 16,
  },
  meta: {
    marginTop: theme.margins.xl,
    flexDirection: 'row',
    gap: theme.margins.xl,
  },
  metaContainer: {
    flexDirection: 'row',
    gap: theme.margins.md,
    alignItems: 'center',
  },
  metaItem: {
    width: theme.margins.xl,
    height: theme.margins.xl,
    borderRadius: 400,
    backgroundColor: 'red',
  },
  footer: {
    marginTop: 'auto',
    marginBottom: theme.margins.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.margins.md,
  },
  label: {
    fontSize: theme.fontSizes.sm,
    fontFamily: 'Sora-Light',
    color: '#A9AFB6',
  },
  price: {
    fontSize: theme.fontSizes.xl,
    fontFamily: 'Sora-Regular',
    color: theme.colors.white,
  },
}));

export default ViewProduct;
