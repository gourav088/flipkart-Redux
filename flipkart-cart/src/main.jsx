import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'

import { Provider } from "react-redux";
import { MyFlipkartReducerStore } from './components/store';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RenderList from './components/RenderList';
import WishList from './components/WishList';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RenderList />,
  },
  // {
  //   path: "Wishlist",
  //   element: <WishList />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={MyFlipkartReducerStore}>
    <RouterProvider router={router}>
      <RenderList />
    </RouterProvider>
  </Provider>
);