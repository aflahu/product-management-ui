
"use client";
import React from "react";
import ProductList from "./components/ProductList";
import Link from "next/link";
import "./styles/styles.css"; // Impor CSS styling

const Home = () => {
  return (
    <div className="container">
      <h1>Product Management</h1>
      <Link href="/admin" className="link">
        Manage Pending Products
      </Link>
      <ProductList />
    </div>
  );
};

export default Home;
