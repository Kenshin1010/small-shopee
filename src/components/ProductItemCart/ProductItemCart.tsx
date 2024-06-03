import classNames from "classnames/bind";
import styles from "./ProductItemCart.module.scss";

import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Input, Stack, Tooltip } from "@mui/material";
import { ReactElement, useState } from "react";
import { ReducerAction, ReducerActionType } from "../../context/CartProvider";
import ProductImage from "../Image/ProductImage";
import { ProductDataType } from "../ProductItem/ProductItem";

const cx = classNames.bind(styles);

export type ProductItemCartType = {
  product: ProductDataType & {
    isbn13?: number;
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
  const priceAsString = product.price.replace(/[^0-9.-]+/g, "");
  const priceAsNumber = parseFloat(priceAsString);
  const lineTotal: number = product.quantity * priceAsNumber;

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity);
      dispatch({
        type: REDUCER_ACTIONS.QUANTITY,
        payload: { product: { ...product, quantity: newQuantity } },
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
        style={{ width: "100px" }}
      />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-end", sm: "center" }}
        justifyContent={{ xs: "flex-start", sm: "space-evenly" }}
        sx={{ paddingRight: { xs: "48px", sm: "24px" } }}
        className={cx("info")}
      >
        <span className={cx("unit-price")}>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(priceAsNumber)}
        </span>
        <Stack
          direction={"row"}
          alignItems={"center"}
          className={cx("quantity")}
        >
          <Button
            onClick={decrementQuantity}
            sx={{ minWidth: "42px", fontSize: "16px" }}
          >
            -
          </Button>
          <Input
            value={quantity}
            onChange={handleChange}
            sx={{
              width: "50px",
              fontSize: "16px",
              textAlign: "center",
              "& input": { textAlign: "center" },
              "&:focus-within": { borderBottom: "none" },
              outline: "1px solid rgba(22, 24, 35, 0.75)",
            }}
            disableUnderline
          />
          <Button
            onClick={incrementQuantity}
            sx={{ minWidth: "42px", fontSize: "16px" }}
          >
            +
          </Button>
        </Stack>
        <span className={cx("total-price")}>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(lineTotal)}
        </span>
        <Tooltip title="Delete" arrow disableFocusListener>
          <Button>
            <DeleteIcon
              className={cx("delete-icon")}
              onClick={onRemoveFromCart}
              sx={{ fontSize: "24px" }}
            />
          </Button>
        </Tooltip>
      </Stack>
    </Stack>
  );
}

export default ProductItemCart;
