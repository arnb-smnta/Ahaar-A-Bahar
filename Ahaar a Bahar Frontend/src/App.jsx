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
import Restaurant from "./components/Restaurant";
import ErrorComponent from "./components/ErrorComponent";

import Help from "./components/Help";

import Legal from "./components/HelpPageComponents/Legal";
import FAQs from "./components/HelpPageComponents/FAQs";
import PartneronBoarding from "./components/HelpPageComponents/PartneronBoarding";
const App = () => {
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
    {
      path: "/support",
      element: <Help />,
      children: [
        { path: "/support/partner-onboarding", element: <PartneronBoarding /> },
        {
          path: "/support/legal",
          element: <Legal />,
        },
        {
          path: "/support/faq",
          element: <FAQs />,
        },
      ],
    },
    {
      path: "*",
      element: <ErrorComponent />,
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
