import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from './Nav';

export default function Form() {
    const navigate = useNavigate();
    const [data, setdata] = useState({
        name: "",
        price: 0,
        quantity: 0,
        image: "",
        category: "",
        rating: 0
    });

    const [status, setStatus] = useState({ type: "", message: "" });

    const handleevent = (e) => {
        const { name, value } = e.target;
        setdata({ ...data, [name]: value });
    };

    const handleshow = async () => {
        try {
            const body = {
                item_name: data.name,
                item_price: Number(data.price),
                item_quantity: Number(data.quantity),
                image: data.image,
                category: data.category,
                rating: Number(data.rating)
            };

            await axios.post("http://127.0.0.1:8000/items/add", body);
            
            setStatus({ type: "success", message: "Item added successfully!" });
            
            // Reset form
            setdata({ name: "", price: 0, quantity: 0, image: "", category: "", rating: 0 });
            
            // Optional: Redirect to view page after 1.5 seconds
            setTimeout(() => navigate('/view'), 1500);

        } catch (error) {
            console.error(error);
            setStatus({ type: "danger", message: "Failed to add item. Please try again." });
        }
    };

    return (
        <div className="bg-light min-vh-100">
            <Nav />
            
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="card shadow-lg border-0 rounded-4">
                            <div className="card-header bg-primary text-white text-center py-4 rounded-top-4">
                                <h3 className="mb-0 fw-bold">Add New Product</h3>
                                <p className="small mb-0 opacity-75">Enter details to update the catalog</p>
                            </div>

                            <div className="card-body p-4">
                                {status.message && (
                                    <div className={`alert alert-${status.type} alert-dismissible fade show`} role="alert">
                                        {status.message}
                                    </div>
                                )}

                                <form className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label fw-bold">Order / Item Name</label>
                                        <input name="name" value={data.name} onChange={handleevent} type='text' className="form-control" placeholder='e.g. Wireless Mouse' />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">Price (₹)</label>
                                        <input name="price" value={data.price} onChange={handleevent} type='number' className="form-control" />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">Quantity</label>
                                        <input name="quantity" value={data.quantity} onChange={handleevent} type='number' className="form-control" />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label fw-bold">Image URL</label>
                                        <input name='image' value={data.image} onChange={handleevent} type='url' className="form-control" placeholder='https://...' />
                                    </div>

                                    <div className="col-md-8">
                                        <label className="form-label fw-bold">Category</label>
                                        <input name="category" value={data.category} onChange={handleevent} type='text' className="form-control" placeholder='Electronics' />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label fw-bold">Rating</label>
                                        <input name="rating" value={data.rating} onChange={handleevent} type='number' className="form-control" max="5" />
                                    </div>

                                    <div className="col-12 mt-4 d-grid gap-2">
                                        <button className='btn btn-primary btn-lg rounded-pill' onClick={handleshow} type='button'>
                                            Add Item
                                        </button>
                                        <Link to='/view' className='btn btn-outline-secondary btn-sm border-0'>
                                            Back to Inventory
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}