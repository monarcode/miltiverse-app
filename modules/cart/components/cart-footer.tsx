import { router } from 'expo-router';
import { useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Button, Text, View } from '~/components/shared';
import TextInput from '~/components/shared/input';
import { formatCurrency } from '~/helpers/currencyFormat';
import useCartStore from '~/store/cart.store';

const deliveryFee = 1500;
const discountAmount = 3500;

const CartFooter = () => {
  const { styles, theme } = useStyles(_styles);
  const cartStore = useCartStore((v) => v);
  const [code, setcode] = useState<string>('');
  const [showDiscount, setShowDiscount] = useState<boolean>(false);

  const handleSUbmit = () => {
    if (code.length >= 6) {
      setShowDiscount(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Summary</Text>

      <View style={{ marginVertical: theme.margins.xl, rowGap: theme.margins.md }}>
        <Text style={styles.discount}>Discount Code</Text>

        <View style={styles.discountContainer}>
          <TextInput
            value={code}
            onChangeText={setcode}
            style={{ flex: 1, width: '100%' }}
            onSubmitEditing={handleSUbmit}
            returnKeyType="done"
          />
          <Button onPress={handleSUbmit}>Apply</Button>
        </View>
      </View>

      <View style={{ marginBottom: theme.margins['3xl'], rowGap: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.costLabel}>Sub-Total</Text>
          <Text style={styles.costValue}>{formatCurrency(cartStore.getCartTotalCost())}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.costLabel}>Deliery Fee</Text>
          <Text style={styles.costValue}>{formatCurrency(deliveryFee)}</Text>
        </View>
        {showDiscount && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.costLabel}>Discount Amount</Text>
            <Text style={styles.costValue}>{formatCurrency(discountAmount)}</Text>
          </View>
        )}

        <View style={styles.dashedLine} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.costLabel}>Total Amount</Text>
          <Text style={styles.costValue}>
            {formatCurrency(cartStore.getCartTotalCost() + deliveryFee - discountAmount)}
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <Button onPress={() => router.push('/checkout')} style={{ flex: 0.8 }}>
          Checkout
        </Button>
      </View>
    </View>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {
    minHeight: 100,
    backgroundColor: theme.colors.gray,
    borderRadius: 8,
    padding: theme.margins.xl,
  },
  title: {
    fontSize: theme.fontSizes.xl,
    fontFamily: theme.fontFamily[600],
  },
  discount: {
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fontFamily[500],
    color: 'rgba(42, 42, 42, 0.64)',
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 34,
  },
  costLabel: {
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fontFamily[400],
    color: 'rgba(42, 42, 42, 0.8)',
  },
  costValue: {
    fontFamily: theme.fontFamily[500],
  },
  dashedLine: {
    borderBottomWidth: 1,
    borderColor: 'rgba(42, 42, 42, 0.2)',
    marginTop: theme.margins.xl,
    marginBottom: theme.margins.xl,
    borderStyle: 'dashed',
  },
}));

export default CartFooter;
