import { ForwardedRef, forwardRef, useState } from "react";

import classNames from "classnames";
import styles from "./ProductImage.module.scss";

import { ImageListItem } from "@mui/material";
import images from "../../assets/images/index";

export type ProductImageType = {
  className?: string;
  src: string;
  alt?: string;
  fallback?: string;
  style: React.CSSProperties;
};

const ProductImage = forwardRef<HTMLImageElement, ProductImageType>(
  (
    {
      className,
      src,
      alt = "",
      fallback: customFallback = images.noImage,
      ...props
    }: { className?: string; src: string; alt?: string; fallback?: string },
    ref: ForwardedRef<HTMLImageElement>
  ) => {
    const [fallback, setFallback] = useState<string | undefined>();

    const handleError = () => {
      setFallback(customFallback);
    };

    return (
      <ImageListItem className={classNames(styles.wrapper, className)}>
        <img
          ref={ref}
          src={fallback || src}
          alt={alt}
          {...props}
          onError={handleError}
        />
      </ImageListItem>
    );
  }
);

export default ProductImage;
