import React from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";

interface Props {
  product: any;
  basketOpen: boolean;
  toggleBasket: () => void;
  addProductToBasket: (product_id: string, quantity: number) => void;
}

const ProductItem: React.FC<Props> = ({
  product,
  basketOpen,
  toggleBasket,
  addProductToBasket,
}) => {
  const history = useHistory();

  const enableScroll = () => {
    document.body.style.position = "relative";
    document.body.style.overflow = "auto";
  };

  const disableScroll = () => {
    document.body.style.position = "fixed";
    document.body.style.overflow = "scroll";
  };

  return (
    <div key={product.id} className="product-item">
      <div
        onClick={() => {
          addProductToBasket(product.id, 1);

          const basket = document.querySelector(".basket") as HTMLElement;
          basket.classList.toggle("basket-open");

          if (basketOpen) {
            enableScroll();
          } else {
            disableScroll();
          }
          toggleBasket();
        }}
        className="bottom-text"
      >
        Add to cart
      </div>
      <div
        className="image-wrapper"
        onClick={() => history.push(`/product/${product.slug}`)}
      >
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
      <span onClick={() => history.push(`/product/${product.slug}`)}>
        <h3
          style={{
            fontFamily: "ValueSerif",
            textAlign: "center",
          }}
        >
          {product.title}
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h5 style={{ margin: "2px 0" }}>{product.description}</h5>
          <span>$ {product.price.toFixed(2)} USD</span>
        </div>
      </span>
    </div>
  );
};

export default ProductItem;
