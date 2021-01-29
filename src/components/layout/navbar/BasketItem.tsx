import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CloseSvg from "./CloseSvg";

interface Props {
  basket: any;
  closeBasket: () => void;
}

const BasketItem: React.FC<Props> = ({ basket, closeBasket }) => {
  const history = useHistory();

  const updateQuantity = (quantity: number) => {
    if (quantity <= 0) return;

    console.log(quantity);
  };

  return (
    <div className="basket-item">
      <div
        onClick={() => {
          closeBasket();
          history.push(`/product/${basket.slug}`);
        }}
        className="image"
      >
        <img
          alt={basket.title}
          src="https://cdn.shopify.com/s/files/1/0003/4580/0755/products/BLUMEMAY2020-Daydreamer_1_880x800.jpg?v=1596416050"
        />
      </div>
      <div className="content">
        <div className="header">
          <p
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              closeBasket();
              history.push(`/product/${basket.slug}`);
            }}
          >
            {basket.title}
          </p>
          <CloseSvg />
        </div>
        <div className="bottom">
          <div className="quantity">
            <span
              onClick={() => updateQuantity(basket.quantity - 1)}
              className="minus"
            >
              -
            </span>
            <span className="product-quantity">{basket.quantity}</span>
            <span
              onClick={() => updateQuantity(basket.quantity + 1)}
              className="plus"
            >
              +
            </span>
          </div>
          <p>${basket.price * basket.quantity} USD</p>
        </div>
      </div>
    </div>
  );
};

export default BasketItem;
