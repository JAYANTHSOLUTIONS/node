import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Card(props) {
    
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        
        try {
            const delid = props.id;
            await axios.delete(`http://127.0.0.1:8000/items/delete/${delid}`);
            if (props.refres) {
                props.refres(); 
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete item.");
        }
    };

    return (
        /* 'h-100' makes the card fill the full height of the grid column */
        <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden" style={{ minWidth: "100%" }}>
            
            <div className="position-relative">
                <img 
                    className="card-img-top" 
                    src={props.img || 'https://via.placeholder.com/300'} 
                    alt={props.name} 
                    /* Fixed height + object-fit: cover ensures images don't stretch */
                    style={{ height: "200px", objectFit: "cover" }} 
                />
                <span className="badge bg-dark position-absolute top-0 start-0 m-3 opacity-75">
                    {props.category}
                </span>
            </div>

            {/* 'flex-grow-1' ensures the body fills the remaining space */}
            <div className="card-body d-flex flex-column flex-grow-1">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0 fw-bold text-truncate" style={{maxWidth: "75%"}}>
                        {props.name}
                    </h5>
                    <span className="text-warning fw-bold">★ {props.rating}</span>
                </div>

                {/* This paragraph helps keep descriptions/info aligned */}
                <p className="text-muted small flex-grow-1">
                    {props.description || "No description provided."}
                </p>

                <div className="mt-auto"> {/* Pushes the following content to the absolute bottom */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <p className="text-muted small mb-0">Price</p>
                            <h5 className="text-primary mb-0">₹{props.price}</h5>
                        </div>
                        <div className="text-end">
                            <p className="text-muted small mb-0">Stock</p>
                            <span className="badge bg-light text-dark border">{props.qty} units</span>
                        </div>
                    </div>

                    <div className="border-top pt-3 d-flex gap-2">
                        <Link to={`/edit/${props.id}`} className="btn btn-outline-warning flex-grow-1 btn-sm">
                            Edit
                        </Link>
                        <button onClick={handleDelete} className="btn btn-outline-danger flex-grow-1 btn-sm">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}