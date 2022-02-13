import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useCartContext } from "../context/Context";
import { Product } from "../../types";
import Typography from "@mui/material/Typography";

export interface ItemProps {
  item: Product;
}

const ItemQuantityToggle: React.FC<ItemProps> = (props) => {
  const { item } = props;

  const {
    addToCart,
    removeFromCart,
    state: { cart },
  } = useCartContext();

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button variant="contained" onClick={() => removeFromCart(item?.id)}>
          {" "}
          -{" "}
        </Button>
        <Box mx={3}>{item?.amount}</Box>
        <Button variant="contained" onClick={() => addToCart(item)}>
          {" "}
          +{" "}
        </Button>
      </Box>
      <Box mt={1} display="flex" alignItems="center" justifyContent="center">
        <Typography>
          Total: ${((item?.amount ?? 0) * item?.price).toFixed(2)}
        </Typography>
      </Box>
    </>
  );
};

export default ItemQuantityToggle;
