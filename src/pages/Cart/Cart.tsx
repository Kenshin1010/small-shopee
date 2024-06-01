import { Grid, Paper } from "@mui/material";
import ProductItemCart from "../../components/ProductItemCart/ProductItemCart";
import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";

function Cart() {
  const { cart, dispatch, REDUCER_ACTIONS } = useContext(CartContext);
  return (
    <>
      <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} spacing={2}>
        {cart.map((item) => (
          <Grid key={item.product.isbn13} item xs={12} sm={12} md={12} lg={10}>
            <Paper>
              <ProductItemCart
                product={item.product}
                dispatch={dispatch}
                REDUCER_ACTIONS={REDUCER_ACTIONS}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Cart;
