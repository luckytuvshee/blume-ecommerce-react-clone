import React from "react";
import { connect } from "react-redux";
import ProductItem from "../ProductItem";
import "./style.scss";

interface Props {
  product: {
    products: [];
    loading: boolean;
  };
}

const Products: React.FC<Props> = ({ product: { products, loading } }) => {
  return !loading ? (
    <div className="products">
      {products.map((product: any) => {
        return <ProductItem product={product} key={product.id} />;
      })}
    </div>
  ) : (
    <p>Loading</p>
  );
};

const mapStateToProps = (state: any) => ({
  product: state.product,
});

export default connect(mapStateToProps, {})(Products);
