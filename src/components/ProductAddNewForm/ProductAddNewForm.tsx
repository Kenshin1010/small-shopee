import { Button, Grid, Paper } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import ProductItemAddNew from "../ProductItemAddNew/ProductItemAddNew";
import styles from "./ProductAddNewForm.module.scss";
import { useId } from "../../hooks/useId";

const cx = classNames.bind(styles);

type Product = {
  id?: string | number | undefined;
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
  const [isbn13, setIsbn13] = useState<string | "">("");
  const [image, setImage] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const [titleError, setTitleError] = useState(false);
  const [subtitleError, setSubtitleError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [isbn13Error, setIsbn13Error] = useState(false);
  const [imageError, setImageError] = useState(false);

  const titleRef = useRef<HTMLInputElement | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const priceAsString = price.replace(/[^0-9.-]+/g, "");
    const parsedIsbn13 = parseInt(isbn13.trim(), 10);
    // Kiểm tra xem tất cả các trường nhập liệu có đều không trống không
    setIsFormValid(
      title.trim() !== "" &&
        subtitle.trim() !== "" &&
        priceAsString.trim() !== "" &&
        !isNaN(parseFloat(priceAsString.trim())) && // Kiểm tra xem giá có phải là số không
        isbn13.trim() !== "" &&
        !isNaN(parsedIsbn13) &&
        image !== ""
    );
  }, [title, subtitle, price, isbn13, image]);

  const autoId = useId();
  console.log("autoId: ", autoId);

  const isISBN13Exists = (isbn13: number) => {
    const existingProducts = localStorage.getItem("newProducts");
    if (existingProducts) {
      const parsedProducts: Product[] = JSON.parse(existingProducts);
      return parsedProducts.some((product) => product.isbn13 === isbn13);
    }
    return false;
  };

  const handleSubmit = () => {
    const productId = autoId;
    const parsedIsbn13 = parseInt(isbn13, 10);
    const hasError =
      titleError ||
      subtitleError ||
      priceError ||
      isNaN(parsedIsbn13) ||
      imageError;

    if (!hasError) {
      if (isISBN13Exists(parsedIsbn13)) {
        alert("ISBN13 already exists!");
        return;
      }

      const newProduct = {
        id: productId,
        title,
        subtitle,
        price: formatPrice(price),
        isbn13: parsedIsbn13,
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

      // Đặt giá trị của input file về rỗng
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }

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
    } else {
      // Nếu người dùng không chọn tệp tin mới, đặt Image về trống
      setImage("");
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

    const priceAsString = value.replace(/[^0-9.-]+/g, "");
    const priceAsNumber = parseFloat(priceAsString);
    setPriceError(isNaN(priceAsNumber) || priceAsString.trim() === "");
  };

  const handleIsbn13Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsbn13(value);

    const parsedValue = parseInt(value, 10);
    setIsbn13Error(isNaN(parsedValue) || value.trim() === "");
  };

  const handleRemoveProductNew = (productId: string | number | undefined) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
    localStorage.setItem("newProducts", JSON.stringify(updatedProducts));
  };

  return (
    <div className={cx("wrapper")}>
      <Grid container sx={{ gap: "24px" }}>
        <Grid item xs={12} sm={10} md={6} lg={6}>
          <input
            className={cx("input-form")}
            ref={titleRef}
            value={title}
            placeholder="Enter title ..."
            onChange={handleTitleChange}
            style={{ borderColor: titleError ? "red" : "initial" }}
          />
          {titleError && <div style={{ color: "red" }}>Title is required</div>}
          <br />
          <input
            className={cx("input-form")}
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
            className={cx("input-form")}
            value={price}
            placeholder="Enter price $..."
            onChange={handlePriceChange}
            style={{ borderColor: priceError ? "red" : "initial" }}
          />
          {priceError && <div style={{ color: "red" }}>Price is invalid</div>}
          <br />
          <input
            className={cx("input-form")}
            value={isbn13}
            placeholder="Enter isbn13 ..."
            onChange={handleIsbn13Change}
            style={{ borderColor: isbn13Error ? "red" : "initial" }}
          />
          {isbn13Error && <div style={{ color: "red" }}>ISBN13 is invalid</div>}
          <br />
          <input
            className={cx("input-file")}
            ref={inputFileRef}
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
              width: "100%",
              fontSize: "16px",
              bgcolor: "#1a1a1a",
              color: "#fff",
              "&:hover": {
                bgcolor: "rgba(22, 24, 35, 0.06)",
                color: "#1a1a1a",
              },
              "&:disabled": {
                opacity: 0.7,
                color: "#fff",
              },
              lineHeight: "2.2rem",
              margin: "12px",
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <Grid container sx={{ gap: "12px", margin: "12px" }}>
        {products.map((product: Product, index: number) => (
          <Grid item key={index} xs={12} sm={4} md={2} lg={2}>
            <Paper>
              <ProductItemAddNew
                product={product}
                onDelete={handleRemoveProductNew}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ProductAddNewForm;
