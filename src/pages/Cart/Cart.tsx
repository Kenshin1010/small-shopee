import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductItemCart from "../../components/ProductItemCart/ProductItemCart";
import useCart from "../../hooks/useCart";
import httpRequest from "../../utils/httpRequest";

function Cart() {
  const [confirm, setConfirm] = useState<boolean>(false);

  const {
    dispatch,
    REDUCER_ACTIONS,
    totalItems,
    totalPrice,
    cartProductItems,
  } = useCart();
  const navigate = useNavigate();

  const onSubmitOrder = async () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);

    const currentDate = new Date();
    const orderTime = currentDate;
    const currentTime = Date.now();
    const orderName = `${currentTime}_purchased`;

    const orderData = {
      cartProductItems,
      orderTime,
    };

    try {
      const response = await httpRequest.post(
        "/purchased/create-purchased-history-item",
        { orderName, orderData }
      );
      console.log("🚀 ~ onSubmitOrder ~ response.data._id:", response.data._id);

      // const orderName = response.data._id;
      navigate(`/purchase?keyword=${encodeURIComponent(orderName)}`);
    } catch (error) {
      console.error("Error creating purchased history item:", error);
    }
  };

  const pageContent = confirm ? (
    <h2>Thank you for your order.</h2>
  ) : (
    <Grid container spacing={2}>
      {cartProductItems.map((item) => (
        <Grid item key={item.product._id} xs={12} sm={12} md={12} lg={12}>
          <Paper>
            <ProductItemCart
              product={item.product}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
            />
          </Paper>
        </Grid>
      ))}
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        sx={{
          margin: cartProductItems.length === 0 ? "0 24px" : "0",
        }}
      >
        <Paper>
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ fontSize: "18px" }}>
              Total Items: {totalItems}
            </Typography>
            <Typography sx={{ fontSize: "18px" }}>
              Total Price: {totalPrice}
            </Typography>
            <Button
              onClick={onSubmitOrder}
              disabled={!totalItems}
              sx={{
                fontSize: "16px",
                bgcolor: "#1a1a1a",
                color: "#fff",
                "&:hover": {
                  bgcolor: "rgba(22, 24, 35, 0.06)",
                  color: "#1a1a1a",
                },
                "&:disabled": {
                  opacity: 0.7,
                  color: "#fff",
                },
                lineHeight: "2.2rem",
              }}
            >
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
