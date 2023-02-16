import React from 'react';
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
          <label>Enter URL</label>
          <input
            type="text"
            value={url}
            onChange={qrCodeEncoder}
            placeholder="http://receipt"
          />
          <button type="submit" disabled={!url}>
            Download QR code
          </button>
        </form>
      </div>
    </div>
  );
}

/**function QrCode({ objectId }) {
    const [qrCodeUrl, setQrCodeUrl] = useState('');
  
    useEffect(() => {
      fetch(`/qr/${objectId}`)
        .then(response => response.text())
        .then(qrCodeUrl => setQrCodeUrl(qrCodeUrl));
    }, [objectId]);
  
    return <img src={qrCodeUrl} alt="QR code" />;
  }*/

export default QrCode;
