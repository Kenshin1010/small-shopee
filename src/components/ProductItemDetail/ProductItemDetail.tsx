import classNames from "classnames/bind";
import styles from "./ProductItemDetail.module.scss";

import { Box, Button } from "@mui/material";
import { ReactElement, useContext } from "react";
import CartContext, {
  ReducerAction,
  ReducerActionType,
} from "../../context/CartProvider";
import ProductImage from "../Image/ProductImage";

const cx = classNames.bind(styles);

export type ProductItemDetailType = {
  data: {
    id?: number;
    title: string;
    subtitle?: string;
    isbn13?: number;
    price: string;
    image: string;
    url?: string;
    quantity?: number;
  };
  dispatch?: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS?: ReducerActionType;
  inCart: boolean;
};

function ProductItemDetail(props: ProductItemDetailType): ReactElement {
  const { data, inCart } = props;
  console.log("dataProductItem", data);
  const { dispatch, REDUCER_ACTIONS } = useContext(CartContext);

  if (!data) {
    return <div>No data available</div>;
  }
  const handleAddToCart = () => {
    if (data.isbn13 !== undefined) {
      dispatch({
        type: REDUCER_ACTIONS.ADD,
        payload: {
          product: {
            isbn13: data.isbn13,
            title: data.title,
            price: data.price,
            quantity: 1,
            image: data.image,
          },
        },
      });
    } else {
      console.error("isbn13 is undefined");
    }
  };

  return (
    <Box className={cx("wrapper")}>
      <ProductImage
        className={cx("image")}
        src={data.image}
        alt={data.title}
        style={{ width: "100%" }}
      />
      <Box className={cx("info")}>
        <div className={cx("title-verified")}>
          <h4 className={cx("title")}>{data.title}</h4>
        </div>
        <span className={cx("subtitle")}>{data.subtitle}</span>
        <span className={cx("price")}>{data.price}</span>
        <Button
          onClick={handleAddToCart}
          disabled={inCart}
          sx={{ fontSize: "16px" }}
        >
          {inCart ? "In Cart" : "Add To Cart"}
        </Button>
      </Box>
    </Box>
  );
}

export default ProductItemDetail;
