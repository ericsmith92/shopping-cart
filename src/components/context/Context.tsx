import * as React from "react";
import { Product } from "../../types";
import { getProducts } from "../../utils/getProducts";

interface ContextProps {
  children: React.ReactNode;
}

interface ContextType {
  state: { products: Product[]; cart: Product[] };
  addToCart: (product: Product) => void;
  removeFromCart: (item: Product) => void;
  totalItems: number
}

export const Cart = React.createContext<ContextType>({
  state: { products: [], cart: [] },
  addToCart: () => {},
  removeFromCart: () => {},
  totalItems: 0
});

const Context: React.FC<ContextProps> = (props) => {
  const { children } = props;
  const [products, setProducts] = React.useState<Product[]>([]);
  const [cart, setCart] = React.useState<Product[]>([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const isItemInCart = prev.find((item) => item.id === product.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === product.id && item.amount
            ? { ...item, amount: (item.amount += 1) }
            : item
        );
      }

      return [...prev, { ...product, amount: 1 }];
    });
  };

  const removeFromCart = (item: Product) => {
    if(item.amount && (item.amount - 1) > 0){
      setCart((prev) => {

      const updatedCartItems = prev.map((cartItem) => {
        if(cartItem.id === item.id && cartItem.amount){
          return { ...cartItem, amount: cartItem.amount -= 1}
        }else{
          return cartItem
        }
      })
      
      return updatedCartItems
    });
    }else{
      const remainingCartItems = cart.filter((cartItem) => cartItem.id !== item.id);

      setCart([...remainingCartItems]);
    }
  }

  const totalItems = cart.reduce<number>((acc, currentValue) => {
      acc += currentValue.amount ?? 0;
      return acc;
    }, 0);

    console.log({cart})

  return (
    <Cart.Provider
      value={{
        state: { products: products, cart: cart },
        addToCart,
        removeFromCart,
        totalItems
      }}
    >
      {children}
    </Cart.Provider>
  );
};

export default Context;

export const useCartContext = () => {
  const context = React.useContext(Cart);
  if (context === undefined) {
    throw new Error(`useCartContext must be used withing a CartContext`);
  }

  return context;
};
