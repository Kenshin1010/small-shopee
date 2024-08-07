import { Box, Button, Card, Grid, Paper, Typography } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './Purchase.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { formatPrice } from '../../components/ProductAddNewForm/ProductAddNewForm';
import ProductItemPurchased, {
  ProductItemPurchasedType,
} from '../../components/ProductItemPurchased/ProductItemPurchased';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import httpRequest from '../../utils/httpRequest';
import useUserLogin from '../../hooks/useUserLogin';

const cx = classNames.bind(styles);

interface PurchasedHistoryItem {
  _id: string;
  orderName: string;
  orderData: {
    cartProductItems: ProductItemPurchasedType[];
    orderTime: string;
  };
}

function Purchase() {
  const { userLogin } = useUserLogin();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword');
  const [purchasedHistory, setPurchasedHistory] = useState<
    PurchasedHistoryItem[]
  >([]);

  useEffect(() => {
    const fetchPurchasedHistory = async () => {
      try {
        const response = await httpRequest.get(
          '/purchased/purchased-history-items'
        );

        // Check if response data contains purchasedHistoryItems array
        if (!Array.isArray(response.data.purchasedHistoryItems)) {
          throw new Error('Response data is not in the expected format');
        }

        const sortedHistory = response.data.purchasedHistoryItems.sort(
          (a: PurchasedHistoryItem, b: PurchasedHistoryItem) => {
            return (
              new Date(b.orderData.orderTime).getTime() -
              new Date(a.orderData.orderTime).getTime()
            );
          }
        );

        setPurchasedHistory(sortedHistory);
      } catch (error) {
        console.error('Error fetching purchased history:', error);
      }
    };

    if (userLogin) {
      fetchPurchasedHistory();
    }
  }, [userLogin]);

  const handleRemovePurchased = async (_id: string) => {
    try {
      await httpRequest.delete(`/purchased/purchased-history-item/${_id}`);
      setPurchasedHistory((prevHistory) =>
        prevHistory.filter((historyItem) => historyItem._id !== _id)
      );
    } catch (error) {
      console.error('Error deleting purchased history item:', error);
    }
  };

  const renderOrderedDetails = (selectedOrder: PurchasedHistoryItem) => {
    if (!selectedOrder) {
      return <div>No order found for {keyword}</div>;
    }

    const { cartProductItems, orderTime } = selectedOrder.orderData;

    // Calculate total items and total price of the order
    let totalItems = 0;
    let totalPrice = 0;
    cartProductItems.forEach((item) => {
      totalItems += item.product.quantity;
      totalPrice +=
        item.product.quantity *
        parseFloat(item.product.price.replace(/[^0-9.-]+/g, ''));
    });

    if (cartProductItems.length > 0) {
      return (
        <Box>
          <Paper sx={{ marginBottom: '12px' }}>
            <Typography variant="h1" fontSize={'20px'}>
              Thank you for your order.
            </Typography>
            <Typography variant="h2" fontSize={'16px'}>
              Time: {orderTime}
            </Typography>
            <Typography variant="h2" fontSize={'16px'}>
              Order Key: {keyword}
            </Typography>
          </Paper>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontSize: '18px' }}>
                    Total Items: {totalItems}
                  </Typography>
                  <Typography sx={{ fontSize: '18px' }}>
                    Total Price: {formatPrice(totalPrice)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            {cartProductItems.map((item, index) => (
              <Grid item key={index} xs={12}>
                <Paper>
                  <ProductItemPurchased product={item.product} />{' '}
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
  };

  const renderPurchasedHistory = () => {
    return (
      <>
        {purchasedHistory.map((historyItem) => (
          <Card
            key={historyItem.orderName}
            sx={{
              padding: '5px 10px 5px 12px',
              margin: '12px',
              lineHeight: '2.2rem',
            }}
          >
            <Box
              sx={{
                fontSize: '16px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {historyItem.orderData.orderTime}
              <Button
                sx={{
                  minWidth: '0',
                  borderRadius: '0',
                  bgcolor: 'transparent',
                  padding: '0',
                  paddingLeft: '12px',
                  '&:hover': {
                    minWidth: '0',
                    borderRadius: '0',
                    bgcolor: 'transparent',
                  },
                }}
                onClick={() => handleRemovePurchased(historyItem._id)}
              >
                <ClearOutlinedIcon className={cx('remove')} />
              </Button>
            </Box>
            <Link
              className={cx('link-purchased')}
              to={`/purchase?keyword=${historyItem.orderName}`}
            >
              {historyItem.orderName}
            </Link>
          </Card>
        ))}
      </>
    );
  };

  if (!userLogin) {
    return null;
  }

  return (
    <div>
      {keyword
        ? (() => {
            const selectedOrder = purchasedHistory.find(
              (historyItem) => historyItem.orderName === keyword
            );
            return selectedOrder ? (
              renderOrderedDetails(selectedOrder)
            ) : (
              <div>No order found for {keyword}</div>
            );
          })()
        : renderPurchasedHistory()}
    </div>
  );
}

export default Purchase;
