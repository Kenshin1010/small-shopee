import classNames from "classnames/bind";
import styles from "./ProductItem.module.scss";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { Link } from "react-router-dom";
import ProductImage from "../Image/ProductImage";

const cx = classNames.bind(styles);

export type ProductDataType = {
  id?: number;
  title: string;
  subtitle: string;
  isbn13?: number;
  price: string;
  image: string;
  url?: string;
  tick?: boolean;
};

function ProductItem(data: ProductDataType) {
  return (
    <Link to={`/@${data.subtitle}`} className={cx("wrapper")}>
      <ProductImage className={cx("image")} src={data.image} alt="data.image" />
      <div className={cx("info")}>
        <div className={cx("title-verified")}>
          <h4 className={cx("title")}>{data.title}</h4>
          {data.tick && <CheckOutlinedIcon className={cx("verified")} />}
        </div>
        <span className={cx("subtitle")}>{data.subtitle}</span>
        <span className={cx("price")}>{data.price}</span>
      </div>
    </Link>
  );
}

export default ProductItem;
