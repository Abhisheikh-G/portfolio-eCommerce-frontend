import {
  Typography,
  Container,
  List,
  Divider,
  ListItem,
  Button,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import Link from "../../src/Link";
import Rating from "@material-ui/lab/Rating";
// import products from "../../src/products";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import BackArrow from "@material-ui/icons/ArrowBack";
import Box from "@material-ui/core/Box";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Product = (props) => {
  const { product, id } = props;
  const router = useRouter();
  const [qty, setQty] = useState(1);

  const handleChange = (event) => {
    setQty(event.target.value);
  };

  const handleAddToCart = (event) => {
    router.push({
      pathname: "/cart",
      query: { id, qty },
    });
  };

  return (
    <Container maxWidth="lg">
      <Box display="flex" alignItems="center">
        <Link href="/">
          <IconButton>
            <Icon>
              <BackArrow />
            </Icon>
          </IconButton>
        </Link>
        <Typography variant="h5" component="div" display="inline">
          Go Back
        </Typography>
      </Box>

      <Box
        mt={2}
        pb={8}
        display="flex"
        minHeight="70vh"
        alignItems="center"
        justifyContent="center"
      >
        <Grid spacing={4} container alignItems="center" justify="center">
          <Grid item md={4}>
            <Image
              height={400}
              width={500}
              alt={product.name}
              src={product.image}
            />
          </Grid>

          <Grid item md={4} style={{ marginTop: "1em" }}>
            <Box maxWidth={350}>
              <Typography variant="h4">{product.name}</Typography>
              <Divider />
              <Box my={1}>
                <Rating
                  value={product.rating}
                  readOnly
                  name="Product Ratings"
                />{" "}
                <Typography display="inline" variant="body1">
                  {product.numReviews} reviews
                </Typography>
              </Box>
              <Typography variant="body1">{product.description}</Typography>
            </Box>
          </Grid>

          <Grid
            style={{ maxWidth: 350 }}
            item
            container
            direction="column"
            md={4}
          >
            <Grid
              item
              container
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1em",
              }}
            >
              <Typography variant="h6" component="span">
                Price:
              </Typography>
              <Typography variant="h6" component="span">
                ${product.price}
              </Typography>
            </Grid>
            <Divider />
            <Grid
              item
              container
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1em",
              }}
            >
              <Typography variant="h6" component="span">
                In Stock:
              </Typography>
              <Typography variant="h6" component="span">
                {product.countInStock}
              </Typography>
            </Grid>
            <Divider />
            <Grid
              item
              container
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1em",
              }}
            >
              <Typography variant="h6">Quantity:</Typography>
              <FormControl>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={qty}
                  fullWidth={true}
                  onChange={handleChange}
                >
                  {[...Array(product.countInStock).keys()].map((q) => (
                    <MenuItem value={q + 1}>{q + 1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Divider />
            <Grid item style={{ marginTop: "1em" }}>
              <Button
                disabled={product.countInStock === 0}
                fullWidth={true}
                variant="outlined"
                onClick={handleAddToCart}
              >
                Add To Cart
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Product;

export const getStaticProps = async (context) => {
  const res = await fetch(
    `http://localhost:5000/api/products/${context.params.id}`
  );
  const data = await res.json();

  return { props: { product: data, id: context.params.id } };
};

// This function gets called at build time
export const getStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const res = await fetch("http://localhost:5000/api/products");
  const data = await res.json();
  // Get the paths we want to pre-render based on products
  const paths = data.map((product) => ({
    params: { id: product._id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};
