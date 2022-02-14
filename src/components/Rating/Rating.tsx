import * as React from "react"
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import IconButton from '@mui/material/IconButton';
import { useCartContext } from "../context/Context";

interface RatingProps {
  initalRating: number;
  itemId: number;
}

const Rating: React.FC<RatingProps> = (props) => {
  const { initalRating, itemId } = props

  const stars = Array.from({length: 5})

    const {
    updateRating
  } = useCartContext();

  return(
    <>
    {stars.map((star, idx) => {
      return(
         <IconButton key={idx} color="primary" aria-label="upload picture" component="span" onClick={() => updateRating(itemId, idx + 1)}>
            {initalRating >= idx + 1 ? <StarIcon/> : <StarBorderIcon />}
        </IconButton>
      )
    })}
    </>
  )
}

export default Rating