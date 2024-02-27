import React from "react";
import { swiggyImageServer } from "../../utils/swiggyofficialapis";

const RestaurantCard = ({ item }) => {
  return (
    <div className="">
      {console.log(item.info.name)}
      <div>
        <img
          src={`${swiggyImageServer}fl_lossy,f_auto,q_auto,w_288,h_360/${item.info.cloudinaryImageId}`}
          alt={`${item.info.name}`}
        />
      </div>

      <section>
        <h1>{item.info.name}</h1>
      </section>

      <section className="flex">
        <h1>{item.info.avgRating}</h1>
        <h1>{item.info.sla.deliveryTime}</h1>
      </section>

      <section className="flex flex-wrap">
        {item.info.cuisines.map((item) => (
          <h2>{item}</h2>
        ))}
      </section>
    </div>
  );
};

export default RestaurantCard;
