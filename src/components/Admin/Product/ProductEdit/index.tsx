import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import MainLayout from "../../layout/MainLayout";
import { addProductToBasket, toggleBasket } from "../../../../actions/baskets";
import "./style.scss";

interface Props {
  product: any;
  basket: any;
  toggleBasket: () => void;
  addProductToBasket: (product_id: string, quantity: number) => void;
  match: {
    params: {
      id: string;
    };
  };
}

const ProductEdit: React.FC<Props> = ({
  product: { products, loading },
  match: {
    params: { id },
  },
}) => {
  const [product, setProduct] = useState<any>();
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const [p] = products.filter((p: any) => p.slug === id);
    setProduct(p);
  }, []);

  const previewImage = (e: any) => {
    const preview = document.querySelector(
      "#product-image"
    ) as HTMLImageElement;
    const image = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      preview.src = reader.result + "";
      setUrl(image.name);
    };
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    const body = {
      title,
      price,
      description,
      url: Date.now() + url,
    };

    console.log("body");
    console.log(body);
  };

  return product ? (
    <MainLayout>
      <div className="admin-product">
        <div className="product-details">
          <h2 className="title">Update Product</h2>
          <form className="form" onSubmit={onSubmit}>
            <div className="input-wrapper">
              <span>Title</span>
              <input
                type="text"
                placeholder="Title"
                required
                value={product.title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <span>Description</span>
              <input
                type="text"
                placeholder="description"
                required
                value={product.description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <span>Price $</span>
              <input
                type="text"
                placeholder="price"
                required
                value={product.price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <span>Image</span>
              <input
                onChange={previewImage}
                style={{ border: "none" }}
                type="file"
                placeholder="image"
              />
            </div>

            <img
              id="product-image"
              style={{ marginTop: 30 }}
              alt={product.title}
              className="lazyload"
              src="https://cdn.shopify.com/s/files/1/0003/4580/0755/products/BLUMEMAY2020-Daydreamer_1_880x800.jpg?v=1596416050"
            />

            <button className="submit" type="submit">
              Update product
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  ) : (
    <p>loading</p>
  );
};

const mapStateToProps = (state: any) => ({
  product: state.product,
  basket: state.basket,
});

export default connect(mapStateToProps, { addProductToBasket, toggleBasket })(
  ProductEdit
);
