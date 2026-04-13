// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Form from './Form';
import { Link } from 'react-router-dom';
import Card from './Card';
import Nav from './Nav';

export default function Run() {
  const [apt, setapt] = useState([]);

  useEffect(() => {
    handle();
  }, []);

  const handle = () => {
    fetch("http://127.0.0.1:8000/items/read")
      .then((data) => data.json())
      .then((res) => setapt(res))
      .catch((err) => console.log("error:", err));
  };

  return (
    <div className="bg-light min-vh-100">
      <Nav />

      <div className="container py-5">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-5 border-bottom pb-3">
          <div>
            <h1 className="display-5 fw-bold text-dark">Product Catalog</h1>
            <p className="text-muted">Manage your items, prices, and stock levels</p>
          </div>
          <Link to='/add' className="btn btn-primary btn-lg shadow-sm px-4 rounded-pill">
            <i className="bi bi-plus-lg me-2"></i> Add New Item
          </Link>
        </div>

        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
          {apt.map((da) => (
            <div className="col d-flex align-items-stretch" key={da.id}>
              <Card
                img={da.image}
                id={da.id}
                name={da.item_name}
                price={da.item_price}
                qty={da.item_quantity}
                total={da.item_total}
                rating={da.rating}
                category={da.category}
                refres={handle}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {apt.length === 0 && (
          <div className="text-center mt-5 py-5">
            <h3 className="text-muted">No items found. Click 'Add' to get started!</h3>
          </div>
        )}
      </div>
    </div>
  );
}