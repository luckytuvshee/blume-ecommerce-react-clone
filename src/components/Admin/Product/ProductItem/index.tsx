import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import "./style.scss";

interface Props {
  deleteProduct: (id: string) => Promise<boolean>;
  product: any;
}

const ProductItem: React.FC<Props> = ({ deleteProduct, product }) => {
  const history = useHistory();

  const removeProduct = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (await deleteProduct(product.id)) {
          Swal.fire("Deleted!", `${product.title} deleted`, "success");
        }
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
              <p onClick={() => removeProduct()} className="delete">
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
