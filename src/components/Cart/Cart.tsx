import * as React from "react"
import Drawer from "@mui/material/Drawer";
import { useCartContext } from "../context/Context"
import Item from "../Item/Item"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

interface CartProps {
  open: boolean
  closeCart: () => void
}

const Cart: React.FC<CartProps> = (props) => {
  const { open, closeCart } = props

  const {
    state: { cart },
  } = useCartContext();

  const hasCartItems = !!cart?.length

  return(
    <Drawer anchor="right" open={open} onClose={() => closeCart()}>
    <Box p={2}>
      { hasCartItems 
      ?  
      cart.map((item, idx) => <Item key={`${item.id}_${idx}`} item={item} isNestedInCart/>)
      : 
      <Typography>No Items in Cart</Typography>}
      </Box>
    </Drawer>
  )
}

export default Cart