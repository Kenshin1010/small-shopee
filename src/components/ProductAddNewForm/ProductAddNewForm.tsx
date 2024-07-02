import { Button, Grid, Paper } from "@mui/material";
import { AxiosResponse } from "axios";
import classNames from "classnames/bind";
import { useContext, useEffect, useRef, useState } from "react";
import { useData } from "../../hooks/useData";
import useDebounce from "../../hooks/useDebounce";
import httpRequest from "../../utils/httpRequest";
import { ProductDataType } from "../ProductItem/ProductItem";
import ProductItemAddNew from "../ProductItemAddNew/ProductItemAddNew";
import styles from "./ProductAddNewForm.module.scss";
import { useLocation } from "react-router-dom";
import { Book, getNewBooks } from "../../services";
import CartContext, { REDUCER_ACTION_TYPE } from "../../context/CartProvider";

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
  const { dispatch } = useContext(CartContext);
  const location = useLocation();

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
    const fetchNewBooks = async () => {
      const newBooks: Book[] = await getNewBooks();

      const newBook: ProductDataType[] = newBooks.map((data, index) => ({
        index: index,
        _id: data._id,
        title: data.title,
        subtitle: data.subtitle,
        isbn13: data.isbn13,
        price: data.price,
        image: data.image,
        url: data.url,
      }));

      setDataResult?.(newBook);
    };

    fetchNewBooks();
  }, [setDataResult]);

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
        setIsbn13ExistsError(true);
        alert("ISBN13 already exists."); // Set error if ISBN13 already exists
        return;
      }

      setIsbn13ExistsError(false);

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

  const handleRemoveProductNew = async (productId: string | undefined) => {
    try {
      const response: AxiosResponse<any> = await httpRequest.delete(
        `/book/${productId}`
      );
      console.log("Product Deleted successfully has ID: ", productId);
      console.log("Response: ", response);

      setDataResult?.((prevData) =>
        prevData.filter((item) => item._id !== productId)
      );

      dispatch({
        type: REDUCER_ACTION_TYPE.REMOVE,
        payload: {
          product: {
            _id: productId,
            title: "",
            price: "",
            image: "",
            quantity: 0,
            isbn13: 0,
          },
        },
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdateProductNew = async (productId: string | undefined) => {
    try {
      const parsedIsbn13 = parseInt(isbn13, 10); // Parse isbn13 to number
      if (isNaN(parsedIsbn13)) {
        console.error("Invalid ISBN13:", isbn13);

        return;
      }

      const productToUpdate = {
        title,
        subtitle,
        price,
        isbn13: parsedIsbn13, // Use parsed ISBN13
        image,
        url: `${httpRequest.defaults.baseURL}/${isbn13}`, // Adjust the URL format as needed
      };

      // Retrieve the original ISBN13 from the product being updated
      const originalProduct = dataResult.find(
        (product) => product._id === productId
      );
      if (!originalProduct) {
        console.error(`Product with ID ${productId} not found in dataResult.`);
        return;
      }
      const originalIsbn13 = originalProduct.isbn13;

      // Check if ISBN13 is being updated and if it exists for another product
      if (parsedIsbn13 !== originalIsbn13) {
        if (await isISBN13Exists(debouncedIsbn13.toString())) {
          // Ensure isISBN13Exists expects a string
          setIsbn13ExistsError(true);
          alert("ISBN13 already exists."); // Set error if ISBN13 already exists
          return;
        }
      }

      setIsbn13ExistsError(false); // Reset error if ISBN13 does not exist

      const response: AxiosResponse<any> = await httpRequest.put(
        `/book/${productId}`,
        productToUpdate
      );

      console.log("Product Updated successfully has ID: ", response.data._id);

      // Provide UI feedback
      alert("Product updated successfully!");

      setDataResult?.((prevData) =>
        prevData.map((item) => (item._id === productId ? response.data : item))
      );

      // Optionally reset form fields
      setTitle("");
      setSubtitle("");
      setPrice("");
      setIsbn13("");
      setImage("");

      const updatedProduct = {
        ...originalProduct,
        ...response.data,
      };

      // Gửi action UPDATE tới CartProvider khi sản phẩm được cập nhật thành công

      dispatch({
        type: REDUCER_ACTION_TYPE.UPDATE,
        payload: {
          product: updatedProduct,
        },
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleFillDataToEditProductNew = (productId: string | undefined) => {
    const productToEdit = dataResult.find(
      (product) => product._id === productId
    );

    if (productToEdit) {
      setTitle(productToEdit.title);
      setSubtitle(productToEdit.subtitle || "");
      setPrice(productToEdit.price);
      setIsbn13((productToEdit.isbn13 || "").toString());
      setImage(productToEdit.image);

      // Optionally, scroll to the top of the form or focus on the title input
      if (titleRef.current) {
        titleRef.current.scrollIntoView({ behavior: "smooth" });
        titleRef.current.focus();
      }
    }
  };

  const handleButtonClick = () => {
    const { pathname, search } = location;

    if (pathname === "/addnew" && search.includes("?edit=")) {
      handleUpdateProductNew(search.replace("?edit=", ""));
    } else {
      handleSubmit();
    }
  };

  const getButtonText = () => {
    const { pathname, search } = location;

    if (pathname === "/addnew" && search.includes("?edit=")) {
      return "Save";
    } else {
      return "Add";
    }
  };

  useEffect(() => {
    handleButtonClick;
  }, [location]);

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
            onClick={handleButtonClick}
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
            {getButtonText()}
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
                onChange={() => handleFillDataToEditProductNew(product._id)}
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
