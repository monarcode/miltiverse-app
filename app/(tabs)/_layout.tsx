import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
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
            header: () => <Header label="Product List" />,
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            header: () => <Header label="My Cart" />,
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
