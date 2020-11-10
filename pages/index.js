import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { startClock } from "../redux/actions";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Home from "../components/Home/Home";

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startClock());
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="lg">
        <Home />
      </Container>
    </>
  );
};

export default Index;
