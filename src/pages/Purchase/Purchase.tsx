import { Link, useLocation } from "react-router-dom";
import { ProductItemPurchasedType } from "../../components/ProductItemPurchased/ProductItemPurchased";
import { Box, Grid, Paper, Typography } from "@mui/material";
import ProductItemPurchased from "../../components/ProductItemPurchased/ProductItemPurchased";
import { formatPrice } from "../../components/ProductAddNewForm/ProductAddNewForm";

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

    // Tính tổng số lượng và tổng giá trị của đơn hàng
    let totalItems = 0;
    let totalPrice = 0;
    products.forEach((item) => {
      totalItems += item.product.quantity;
      totalPrice +=
        item.product.quantity * parseFloat(item.product.price.replace("$", ""));
    });

    if (products.length > 0) {
      console.log(
        "Products[0].product.quantity :",
        products[0].product.quantity
      );
      return (
        <Box>
          <h2>Thank you for your order.</h2>
          <h4>Order Key: {keyword}</h4>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Paper>
                <Box sx={{ textAlign: "center" }}>
                  <Typography sx={{ fontSize: "18px" }}>
                    Total Items: {totalItems}
                  </Typography>
                  <Typography sx={{ fontSize: "18px" }}>
                    Total Price: {formatPrice(totalPrice)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
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
        </Box>
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
              <Paper>
                <Link key={key} to={`/purchase?keyword=${key}`}>
                  {key}
                </Link>
              </Paper>
            );
          }
          return null;
        })}
      </>
    );
  }
}

export default Purchase;
