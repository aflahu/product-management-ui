
import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import ProductForm from "./ProductForm";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get("/products"); 
    setProducts(response.data);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`/products/${id}`); 
    fetchProducts();
  };

  const startEditing = (product) => {
    setEditingProduct(product);
  };

  const finishEditing = () => {
    setEditingProduct(null);
    fetchProducts();
  };

  return (
    <div>
      <h1>Product List</h1>
      <ProductForm product={editingProduct} onFinishEditing={finishEditing} />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.productName} - ${product.price}
            <button onClick={() => startEditing(product)}>Edit</button>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
