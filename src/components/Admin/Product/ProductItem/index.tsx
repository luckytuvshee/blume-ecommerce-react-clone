import React from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";
import Swal from "sweetalert2";

interface Props {
  product: any;
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const history = useHistory();

  const deleteProduct = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", `${product.title} deleted`, "success");
      }
    });
  };

  return (
    <div className="admin-product-item">
      <div
        onClick={() => {
          history.push(`/product/${product.slug}`);
        }}
        className="image"
      >
        <img
          alt={product.title}
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
              history.push(`/product/${product.slug}`);
            }}
          >
            {product.title}
          </p>
        </div>
        <div className="bottom">
          <p>{product.description}</p>
          <div className="bottom-info">
            <p>${product.price.toFixed(2)} USD</p>
            <div className="action">
              <p
                onClick={() =>
                  history.push(`/admin/product/edit/${product.slug}`)
                }
                className="edit"
              >
                edit
              </p>
              <p onClick={() => deleteProduct()} className="delete">
                delete
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
