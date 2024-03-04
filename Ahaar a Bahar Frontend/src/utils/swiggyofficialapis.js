export const DelhiMorn =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
export const swiggyImageServer =
  "https://media-assets.swiggy.com/swiggy/image/upload/";
export const restaurantapi = (res_id) => {
  return `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7040592&lng=77.10249019999999&restaurantId=${res_id}&catalog_qa=undefined&submitAction=ENTER`;
};
export const cuisineapi =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&collection=";
export const supportapi = "https://www.swiggy.com/dapi/support/issues/";
