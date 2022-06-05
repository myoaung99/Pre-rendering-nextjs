import React, { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const LastSale = (props) => {
  const [sales, setSales] = useState(props.sales);
  const { data, error } = useSWR(
    "https://nextjs-course-e05eb-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const transformedData = [];
      for (const key in data) {
        transformedData.push({
          id: key,
          name: data[key].userName,
          amount: data[key].amount,
        });
      }

      setSales(transformedData);
    }
  }, [data]);

  if (error) {
    return <p>Error!</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {sales.map((sale) => (
        <p key={sale.id}>{sale.name}</p>
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  return fetch(
    "https://nextjs-course-e05eb-default-rtdb.firebaseio.com/sales.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const transformedData = [];
      for (const key in data) {
        transformedData.push({
          id: key,
          name: data[key].userName,
          amount: data[key].amount,
        });
      }

      return {
        props: {
          sales: transformedData,
        },
        revalidate: 10,
      };
    });
};

export default LastSale;
