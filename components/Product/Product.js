import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Image from "next/image";
import React from "react";
import Link from "../../src/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

const Product = ({ product }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Link href={`/products/${product._id}`}>
        <Image height={250} width={345} src={`${product.image}`} />
      </Link>
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="body1">{product.description}</Typography>
      </CardContent>
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Product Reviews</Typography>
        <Box display="flex" justifyContent="space-around">
          <Rating name="read-only" value={product.rating} readOnly />
          <Typography variant="body1" display="inline">
            from {product.numReviews} reviews
          </Typography>
        </Box>
      </CardContent>
      <CardContent>
        <Typography variant="h6">
          <strong>{product.price}</strong>
        </Typography>
      </CardContent>
      <CardActionArea></CardActionArea>
    </Card>
  );
};

export default Product;
