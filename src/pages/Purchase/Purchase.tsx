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
    const orderData = orderFromLocalStorage
      ? JSON.parse(orderFromLocalStorage)
      : null;
    const products: ProductItemPurchasedType[] = orderData
      ? orderData.cart
      : [];
    const orderTime = orderData ? orderData.orderTime : null;
    console.log("orderTimePurchased: ", orderTime);

    console.log("Products Purchased `${orderKey}` :", products);

    // Tính tổng số lượng và tổng giá trị của đơn hàng
    let totalItems = 0;
    let totalPrice = 0;
    products.forEach((item) => {
      totalItems += item.product.quantity;
      totalPrice +=
        item.product.quantity *
        parseFloat(item.product.price.replace(/[^0-9.-]+/g, ""));
    });

    if (products.length > 0) {
      console.log(
        "Products[0].product.quantity :",
        products[0].product.quantity
      );
      return (
        <Box>
          <Paper sx={{ marginBottom: "12px" }}>
            <Typography variant="h1" fontSize={"20px"}>
              Thank you for your order.
            </Typography>
            <Typography variant="h2" fontSize={"16px"}>
              Time: {orderTime}
            </Typography>
            <Typography variant="h2" fontSize={"16px"}>
              Order Key: {keyword}
            </Typography>
          </Paper>
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
    interface TimeRecord {
      key: string;
      time: string; // Sửa kiểu dữ liệu của time thành string
    }

    const keysWithTime: TimeRecord[] = Object.keys(localStorage)
      .filter((key) => key.includes("purchased"))
      .map((key) => {
        const orderData = JSON.parse(localStorage.getItem(key) || "{}");
        return {
          key,
          time: orderData.orderTime
            ? new Date(orderData.orderTime).toLocaleString()
            : "N/A",
        };
      })
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

    return (
      <>
        {keysWithTime.map((record) => (
          <Paper
            key={record.key}
            sx={{
              padding: "5px 12px",
              margin: "12px",
              lineHeight: "2.2rem",
            }}
          >
            <Box>{record.time}</Box>
            <Link to={`/purchase?keyword=${record.key}`}>{record.key}</Link>
          </Paper>
        ))}
      </>
    );
  }
}

export default Purchase;
