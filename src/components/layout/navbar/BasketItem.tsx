import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CloseSvg from "./CloseSvg";

interface Props {
  basket: any;
  updateQuantity: (quantity: number, product_id: string) => void;
  deleteBasketProduct: (product_id: string) => void;
  closeBasket: () => void;
}

const BasketItem: React.FC<Props> = ({
  basket,
  updateQuantity,
  deleteBasketProduct,
  closeBasket,
}) => {
  const history = useHistory();

  const updateBasketQuantity = (quantity: number) => {
    if (quantity === -1 && basket.quantity <= 1) return;
    updateQuantity(quantity, basket.product_id);
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
          <CloseSvg
            product_id={basket.product_id}
            deleteBasketProduct={deleteBasketProduct}
          />
        </div>
        <div className="bottom">
          <div className="quantity">
            <span onClick={() => updateBasketQuantity(-1)} className="minus">
              -
            </span>
            <span className="product-quantity">{basket.quantity}</span>
            <span onClick={() => updateBasketQuantity(1)} className="plus">
              +
            </span>
          </div>
          <p>${(basket.price * basket.quantity).toFixed(2)} USD</p>
        </div>
      </div>
    </div>
  );
};

export default BasketItem;
