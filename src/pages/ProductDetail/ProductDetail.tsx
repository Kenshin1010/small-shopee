import { useLocation } from "react-router-dom";
import ProductItemDetail from "../../components/ProductItemDetail/ProductItemDetail";
import { Grid, Paper } from "@mui/material";

function ProductDetail() {
  const location = useLocation();
  const data = location.state;
  return (
    <>
      <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} spacing={1}>
        {data && (
          <Grid key={data.id} item xs={12} sm={8} md={8} lg={8}>
            <Paper>
              <ProductItemDetail
                title={data.title}
                subtitle={data.subtitle}
                isbn13={data.isbn13}
                price={data.price}
                image={data.image}
              />
            </Paper>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default ProductDetail;
