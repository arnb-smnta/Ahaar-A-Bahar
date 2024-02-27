import React from "react";
import { useSelector } from "react-redux";
import { swiggyImageServer } from "../../utils/swiggyofficialapis";
import { Link } from "react-router-dom";

const ItemCarousel = () => {
  const carouselItems = useSelector((appstore) => appstore.data.homePageData);
  console.log(carouselItems);
  return carouselItems ? (
    <div>
      <div>
        <h1 className="text-3xl font-bold font-serif">
          {carouselItems.data.cards[0].card.card.header.title}
        </h1>
      </div>
      <div className="md:min-h-[250px] shadow-lg flex overflow-x-auto">
        {carouselItems.data.cards[0].card.card.gridElements.infoWithStyle.info.map(
          (items) => (
            <Link
              key={items.id}
              to={`/in/cuisine${items.action.link.replace(
                "https://www.swiggy.com",
                ""
              )}`}
              className="flex-none"
            >
              <div>
                <img
                  src={`${swiggyImageServer}fl_lossy,f_auto,q_auto,w_288,h_360/${items.imageId}`}
                  alt=""
                  className="w-full h-auto"
                />
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  ) : null;
};

export default ItemCarousel;
