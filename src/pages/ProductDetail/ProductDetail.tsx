import { useLocation } from "react-router-dom";
import ProductItemDetail from "../../components/ProductItemDetail/ProductItemDetail";
import { Grid, Paper } from "@mui/material";
import { ProductDataType } from "../../components/ProductItem/ProductItem";
import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";

function ProductDetail() {
  const location = useLocation();
  const data: ProductDataType = location.state;
  const { dispatch, REDUCER_ACTIONS, cart } = useContext(CartContext);
  const inCart = cart.some((item) => item.product.isbn13 === data.isbn13);
  console.log("dataDetail", data);

  return (
    <Grid container>
      {data && (
        <Grid item key={data.id} xs={12} sm={8} md={8} lg={8}>
          <Paper>
            <ProductItemDetail
              data={data}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
              inCart={inCart}
            />
          </Paper>
        </Grid>
      )}
    </Grid>
  );
}

export default ProductDetail;
