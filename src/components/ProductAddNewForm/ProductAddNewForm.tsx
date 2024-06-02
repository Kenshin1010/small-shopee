import { Button, Grid, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import classNames from "classnames/bind";
import styles from "./ProductAddNewForm.module.scss";

const cx = classNames.bind(styles);

type Product = {
  title: string;
  subtitle: string;
  price: string;
  isbn13: number;
  image: string;
};

export const formatPrice = (price: string | number | undefined) => {
  // Check if price is null, undefined, or empty string
  if (price === null || price === undefined || price === "") {
    return "Price not available";
  }

  // Convert value to a numeric type if it's a string
  const numericPrice =
    typeof price === "string"
      ? parseFloat(price.replace(/[^0-9.-]+/g, ""))
      : price;

  // Check if the numericPrice is valid
  if (isNaN(numericPrice)) {
    throw new Error("Invalid price format");
  }

  // Use Intl.NumberFormat to format the currency value
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numericPrice);
};

function ProductAddNewForm() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [price, setPrice] = useState("");
  const [isbn13, setIsbn13] = useState<number | "">("");
  const [image, setImage] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const [titleError, setTitleError] = useState(false);
  const [subtitleError, setSubtitleError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [isbn13Error, setIsbn13Error] = useState(false);
  const [imageError, setImageError] = useState(false);

  const titleRef = useRef<HTMLInputElement | null>(null);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Kiểm tra xem tất cả các trường nhập liệu có đều không trống không
    setIsFormValid(
      title.trim() !== "" &&
        subtitle.trim() !== "" &&
        price.trim() !== "" &&
        !isNaN(parseFloat(price.trim())) && // Kiểm tra xem giá có phải là số không
        isbn13 !== "" &&
        image !== ""
    );
  }, [title, subtitle, price, isbn13, image]);

  const handleSubmit = () => {
    const hasError =
      titleError || subtitleError || priceError || isbn13Error || imageError;
    if (!hasError) {
      const newProduct = {
        title,
        subtitle,
        price,
        isbn13: isbn13 as number, // Đảm bảo isbn13 là số
        image,
      };
      // Thêm sản phẩm mới vào danh sách sản phẩm
      const updatedProducts = [...products, newProduct];
      // Lưu danh sách sản phẩm mới vào localStorage
      localStorage.setItem("newProducts", JSON.stringify(updatedProducts));

      // Cập nhật state và làm sạch các trường nhập liệu
      setProducts(updatedProducts);
      setTitle("");
      setSubtitle("");
      setPrice("");
      setIsbn13("");
      setImage("");

      titleRef.current?.focus();
    } else {
      alert("Please enter a valid title and price.");
    }
  };

  // Sử dụng useEffect để lấy danh sách sản phẩm từ localStorage khi component được tạo
  useEffect(() => {
    const savedProducts = localStorage.getItem("newProducts");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setImage(event.target.result);
          setImageError(false);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    setTitleError(value.trim() === "");
  };

  const handleSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSubtitle(value);
    setSubtitleError(value.trim() === "");
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(value);

    if (value.trim() === "") {
      setPriceError(true);
      return;
    }

    const priceAsString = value.replace("$", "");
    const priceAsNumber = parseFloat(priceAsString);
    setPriceError(isNaN(priceAsNumber) || priceAsString.trim() === "");
  };

  const handleIsbn13Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setIsbn13(value);
    setIsbn13Error(isNaN(value));
  };

  return (
    <div className={cx("wrapper")}>
      <Grid container sx={{ gapY: "24px" }}>
        <Grid item xs={12} sm={10} md={6} lg={6}>
          <input
            ref={titleRef}
            value={title}
            placeholder="Enter title ..."
            onChange={handleTitleChange}
            style={{ borderColor: titleError ? "red" : "initial" }}
          />
          {titleError && <div style={{ color: "red" }}>Title is required</div>}
          <br />
          <input
            value={subtitle}
            placeholder="Enter subtitle ..."
            onChange={handleSubtitleChange}
            style={{ borderColor: subtitleError ? "red" : "initial" }}
          />
          {subtitleError && (
            <div style={{ color: "red" }}>Subtitle is required</div>
          )}
          <br />
          <input
            value={price}
            placeholder="Enter price $..."
            onChange={handlePriceChange}
            style={{ borderColor: priceError ? "red" : "initial" }}
          />
          {priceError && <div style={{ color: "red" }}>Price is invalid</div>}
          <br />
          <input
            value={isbn13}
            placeholder="Enter isbn13 ..."
            onChange={handleIsbn13Change}
            style={{ borderColor: isbn13Error ? "red" : "initial" }}
          />
          {isbn13Error && <div style={{ color: "red" }}>ISBN13 is invalid</div>}
          <br />
          <input
            type={"file"}
            placeholder="Select file..."
            onChange={handleImageChange}
            style={{ borderColor: imageError ? "red" : "initial" }}
          />
          {imageError && <div style={{ color: "red" }}>Image is required</div>}
          <br />
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
            sx={{
              bgcolor: "#1a1a1a",
              color: "#fff",
              "&:hover": {
                color: "#1a1a1a",
              },
              "&:disabled": {
                opacity: 0.7,
                color: "#fff",
              },
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        {products.map((product: Product, index: number) => (
          <Grid item key={index} xs={12} sm={4} md={2} lg={2}>
            <Paper>
              <ProductItem
                title={product.title}
                subtitle={product.subtitle}
                price={formatPrice(product.price)}
                isbn13={product.isbn13}
                image={product.image}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ProductAddNewForm;
