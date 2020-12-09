import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Link from "../../src/Link";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import WorkIcon from "@material-ui/icons/Work";
import Container from "@material-ui/core/Container";
import clsx from "clsx";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Hidden,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userActions";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    height: 100,
    justifyContent: "center",
  },
  list: {
    width: 240,
    backgroundColor: theme.palette.primary.main,
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  toolbarBg: {
    backgroundColor: theme.palette.primary.main,
  },
  link: {
    textDecoration: "none",

    "&:hover": {
      textDecoration: "none",
    },
  },
  headerTitle: {
    display: "inline",
    color: theme.palette.primary.contrastText,
  },
  tabs: {
    marginLeft: "auto",
    color: theme.palette.common.white,
  },
  li: {
    backgroundColor: theme.palette.common.white,
  },
  menu: {
    marginTop: "2.1rem",
    marginLeft: ".5rem",
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 5,
    top: 25,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

export default function Header() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="static" className={classes.header}>
          <Toolbar classes={{ root: classes.toolbarBg }} disableGutters>
            <Container maxWidth="lg" className={classes.headerContainer}>
              <Link href="/">
                <Typography
                  variant="h2"
                  className={clsx([classes.headerTitle, classes.link])}
                  gutterBottom={false}
                >
                  ProShop
                </Typography>
              </Link>

              <Tabs
                className={classes.tabs}
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
                indicatorColor="primary"
              >
                {userInfo ? (
                  <Tab
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    label={`${userInfo.name}'s Profile`}
                    onClick={handleClick}
                  />
                ) : (
                  <Tab
                    className={classes.link}
                    component={Link}
                    href="/signin"
                    label="Sign In"
                    {...a11yProps(0)}
                  />
                )}

                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  classes={{ list: classes.li }}
                  open={anchorEl}
                  className={classes.menu}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <Link href="/profile">Profile</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link href="/profile">Profile</Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                </Menu>
                <Link href="/cart">
                  <IconButton aria-label="cart" label="CART">
                    <StyledBadge badgeContent={4} color="secondary">
                      <ShoppingCartIcon
                        fontSize="large"
                        style={{ color: "#fff" }}
                      />
                    </StyledBadge>
                  </IconButton>
                </Link>
              </Tabs>
            </Container>
          </Toolbar>
        </AppBar>
      </div>
    </React.Fragment>
  );
}
