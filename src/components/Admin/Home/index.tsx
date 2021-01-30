import React from "react";
import MainLayout from "../layout/MainLayout";
import Products from "../Product/Products";
import "./style.scss";

const Home = () => {
  return (
    <MainLayout>
      <div className="admin-home">
        <Products />
      </div>
    </MainLayout>
  );
};

export default Home;