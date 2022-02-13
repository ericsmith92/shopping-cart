import * as React from "react"
import Box from '@mui/material/Box';
import styled from "@emotion/styled"

const StyledBox = styled(Box)`
  background: red;
  color: #fff;
  text-align: center;
  display: inline-block;
  padding: 20px 10px;
  border-radius: 100%;
`

interface ItemBadgeProps {
}

const ItemBadge: React.FC<ItemBadgeProps> = (props) => {

  return(
    <StyledBox className="badge">
      In Cart
    </StyledBox>
  )
}

export default ItemBadge