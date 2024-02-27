import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { cuisineapi } from "../utils/swiggyofficialapis";
import axios from "axios";

const CusinePage = () => {
  const { cuisineType } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const objectparams = Object.fromEntries(queryParams.entries());
  console.log(objectparams);

  console.log(cuisineType);

  useEffect(() => {
    const api = `${cuisineapi}${objectparams.collection_id}&tags=${objectparams.tags}&sortBy=&filters=&type=${objectparams.type}&offset=0&page_type=null`;
    console.log(api);
    axios
      .get(api)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return <div className="pt-20">{cuisineType}</div>;
};

export default CusinePage;
