import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import ReceiptDataService from "../services/service";

const Receipt = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialReceiptState = {
    id: null,
    shop_name: "",
    item1: "",
    item2: "",
    item3: "",
    cashier: "Sean",
    published: false
  };
  const [currentReceipt, setCurrentReceipt] = useState(initialReceiptState);
  const [message, setMessage] = useState("");

  const getReceipt = id => {
    ReceiptDataService.get(id)
      .then(response => {
        setCurrentReceipt(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getReceipt(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentReceipt({ ...currentReceipt, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentReceipt.id,
      shop_name: currentReceipt.shop_name,
      item1: currentReceipt.item1,
      item2: currentReceipt.item2,
      item3: currentReceipt.item3,
      published: status
    };

    ReceiptDataService.update(currentReceipt.id, data)
      .then(response => {
        setCurrentReceipt({ ...currentReceipt, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateReceipt = () => {
    ReceiptDataService.update(currentReceipt.id, currentReceipt)
      .then(response => {
        console.log(response.data);
        setMessage("The receipt was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteReceipt = () => {
    ReceiptDataService.remove(currentReceipt.id)
      .then(response => {
        console.log(response.data);
        navigate("/receipts");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentReceipt ? (
        <div className="edit-form">
          <h4>Receipt</h4>
          <form>
            <div className="form-group">
              <label htmlFor="shop_name">Shop name</label>
              <input
                type="text"
                className="form-control"
                id="shop_name"
                name="shop_name"
                value={currentReceipt.shop_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="item1">Item 1</label>
              <input
                type="text"
                className="form-control"
                id="item1"
                name="item1"
                value={currentReceipt.item1}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="item2">Item 2</label>
              <input
                type="text"
                className="form-control"
                id="item2"
                name="item2"
                value={currentReceipt.item2}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="item3">Item 3</label>
              <input
                type="text"
                className="form-control"
                id="item3"
                name="item3"
                value={currentReceipt.item3}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cashier">Cashier</label>
              <input
                type="text"
                className="form-control"
                id="cashier"
                name="cashier"
                value={currentReceipt.cashier}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentReceipt.published ? "Payment" : "Approved"}
            </div>
          </form>

          <button
            className="badge badge-primary mr-2"
            onClick={() => updatePublished(false)}
            >
            Unapprove payment
          </button>

          <button className="badge badge-danger mr-2" onClick={deleteReceipt}>
            Delete this receipt
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateReceipt}
          >
            Update this receipt
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Click on a receipt to view details...</p>
        </div>
      )}
    </div>
  );
};

export default Receipt;