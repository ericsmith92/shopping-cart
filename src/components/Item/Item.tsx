import * as React from "react";
import { Product } from "../../types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useCartContext } from "../context/Context";
import ItemQuantityToggle from "./ItemQuantityToggle";

interface ItemProps {
  item: Product;
}

const Item: React.FC<ItemProps> = (props) => {
  const { item } = props;

  const {
    addToCart,
    state: { cart },
  } = useCartContext();

  const cartItem = cart?.find((product) => product.id === item.id);

  const isItemInCart = !!cartItem;

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardMedia
        component="img"
        height="194"
        image={item?.image}
        alt={item?.title}
      />
      <CardContent>
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {item?.title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ${item?.price.toFixed(2)}
          </Typography>
        </Box>
        {!isItemInCart ? (
          <Button fullWidth variant="contained" onClick={() => addToCart(item)}>
            Add to Cart
          </Button>
        ) : (
          <ItemQuantityToggle item={cartItem} />
        )}
      </CardContent>
    </Card>
  );
};

export default Item;
