import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { RadioButton } from 'react-native-radio-buttons-group';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Button, Text, View } from '~/components/shared';
import CustomMaskedInput from '~/components/shared/custom-masked-input';
import TextArea from '~/components/shared/text-area';
import useCheckoutStore from '~/store/checkout';

const AddressScreen = () => {
  const checkoutStore = useCheckoutStore((v) => v);
  const { styles, theme } = useStyles(_styles);
  const [selectedId, setSelectedId] = useState<string>('1');
  const [phoneOne, setPhoneOne] = useState<string>('');
  const [phoneTwo, setPhoneTwo] = useState<string>('');

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: theme.colors.background, paddingTop: 24 }}>
          <Text style={styles.title}>Select how to receive your package(s)</Text>

          <View style={{ marginTop: 24, marginBottom: 38, rowGap: 10 }}>
            <Text style={styles.pickup}>Pickup at</Text>
            <View style={{ marginLeft: -10 }}>
              <RadioButton
                id="1"
                label="Old Secretariat Complex, Area 1, Garki Abaji Abji"
                value="option1"
                selected={selectedId === '1'}
                onPress={() => setSelectedId('1')}
                borderColor={selectedId === '1' ? theme.colors.brand : 'rgba(42, 42, 42, 0.5)'}
                color={theme.colors.brand}
                size={20}
                labelStyle={styles.address}
              />
              <RadioButton
                id="2"
                label="Sokoto Street, Area 1, Garki Area 1 AMAC"
                value="option2"
                selected={selectedId === '2'}
                onPress={() => setSelectedId('2')}
                borderColor={selectedId === '2' ? theme.colors.brand : 'rgba(42, 42, 42, 0.5)'}
                color={theme.colors.brand}
                size={20}
                labelStyle={styles.address}
              />
            </View>
          </View>

          <View style={{ marginBottom: 34, rowGap: 10 }}>
            <Text style={styles.delivery}>Delivery</Text>
            <TextArea />
          </View>

          <View style={{ marginBottom: 100, rowGap: 10, width: '70%' }}>
            <Text style={styles.delivery}>Contact</Text>
            <CustomMaskedInput
              value={phoneOne}
              onChangeText={(v) => setPhoneOne(v)}
              mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
              placeholder="Phone nos 1"
            />
            <CustomMaskedInput
              value={phoneTwo}
              onChangeText={(v) => setPhoneTwo(v)}
              mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
              placeholder="Phone nos 2"
            />
          </View>

          <View style={{ paddingHorizontal: 24 }}>
            <Button onPress={() => checkoutStore.setStage('payment')}>Go to Payment</Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const _styles = createStyleSheet((theme) => ({
  title: {
    fontFamily: theme.fontFamily[500],
    fontSize: theme.fontSizes.md,
  },
  pickup: {
    fontFamily: theme.fontFamily[500],
    fontSize: theme.fontSizes.sm,
  },
  delivery: {
    fontFamily: theme.fontFamily[500],
    fontSize: theme.fontSizes.sm,
  },
  address: {
    color: 'rgba(42, 42, 42, 0.67)',
    fontFamily: theme.fontFamily[400],
    fontSize: 13,
  },
}));

export default AddressScreen;
