import CartContent from '~/modules/cart/components/cart-content';
import EmptyCart from '~/modules/cart/components/empty-cart';
import useCartStore from '~/store/cart.store';

const Favorites = () => {
  const cartStore = useCartStore((store) => store);
  const cartCount = cartStore.getCartItemCount();

  return cartCount > 0 ? <CartContent /> : <EmptyCart />;
};
export default Favorites;
