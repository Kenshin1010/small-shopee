import classNames from "classnames/bind";
import styles from "./ProductItemPurchased.module.scss";

import { Stack } from "@mui/material";
import { ReactElement } from "react";
import ProductImage from "../Image/ProductImage";
import { ProductDataType } from "../ProductItem/ProductItem";

const cx = classNames.bind(styles);

export type ProductItemPurchasedType = {
  product: ProductDataType & {
    isbn13: number;
    title: string;
    price: string;
    image: string;
    quantity: number;
  };
};

function ProductItemPurchased(props: ProductItemPurchasedType): ReactElement {
  const { product } = props;
  const priceAsString = product.price.replace(/[^0-9.-]+/g, "");
  const priceAsNumber = parseFloat(priceAsString);
  const lineTotal: number = product.quantity * priceAsNumber;

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
          <span
            style={{
              width: "50px",
              textAlign: "center",
              fontSize: "16px",
              outline: "1px solid rgba(22, 24, 35, 0.75)",
            }}
          >
            {product.quantity}
          </span>
        </Stack>
        <span className={cx("total-price")}>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(lineTotal)}
        </span>
      </Stack>
    </Stack>
  );
}

export default ProductItemPurchased;
