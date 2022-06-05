import React from "react";
import path from "path";
import fs from "fs/promises";
import process from "process";

const ProductDetail = (props) => {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h4>{loadedProduct.title}</h4>
      <p>{loadedProduct.description}</p>
    </div>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const readFile = await fs.readFile(filePath);
  const data = JSON.parse(readFile);

  return data;
};

export const getStaticPaths = async () => {
  const data = await getData();
  const ids = data.products.map((product) => ({ params: { pid: product.id } }));
  return {
    fallback: true,
    paths: ids,
  };
};

export const getStaticProps = async (context) => {
  const pId = context.params.pid;
  const data = await getData();

  const loadedProduct = data.products.find((product) => product.id === pId);

  if (!loadedProduct) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      loadedProduct,
    },
  };
};

export default ProductDetail;
