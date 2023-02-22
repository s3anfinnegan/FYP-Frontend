import React from "react";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QrCode = (props) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    qrCodeEncoder();
  });

  const downloadQRCode = (e) => {
    e.preventDefault();
    setUrl("");
  };

  const qrCodeEncoder = (e) => {
    setUrl("localhost:8081/receipts/" + props.id);
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={300}
      bgColor={"#51dedc"}
      level={"H"}
    />
  );

  return (
    <div className="qrcode__container">
      <div>{qrcode}</div>
      <div className="input__group">
        <form onSubmit={downloadQRCode}>
          <label>e-Receipt URL</label>
          <input
            type="text"
            value={url}
            onChange={qrCodeEncoder}
            placeholder="http://localhost:8081/receipts/xxx"
          />
        </form>
      </div>
    </div>
  );
};

export default QrCode;
