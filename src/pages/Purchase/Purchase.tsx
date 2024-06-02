import { Link, useLocation } from "react-router-dom";
import { ProductItemPurchasedType } from "../../components/ProductItemPurchased/ProductItemPurchased";
import { Grid, Paper } from "@mui/material";
import ProductItemPurchased from "../../components/ProductItemPurchased/ProductItemPurchased";

function Purchase() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  console.log("keyword :", keyword);

  if (keyword) {
    const orderKey = `${keyword}`;
    const orderFromLocalStorage = localStorage.getItem(orderKey);
    const products: ProductItemPurchasedType[] = orderFromLocalStorage
      ? JSON.parse(orderFromLocalStorage)
      : [];
    console.log("Products Purchased `${orderKey}` :", products);

    if (products.length > 0) {
      console.log(
        "Products[0].product.quantity :",
        products[0].product.quantity
      );
      return (
        <>
          <h2>Thank you for your order.</h2>
          <h3>Order Key: {keyword}</h3>
          <Grid container spacing={2}>
            {products.map((item) => (
              <Grid
                item
                key={item.product.isbn13}
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <Paper>
                  <ProductItemPurchased product={item.product} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      );
    } else {
      return <div>No order found for {keyword}</div>;
    }
  } else {
    return (
      <>
        {Object.keys(localStorage).map((key) => {
          if (key.includes("purchased")) {
            return (
              <Link key={key} to={`/purchase?keyword=${key}`}>
                {key}
              </Link>
            );
          }
          return null;
        })}
      </>
    );
  }
}

export default Purchase;
