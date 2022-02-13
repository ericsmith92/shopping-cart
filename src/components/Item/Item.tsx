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
import {clipTitle} from "../../utils/clipTitle"
import Rating from "../Rating/Rating"

interface ItemProps {
  item: Product;
  isNestedInCart?: boolean
}

const StyledCartItem = styled(Card)`
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
  const { item, isNestedInCart = false } = props;

  const {
    addToCart,
    state: { cart },
    productRatings,
  } = useCartContext();

  const cartItem = cart?.find((product) => product.id === item.id);

  const isItemInCart = !!cartItem;

  console.log(productRatings)

  return (
    <StyledCartItem sx={{ minWidth: 275 }}>
      {isItemInCart &&  !isNestedInCart && <ItemBadge />}
      <CardMedia
        component="img"
        height="194"
        image={item?.image}
        alt={item?.title}
      />
      <CardContent>
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {clipTitle(item?.title)}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ${item?.price.toFixed(2)}
          </Typography>
          <Rating initalRating={productRatings[item?.id]} itemId={item?.id}/>
        </Box>
        {!isItemInCart ? (
          <Button fullWidth variant="contained" onClick={() => addToCart(item)}>
            Add to Cart
          </Button>
        ) : (
          <ItemQuantityToggle item={cartItem} />
        )}
      </CardContent>
    </StyledCartItem>
  );
};

export default Item;
