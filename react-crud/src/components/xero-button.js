import * as React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const XeroButton = () => {
  const [loading, setLoading] = React.useState(true);

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/upload");
      console.log(response.data);
    } catch (error) {
      console.error("Error sending email" + error);
    }
  };

  return (
    <Button
      variant="contained"
      endIcon={<SendRoundedIcon />}
      onClick={handleButtonClick}
      size="large"
    >
      Upload to Xero
    </Button>
  );
};

export default XeroButton;
