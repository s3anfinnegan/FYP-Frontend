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

  return (
    <div/>
  );
};

export default Receipt;