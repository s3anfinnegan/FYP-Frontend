import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReceiptDataService from "../services/service";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});

const PDFReceipt = () => {
  const params = useParams();

  const [receiptData, setReceiptData] = useState([]);

  useEffect(() => {
    ReceiptDataService.get(params.id)
      .then((response) => {
        setReceiptData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // Passing JSON object items
  const PDFReceiptJSON = () => (
    <Document>
      <Page size="A4">
        <View>
          <Text>{receiptData.shop_name}</Text>
          <Text>{receiptData.createdAt}</Text>
          <Text>{receiptData.item1}</Text>
          <Text>{receiptData.item2}</Text>
          <Text>{receiptData.item3}</Text>
          <Text>{receiptData.cashier}</Text>
        </View>
      </Page>
    </Document>
  );

  // Creating PDF Receipt component
  return (
    <PDFViewer style={styles.viewer}>
      <PDFReceiptJSON />
    </PDFViewer>
  );
};

export default PDFReceipt;
