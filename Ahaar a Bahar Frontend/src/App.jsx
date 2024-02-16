import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./Body";
import Home from "./components/Home";
import { Provider } from "react-redux";
import appstore from "./components/reduxStore/appstore";

const App = () => {
  const approuter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [{ path: "/", element: <Home /> }],
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
