import classNames from "classnames/bind";
import styles from "./ProductItemDetail.module.scss";

import { Box, Button } from "@mui/material";
import ProductImage from "../Image/ProductImage";
import { ProductDataType } from "../ProductItem/ProductItem";
import { ReducerAction, ReducerActionType } from "../../context/CartProvider";
import { ReactElement } from "react";

const cx = classNames.bind(styles);

type ProductDetailType = {
  data: ProductDataType & {
    id?: number;
    title: string;
    subtitle: string;
    isbn13?: number;
    price: string;
    image: string;
    url?: string;
    quantity?: number;
  };
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};

function ProductItemDetail({
  data,
  dispatch,
  REDUCER_ACTIONS,
  inCart,
}: ProductDetailType): ReactElement {
  if (!data) {
    return <div>No data available</div>;
  }
  const onAddToCart = () =>
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...data, quantity: 1 } });
  return (
    <Box className={cx("wrapper")}>
      <ProductImage className={cx("image")} src={data.image} alt={data.title} />
      <div className={cx("info")}>
        <div className={cx("title-verified")}>
          <h4 className={cx("title")}>{data.title}</h4>
        </div>
        <span className={cx("subtitle")}>{data.subtitle}</span>
        <span className={cx("price")}>{data.price}</span>
        <Button onClick={onAddToCart} disabled={inCart}>
          {inCart ? "In Cart" : "Add To Cart"}
        </Button>
      </div>
    </Box>
  );
}

export default ProductItemDetail;
