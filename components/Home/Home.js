import { Grid, Typography } from "@material-ui/core";
import React from "react";
import products from "../../src/products";
import Product from "../Product/Product";

const Home = () => {
  return (
    <>
      <Typography variant="h3" component="h6">
        Latest Products
      </Typography>
      <Grid
        container
        spacing={4}
        style={{ marginTop: "1rem", marginBottom: "3rem" }}
        alignItems="flex-start"
        justify="center"
      >
        {products.map((product) => (
          <Grid item key={product._id}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
