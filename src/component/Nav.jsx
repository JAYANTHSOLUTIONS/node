import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
    const location = useLocation();

    // Helper function to add "active" class based on current route
    const isActive = (path) => location.pathname === path ? "active fw-bold" : "";

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow sticky-top py-3">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <span className="bg-primary text-white p-2 rounded-3 me-2">
                        <i className="bi bi-box-seam"></i>
                    </span>
                    <span className="fw-bold tracking-tight">IMS Pro</span>
                </Link>

                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                        <li className="nav-item">
                            <Link className={`nav-link px-3 ${isActive("/")}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link px-3 ${isActive("/view")}`} to="/view">Inventory</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link px-3 ${isActive("/add")}`} to="/add">Add Item</Link>
                        </li>
                        
                        {/* Dropdown Styled Cleaner */}
                        <li className="nav-item dropdown px-2">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                Account
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-3">
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item text-danger" href="#">Logout</a></li>
                            </ul>
                        </li>
                    </ul>

                    <form className="d-flex ms-lg-4" role="search">
                        <div className="input-group">
                            <input 
                                className="form-control bg-secondary text-white border-0" 
                                type="search" 
                                placeholder="Search inventory..." 
                                style={{ borderRadius: "20px 0 0 20px" }}
                            />
                            <button className="btn btn-primary" type="submit" style={{ borderRadius: "0 20px 20px 0" }}>
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    );
}