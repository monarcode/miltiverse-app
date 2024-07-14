import { View } from '../shared';

import CartActive from '~/assets/icons/active/Favorites.svg';
import HomeActive from '~/assets/icons/active/Home.svg';
import CheckoutActive from '~/assets/icons/active/Trolley.svg';
import CartInactive from '~/assets/icons/inactive/Favorites.svg';
import HomeInactive from '~/assets/icons/inactive/Home.svg';
import CheckoutInactive from '~/assets/icons/inactive/Trolley.svg';

const TabIcon = ({ route, isFocused }: Props) => {
  const renderIcon = (route: string, isFocused: boolean) => {
    const height: number = 24;
    const width: number = 24;

    switch (route) {
      case 'index':
        return isFocused ? (
          <HomeActive width={20} height={20} />
        ) : (
          <HomeInactive width={width} height={height} />
        );
      case 'checkout':
      case 'checkout-address':
        return isFocused ? (
          <CheckoutActive width={26} height={26} />
        ) : (
          <CheckoutInactive width={30} height={30} />
        );
      case 'cart':
        return isFocused ? (
          <CartActive width={20} height={20} />
        ) : (
          <CartInactive width={width} height={height} />
        );
      default:
        break;
    }
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
      }}>
      {renderIcon(route, isFocused)}
    </View>
  );
};
export default TabIcon;

interface Props {
  route: string;
  isFocused: boolean;
}
