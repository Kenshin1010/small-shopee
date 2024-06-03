import { Box, Button, Card, Grid, Paper, Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./Purchase.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatPrice } from "../../components/ProductAddNewForm/ProductAddNewForm";
import ProductItemPurchased, {
  ProductItemPurchasedType,
} from "../../components/ProductItemPurchased/ProductItemPurchased";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const cx = classNames.bind(styles);

interface OrderData {
  cart: ProductItemPurchasedType[];
  orderTime: string;
}

interface TimeRecord {
  key: string;
  time: string;
}

function Purchase() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  const [orders, setOrders] = useState<TimeRecord[]>([]);

  useEffect(() => {
    const fetchOrders = () => {
      const keysWithTime: TimeRecord[] = Object.keys(localStorage)
        .filter((key) => key.includes("purchased"))
        .map((key) => {
          const orderData: OrderData = JSON.parse(
            localStorage.getItem(key) || "{}"
          );
          return {
            key,
            time: orderData.orderTime
              ? new Date(orderData.orderTime).toLocaleString()
              : "N/A",
          };
        })
        .sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        );

      setOrders(keysWithTime);
    };

    fetchOrders();
  }, []);

  const handleRemovePurchased = (key: string) => {
    localStorage.removeItem(key);
    setOrders((prevOrders) => prevOrders.filter((order) => order.key !== key));
  };

  if (keyword) {
    const orderKey = `${keyword}`;
    const orderFromLocalStorage = localStorage.getItem(orderKey);
    const orderData: OrderData | null = orderFromLocalStorage
      ? JSON.parse(orderFromLocalStorage)
      : null;
    const products: ProductItemPurchasedType[] = orderData
      ? orderData.cart
      : [];
    const orderTime = orderData ? orderData.orderTime : null;

    // Calculate total items and total price of the order
    let totalItems = 0;
    let totalPrice = 0;
    products.forEach((item) => {
      totalItems += item.product.quantity;
      totalPrice +=
        item.product.quantity *
        parseFloat(item.product.price.replace(/[^0-9.-]+/g, ""));
    });

    if (products.length > 0) {
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
            <Grid item xs={12}>
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
              <Grid item key={item.product.isbn13} xs={12}>
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
        {orders.map((record) => (
          <Card
            key={record.key}
            sx={{
              padding: "5px 12px",
              margin: "12px",
              lineHeight: "2.2rem",
            }}
          >
            <Box
              sx={{
                fontSize: "16px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {record.time}
              <Button
                sx={{
                  minWidth: "0",
                  borderRadius: "0",
                  bgcolor: "transparent",
                  "&:hover": {
                    minWidth: "0",
                    borderRadius: "0",
                    bgcolor: "transparent",
                  },
                }}
                onClick={() => handleRemovePurchased(record.key)}
              >
                <ClearOutlinedIcon className={cx("remove")} />
              </Button>
            </Box>
            <Link
              className={cx("link-purchased")}
              to={`/purchase?keyword=${record.key}`}
            >
              {record.key}
            </Link>
          </Card>
        ))}
      </>
    );
  }
}

export default Purchase;
