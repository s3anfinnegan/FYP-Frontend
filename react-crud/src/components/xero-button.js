import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";

const XeroButton = () => {
  const handleButtonClick = async () => {
    try {
      const response = await axios.post("/send-email", {
        email: "seansfyp@gmail.com",
        subject: "Hello from React",
        message: "This is a test email sent from React",
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error sending email", error);
    }
  };

  return (
    <Button variant="contained" onClick={handleButtonClick} size="large">
      Upload to Xero
    </Button>
  );
};

export default XeroButton;
