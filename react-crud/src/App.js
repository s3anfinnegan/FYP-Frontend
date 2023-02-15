import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Routes, Route } from "react-router-dom";
import AddReceipt from "./components/add-receipt.component";
import Receipt from "./components/receipt.component";
import ReceiptsList from "./components/receipt-list.component";
import QrCode from "./components/QrCode";
import "./App.css";


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
              <Link to={"/pos"} className="nav-link">
                POS
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/qrcode"} className="nav-link">
                QR Code
              </Link>
            </li>
          </div>
        </nav>


        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ReceiptsList/>} />
            <Route path="/receipts" element={<ReceiptsList/>} />
            <Route path="/pos" element={<AddReceipt/>} />
            <Route path="/receipts/:id" element={<Receipt/>} />
            <Route path="/qrcode" element={<QrCode/>} />
          </Routes>
        </div>
      </div>
    );
}

export default App;