import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { restaurantapi } from "../utils/swiggyofficialapis";

const Restaurant = () => {
  const { res_id } = useParams();
  console.log(res_id);
  useEffect(() => {
    axios
      .get(restaurantapi(res_id))
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return <div>{res_id}</div>;
};

export default Restaurant;
