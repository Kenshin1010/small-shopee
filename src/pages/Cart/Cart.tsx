import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductItemCart from "../../components/ProductItemCart/ProductItemCart";
import useCart from "../../hooks/useCart";

function Cart() {
  const [confirm, setConfirm] = useState<boolean>(false);
  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();
  const navigate = useNavigate();

  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
    const currentTime = Date.now();
    const orderName = `${currentTime}_purchased`;
    localStorage.setItem(orderName, JSON.stringify(cart));

    navigate(`/purchase?keyword=${encodeURIComponent(orderName)}`, {});
  };

  const pageContent = confirm ? (
    <h2>Thank you for your order.</h2>
  ) : (
    <Grid container spacing={2}>
      {cart.map((item) => (
        <Grid item key={item.product.isbn13} xs={12} sm={12} md={12} lg={12}>
          <Paper>
            <ProductItemCart
              product={item.product}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
            />
          </Paper>
        </Grid>
      ))}
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Paper>
          <Box sx={{ textAlign: "center" }}>
            <Typography>Total Items: {totalItems}</Typography>
            <Typography>Total Price: {totalPrice}</Typography>
            <Button onClick={onSubmitOrder} disabled={!totalItems}>
              Place Order
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
  const content = <main className={"main main__cart"}>{pageContent}</main>;
  return content;
}

export default Cart;
