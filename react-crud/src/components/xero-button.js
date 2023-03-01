import * as React from "react";
import Button from "@mui/material/Button";

function XeroButton() {
  const handleButtonClick = () => {
    window.location.href = "https://www.xero.com";
  };

  return (
    <Button variant="contained" onClick={handleButtonClick} size="large">
      Upload to Xero
    </Button>
  );
}

export default XeroButton;
