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
import Image from "next/image";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Hidden,
  Badge,
  IconButton,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="static">
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
                <Tab
                  className={classes.link}
                  component={Link}
                  href="/signin"
                  label="Sign In"
                  {...a11yProps(0)}
                />

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
