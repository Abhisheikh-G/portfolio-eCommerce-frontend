import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message/Message";
import CheckoutStepper from "../components/CheckoutSteps/CheckoutStepper";
import { createOrder } from "../redux/actions/orderActions";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Divider } from "@material-ui/core";
import { useRouter } from "next/router";

const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

function PlaceOrder() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((st) => st.userLogin);
  const { shippingAddress } = cart;
  const { order, success, error } = useSelector((st) => st.orderCreate);
  const addresses = [
    shippingAddress.address,
    shippingAddress.city,
    shippingAddress.state,
    shippingAddress.postalCode,
    "USA",
  ];
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  const { cartItems } = cart;

  cart.itemsPrice = cartItems.reduce(
    (acc, item) => (acc + item.price) * item.qty,
    0
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 20;
  cart.taxPrice = Number(0.15 * cart.itemsPrice).toFixed(2);

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const handlePlaceOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  useEffect(() => {
    if (success) router.push(`/order/${order._id}`);
  }, [success, router]);

  return (
    <React.Fragment>
      <Box mt={2} />
      <Container maxWidth="sm">
        <CheckoutStepper stepIndex={3} />
      </Container>
      <Container maxWidth="xs">
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        {error && <Message severity="error">{error}</Message>}
        <List disablePadding>
          {cartItems.map((product) => (
            <ListItem className={classes.listItem} key={product.name}>
              <ListItemText primary={product.name} secondary={product.desc} />
              <Typography variant="body2">
                {product.qty} x ${product.price} = $
                {product.qty * product.price}
              </Typography>
            </ListItem>
          ))}
          <ListItem className={classes.listItem}>
            <ListItemText primary="Items" />
            <Typography variant="subtitle1" className={classes.total}>
              {formatter.format(cart.itemsPrice)}
            </Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary="Shipping" />
            <Typography variant="subtitle1" className={classes.total}>
              {formatter.format(cart.shippingPrice)}
            </Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary="Tax" />
            <Typography variant="subtitle1" className={classes.total}>
              {formatter.format(cart.taxPrice)}
            </Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" className={classes.total}>
              {formatter.format(cart.totalPrice)}
            </Typography>
          </ListItem>
        </List>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Shipping
            </Typography>
            <Typography gutterBottom>{userInfo.name}</Typography>
            <Typography gutterBottom>{addresses.join(", ")}</Typography>
          </Grid>
          <Grid item container direction="column" xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Payment details
            </Typography>
            <Grid container>
              {payments.map((payment) => (
                <React.Fragment key={payment.name}>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{payment.name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{payment.detail}</Typography>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
          <Grid item sm={12} style={{ marginBottom: "1rem" }}>
            <Button
              variant="outlined"
              disabled={cartItems.length === 0}
              onClick={handlePlaceOrder}
              fullWidth
            >
              Place Order
            </Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default PlaceOrder;
