import { Grid, Paper } from "@mui/material";
import ProductItemCart from "../../components/ProductItemCart/ProductItemCart";

function Cart() {
  const data = true;
  return (
    <>
      <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} spacing={2}>
        {data && (
          <Grid item xs={12} sm={12} md={12} lg={10}>
            <Paper>
              <ProductItemCart />
            </Paper>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default Cart;
