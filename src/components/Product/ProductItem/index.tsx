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
    <div className="product-item">
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
          alt={product.title}
          className="lazyload"
          src="https://cdn.shopify.com/s/files/1/0003/4580/0755/products/BLUMEMAY2020-Daydreamer_1_880x800.jpg?v=1596416050"
        />
      </div>
      <span onClick={() => history.push(`/product/${product.slug}`)}>
        <h3
          style={{
            fontFamily: "ValueSerif",
            textAlign: "center",
          }}
        >
          Daydreamer Face Wash
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h5 style={{ margin: "2px 0" }}>Super Gentle Face Wash</h5>
          <span>$ 16 USD</span>
        </div>
      </span>
    </div>
  );
};

export default ProductItem;
