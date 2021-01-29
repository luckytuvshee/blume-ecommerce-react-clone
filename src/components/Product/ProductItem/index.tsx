import React from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";

interface Props {
  product: any;
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const history = useHistory();

  return (
    <div className="product-item">
      <div onClick={() => console.log("kkk")} className="bottom-text">
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
