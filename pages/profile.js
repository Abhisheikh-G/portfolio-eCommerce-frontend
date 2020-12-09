import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  getUserDetails,
  updateUserProfile,
} from "../redux/actions/userActions";
import Message from "../components/Message/Message";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://localhost:5000/">
        ProShop
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  orders: {
    margin: theme.spacing(8, 4),
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push("/signin");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, router, userInfo, user]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) setMessage("The passwords do not match.");
    else dispatch(updateUserProfile({ id: user._id, name, email, password }));
  };

  const form = (
    <div className={classes.paper}>
      <Typography component="h1" variant="h4">
        Update Profile
      </Typography>
      {error && <Message severity="error">{error}</Message>}
      {message && <Message severity="error">{message}</Message>}
      {success && <Message severity="success">Profile Updated</Message>}

      <form className={classes.form} onSubmit={handleUpdate}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirm-password"
          autoComplete="current-password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          // disabled={email.length === 0 || password.length === 0}
          className={classes.submit}
        >
          Update
        </Button>
        {/* <Grid container>
      <Grid item xs>
        <Link href="#" variant="body2">
          Forgot password?
        </Link>
      </Grid>
      <Grid item>
        <Link href="http://localhost:5000/signup" variant="body2">
          {"Don't have an account? Sign Up"}
        </Link>
      </Grid>
    </Grid> */}
        <Box mt={5}>
          <Copyright />
        </Box>
      </form>
    </div>
  );

  const orders = (
    <>
      <Box className={classes.orders} display="flex" justifyContent="center">
        <Typography variant="h4">Your Orders:</Typography>
      </Box>
    </>
  );

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid item sm={4} md={3}>
        {form}
      </Grid>
      <Grid item sm={8} md={9}>
        {orders}
      </Grid>
    </Grid>
  );
}
