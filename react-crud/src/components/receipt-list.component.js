import React, { useState, useEffect } from "react";
import ReceiptDataService from "../services/service";
import { Link } from "react-router-dom";

const ReceiptsList = () => {
  const [receipts, setReceipts] = useState([]);
  const [currentReceipt, setCurrentReceipt] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  //var timestamp = new Date().getTime();


  useEffect(() => {
    retrieveReceipts();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveReceipts = () => {
    ReceiptDataService.getAll()
      .then(response => {
        setReceipts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveReceipts();
    setCurrentReceipt(null);
    setCurrentIndex(-1);
  };

  const setActiveReceipt = (receipt, index) => {
    setCurrentReceipt(receipt);
    setCurrentIndex(index);
  };

  const removeAllReceipts = () => {
    ReceiptDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    ReceiptDataService.findByTitle(searchTitle)
      .then(response => {
        setReceipts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
<div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Receipt History</h4>

        <ul className="list-group">
          {receipts &&
            receipts.map((receipt, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveReceipt(receipt, index)}
                key={index}
              >
                {receipt.shop_name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllReceipts}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentReceipt ? (
          <div>
            <h4>Receipt</h4>
            <div>
              <label>
                <strong>Timestamp:</strong>
              </label>{" "}
              {currentReceipt.createdAt}
            </div>
            <div>
              <label>
                <strong>Shop name:</strong>
              </label>{" "}
              {currentReceipt.shop_name}
            </div>
            <div>
              <label>
                <strong>Item 1:</strong>
              </label>{" "}
              {currentReceipt.item1}
            </div>
            <div>
              <label>
                <strong>Item 2:</strong>
              </label>{" "}
              {currentReceipt.item2}
            </div>
            <div>
              <label>
                <strong>Item 3:</strong>
              </label>{" "}
              {currentReceipt.item3}
            </div>
            <div>
              <label>
                <strong>Payment status:</strong>
              </label>{" "}
              {currentReceipt.published ? "Published" : "Approved"}
            </div>

            <Link
              to={"/receipts/" + currentReceipt.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Click on a receipt to view details...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptsList;