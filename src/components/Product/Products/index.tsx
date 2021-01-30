import React from "react";
import { connect } from "react-redux";
import ProductItem from "../ProductItem";
import { addProductToBasket, toggleBasket } from "../../../actions/baskets";
import "./style.scss";

interface Props {
  basket: any;
  product: {
    products: [];
    loading: boolean;
  };
  addProductToBasket: (product_id: string, quantity: number) => void;
  toggleBasket: () => void;
}

const Products: React.FC<Props> = ({
  basket: { basketOpen },
  product: { products, loading },
  addProductToBasket,
  toggleBasket,
}) => {
  return !loading ? (
    <div className="products">
      {products.map((product: any) => {
        return (
          <ProductItem
            product={product}
            key={product.id}
            basketOpen={basketOpen}
            toggleBasket={toggleBasket}
            addProductToBasket={addProductToBasket}
          />
        );
      })}
    </div>
  ) : (
    <p>Loading</p>
  );
};

const mapStateToProps = (state: any) => ({
  product: state.product,
  basket: state.basket,
});

export default connect(mapStateToProps, { addProductToBasket, toggleBasket })(
  Products
);
