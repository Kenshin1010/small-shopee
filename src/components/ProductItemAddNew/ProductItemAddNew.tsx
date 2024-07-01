import { ReactElement } from "react";
import classNames from "classnames/bind";
import styles from "./ProductItemAddNew.module.scss";

import { Box, Button, Stack, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductImage from "../Image/ProductImage";

import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { ProductDataType } from "../ProductItem/ProductItem";

const cx = classNames.bind(styles);

export type ProductNewItemType = {
  product: ProductDataType & {
    _id?: string;
    title: string;
    subtitle?: string;
    isbn13?: number;
    price: string;
    image: string;
    url?: string;
    quantity?: number;
    createdAt?: string;
    updatedAt?: string; // timestamp
  };
  onChange?: (productId: string | undefined) => void;
  onSave?: () => void;
  onDelete?: (productId: string | undefined) => void;
};

function ProductItemAddNew(props: ProductNewItemType): ReactElement {
  const { product, onChange, onSave, onDelete } = props;
  const navigate = useNavigate();
  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        sx={{ width: "100%", paddingTop: "3px" }}
      >
        <Tooltip title="Edit" arrow disableFocusListener>
          <Button
            sx={{
              ...buttonStyles,
            }}
            onClick={() => {
              navigate(`/addnew?edit=${product._id}`, {
                state: { ...product },
              });
              onChange?.(product._id as string);
            }}
          >
            <EditIcon className={cx("edit")} />
          </Button>
        </Tooltip>
        <Tooltip title="Save" arrow disableFocusListener>
          <Button
            sx={{
              ...buttonStyles,
              display: "none",
            }}
            onClick={onSave}
            //   () => handleSaveProductNew()
          >
            <DoneIcon className={cx("save")} />
          </Button>
        </Tooltip>
        <Tooltip title="Delete" arrow disableFocusListener>
          <Button
            sx={{
              ...buttonStyles,
            }}
            onClick={() => onDelete?.(product._id as string)}
          >
            <ClearOutlinedIcon className={cx("remove")} />
          </Button>
        </Tooltip>
      </Stack>
      <Box
        onClick={() => {
          navigate(
            `/detail?keyword=${encodeURIComponent(product.title.trim())}`,
            {
              state: { ...product },
            }
          );
        }}
        className={cx("wrapper")}
      >
        <ProductImage
          className={cx("image")}
          src={product.image}
          alt="product.image"
        />
        <div className={cx("info")}>
          <div className={cx("title-verified")}>
            <h4 className={cx("title")}>{product.title}</h4>
          </div>
          <span className={cx("subtitle")}>{product.subtitle}</span>
          <span className={cx("price")}>{product.price}</span>
        </div>
      </Box>
    </>
  );
}

const buttonStyles = {
  minWidth: "0",
  borderRadius: "0",
  bgcolor: "transparent",
  marginLeft: "24px",

  "&:hover": {
    minWidth: "0",
    borderRadius: "0",
    bgColor: "rgba(0, 0, 0, 0.04)",
  },
};

export default ProductItemAddNew;
