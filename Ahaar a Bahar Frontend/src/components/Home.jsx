import axios from "axios";
import React, { useEffect, useState } from "react";
import { kolkata_home } from "../utils/swiggyofficialapis";

const Home = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get(kolkata_home)
      .then((res) => {
        console.log(res);
        setdata(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return <div>Home</div>;
};

/*const Home = () => {
  return <div>Home</div>;
};*/

export default Home;
