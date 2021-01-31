import React, { useState, useRef, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { updateProduct, imageUpload } from "../../../../actions/products";
import "../style.scss";

interface Props {
  product: any;
  updateProduct: (body: any) => Promise<boolean>;
  imageUpload: (image: any) => Promise<string>;
  match: {
    params: {
      id: string;
    };
  };
}

const ProductEdit: React.FC<Props> = ({
  product: { products, loading },
  updateProduct,
  imageUpload,
  match: {
    params: { id },
  },
}) => {
  const history = useHistory();
  const inputRef = useRef<any>(null);
  const [productId, setProductId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<any>();

  useEffect(() => {
    if (loading) return;
    const [product] = products.filter((p: any) => p.slug === id);

    setImage({ name: product.url });
    setTitle(product.title);
    setPrice(product.price);
    setProductId(product.id);
    setDescription(product.description);

    window.addEventListener(
      "dragover",
      function (e: any) {
        e.preventDefault();
      },
      false
    );
    window.addEventListener(
      "drop",
      function (e: any) {
        e.preventDefault();
      },
      false
    );
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const previewImage = (e: any) => {
    const preview = document.querySelector(
      "#product-image"
    ) as HTMLImageElement;
    const image = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async () => {
      preview.src = reader.result + "";
      if (image.type === "image/jpeg" || image.type === "image/png") {
        setImage({ name: await imageUpload(image) });
      } else {
        Swal.fire("Error!", "Please upload jpeg or png!", "error");
      }
    };
  };

  const removeImage = () => {
    const preview = document.querySelector(
      "#product-image"
    ) as HTMLImageElement;
    preview.src = "";
    setImage({ name: "" });
  };

  const dragOver = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    const preview = document.querySelector(
      ".image-preview"
    ) as HTMLImageElement;

    preview.style.border = "3px dashed #fff";
    preview.style.background = "#001e42";
    preview.style.opacity = "0.8";
    preview.style.color = "#fff";
  };

  const dragLeave = (e: any) => {
    const preview = document.querySelector(
      ".image-preview"
    ) as HTMLImageElement;

    preview.style.border = "3px dashed #001e42";
    preview.style.color = "#001e42";
    preview.style.background = "";
    preview.style.opacity = "1";
  };

  const dragDrop = (e: any) => {
    e.preventDefault();

    const preview = document.querySelector(
      "#product-image"
    ) as HTMLImageElement;
    const image = e.dataTransfer.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      if (image.type === "image/jpeg" || image.type === "image/png") {
        preview.src = reader.result + "";
        setImage(image.name);
      } else {
        preview.src = "";
        Swal.fire("Error!", "Please only upload jpeg or png!", "error");
      }
    };

    const imagePreview = document.querySelector(
      ".image-preview"
    ) as HTMLImageElement;

    imagePreview.style.border = "3px dashed #001e42";
    imagePreview.style.color = "#001e42";
    imagePreview.style.background = "";
    imagePreview.style.opacity = "1";
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!/[+-]?([0-9]*[.])?[0-9]+/.test(price)) {
      Swal.fire("Warning!", "Price field should be only number", "warning");
      return;
    }

    const body = {
      id: productId,
      title,
      price: parseFloat(price),
      description,
      url: image && image.name ? image.name : "",
    };

    console.log(body.url);

    if (await updateProduct(body)) {
      history.push("/admin");
    }
  };

  return !loading ? (
    <MainLayout>
      <div className="admin-product">
        <div className="product-details">
          <h2 className="title">Edit Product</h2>
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
                style={{ display: "none" }}
                ref={inputRef}
                onChange={previewImage}
                type="file"
                placeholder="image"
              />
              <p className="upload-wrapper">
                <span
                  onClick={() => inputRef.current.click()}
                  className="upload"
                >
                  Upload image
                </span>
              </p>
            </div>

            <div
              onDrop={dragDrop}
              onDragOver={dragOver}
              onDragLeave={dragLeave}
              className="image-preview"
            >
              <img
                id="product-image"
                className="img"
                style={{
                  marginTop: 30,
                  display: image && image.name === "" ? "none" : "flex",
                }}
                alt={title}
                src={image && image.name}
              />
              <p
                style={{
                  display: image && image.name === "" ? "none" : "flex",
                }}
                onClick={() => removeImage()}
                className="remove-image"
              >
                Remove image
              </p>
              <p
                style={{
                  display: image && image.name === "" ? "flex" : "none",
                }}
                className="img image-placeholder"
              >
                No image uploaded
                <br />
                drag here or click on upload button
              </p>
            </div>

            <button className="submit" type="submit">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  ) : (
    <p
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Loading
    </p>
  );
};

const mapStateToProps = (state: any) => ({
  product: state.product,
});

export default connect(mapStateToProps, { updateProduct, imageUpload })(
  ProductEdit
);
