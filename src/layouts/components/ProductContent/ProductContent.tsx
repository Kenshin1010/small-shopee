import { Grid, Paper } from "@mui/material";
import ProductItem, {
  ProductDataType,
} from "../../../components/ProductItem/ProductItem";
import routes from "../../../config/routes";
import { useData } from "../../../hooks/useData";

export function ProductContent() {
  const { searchResult, dataResult } = useData();
  return (
    <Grid container>
      {[routes.home, routes.search].includes(window.location.pathname) &&
        (searchResult.length > 0
          ? searchResult.map((result: ProductDataType) => (
              <Grid item key={result.id} xs={12} sm={4} md={2} lg={2}>
                <Paper>
                  <ProductItem
                    title={result.title}
                    subtitle={result.subtitle}
                    isbn13={result.isbn13}
                    price={result.price}
                    image={result.image}
                  />
                </Paper>
              </Grid>
            ))
          : dataResult.map((newBook: ProductDataType) => (
              <Grid item key={newBook.id} xs={12} sm={4} md={2} lg={2}>
                <Paper>
                  <ProductItem
                    title={newBook.title}
                    subtitle={newBook.subtitle}
                    isbn13={newBook.isbn13}
                    price={newBook.price}
                    image={newBook.image}
                  />
                </Paper>
              </Grid>
            )))}
    </Grid>
  );
}

export default ProductContent;
