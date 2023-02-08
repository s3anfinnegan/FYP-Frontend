import React, { useState } from "react";
import ReceiptDataService from "../services/service";

const AddReceipt = () => {
  const initialReceiptState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [receipt, setReceipt] = useState(initialReceiptState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setReceipt({ ...receipt, [name]: value });
  };

  const saveReceipt = () => {
    var data = {
      title: receipt.title,
      description: receipt.description
    };

    ReceiptDataService.create(data)
      .then(response => {
        setReceipt({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
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
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newReceipt}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={receipt.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={receipt.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveReceipt} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddReceipt;