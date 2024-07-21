import { Image } from 'expo-image';
import { TruckTick } from 'iconsax-react-native';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text, View } from '~/components/shared';
import { formatCurrency } from '~/helpers/currencyFormat';
import useOrderHistoryStore, { OrderItem } from '~/store/order-history';

const OrderHistory = () => {
  const { theme, styles } = useStyles(_styles);
  const historyStore = useOrderHistoryStore((v) => v);
  const orders = historyStore.getAllItems();

  const renderItem = ({ item }: { item: OrderItem }) => (
    <View style={styles.order}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/images/${item.image}` }}
          style={styles.image}
        />
      </View>

      <View style={styles.body}>
        <View>
          <Text style={styles.title}>{item.name}</Text>
          <Text>
            {formatCurrency(item.price)} * {item.quantity}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <TruckTick size={16} color={theme.colors.brand} />
          <Text>Order Complete</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.container}>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderItem({ item })}
          contentContainerStyle={{ paddingBottom: 100, rowGap: theme.margins['3xl'] }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.margins['3xl'],
    paddingTop: theme.margins.lg,
  },
  order: {
    borderWidth: 1,
    height: 120,
    borderRadius: 8,
    borderColor: 'rgba(42, 42, 42, 0.2)',
    flexDirection: 'row',
    columnGap: theme.margins.sm,
    overflow: 'hidden',
  },
  imageWrapper: {
    flex: 0.2,
    height: '100%',
  },
  image: {
    height: '60%',
    aspectRatio: 1,
    resizeMode: 'contain',
    margin: 'auto',
  },
  body: { flex: 0.8, justifyContent: 'center', alignItems: 'flex-start', gap: 16 },
  title: {
    fontFamily: theme.fontFamily[600],
  },
}));

export default OrderHistory;
