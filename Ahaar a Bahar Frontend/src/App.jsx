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
