import {
  Typography,
  Container,
  List,
  Divider,
  ListItem,
  Button,
  Grid,
} from "@material-ui/core";
import Link from "../../src/Link";
import Rating from "@material-ui/lab/Rating";
import products from "../../src/products";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import BackArrow from "@material-ui/icons/ArrowBack";
import Box from "@material-ui/core/Box";
import React from "react";
import Image from "next/image";

const Product = (props) => {
  const { product } = props;
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
        mb={8}
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
              <Typography variant="h4" color="initial">
                {product.name}
              </Typography>
              <Divider />
              <Box my={1}>
                <Rating value={product.rating} />{" "}
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
              <Typography variant="h6" component="span" display="inline-block">
                Price:
              </Typography>
              <Typography variant="h6" component="span" display="inline-block">
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
              <Typography variant="h6" component="span" display="inline-block">
                Quantity:
              </Typography>
              <Typography variant="h6" component="span" display="inline-block">
                {product.countInStock}
              </Typography>
            </Grid>
            <Divider />
            <Grid item style={{ marginTop: "1em" }}>
              <Button
                disabled={product.countInStock === 0}
                fullWidth
                variant="outlined"
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
  const foundProduct = products.filter(
    (product) => product._id === context.params.id
  );

  return { props: { product: foundProduct[0] } };
};

// This function gets called at build time
export const getStaticPaths = async () => {
  // Call an external API endpoint to get posts

  // Get the paths we want to pre-render based on products
  const paths = products.map((product) => ({
    params: { id: product._id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};
