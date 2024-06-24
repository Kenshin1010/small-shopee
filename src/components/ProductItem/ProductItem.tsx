import classNames from "classnames/bind";
import styles from "./ProductItem.module.scss";

import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductImage from "../Image/ProductImage";

const cx = classNames.bind(styles);

export type ProductDataType = {
  _id?: string;
  title: string;
  subtitle?: string;
  isbn13?: number;
  price: string;
  image: string;
  url?: string;
  quantity?: number;
  createdAt?: string;
  updatedAt?: string;
};

function ProductItem(data: ProductDataType) {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => {
        navigate(`/detail?keyword=${encodeURIComponent(data.title.trim())}`, {
          state: { ...data },
        });
      }}
      className={cx("wrapper")}
    >
      <ProductImage className={cx("image")} src={data.image} alt="data.image" />
      <div className={cx("info")}>
        <div className={cx("title-verified")}>
          <h4 className={cx("title")}>{data.title}</h4>
        </div>
        <span className={cx("subtitle")}>{data.subtitle}</span>
        <span className={cx("price")}>{data.price}</span>
      </div>
    </Box>
  );
}

export default ProductItem;
