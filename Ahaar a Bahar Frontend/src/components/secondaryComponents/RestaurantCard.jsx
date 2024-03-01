import React, { useEffect, useState } from "react";
import { swiggyImageServer } from "../../utils/swiggyofficialapis";
import { MdOutlineStarOutline } from "react-icons/md";

const RestaurantCard = ({ item }) => {
  const [screenwidth, setscreenwidth] = useState(0);
  const cardwidth = Math.round((screenwidth - 0.2 * screenwidth) / 5);

  useEffect(() => {
    setscreenwidth(window.innerWidth);
  }, []);

  return (
    <div className={`mx-6 shadow-xl my-4 w-[${cardwidth}px] p-4 h-[550px]`}>
      <div className="p-4">
        <img
          src={`${swiggyImageServer}fl_lossy,f_auto,q_auto,w_288,h_360/${item.info.cloudinaryImageId}`}
          alt={`${item.info.name}`}
        />
      </div>

      <section className="mt-2">
        <h1 className="font-bold text-xl">{item.info.name}</h1>
      </section>

      <section className="flex mt-2  text-xl">
        <section className="flex">
          <MdOutlineStarOutline className="mt-1" />

          <h1>{item.info.avgRating}</h1>
        </section>
        <h1 className="ml-4">{item.info.sla.deliveryTime} mins</h1>
      </section>

      <section className="flex flex-wrap max-w-[100%]">
        {item.info.cuisines.map((item, index) => (
          <h2 key={index} className="pl-2">
            {item}
          </h2>
        ))}
      </section>
    </div>
  );
};

export default RestaurantCard;
