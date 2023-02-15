import React from 'react';
import QRCode from 'qrcode.react';
import PropTypes from 'prop-types';

const QrCode = ({ objectId }) => {
  const myMongoDbObjectId = '63ecffc1a549fbda146120cb' // fetch or generate the MongoDB Object ID
  const qrCodeValue = objectId.toString();
  return (
    <div>
      <QrCode objectId={myMongoDbObjectId} />
    </div>
  );
};

QrCode.propTypes = {
  objectId: PropTypes.object.isRequired,
};  

export default QrCode;
