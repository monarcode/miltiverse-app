import { Stack } from 'expo-router';

import PlainHeader from '~/components/navigation/plain-header';

const WishlistLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <PlainHeader label="Wishlist" />,
        }}
      />
    </Stack>
  );
};
export default WishlistLayout;
