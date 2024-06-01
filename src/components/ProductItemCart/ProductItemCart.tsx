import classNames from "classnames/bind";
import styles from "./ProductItemCart.module.scss";

import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Stack, Typography } from "@mui/material";
import { ReactElement, useState } from "react";
import { ReducerAction, ReducerActionType } from "../../context/CartProvider";
import ProductImage from "../Image/ProductImage";
import { ProductDataType } from "../ProductItem/ProductItem";

const cx = classNames.bind(styles);

export type ProductItemCartType = {
  product: ProductDataType & {
    isbn13: number;
    title: string;
    price: string;
    image: string;
    quantity: number;
  };
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

function ProductItemCart(props: ProductItemCartType): ReactElement {
  const { product, dispatch, REDUCER_ACTIONS } = props;
  const lineTotal: number = product.quantity * parseFloat(product.price);

  const [quantity, setQuantity] = useState(product.quantity);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      dispatch({
        type: REDUCER_ACTIONS.QUANTITY,
        payload: {
          product: { ...product, quantity: newQuantity },
        },
      });
      return newQuantity;
    });
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        dispatch({
          type: REDUCER_ACTIONS.QUANTITY,
          payload: { product: { ...product, quantity: newQuantity } },
        });
        return newQuantity;
      });
    }
  };

  const onRemoveFromCart = () =>
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: { product },
    });
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      className={cx("wrapper")}
    >
      <ProductImage
        className={cx("image")}
        src={product.image}
        alt="product.image"
      />
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "flex-end", md: "center" }}
        justifyContent={{ xs: "flex-start", md: "space-between" }}
        className={cx("info")}
      >
        <span className={cx("unit-price")}>{product.price}</span>
        <Stack
          direction={"row"}
          alignItems={"center"}
          className={cx("quantity")}
        >
          <Button onClick={decrementQuantity}>-</Button>
          <Typography>{quantity}</Typography>
          <Button onClick={incrementQuantity}>+</Button>
        </Stack>
        <span className={cx("total-price")}>{lineTotal.toFixed(2)}</span>
        <Button>
          <DeleteIcon
            className={cx("delete-icon")}
            onClick={onRemoveFromCart}
          />
        </Button>
      </Stack>
    </Stack>
  );
}

export default ProductItemCart;
