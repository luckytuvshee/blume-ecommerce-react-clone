import React from "react";
import { connect } from "react-redux";
import BasketItem from "./BasketItem";
import { updateQuantity, deleteBasketProduct } from "../../../actions/baskets";

interface Props {
  basket: {
    baskets: Object[];
    loading: boolean;
  };
  basketOpen: boolean;
  updateQuantity: (quantity: number, product_id: string) => void;
  deleteBasketProduct: (product_id: string) => void;
  closeBasket: () => void;
}

const Basket: React.FC<Props> = ({
  basket: { baskets, loading },
  basketOpen,
  updateQuantity,
  deleteBasketProduct,
  closeBasket,
}) => {
  return (
    <div
      style={{ visibility: basketOpen ? "visible" : "hidden" }}
      className="basket-container"
    >
      <div className="basket">
        <div className="basket-header">
          <div>
            <h1>Your Basket</h1>
            <div className="chevron" onClick={closeBasket}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="16"
                height="16"
                fill="none"
                stroke="currentcolor"
                strokeWidth={2}
                style={{ overflow: "visible", transform: "rotate(180deg)" }}
              >
                <path d="M5 1.0606601717798212 L11.939339828220179 8 L5 14.939339828220179"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="basket-content">
          {baskets.length === 0 ? (
            <p className="basket-empty">Your basket is empty</p>
          ) : (
            baskets.map((basket: any) => (
              <BasketItem
                key={basket.id}
                basket={basket}
                closeBasket={closeBasket}
                updateQuantity={updateQuantity}
                deleteBasketProduct={deleteBasketProduct}
              />
            ))
          )}
          <div className="subtotal">
            <p>Subtotal</p>
            <p>
              $
              {baskets
                .reduce((acc: any, item: any) => {
                  return acc + item.price * item.quantity;
                }, 0)
                .toFixed(2)}
              USD
            </p>
          </div>
          <div className="checkout">Checkout</div>
        </div>
      </div>
      <div onClick={closeBasket} className="overlay"></div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  basket: state.basket,
});

export default connect(mapStateToProps, {
  updateQuantity,
  deleteBasketProduct,
})(Basket);
