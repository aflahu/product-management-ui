// app/pending/page.js
"use client";
import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import Link from "next/link";
import "../styles/styles.css"; // Impor CSS styling

const PendingProducts = () => {
  const [pendingProducts, setPendingProducts] = useState([]);

  useEffect(() => {
    const fetchPendingProducts = async () => {
      const response = await axios.get("/products/pending");
      setPendingProducts(response.data);
    };

    fetchPendingProducts();
  }, []);

  const handleApprove = async (id) => {
    await axios.put(`/products/${id}/approve`);
    setPendingProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleReject = async (id) => {
    await axios.put(`/products/${id}/reject`);
    setPendingProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div className="container">
      <h1>Pending Products</h1>
      {pendingProducts.length === 0 ? (
        <p>No products pending approval.</p>
      ) : (
        <ul>
          {pendingProducts.map((product) => (
            <li key={product.id}>
              <h2>{product.productName}</h2>
              <p>Price: ${product.price}</p>
              <p>Description: {product.productDescription}</p>
              <button onClick={() => handleApprove(product.id)}>Approve</button>
              <button onClick={() => handleReject(product.id)}>Reject</button>
            </li>
          ))}
        </ul>
      )}
      <Link href="/" className="link">
        Back to Home
      </Link>
    </div>
  );
};

export default PendingProducts;
