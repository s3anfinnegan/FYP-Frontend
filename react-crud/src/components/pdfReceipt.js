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

// Create styles for PDF
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
  });

  // Price and tax calculations
  var itemA = parseFloat(receiptData.price1);
  var itemB = parseFloat(receiptData.price2);
  var itemC = parseFloat(receiptData.price3);
  var totalPrice = itemA + itemB + itemC;
  // Tax @ 23%
  var totalTax = totalPrice * 0.23;

  // Passing JSON object items
  const PDFReceiptJSON = () => (
    <Document>
      <Page size="A4">
        <View>
          <Text>{receiptData.shop_name}</Text>
          <Text>Time: {receiptData.createdAt}</Text>
          <Text>Item 1: {receiptData.item1}</Text>
          <Text>€ {receiptData.price1}</Text>
          <Text>Item 2: {receiptData.item2}</Text>
          <Text>€ {receiptData.price2}</Text>
          <Text>Item 3: {receiptData.item3}</Text>
          <Text>€ {receiptData.price3}</Text>
          <Text>Total: €{totalPrice}</Text>
          <Text>Tax 23%: €{totalTax.toFixed(2)}</Text>
          <Text>Your cashier: {receiptData.cashier}</Text>
          <Text>Have an amazing day!</Text>
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
