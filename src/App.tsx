import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useCartContext } from "./components/context/Context";
import Item from "./components/Item/Item";

export default function App() {
  const {
    state: { products },
  } = useCartContext();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Home
        </Typography>
        <Grid container spacing={2}>
          {products?.map((product) => (
            <Grid key={product?.id} item xs={12} md={4}>
              <Item item={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
