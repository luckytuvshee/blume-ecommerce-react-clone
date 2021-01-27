import React from "react";

interface Props {
  basketOpen: boolean;
  closeBasket: () => void;
}

const Basket: React.FC<Props> = ({ basketOpen, closeBasket }) => {
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
          <p className="basket-empty">Your basket is empty</p>
          <div className="subtotal">
            <p>Subtotal</p>
            <p>$0 USD</p>
          </div>
          <div className="checkout">Checkout</div>
        </div>
      </div>
      <div onClick={closeBasket} className="overlay"></div>
    </div>
  );
};

export default Basket;
