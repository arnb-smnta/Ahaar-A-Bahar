import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RestaurantCard from "../secondaryComponents/RestaurantCard";

const MainContainer = () => {
  const restaurantItems = useSelector((appstore) => appstore.data.homePageData);
  /*const totalHeight =
    restaurantItems.data.cards[4].card.card.gridElements.infoWithStyle
      .restaurants.length;*/
  return restaurantItems ? (
    <div className="shadow-xl min-h-[400px]">
      <div>
        <h1>{restaurantItems.data.cards[2].card.card.title}</h1>
      </div>
      <div className="flex flex-wrap max-h-[400px]">
        {restaurantItems.data.cards[4].card.card.gridElements.infoWithStyle.restaurants.map(
          (item) => (
            <Link key={item.info.id} to={`/in/restaurant/${item.info.id}`}>
              <RestaurantCard item={item} />
            </Link>
          )
        )}
      </div>
    </div>
  ) : null;
};

export default MainContainer;
