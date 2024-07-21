import { FlatList } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { View } from '~/components/shared';
import WishlistItem from '~/modules/wishlist/wishlist-item';
import useWishlistStore from '~/store/wishlist.store';

const WishList = () => {
  const { styles, theme } = useStyles(_styles);
  const wishListStore = useWishlistStore((v) => v);
  const wishlistItems = wishListStore.items;

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <FlatList
        style={{ flex: 1, backgroundColor: theme.colors.background }}
        data={wishlistItems}
        numColumns={2}
        renderItem={({ item }) => (
          <WishlistItem
            product={{
              description: item.description || '',
              id: item.id,
              image: item.image,
              price: Number(item.price) || 0,
              title: item.title,
            }}
          />
        )}
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.columnWrapper}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {
    paddingHorizontal: theme.margins['3xl'],
    backgroundColor: theme.colors.background,
    rowGap: theme.margins['4xl'],
    paddingBottom: 52,
    paddingTop: theme.margins.xl,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
}));

export default WishList;
