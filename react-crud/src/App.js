import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Routes, Route } from "react-router-dom";
import AddReceipt from "./components/add-receipt.component";
import ReceiptsList from "./components/receipt-list.component";
import QrCode from "./components/QrCode";
import "./App.css";
import PDFReceipt from "./components/pdfReceipt";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/receipts" className="navbar-brand">
          POS Simulator
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/history"} className="nav-link">
              POS History
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/pos"} className="nav-link">
              POS Terminal
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<ReceiptsList />} />
          <Route path="/history" element={<ReceiptsList />} />
          <Route path="/pos" element={<AddReceipt />} />
          <Route path="/receipts/:id" element={<PDFReceipt />} />
          <Route path="/qrcode" element={<QrCode />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
