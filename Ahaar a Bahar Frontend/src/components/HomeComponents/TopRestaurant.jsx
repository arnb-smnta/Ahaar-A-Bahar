import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { swiggyImageServer } from "../../utils/swiggyofficialapis";
import { MdOutlineStarOutline } from "react-icons/md";

const TopRestaurant = () => {
  const toprestaurantitems = useSelector(
    (appstore) => appstore.data.homePageData
  );
  return toprestaurantitems ? (
    <div className="mt-12">
      <div>
        <h1 className="text-3xl font-bold font-serif">
          {toprestaurantitems.data.cards[1].card.card.header.title}
        </h1>
      </div>
      <div className="md:h-[400px] shadow-lg flex overflow-x-auto min-w-[1800px]">
        {toprestaurantitems.data.cards[1].card.card.gridElements.infoWithStyle.restaurants.map(
          (item) => (
            <Link key={item.info.id} className="flex-none">
              <div className="h-full  ml-8 px-4 min-w-[350px] max-w-[350px] py-4">
                <div className="h-[50%]">
                  <img
                    className="h-[100%] w-[100%] rounded-lg"
                    src={`${swiggyImageServer}${item.info.cloudinaryImageId}`}
                    alt=""
                  />
                </div>
                <div className="">
                  <section>
                    <h1 className="font-bold text-2xl font-serif">
                      {item.info.name}
                    </h1>
                  </section>
                  <section className="flex text-xl ">
                    <h2 className="flex ">
                      <MdOutlineStarOutline className="mt-1" />
                      {item.info.avgRatingString} .
                    </h2>
                    <h2 className="pl-4">{item.info.sla.slaString}</h2>
                  </section>
                  <section className="text-xl text-gray-500 flex">
                    {item.info.cuisines.map((item, index) => (
                      <h1 className="pl-1" key={index}>
                        {item}
                      </h1>
                    ))}
                  </section>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  ) : null;
};

export default TopRestaurant;
