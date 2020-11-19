import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { listProducts } from "../redux/actions/productionActions";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Home from "../components/Home/Home";

const Index = ({ products }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="lg">
        <Home products={products} />
      </Container>
    </>
  );
};

export default Index;

export const getStaticProps = async (context) => {
  const res = await fetch("http://localhost:5000/api/products");
  const data = await res.json();

  return { props: { products: data } };
};
