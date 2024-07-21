import { Stack } from 'expo-router';

import PlainHeader from '~/components/navigation/plain-header';

const OrderHistoryLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <PlainHeader label="Order History" />,
        }}
      />
    </Stack>
  );
};
export default OrderHistoryLayout;
