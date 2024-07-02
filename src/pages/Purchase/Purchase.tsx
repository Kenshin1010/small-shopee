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

interface PurchasedHistoryItem {
  orderName: string;
  orderData: {
    cartProductItems: ProductItemPurchasedType[];
    orderTime: string;
  };
}

function Purchase() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  const [purchasedHistory, setPurchasedHistory] = useState<
    PurchasedHistoryItem[]
  >([]);

  useEffect(() => {
    const fetchPurchasedHistory = () => {
      let storedPurchasedHistory: PurchasedHistoryItem[] = JSON.parse(
        localStorage.getItem("PurchasedHistory") || "[]"
      );
      storedPurchasedHistory = storedPurchasedHistory.sort((a, b) => {
        return (
          new Date(b.orderData.orderTime).getTime() -
          new Date(a.orderData.orderTime).getTime()
        );
      });
      setPurchasedHistory(storedPurchasedHistory);
    };

    fetchPurchasedHistory();
  }, []);

  const handleRemovePurchased = (key: string) => {
    // console.log("Removing order with key:", key);
    // localStorage.removeItem(key);
    setPurchasedHistory((prevHistory) =>
      prevHistory.filter((historyItem) => historyItem.orderName !== key)
    );

    // Cập nhật lại localStorage sau khi xoá
    const updatedPurchasedHistory = purchasedHistory.filter(
      (historyItem) => historyItem.orderName !== key
    );
    localStorage.setItem(
      "PurchasedHistory",
      JSON.stringify(updatedPurchasedHistory)
    );
  };

  if (keyword) {
    const selectedOrder = purchasedHistory.find(
      (historyItem) => historyItem.orderName === `${keyword}`
    );

    if (selectedOrder) {
      const { cartProductItems, orderTime } = selectedOrder.orderData;

      // Calculate total items and total price of the order
      let totalItems = 0;
      let totalPrice = 0;
      cartProductItems.forEach((item) => {
        totalItems += item.product.quantity;
        totalPrice +=
          item.product.quantity *
          parseFloat(item.product.price.replace(/[^0-9.-]+/g, ""));
      });

      if (cartProductItems.length > 0) {
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
              {cartProductItems.map((item, index) => (
                <Grid item key={index} xs={12}>
                  <Paper>
                    <ProductItemPurchased product={item.product} />{" "}
                    {/* Display ProductItemPurchased here */}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      } else {
        return <div>No products found for {keyword}</div>;
      }
    } else {
      return <div>No order found for {keyword}</div>;
    }
  } else {
    return (
      <>
        {purchasedHistory.map((historyItem) => (
          <Card
            key={historyItem.orderName}
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
              {historyItem.orderData.orderTime}
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
                onClick={() => handleRemovePurchased(historyItem.orderName)}
              >
                <ClearOutlinedIcon className={cx("remove")} />
              </Button>
            </Box>
            <Link
              className={cx("link-purchased")}
              to={`/purchase?keyword=${historyItem.orderName}`}
            >
              {historyItem.orderName}
            </Link>
          </Card>
        ))}
      </>
    );
  }
}

export default Purchase;
