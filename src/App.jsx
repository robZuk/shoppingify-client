import React, { useState, lazy } from "react";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Routes, Route, useLocation } from "react-router-dom";
// import Navigation from "./components/Navigation";
// import Products from "./components/main/Products";
// import History from "./components/main//History";
// import Stats from "./components/main/Stats";
import Main from "./components/Main";
import Dashboard from "./Dashboard";
// import List from "./components/sidebar/list/List";
// import Sidebar from "./components/sidebar/Sidebar";
// import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Dupa from "./components/Dupa";
// import { Context } from "./context";

// const NewProduct = lazy(() => import("./components/sidebar/NewProduct"));
// const ProductDeleteModal = lazy(() =>
//   import("./components/sidebar/list/ProductDeleteModal")
// );
// const ProductDetail = lazy(() => import("./components/sidebar/ProductDetail"));
// const ListDetail = lazy(() => import("./components/sidebar/list/ListDetail"));

function App() {
  // const location = useLocation();
  // const [modalIsOpen, setModalIsOpen] = useState(false);

  // const [keyword, setKeyword] = useState("");

  return (
    <>
      <div className="App">
        {/* <ProductDeleteModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        /> */}
        {/* <Context.Provider value={{ keyword, setKeyword }}> */}
        {/* <div className="wrapper">
            <Navigation />
            <div className="wrapper-inner"> */}
        <Routes>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="dupa" element={<Dupa />}></Route>
          <Route path="/" element={<Main />}></Route>
        </Routes>
        {/* </Context.Provider> */}
      </div>
    </>
  );
}

export default App;
