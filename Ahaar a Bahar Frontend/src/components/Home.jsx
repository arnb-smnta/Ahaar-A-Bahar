import React, { useEffect } from "react";
import ItemCarousel from "./HomeComponents/ItemCarousel";
import MainContainer from "./HomeComponents/MainContainer";
import TopRestaurant from "./HomeComponents/TopRestaurant";
import { DelhiMorn } from "../utils/swiggyofficialapis";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addHomePageData } from "./reduxStore/data.slice";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((appstore) => appstore.data.homePageData);

  useEffect(() => {
    function fetchData() {
      axios
        .get(DelhiMorn)
        .then((result) => {
          dispatch(addHomePageData(result.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (!data) fetchData(); //caching the api calls
  }, []);

  return (
    <div className="md:min-h-[1200px]  pt-24 px-[10%]  w-screen">
      <ItemCarousel />
      <TopRestaurant />
      <MainContainer />
    </div>
  );
};

export default Home;
