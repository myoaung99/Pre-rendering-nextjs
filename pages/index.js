import React from "react";

import fs from "fs/promises";
import process from "process";
import path from "path";
import Link from "next/link";

const Home = (props) => {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const readedFile = await fs.readFile(filePath);
  const data = JSON.parse(readedFile);

  if (!data) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  if (data.products.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
};

export default Home;
