// app/components/ProductForm.js
import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import "../styles/styles.css"; // Pastikan Anda mengimpor file CSS

const ProductForm = ({ product, onFinishEditing }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");

  useEffect(() => {
    if (product) {
      setProductName(product.productName);
      setPrice(product.price);
      setProductDescription(product.productDescription);
    } else {
      setProductName("");
      setPrice("");
      setProductDescription("");
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product) {
      await axios.put(`/products/${product.id}`, {
        productName,
        price,
        productDescription,
      });
    } else {
      await axios.post("/products", { productName, price, productDescription });
    }
    setProductName("");
    setPrice("");
    setProductDescription("");
    onFinishEditing(); // Callback to refresh the product list
  };

  const handleDelete = async () => {
    if (
      product &&
      window.confirm(`Are you sure you want to delete ${product.productName}?`)
    ) {
      await axios.delete(`/products/${product.id}`);
      onFinishEditing(); // Refresh the product list after deletion
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>{product ? "Edit Product" : "Add Product"}</h2>
      <div className="form-group">
        <label htmlFor="productName">Product Name</label>
        <input
          type="text"
          id="productName"
          placeholder="Enter product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="productDescription">Product Description</label>
        <textarea
          id="productDescription"
          placeholder="Enter product description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
      </div>
      <button type="submit">
        {product ? "Update Product" : "Add Product"}
      </button>
      {product && (
        <button type="button" onClick={handleDelete} className="delete-button">
          Delete Product
        </button>
      )}
    </form>
  );
};

export default ProductForm;
