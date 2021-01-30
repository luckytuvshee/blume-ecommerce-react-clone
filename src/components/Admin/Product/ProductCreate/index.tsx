import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import "./style.scss";

interface Props {}

const ProductCreate: React.FC<Props> = () => {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [url, setUrl] = useState<string>("");

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

  return (
    <MainLayout>
      <div className="admin-product">
        <div className="product-details">
          <h2 className="title">Create Product</h2>
          <form className="form" onSubmit={onSubmit}>
            <div className="input-wrapper">
              <span>Title</span>
              <input
                type="text"
                placeholder="Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <span>Description</span>
              <input
                type="text"
                placeholder="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <span>Price $</span>
              <input
                type="text"
                placeholder="price"
                required
                value={price}
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
              alt={title}
              className="lazyload"
              src="https://cdn.shopify.com/s/files/1/0003/4580/0755/products/BLUMEMAY2020-Daydreamer_1_880x800.jpg?v=1596416050"
            />

            <button className="submit" type="submit">
              Create Product
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductCreate;
