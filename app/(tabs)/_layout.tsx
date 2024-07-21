import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Link, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import CustomBottomNavigation from '~/components/navigation/bottom-navigation';
import Header from '~/components/navigation/header';
import useCheckoutStore from '~/store/checkout';

const CustomBottomTabs = (props: BottomTabBarProps) => {
  return <CustomBottomNavigation {...props} />;
};

export default function TabLayout() {
  const checkoutStage = useCheckoutStore((v) => v.stage);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'black',
        }}
        tabBar={CustomBottomTabs}>
        <Tabs.Screen
          name="index"
          options={{
            header: () => (
              <Header label="Product List" link={<Link href="/wishlist">Wishlist</Link>} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            header: () => (
              <Header label="My Cart" link={<Link href="/order-history">History</Link>} />
            ),
          }}
        />
        <Tabs.Screen
          name="checkout"
          options={{
            header: () =>
              ['address', 'success'].includes(checkoutStage) ? <Header label="Checkout" /> : <></>,
          }}
        />
      </Tabs>
      <StatusBar style="dark" />
    </>
  );
}
