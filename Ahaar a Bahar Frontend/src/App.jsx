import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./Body";
import Home from "./components/Home";
import { Provider } from "react-redux";
import appstore from "./components/reduxStore/appstore";
import Cart from "./components/Cart";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import User from "./components/User";
import CusinePage from "./components/CusinePage";
import "./App.css";
import RestaurantCard from "./components/secondaryComponents/RestaurantCard";
import Restaurant from "./components/Restaurant";
const App = () => {
  let scrollContainer = document.querySelector(".toprestaurant");
  let backbtn = document.querySelector(".arrowleft");
  let nextbtn = document.querySelector(".arrowright");
  if (scrollContainer !== null) {
    scrollContainer.addEventListener("wheel", (e) => {
      e.preventDefault();
      scrollContainer.scrollLeft += e.deltaY;
    });

    nextbtn.addEventListener("click", () => {
      scrollContainer.style.scrollBehaviour = "smooth";
      scrollContainer.scrollLeft -= 350;
    });

    backbtn.addEventListener("click", () => {
      scrollContainer.style.scrollBehaviour = "smooth";
      scrollContainer.scrollLeft += 350;
    });
  }
  const approuter = createBrowserRouter([
    {
      path: "/",
      element: <SignIn />,
    },
    {
      path: "/create-account",
      element: <Register />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    { path: "/user", element: <User /> },
    {
      path: "/in",
      element: <Body />,
      children: [
        { path: "/in", element: <Home /> },
        {
          path: "/in/cart",
          element: <Cart />,
        },
        {
          path: "/in/cuisine/collections/:cuisineType/*",
          element: <CusinePage />,
        },
        {
          path: "/in/restaurant/:res_id",
          element: <Restaurant />,
        },
      ],
    },
  ]);

  return (
    <div>
      <Provider store={appstore}>
        <>
          <RouterProvider router={approuter}></RouterProvider>
        </>
      </Provider>
    </div>
  );
};
export default App;
