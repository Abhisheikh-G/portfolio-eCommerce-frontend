import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message/Message";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { saveShippingAddress } from "../redux/actions/cartActions";
import { useRouter } from "next/router";
import stateData from "../public/data.json";
import CheckoutStepper from "../components/CheckoutSteps/CheckoutStepper";
import { FormControl, InputLabel, FormLabel } from "@material-ui/core";

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

const Shipping = () => {
  const classes = useStyles();
  const { shippingAddress } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const router = useRouter();
  const [city, setCity] = useState(shippingAddress.city);
  const [state, setState] = useState(shippingAddress.state);
  const [address, setAddress] = useState(shippingAddress.address);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userInfo) {
      router.push("/signin");
    }
  }, [router, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, state, postalCode }));
    router.push("/payment");
  };

  return (
    <>
      <Container maxWidth="sm" style={{ marginTop: "24px" }}>
        <CheckoutStepper stepIndex={1} />
      </Container>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <div className={classes.paper}>
          <Box display="flex" width="100%" justifyContent="flex-start">
            <FormLabel component="legend">Shipping Address</FormLabel>
          </Box>

          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="address"
                  name="address"
                  variant="outlined"
                  required
                  fullWidth
                  id="address"
                  label="Enter Address"
                  autoFocus
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="city"
                  label="Enter City"
                  name="city"
                  value={city}
                  autoComplete="city"
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="state">Select State</InputLabel>
                  <Select
                    required
                    fullWidth
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    {stateData.map((st) => (
                      <MenuItem
                        style={{ backgroundColor: "#fff" }}
                        value={st.State}
                      >
                        {st.Code}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="postal"
                  label="Enter Postal Code"
                  name="postalCode"
                  value={postalCode}
                  autoComplete="pcode"
                  onChange={(e) => setPostalCode(e.target.value)}
                />
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

export default Shipping;
