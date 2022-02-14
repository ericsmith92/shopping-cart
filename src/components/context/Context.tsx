import * as React from "react";
import { Product, Totals  } from "../../types";
import { getProducts } from "../../utils/getProducts";

interface ContextProps {
  children: React.ReactNode;
}

interface ContextType {
  state: { products: Product[]; cart: Product[] };
  addToCart: (product: Product) => void;
  removeFromCart: (item: Product) => void;
  updateRating: (id: number, rating: number) => void
  totalItems: number;
  grandTotal: number;
  productRatings: Record<number, number>;
  loading: boolean
}

export const Cart = React.createContext<ContextType>({
  state: { products: [], cart: [] },
  addToCart: () => {},
  removeFromCart: () => {},
  updateRating: () => {},
  totalItems: 0,
  grandTotal: 0,
  productRatings: {},
  loading: false,
});

const Context: React.FC<ContextProps> = (props) => {
  const { children } = props;
  const [products, setProducts] = React.useState<Product[]>([]);
  const [cart, setCart] = React.useState<Product[]>([]);
  const [ratings, setRatings] = React.useState<Record<number, number>>({})
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setLoading(false)
    };

    fetchProducts();
  }, []);

   React.useEffect(() => {
    const initialRatings = products.reduce<Record<number, number>>((acc, currentValue) => {
      acc[currentValue.id] = 0
      return acc
    }, {})

   setRatings(initialRatings)
  }, [products]);

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

  const updateRating = (id: number, rating: number) => {
    const updatedRating = { [id]: rating}

    console.log(updatedRating)
    setRatings((prev) => ({
      ...prev,
      ...updatedRating
    }))
  }

  const totals = cart.reduce<Totals>((acc, currentValue) => {
      const currentAmount = currentValue.amount ?? 0
      acc.totalItems += currentAmount;
      acc.grandTotal += currentAmount * currentValue.price
      return acc;
  }, {totalItems: 0, grandTotal: 0})

  const { totalItems, grandTotal } = totals

  return (
    <Cart.Provider
      value={{
        state: { products: products, cart: cart },
        addToCart,
        removeFromCart,
        updateRating,
        totalItems,
        grandTotal,
        productRatings: ratings,
        loading
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
