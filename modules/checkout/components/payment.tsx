import { ArrowLeft } from 'iconsax-react-native';
import { useState } from 'react';
import { ActivityIndicator, Keyboard, Pressable, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import CardPreview from './cardPreview';

import { Button, Text, View } from '~/components/shared';
import CustomMaskedInput from '~/components/shared/custom-masked-input';
import { validateMonthYear } from '~/helpers/validateDate';
import useCheckoutStore from '~/store/checkout';

const PaymentScreen = () => {
  const { styles, theme } = useStyles(_styles);
  const changeStage = useCheckoutStore((v) => v.setStage);
  const [loading, setLoading] = useState<boolean>(false);
  const topInset = useSafeAreaInsets().top;
  const cardDetails = useCheckoutStore((v) => v.cardDetails);
  const updateCardDetails = useCheckoutStore((v) => v.updateCardDetails);

  const onPress = async () => {
    if (!cardDetails) return;
    if (!cardDetails.cardNumber) return;
    if (!cardDetails.cardExpiry) return;
    if (!cardDetails.cardCvv) return;
    if (
      cardDetails.cardNumber?.length < 19 ||
      cardDetails.cardExpiry?.length < 5 ||
      cardDetails.cardCvv?.length < 3
    ) {
      return;
    }

    if (!validateMonthYear(cardDetails.cardExpiry)) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 3000));
    changeStage('success');
    setLoading(false);
    changeStage('success');
  };

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, rowGap: 24, paddingTop: topInset }}>
        <Pressable onPress={() => changeStage('address')}>
          <View style={{ flexDirection: 'row', columnGap: 20, alignItems: 'center' }}>
            <ArrowLeft color="#333" />
            <Text style={styles.label}>PaymentScreen</Text>
          </View>
        </Pressable>

        <CardPreview />

        <View style={{ rowGap: 24 }}>
          <View style={{ rowGap: 8 }}>
            <Text style={styles.inputLabel}>Card Number</Text>
            <CustomMaskedInput
              placeholder="0000 0000 0000 0000"
              value={cardDetails.cardNumber}
              onChangeText={(v) => updateCardDetails({ cardNumber: v })}
              mask={[
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                ' ',
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                ' ',
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                ' ',
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
            />
          </View>
          <View style={{ flexDirection: 'row', gap: 20 }}>
            <View style={{ flex: 1, rowGap: 8 }}>
              <Text style={styles.inputLabel}>Expiry Date</Text>
              <CustomMaskedInput
                placeholder="MM/YY"
                value={cardDetails.cardExpiry}
                onChangeText={(v) => updateCardDetails({ cardExpiry: v })}
                mask={[/\d/, /\d/, '/', /\d/, /\d/]}
              />
            </View>
            <View style={{ flex: 1, rowGap: 8 }}>
              <Text style={styles.inputLabel}>CVV</Text>
              <CustomMaskedInput
                placeholder="123"
                value={cardDetails.cardCvv}
                onChangeText={(v) => updateCardDetails({ cardCvv: v })}
                mask={[/\d/, /\d/, /\d/]}
              />
            </View>
          </View>
          <View style={{ paddingHorizontal: 20, marginTop: 70 }}>
            <Button onPress={onPress}>
              {loading ? <ActivityIndicator color={theme.colors.white} /> : 'Make Payment'}
            </Button>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
  },
  label: {
    fontSize: theme.fontSizes.lg,
    fontFamily: theme.fontFamily[600],
  },
  cardWrapper: {
    backgroundColor: '#333',
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
  },
  inputLabel: {
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fontFamily[500],
    color: theme.colors.text,
  },
}));

export default PaymentScreen;
