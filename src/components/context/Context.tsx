import * as React from "react";
import { Product, Totals } from "../../types";
import { getProducts } from "../../utils/getProducts";

interface ContextProps {
  children: React.ReactNode;
}

interface ContextType {
  state: { products: Product[]; cart: Product[] };
  addToCart: (product: Product) => void;
  removeFromCart: (item: Product) => void;
  updateRating: (id: number, rating: number) => void;
  totalItems: number;
  grandTotal: number;
  productRatings: Record<number, number>;
  loading: boolean;
  error?: string;
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
  error: ``,
});

const Context: React.FC<ContextProps> = (props) => {
  const { children } = props;
  const [products, setProducts] = React.useState<Product[]>([]);
  const [cart, setCart] = React.useState<Product[]>([]);
  const [ratings, setRatings] = React.useState<Record<number, number>>({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(``);

  React.useEffect(() => {
    setLoading(true);

    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (e) {
        setError(`Error getting products, please refresh and try again.`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  React.useEffect(() => {
    const initialRatings = products.reduce<Record<number, number>>(
      (acc, currentValue) => {
        acc[currentValue.id] = 0;
        return acc;
      },
      {}
    );

    setRatings(initialRatings);
  }, [products]);

  const addToCart = (product: Product) => {
    if (product.rating.count - 1 >= 0) {
      setCart((prev) => {
        const isItemInCart = prev.find((item) => item.id === product.id);

        if (isItemInCart) {
          return prev.map((item) =>
            item.id === product.id && item.amount
              ? {
                  ...item,
                  amount: (item.amount += 1),
                  rating: {
                    rate: item.rating.rate,
                    count: (item.rating.count -= 1),
                  },
                }
              : item
          );
        }

        return [
          ...prev,
          {
            ...product,
            amount: 1,
            rating: {
              rate: product.rating.rate,
              count: (product.rating.count -= 1),
            },
          },
        ];
      });
    }
  };

  const removeFromCart = (product: Product) => {
    if (product.amount && product.amount - 1 > 0) {
      setCart((prev) => {
        const updatedCartItems = prev.map((cartItem) => {
          if (cartItem.id === product.id && cartItem.amount) {
            return {
              ...cartItem,
              amount: (cartItem.amount -= 1),
              rating: {
                rate: product.rating.rate,
                count: (product.rating.count += 1),
              },
            };
          } else {
            return cartItem;
          }
        });

        return updatedCartItems;
      });
    } else {
      const remainingCartItems = cart.filter(
        (cartItem) => cartItem.id !== product.id
      );

      setCart([...remainingCartItems]);
    }
  };

  const updateRating = (id: number, rating: number) => {
    const updatedRating = { [id]: rating };

    setRatings((prev) => ({
      ...prev,
      ...updatedRating,
    }));
  };

  const totals = cart.reduce<Totals>(
    (acc, currentValue) => {
      const currentAmount = currentValue.amount ?? 0;
      acc.totalItems += currentAmount;
      acc.grandTotal += currentAmount * currentValue.price;
      return acc;
    },
    { totalItems: 0, grandTotal: 0 }
  );

  const { totalItems, grandTotal } = totals;

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
        loading,
        error,
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
