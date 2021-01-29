import React from "react";
import MainLayout from "../layout/MainLayout";
import Products from "../Product/Products/index";
import "./style.scss";

const Home = () => {
  return (
    <MainLayout>
      <div className="home">
        <Products />
      </div>
    </MainLayout>
  );
};

export default Home;
