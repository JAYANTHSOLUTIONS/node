import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function EditForm() {
    const { id } = useParams();
    const navigate = useNavigate(); // For redirecting after save

    // This state holds the values the user is typing
    const [data, setdata] = useState({
        name: "",
        price: 0,
        quantity: 0,
        image: "",
        category: "",
        rating: 0
    });

    const [loading, setLoading] = useState(true);
    const [success, setsuccess] = useState("");

    // 1. Fetch data on load
    useEffect(() => {
        handleFetch();
    }, [id]);

    const handleFetch = () => {
        fetch("http://127.0.0.1:8000/items/read")
            .then((res) => res.json())
            .then((res) => {
                // Find the specific item matching the URL ID
                const itemToEdit = res.find(item => item.id == id);
                
                if (itemToEdit) {
                    // Map backend keys to your local state keys
                    setdata({
                        name: itemToEdit.item_name || "",
                        price: itemToEdit.item_price || 0,
                        quantity: itemToEdit.item_quantity || 0,
                        image: itemToEdit.image || "",
                        category: itemToEdit.category || "",
                        rating: itemToEdit.rating || 0
                    });
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    };

    // 2. Handle input changes
    const handleevent = (e) => {
        const { name, value } = e.target;
        setdata({
            ...data,
            [name]: value
        });
    };

    // 3. Save updates
    const handlesave = async () => {
        try {
            const body = {
                item_name: data.name,
                item_price: Number(data.price),
                item_quantity: Number(data.quantity),
                image: data.image,
                category: data.category,
                rating: Number(data.rating)
            };

            await axios.put(`http://127.0.0.1:8000/items/update/${id}`, body);
            
            setsuccess("Update Successful!");
            // Optional: Redirect back to home after 2 seconds
            setTimeout(() => navigate('/view'), 2000); 
        } catch (error) {
            console.error("Update error:", error);
            setsuccess("Failed to update.");
        }
    };

    if (loading) return <div className="container mt-5">Loading...</div>;

    return (
        <div className="container mt-5">
            <h2>Edit Item</h2>
            {success && (
                <div className={`alert ${success.includes("Successful") ? "alert-success" : "alerdanger"}`}t->
                    {success}
                </div>
            )}

            <div className="card shadow-sm" style={{ width: "24rem" }}>
                <img 
                    className="card-img-top" 
                    src={data.image || "https://via.placeholder.com/300"} 
                    alt="Item" 
                    height={300} 
                    style={{ objectFit: 'cover' }}
                />
                
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label font-weight-bold">Item Name</label>
                        <input 
                            type='text' 
                            name="name" 
                            className="form-control"
                            onChange={handleevent} 
                            value={data.name} 
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label font-weight-bold">Category</label>
                        <input 
                            type='text' 
                            name="category" 
                            className="form-control"
                            onChange={handleevent} 
                            value={data.category} 
                        />
                    </div>

                    <div className="row">
                        <div className="col-6 mb-3">
                            <label className="form-label font-weight-bold">Price (₹)</label>
                            <input 
                                type="number" 
                                name="price" 
                                className="form-control"
                                onChange={handleevent} 
                                value={data.price} 
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <label className="form-label font-weight-bold">Quantity</label>
                            <input 
                                type="number" 
                                name="quantity" 
                                className="form-control"
                                onChange={handleevent} 
                                value={data.quantity} 
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label font-weight-bold">Rating</label>
                        <input 
                            type="number" 
                            name="rating" 
                            className="form-control"
                            onChange={handleevent} 
                            value={data.rating} 
                            max="5"
                        />
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                        <button onClick={handlesave} className="btn btn-primary px-4">
                            Save Changes
                        </button>
                        <Link to="/" className="btn btn-secondary">
                            Cancel
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}