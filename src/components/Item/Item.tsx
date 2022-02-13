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
import ItemBadge from "./ItemBadge";
import styled from "@emotion/styled"

interface ItemProps {
  item: Product;
}

const StyledCart = styled(Card)`
  position: relative;
  overflow: visible;

  & .badge{
      position: absolute;
      top: -20px;
      left: -15px;
      z-index: 1;
  }
`

const Item: React.FC<ItemProps> = (props) => {
  const { item } = props;

  const {
    addToCart,
    state: { cart },
  } = useCartContext();

  const cartItem = cart?.find((product) => product.id === item.id);

  const isItemInCart = !!cartItem;

  return (
    <StyledCart sx={{ minWidth: 275 }}>
      {isItemInCart && <ItemBadge amount={cartItem?.amount ?? 0} />}
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
    </StyledCart>
  );
};

export default Item;
