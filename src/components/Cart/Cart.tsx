import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useCartContext } from "../context/Context";
import Item from "../Item/Item";

interface CartProps {
  open: boolean;
  closeCart: () => void;
}

const Cart: React.FC<CartProps> = (props) => {
  const { open, closeCart } = props;

  const {
    state: { cart },
    grandTotal,
  } = useCartContext();

  const hasCartItems = !!cart?.length;

  const cartRef = React.useRef<HTMLDivElement>(null);

  return (
    <Drawer anchor="right" open={open} onClose={() => closeCart()}>
      <Box p={2} ref={cartRef} minWidth={`${cartRef?.current?.offsetWidth}px`}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Cart
        </Typography>
        {hasCartItems ? (
          <>
            {cart.map((item, idx) => (
              <Box key={`${item.id}_${idx}`} mb={2}>
                <Item item={item} isNestedInCart />
              </Box>
            ))}
            <Box mt={3} display="flex" justifyContent="center">
              <Typography>Grand Total: ${grandTotal.toFixed(2)}</Typography>
            </Box>
          </>
        ) : (
          <Typography align="center">No Items in Cart</Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default Cart;
