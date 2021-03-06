import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Product } from "../../types";
import { useCartContext } from "../context/Context";

export interface ItemProps {
  item: Product;
}

const ItemQuantityToggle: React.FC<ItemProps> = (props) => {
  const { item } = props;

  const { addToCart, removeFromCart } = useCartContext();

  const itemIsOutOfStock = !item.rating.count;

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button
          color="error"
          variant="contained"
          onClick={() => removeFromCart(item)}
        >
          {" "}
          -{" "}
        </Button>
        <Box mx={3}>{item?.amount}</Box>
        <Button
          color="success"
          variant="contained"
          onClick={() => addToCart(item)}
          disabled={itemIsOutOfStock}
        >
          {" "}
          +{" "}
        </Button>
      </Box>
      <Box mt={1} display="flex" justifyContent="center">
        <Typography>
          Total: ${((item?.amount ?? 0) * item?.price).toFixed(2)}
        </Typography>
      </Box>
    </>
  );
};

export default ItemQuantityToggle;
