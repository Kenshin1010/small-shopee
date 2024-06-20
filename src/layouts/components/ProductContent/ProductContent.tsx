import { Grid, Paper, styled } from "@mui/material";
import ProductItem, {
  ProductDataType,
} from "../../../components/ProductItem/ProductItem";
import routes from "../../../config/routes";
import { useData } from "../../../hooks/useData";

const StyledPaper = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
});

export function ProductContent() {
  const { searchResult, dataResult } = useData();

  return (
    <Grid container spacing={1}>
      {[routes.home, routes.search].includes(window.location.pathname) &&
        (searchResult.length > 0
          ? searchResult.map((result: ProductDataType) => (
              <Grid item key={result._id} xs={12} sm={4} md={2} lg={2}>
                <StyledPaper>
                  <ProductItem
                    _id={result._id}
                    title={result.title}
                    subtitle={result.subtitle}
                    isbn13={result.isbn13}
                    price={result.price}
                    image={result.image}
                  />
                </StyledPaper>
              </Grid>
            ))
          : dataResult.map((newBook: ProductDataType) => (
              <Grid item key={newBook._id} xs={12} sm={4} md={2} lg={2}>
                <StyledPaper>
                  <ProductItem
                    _id={newBook._id}
                    title={newBook.title}
                    subtitle={newBook.subtitle}
                    isbn13={newBook.isbn13}
                    price={newBook.price}
                    image={newBook.image}
                  />
                </StyledPaper>
              </Grid>
            )))}
    </Grid>
  );
}

export default ProductContent;
