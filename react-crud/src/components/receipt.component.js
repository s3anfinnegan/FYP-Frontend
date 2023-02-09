import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import ReceiptDataService from "../services/service";

const Receipt = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialReceiptState = {
    id: null,
    createdAt: "",
    title: "",
    description: "",
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
      title: currentReceipt.title,
      description: currentReceipt.description,
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
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentReceipt.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentReceipt.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentReceipt.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentReceipt.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteReceipt}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateReceipt}
          >
            Update
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