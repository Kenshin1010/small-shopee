import classNames from 'classnames/bind';
import styles from './SearchBar.module.scss';

import HeadlessTippy from '@tippyjs/react/headless';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';

import SearchIcon from '../icons-tsx/SearchIcon';

import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import {
  Button,
  Container,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { ProductDataType } from '../../../components/ProductItem/ProductItem';
import { Book, getNewBooks, searchBooks } from '../../../services';

import { useNavigate } from 'react-router-dom';
import { useData } from '../../../hooks/useData';
import Wrapper from '../../../components/Popper/Wrapper';

const cx = classNames.bind(styles);

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  // const [dataResult, setDataResult] = useState<ProductDataType[]>([]);
  // const [searchResult, setSearchResult] = useState<ProductDataType[]>([]);
  const {
    searchResult = [],
    setSearchResult = () => {},
    setDataResult = () => {},
  } = useData();

  const [inputFocused, setInputFocused] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

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

      setDataResult(newBook);
    };

    fetchNewBooks();
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
        index: index,
        _id: book._id,
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
    setSearchValue('');
    setSearchResult([]);
    inputRef.current?.focus();
    navigate(`/search`);
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
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // inputRef.current?.focus();
    const trimmedValue = searchValue.trim();
    if (trimmedValue) {
      navigate(`/search?keyword=${encodeURIComponent(searchValue.trim())}`);
      setShowResult(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Ensure the default form submission is prevented
      setShowResult(false);
      const trimmedValue = searchValue.trim();
      if (trimmedValue) {
        navigate(`/search?keyword=${encodeURIComponent(searchValue.trim())}`);
      }
    }
  };

  return (
    // Using a wrapper <div> or <span> tag around the reference element
    // solves this by creating a new parentNode context.
    <Container>
      <Grid container>
        <HeadlessTippy
          interactive
          visible={showResult && searchResult.length > 0}
          render={(attrs) => (
            <Grid
              item
              xs={12}
              sm={10}
              md={6}
              lg={6}
              xl={6}
              className={cx('search-results')}
              tabIndex={-1}
              {...attrs}
            >
              <Wrapper>
                <h4 className={cx('search-title')}>Books</h4>
                <Paper sx={{ width: '100%' }}>
                  {searchResult.map((result: ProductDataType) => (
                    <Button
                      className={cx('search-title-book')}
                      key={result._id}
                      sx={{
                        width: '100%',
                        minHeight: '14px',
                        borderRadius: '0',
                        cursor: 'pointer',
                        bgcolor: 'rgba(22, 24, 35, 0.03)',
                        '&:hover': {
                          backgroundColor: 'rgba(22, 24, 35, 0.12)',
                        },
                      }}
                      onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        setShowResult(false);
                        navigate(
                          `/detail?keyword=${encodeURIComponent(
                            result.title.trim()
                          )}`,
                          { state: { ...result } }
                        );
                      }}
                    >
                      <Typography
                      // sx={{
                      //   fontSize: '14px',
                      //   whiteSpace: 'nowrap',
                      //   overflow: 'hidden',
                      //   textOverflow: 'ellipsis',
                      //   padding: '10px',
                      // }}
                      >
                        {result.title}
                      </Typography>
                    </Button>
                  ))}
                </Paper>
              </Wrapper>
            </Grid>
          )}
          onClickOutside={handleHideResult}
        >
          <Grid
            item
            xs={12}
            sm={10}
            md={6}
            lg={6}
            xl={6}
            className={cx('search')}
          >
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
              <ClearOutlinedIcon
                className={cx('clear')}
                onClick={() => {
                  handleClear();
                }}
              />
            )}
            {loading && <RotateLeftOutlinedIcon className={cx('loading')} />}
            <Tooltip arrow disableFocusListener title={'Search'}>
              <Button
                className={cx('search-btn')}
                onMouseDown={handleSubmit}
                sx={{
                  minWidth: 'none',

                  '&.MuiButtonBase-root.MuiButton-root': {
                    color: 'rgba(22, 24, 35, 0.34)',
                    bgcolor: 'rgba(22, 24, 35, 0.03)',
                    borderRadius: '0',
                  },
                  '&.MuiButtonBase-root.MuiButton-root:hover': {
                    color: '#212121',
                    bgcolor: 'rgba(22, 24, 35, 0.12)',
                    borderRadius: '0',
                  },
                }}
              >
                <SearchIcon />
              </Button>
            </Tooltip>
          </Grid>
        </HeadlessTippy>
      </Grid>
    </Container>
  );
}

export default SearchBar;
