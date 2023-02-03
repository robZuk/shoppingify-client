import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { getProducts } from "../../features/products/productSlice";

function Dashboard() {
  const dispatch = useDispatch();

  const searchValue = "";

  const {
    products,
    isLoading: productsIsLoading,
    isError: productsIsError,
    message: productsMessage,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts(searchValue ? searchValue : ""));
  }, []);

  console.log(products);

  return (
    <div>
      <div>Dashboard</div>
      <Outlet />
    </div>
  );
}

export default Dashboard;
