import { useStyles } from 'react-native-unistyles';

import { View } from '~/components/shared';
import AddressScreen from '~/modules/checkout/components/address';
import PaymentScreen from '~/modules/checkout/components/payment';
import SuccessScreen from '~/modules/checkout/components/success';
import useCheckoutStore from '~/store/checkout';

const Trolley = () => {
  const { theme } = useStyles();
  const stage = useCheckoutStore((v) => v.stage);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, paddingHorizontal: 24 }}>
      {stage === 'address' && <AddressScreen />}
      {stage === 'payment' && <PaymentScreen />}
      {stage === 'success' && <SuccessScreen />}
    </View>
  );
};
export default Trolley;
