import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Cart from "./components/Cart/Cart";
import { useCartContext } from "./components/context/Context";
import Header from "./components/Header/Header";
import Item from "./components/Item/Item";
import Error from "./components/Error";

export default function App() {
  const {
    state: { products },
    loading,
    error,
  } = useCartContext();

  const [cartOpen, setCartOpen] = React.useState(false);

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  return (
    <>
      <Header openCart={handleCartOpen} />
      {loading ? (
        <Box
          display="flex"
          width="100%"
          minHeight="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Cart open={cartOpen} closeCart={handleCartClose} />
          <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
              {error ? (
                <Error message={error} />
              ) : (
                <>
                  <Typography variant="h4" component="h1" gutterBottom>
                    Products
                  </Typography>
                  <Grid container spacing={2}>
                    {products?.map((product) => (
                      <Grid key={product?.id} item xs={12} md={4}>
                        <Item item={product} />
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Box>
          </Container>
        </>
      )}
    </>
  );
}
