import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message/Message";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { savePaymentMethod } from "../redux/actions/cartActions";
import { useRouter } from "next/router";
import stateData from "../public/data.json";
import CheckoutStepper from "../components/CheckoutSteps/CheckoutStepper";
import { FormControl, InputLabel } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    width: "100%",
  },
}));

const Payment = () => {
  const classes = useStyles();
  const { shippingAddress } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userInfo) {
      router.push("/signin");
    }
    if (!shippingAddress) {
      router.push("/shipping");
    }
  }, [router, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    router.push("/placeorder");
  };

  return (
    <>
      <Container maxWidth="sm" style={{ marginTop: "24px" }}>
        <CheckoutStepper stepIndex={2} />
      </Container>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <div className={classes.paper}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl component="fieldset">
                  <Box mt={2} />
                  <FormLabel component="legend">Payment Method</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <FormControlLabel
                      value="PayPal"
                      control={<Radio />}
                      checked
                      label="PayPal or Credit Card"
                    />
                    {/* <FormControlLabel
                      value="CreditCard"
                      control={<Radio />}
                      label="Credit Card"
                    /> */}
                  </RadioGroup>
                </FormControl>
              </Grid>

              {message && (
                <Grid item xs={12}>
                  <Message severity="error">{message}</Message>
                </Grid>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Submit Shipping Information
            </Button>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default Payment;
