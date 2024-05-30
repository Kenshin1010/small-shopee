import classNames from "classnames/bind";
import styles from "./Search.module.scss";

import HeadlessTippy from "@tippyjs/react/headless";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";

import SearchIcon from "../icons-tsx/SearchIcon";

import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";
import { Box, Button, Grid } from "@mui/material";
import ProductItem, {
  ProductDataType,
} from "../../../components/ProductItem/ProductItem";
import { Book, getNewBooks, searchBooks } from "../../../services";

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [dataResult, setDataResult] = useState<ProductDataType[]>([]);
  const [searchResult, setSearchResult] = useState<ProductDataType[]>([]);
  const [inputFocused, setInputFocused] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNewBooks = async () => {
      const newBooks: Book[] = await getNewBooks();

      const newBook: ProductDataType[] = newBooks.map((data, index) => ({
        id: index,
        title: data.title,
        subtitle: data.subtitle,
        isbn13: data.isbn13,
        price: data.price,
        image: data.image,
        url: data.url,
      }));

      setDataResult(newBook);
    };

    fetchNewBooks();
    console.log(dataResult);
  }, []);

  const debouncedValue = useDebounce({
    value: searchValue,
    delay: 300,
    enabled: inputFocused,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
      setLoading(true);

      const books: Book[] = await searchBooks(debouncedValue);

      const result: ProductDataType[] = books.map((book, index) => ({
        id: index,
        title: book.title,
        subtitle: book.subtitle,
        isbn13: book.isbn13,
        price: book.price,
        image: book.image,
        url: book.url,
      }));

      setSearchResult(result);
      setLoading(false);
    };

    fetchApi();
  }, [debouncedValue]);

  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
    inputRef.current?.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
    setInputFocused(false);
  };

  const handleShowResult = () => {
    setShowResult(true);
    setInputFocused(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit;
    }
  };

  console.log(searchResult);

  return (
    // Using a wrapper <div> or <span> tag around the reference element
    // solves this by creating a new parentNode context.
    <span>
      <HeadlessTippy
        interactive
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <Box className={cx("search-results")} tabIndex={-1} {...attrs}>
            <Grid>
              <h4 className={cx("search-title")}>Books</h4>
              {searchResult.map((result: ProductDataType) => (
                <Box key={result.id}>{result.title}</Box>
              ))}
            </Grid>
          </Box>
        )}
        onClickOutside={handleHideResult}
      >
        <Box className={cx("search")}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Search"
            onChange={handleChange}
            onFocus={() => {
              handleShowResult();
            }}
            onKeyDown={handleKeyDown}
          />
          {!!searchValue && !loading && (
            <Button
              className={cx("clear")}
              onClick={() => {
                handleClear();
              }}
            >
              <ClearOutlinedIcon />
            </Button>
          )}
          {loading && <RotateLeftOutlinedIcon />}
          <Button className={cx("search-btn")} onMouseDown={handleSubmit}>
            <SearchIcon />
          </Button>
        </Box>
      </HeadlessTippy>
      {searchResult.length > 0 &&
        searchResult.map((result: ProductDataType) => (
          <ProductItem
            key={result.id}
            title={result.title}
            subtitle={result.subtitle}
            isbn13={result.isbn13}
            price={result.price}
            image={result.image}
          />
        ))}
      {searchResult.length === 0 &&
        dataResult.map((newBook: ProductDataType) => (
          <ProductItem
            key={newBook.id}
            title={newBook.title}
            subtitle={newBook.subtitle}
            isbn13={newBook.isbn13}
            price={newBook.price}
            image={newBook.image}
          />
        ))}
    </span>
  );
}

export default Search;
