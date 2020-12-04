import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "../src/Link";
import {
  Grid,
  Box,
  Typography,
  List,
  Form,
  Button,
  Container,
  FormControl,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import Image from "next/image";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: "1rem",
  },
  removeIcon: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const Cart = (props) => {
  const { id, qty } = props;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const handleRemoveItem = (item) => {
    const remove = confirm(
      `Are you sure you want to remove ${item.name} from your cart?`
    );
    if (remove) {
      dispatch(removeFromCart(item.product));
    }
  };

  const handleCheckout = () => {
    router.push(`/login?redirect=shipping`);
  };

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item md={8}>
          <Typography className={classes.margin} variant="h4">
            Shopping Cart
          </Typography>
          {cartItems.length === 0 && (
            <Typography variant="h5">Your cart is empty.</Typography>
          )}
          {cartItems.map((item) => (
            <Grid style={{ marginTop: "1rem" }} spacing={2} container>
              <Grid item xs={3}>
                <Image
                  src={item.image}
                  height={125}
                  width={125}
                  alt={item.name}
                />
              </Grid>
              <Grid item xs={3}>
                <Link href={`/products/${item.product}`}>
                  <Typography variant="body1">{item.name}</Typography>
                </Link>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1">${item.price}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Grid
                  item
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <FormControl>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      fullWidth={true}
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((q) => (
                        <MenuItem value={q + 1}>{q + 1}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <ClearIcon
                  className={classes.removeIcon}
                  onClick={() => handleRemoveItem(item)}
                  fontSize="medium"
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item md={4}>
          <Typography className={classes.margin} variant="h4">
            Subtotals ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
            items
          </Typography>
          <Typography className={classes.margin} variant="h4">
            $
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
          </Typography>
          <Button
            variant="outlined"
            fullWidth={true}
            className={classes.margin}
            disabled={cartItems.length === 0}
            onClick={handleCheckout}
          >
            PROCEED TO CHECKOUT
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;

export const getServerSideProps = async (context) => {
  if (context.query.id)
    return { props: { id: context.query.id, qty: context.query.qty } };
  else return { props: {} };
};
