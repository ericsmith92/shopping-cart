import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import { HIGHEST_RATING } from "../../constants";
import { useCartContext } from "../context/Context";

interface RatingProps {
  initialRating: number;
  itemId: number;
}

const Rating: React.FC<RatingProps> = (props) => {
  const { initialRating, itemId } = props;

  const stars = Array.from({ length: HIGHEST_RATING });

  const { updateRating } = useCartContext();

  return (
    <>
      {stars.map((star, idx) => {
        return (
          <IconButton
            key={idx}
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() => updateRating(itemId, idx + 1)}
          >
            {initialRating >= idx + 1 ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        );
      })}
    </>
  );
};

export default Rating;
