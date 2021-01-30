import React from "react";
import { connect } from "react-redux";
import ProductItem from "../ProductItem";
import { useHistory } from "react-router-dom";
import "./style.scss";

interface Props {
  product: any;
}

const Products: React.FC<Props> = ({ product: { products } }) => {
  const history = useHistory();

  return (
    <div className="admin-products">
      <h2
        onClick={() => history.push("/admin/product/create")}
        className="create-product"
      >
        Create Product
      </h2>
      {products.map((product: any) => (
        <ProductItem product={product} />
      ))}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  product: state.product,
});

export default connect(mapStateToProps, {})(Products);
