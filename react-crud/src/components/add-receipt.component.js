import React, { useState } from "react";
import ReceiptDataService from "../services/service";
import QrCode from "./QrCode";

const AddReceipt = () => {
  const initialReceiptState = {
    id: null,
    shop_name: "Finnegan's Appliances",
    item1: "",
    item2: "",
    item3: "",
    price1: "0",
    price2: "0",
    price3: "0",
    cashier: "Seán",
  };

  const [receipt, setReceipt] = useState(initialReceiptState);
  const [submitted, setSubmitted] = useState(false);
  const [currentID, setCurrentID] = useState(0);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReceipt({ ...receipt, [name]: value });
  };

  const saveReceipt = () => {
    var data = {
      shop_name: receipt.shop_name,
      item1: receipt.item1,
      item2: receipt.item2,
      item3: receipt.item3,
      price1: receipt.price1,
      price2: receipt.price2,
      price3: receipt.price3,
      cashier: receipt.cashier,
    };

    ReceiptDataService.create(data)
      .then((response) => {
        setReceipt({
          id: response.data.id,
          shop_name: response.data.shop_name,
          item1: response.data.item1,
          item2: response.data.item2,
          item3: response.data.item3,
          price1: response.data.price1,
          price2: response.data.price2,
          price3: response.data.price3,
          cashier: response.data.cashier,
        });
        setSubmitted(true);
        setCurrentID(response.data.id);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newReceipt = () => {
    setReceipt(initialReceiptState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Transaction approved!</h4>
          <button className="btn btn-success" onClick={newReceipt}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <h1>Point of Sale</h1>
          <div className="form-group">
            <label htmlFor="shop_name">Shop Name</label>
            <input
              type="text"
              className="form-control"
              id="shop_name"
              required
              value={receipt.shop_name}
              onChange={handleInputChange}
              name="shop_name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="item1">Item 1</label>
            <input
              type="text"
              className="form-control"
              id="item1"
              required
              value={receipt.item1}
              onChange={handleInputChange}
              name="item1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price1"> € </label>
            <input
              type="text"
              className="form-control"
              id="price1"
              required
              value={receipt.price1}
              onChange={handleInputChange}
              name="price1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="item2">Item 2</label>
            <input
              type="text"
              className="form-control"
              id="item2"
              required
              value={receipt.item2}
              onChange={handleInputChange}
              name="item2"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price2"> € </label>
            <input
              type="text"
              className="form-control"
              id="price2"
              required
              value={receipt.price2}
              onChange={handleInputChange}
              name="price2"
            />
          </div>

          <div className="form-group">
            <label htmlFor="item3">Item 3</label>
            <input
              type="text"
              className="form-control"
              id="item3"
              required
              value={receipt.item3}
              onChange={handleInputChange}
              name="item3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price3"> € </label>
            <input
              type="text"
              className="form-control"
              id="price3"
              required
              value={receipt.price3}
              onChange={handleInputChange}
              name="price3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cashier">Cashier</label>
            <input
              type="text"
              className="form-control"
              id="cashier"
              required
              value={receipt.cashier}
              onChange={handleInputChange}
              name="cashier"
            />
          </div>
          <button onClick={saveReceipt} className="btn btn-success">
            Process Payment
          </button>
        </div>
      )}
      {submitted ? <QrCode id={currentID} /> : <></>}
    </div>
  );
};

export default AddReceipt;
