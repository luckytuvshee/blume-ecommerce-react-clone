import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../../actions/products";
import ProductItem from "../ProductItem";
import "./style.scss";

interface Props {
  getProducts: () => void;
  product: {
    products: [];
    loading: boolean;
  };
}

const Products: React.FC<Props> = ({
  getProducts,
  product: { products, loading },
}) => {
  useEffect(() => {
    getProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

export default connect(mapStateToProps, { getProducts })(Products);
