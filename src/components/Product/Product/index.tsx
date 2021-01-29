import React, { useState } from "react";
import { connect } from "react-redux";
import MainLayout from "../../layout/MainLayout";
import "./style.scss";

interface Props {
  product: any;
  match: {
    params: {
      id: string;
    };
  };
}

const Product: React.FC<Props> = ({
  product: { products, loading },
  match: {
    params: { id },
  },
}) => {
  const [product] = products.filter((p: any) => p.slug === id);
  const [count, setCount] = useState<number>(1);

  const addToBasket = (e: any) => {
    e.preventDefault();
  };

  return product ? (
    <MainLayout>
      <div className="product">
        <div className="product-details">
          <div>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
          </div>
          <form onSubmit={addToBasket} className="basket">
            <h4 style={{ fontFamily: "Apercu" }}>${product.price} USD</h4>
            <div className="button-group">
              <div className="quantity">
                <span
                  onClick={() => count > 1 && setCount(count - 1)}
                  className="minus"
                >
                  -
                </span>
                <input
                  type="number"
                  min={1}
                  max={100000}
                  value={count}
                  required
                  onChange={(e: any) => setCount(e.target.value)}
                />
                <span onClick={() => setCount(count + 1)} className="plus">
                  +
                </span>
              </div>
              <button type="submit" className="add-to-basket">
                Add to Basket
              </button>
            </div>
          </form>
        </div>
        <div className="product-image">
          <img
            alt={product.title}
            className="lazyload"
            src="https://cdn.shopify.com/s/files/1/0003/4580/0755/products/BLUMEMAY2020-Daydreamer_1_880x800.jpg?v=1596416050"
          />
        </div>
      </div>
    </MainLayout>
  ) : (
    <p>loading</p>
  );
};

const mapStateToProps = (state: any) => ({
  product: state.product,
});

export default connect(mapStateToProps, {})(Product);
