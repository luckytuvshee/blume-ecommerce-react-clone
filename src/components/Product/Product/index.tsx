import React, { useState } from "react";
import { connect } from "react-redux";
import MainLayout from "../../layout/MainLayout";
import { addProductToBasket, toggleBasket } from "../../../actions/baskets";
import "./style.scss";

interface Props {
  product: any;
  basket: any;
  toggleBasket: () => void;
  addProductToBasket: (product_id: string, quantity: number) => void;
  match: {
    params: {
      id: string;
    };
  };
}

const Product: React.FC<Props> = ({
  product: { products, loading },
  basket: { basketOpen },
  toggleBasket,
  addProductToBasket,
  match: {
    params: { id },
  },
}) => {
  const [product] = products.filter((p: any) => p.slug === id);
  const [count, setCount] = useState<number>(1);

  const addToBasket = (e: any) => {
    e.preventDefault();
    addProductToBasket(product.id, count);

    const basket = document.querySelector(".basket") as HTMLElement;
    basket.classList.toggle("basket-open");

    if (basketOpen) {
      enableScroll();
    } else {
      disableScroll();
    }
    toggleBasket();

    setCount(1);
  };

  const enableScroll = () => {
    document.body.style.position = "relative";
    document.body.style.overflow = "auto";
  };

  const disableScroll = () => {
    document.body.style.position = "fixed";
    document.body.style.overflow = "scroll";
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
            style={{ display: product.url ? "block" : "none" }}
            alt={product.title}
            src={product.url}
          />
          <p
            className="no-image"
            style={{ display: product.url ? "none" : "flex" }}
          >
            No image
          </p>
        </div>
      </div>
    </MainLayout>
  ) : (
    <p>loading</p>
  );
};

const mapStateToProps = (state: any) => ({
  product: state.product,
  basket: state.basket,
});

export default connect(mapStateToProps, { addProductToBasket, toggleBasket })(
  Product
);
