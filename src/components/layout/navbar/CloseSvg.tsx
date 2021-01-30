import React from "react";

interface Props {
  deleteBasketProduct: (product_id: string) => void;
  product_id: string;
}

const CloseSvg: React.FC<Props> = ({ deleteBasketProduct, product_id }) => {
  const clickHandler = () => {
    deleteBasketProduct(product_id);
  };

  return (
    <svg
      onClick={() => clickHandler()}
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentcolor"
      strokeWidth="3"
      className="close-button"
    >
      <path d="M1.0606601717798212 1.0606601717798212 L14.939339828220179 14.939339828220179"></path>
      <path d="M14.939339828220179 1.0606601717798212 L1.0606601717798212 14.939339828220179"></path>
    </svg>
  );
};

export default CloseSvg;
