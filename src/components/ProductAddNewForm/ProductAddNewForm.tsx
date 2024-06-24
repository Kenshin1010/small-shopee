import { Button, Grid, Paper } from "@mui/material";
import { AxiosResponse } from "axios";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { useData } from "../../hooks/useData";
import useDebounce from "../../hooks/useDebounce";
import httpRequest from "../../utils/httpRequest";
import { ProductDataType } from "../ProductItem/ProductItem";
import ProductItemAddNew from "../ProductItemAddNew/ProductItemAddNew";
import styles from "./ProductAddNewForm.module.scss";

const cx = classNames.bind(styles);

// const user = true;

type Product = {
  _id?: string;
  title: string;
  subtitle?: string;
  price: string;
  isbn13: number;
  image: string;
  url: string;
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
  const { dataResult, setDataResult } = useData();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [price, setPrice] = useState("");
  const [isbn13, setIsbn13] = useState<string | "">("");
  const [image, setImage] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const [titleError, setTitleError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [isbn13Error, setIsbn13Error] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isbn13ExistsError, setIsbn13ExistsError] = useState(false);

  const titleRef = useRef<HTMLInputElement | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const debouncedIsbn13 = useDebounce({ value: isbn13, delay: 300 });
  useEffect(() => {
    const handleISBNValidation = async () => {
      if (debouncedIsbn13.trim() === "") {
        setIsbn13ExistsError(false);
        return;
      }

      const parsedIsbn13 = parseInt(debouncedIsbn13, 10);
      if (isNaN(parsedIsbn13)) {
        setIsbn13ExistsError(false);
        return;
      }

      try {
        const exists = await isISBN13Exists(debouncedIsbn13);
        setIsbn13ExistsError(exists);
      } catch (error) {
        console.error("Error checking ISBN:", error);
        setIsbn13ExistsError(false);
      }
    };

    handleISBNValidation();
  }, [debouncedIsbn13]);

  useEffect(() => {
    const priceAsString = price.replace(/[^0-9.-]+/g, "");
    const parsedIsbn13 = parseInt(isbn13.trim(), 10);
    setIsFormValid(
      title.trim() !== "" &&
        priceAsString.trim() !== "" &&
        !isNaN(parseFloat(priceAsString.trim())) &&
        isbn13.trim() !== "" &&
        !isNaN(parsedIsbn13) &&
        image !== ""
    );
  }, [title, subtitle, price, isbn13, image]);

  // const isISBN13Exists = async (isbn13: number) => {
  //   try {
  //     const response = await httpRequest.get(`/${isbn13}`);
  //     return response.data.exists;
  //   } catch (error) {
  //     console.error("Error checking ISBN:", error);
  //     return false;
  //   }
  // };

  const isISBN13Exists = async (isbn: string): Promise<boolean> => {
    try {
      const response = await httpRequest.get(`/${isbn}`);
      return response.status === 200; // Check if response is successful
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        return false; // ISBN13 does not exist
      }

      console.error("Error checking ISBN:", error);
      return false; // Handle other errors as ISBN13 does not exist
    }
  };

  const handleSubmit = async () => {
    const parsedIsbn13 = parseInt(isbn13, 10);
    const hasError =
      titleError || priceError || isNaN(parsedIsbn13) || imageError;

    if (!hasError) {
      if (await isISBN13Exists(debouncedIsbn13)) {
        alert("ISBN13 already exists!");
        return;
      }

      const newProduct = {
        title,
        subtitle: subtitle || "",
        price: formatPrice(price),
        isbn13: parsedIsbn13,
        image,
        url: `${httpRequest.defaults.baseURL}/${isbn13}`,
      };

      try {
        const response: AxiosResponse<any> = await httpRequest.post(
          "/addnew",
          newProduct
        );
        setDataResult?.((prevData) => [...prevData, response.data]);
        console.log("Server response:", response.data);

        setProducts([...products, response.data]);
        setTitle("");
        setSubtitle("");
        setPrice("");
        setIsbn13("");
        setImage("");

        if (inputFileRef.current) {
          inputFileRef.current.value = "";
        }

        titleRef.current?.focus();
      } catch (error) {
        console.error("Error adding new product:", error);
      }

      // if (user) {
      //   try {
      //     const response: AxiosResponse<any> = await httpRequest.post(
      //       "/addnew/user",
      //       newProduct
      //     );
      //     console.log("Server response:", response.data);

      //     setProducts([...products, response.data]);
      //     setTitle("");
      //     setSubtitle("");
      //     setPrice("");
      //     setIsbn13("");
      //     setImage("");

      //     if (inputFileRef.current) {
      //       inputFileRef.current.value = "";
      //     }

      //     titleRef.current?.focus();
      //   } catch (error) {
      //     console.error("Error adding new product:", error);
      //   }
      // }
    } else {
      alert("Please enter a valid title and price.");
    }
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       if (event.target && typeof event.target.result === "string") {
  //         setImage(event.target.result);
  //         setImageError(false);
  //       }
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   } else {
  //     setImage("");
  //   }
  // };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setImage(value);
    setImageError(value.trim() === "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    setTitleError(value.trim() === "");
  };

  const handleSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSubtitle(value);
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

  const handleIsbn13Change = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsbn13(value);

    const parsedValue = parseInt(value, 10);
    setIsbn13Error(isNaN(parsedValue) || value.trim() === "");
  };

  const handleRemoveProductNew = async (
    productId: string | number | undefined
  ) => {
    try {
      const response: AxiosResponse<any> = await httpRequest.delete(
        `/book/${productId}`
      );
      console.log("Product Deleted successfully has ID: ", response.data._id);
      setDataResult?.((prevData) =>
        prevData.filter((item) => item._id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditProductNew = async (
    productId: string | number | undefined
  ) => {
    try {
      const response: AxiosResponse<any> = await httpRequest.put(
        `/book/${productId}`
      );
      console.log("Product Updated successfully has ID: ", response.data._id);
      setDataResult?.((prevData) => [...prevData, response.data]);
    } catch (error) {
      console.error("Error updating product:", error);
    }
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
          {titleError && <div style={errorStyle}>Title is required</div>}
          <br />
          <input
            className={cx("input-form")}
            value={subtitle}
            placeholder="Enter subtitle ..."
            onChange={handleSubtitleChange}
            style={{ borderColor: "initial" }}
          />
          <br />
          <input
            className={cx("input-form")}
            value={price}
            placeholder="Enter price $..."
            onChange={handlePriceChange}
            style={{ borderColor: priceError ? "red" : "initial" }}
          />
          {priceError && <div style={errorStyle}>Price is invalid</div>}
          <br />
          <input
            className={cx("input-form")}
            value={isbn13}
            placeholder="Enter isbn13 ..."
            onChange={handleIsbn13Change}
            style={{ borderColor: isbn13Error ? "red" : "initial" }}
          />
          {isbn13Error && <div style={errorStyle}>ISBN13 is invalid</div>}
          {isbn13ExistsError && (
            <div style={errorStyle}>ISBN13 already exists</div>
          )}
          <br />
          <input
            className={cx("input-form")}
            value={image}
            placeholder="Enter image ..."
            onChange={handleImageChange}
            style={{ borderColor: imageError ? "red" : "initial" }}
          />
          {imageError && <div style={errorStyle}>IMAGE is invalid</div>}
          <br />
          {/* <input
            className={cx("input-file")}
            ref={inputFileRef}
            type={"file"}
            placeholder="Select file..."
            onChange={handleImageChange}
            style={{ borderColor: imageError ? "red" : "initial" }}
          />
          {imageError && <div style={errorStyle}>Image is required</div>}
          <br /> */}
          <Button
            onClick={() => {
              ["/addnew?edit="].includes(window.location.pathname)
                ? handleEditProductNew
                : handleSubmit;
            }}
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
            {[`/addnew?edit=`].includes(window.location.pathname)
              ? "Save"
              : "Add"}
          </Button>
        </Grid>
      </Grid>
      <Grid container sx={{ gap: "12px", margin: "12px" }}>
        {dataResult.map((product: ProductDataType) => (
          <Grid item key={product._id} xs={12} sm={4} md={2} lg={2}>
            <Paper>
              <ProductItemAddNew
                product={product}
                onDelete={() => handleRemoveProductNew(product._id)}
                onChange={() => handleEditProductNew(product._id)}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

// styles
const errorStyle = {
  marginLeft: "12px",
  color: "red",
};

export default ProductAddNewForm;
