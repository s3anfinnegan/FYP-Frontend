import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from 'react-dom/client';
import { Link, Routes, Route } from "react-router-dom";
import AddReceipt from "./components/add-receipt.component";
import Receipt from "./components/receipt.component";
import ReceiptsList from "./components/receipt-list.component";
import "./App.css";
//import App from 'App';

//const root = createRoot(app);

function App() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/receipts" className="navbar-brand">
            Seán Finnegan FYP
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/receipts"} className="nav-link">
                Receipts
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ReceiptsList/>} />
            <Route path="/receipts" element={<ReceiptsList/>} />
            <Route path="/add" element={<AddReceipt/>} />
            <Route path="/receipts/:id" element={<Receipt/>} />
          </Routes>
        </div>
      </div>
    );
}

export default App;