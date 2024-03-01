import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { restaurantapi } from "../utils/swiggyofficialapis";
import { useDispatch, useSelector } from "react-redux";
import { addRestaurantData } from "./reduxStore/data.slice";

const Restaurant = () => {
  const { res_id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((appstore) => appstore.data.restaurantData);
  const resdata = data[res_id];
  console.log(res_id);

  useEffect(() => {
    function fetchdata() {
      axios
        .get(restaurantapi(res_id))
        .then((result) => {
          const key = res_id;
          const data = result.data.data.cards;
          dispatch(addRestaurantData({ key, data }));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (!data[res_id]) {
      fetchdata(); //Caching api calls or reducing api calls
    }
  });

  return resdata ? (
    <div className="min-h-screen shadow-xl pt-24 px-[10%] min-w-[2300px] ">
      <section>
        <section>
          <section>
            <section>
              <h1>{resdata[0].card.card.info.name}</h1>
            </section>
            <section className="flex">
              {resdata[0].card.card.info.cuisines.map((item) => (
                <h1 key={item}>{item}</h1>
              ))}
            </section>
            <section>
              <h1></h1>
              <h1>{resdata[0].card.card.info.sla.lastMileTravel}</h1>
            </section>
            <section>
              <h1>{resdata[0].card.card.info.expectationNotifiers[0].Text}</h1>
            </section>
          </section>
        </section>
      </section>
    </div>
  ) : null;
};

export default Restaurant;
