import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";

// 1. Base URL
const BASE_URL = "http://localhost:3000/api"; // change IP if needed

// function to format time (24-hour)
const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export default function HomeScreen() {
  const [customerName, setCustomerName] = useState("");

  const [shipmentId, setShipmentId] = useState(""); // for shipment ID
  const [serverOtp, setServerOtp] = useState(""); // for OTP

  const [enteredShipmentId, setEnteredShipmentId] = useState(""); // delivery boy input
  const [enteredOtp, setEnteredOtp] = useState("");

  const [result, setResult] = useState("");

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [verified, setVerified] = useState(false);

  // PLACE ORDER
  const placeOrder = async () => {
    setResult("");
    setVerified(false);

    try {
      // place your order
      const res = await fetch(`${BASE_URL}/place-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer_name: customerName }),
      });

      const data = await res.json();

      setShipmentId(data.shipment_id);
      setServerOtp(data.otp_code);

      setOrderPlaced(true);
    } catch (err) {
      setResult("❌ Error placing order");
    }
  };

  //  VERIFY DELIVERY
  const confirmDelivery = async () => {
    // 1️⃣ Shipment ID missing
    if (!enteredShipmentId) {
      setResult("⚠️ Shipment ID is missing");
      setVerified(true);
      return;
    }

    // 2️⃣ OTP missing
    if (!enteredOtp) {
      setResult("⚠️ OTP is missing");
      setVerified(true);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/confirm-delivery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shipment_id: enteredShipmentId,
          otp: enteredOtp,
          delivered_by: "DeliveryBoy01",
        }),
      });

      // 🔹 HTTP STATUS HANDLING
      if (res.status === 404) {
        setResult("❌ Shipment ID not found");
        setVerified(true);
        return;
      }

      if (res.status === 401) {
        setResult("❌ Wrong OTP, please re-type");
        setVerified(true);
        return;
      }

      if (res.status === 409) {
        const data = await res.json();
        setResult(
          `⚠️ Shipment already delivered
        📦 Shipment ID: ${data.shipment_id}
        👤 Delivered by: ${data.delivered_by}
        ⏰ Time: ${formatTime(data.delivered_at)}`
        );
        setVerified(true);
        return;
      }

      if (!res.ok) {
        setResult("❌ Server error. Please try again.");
        setVerified(true);
        return;
      }

      // ✅ SUCCESS CASE (THIS WAS MISSING)
      const data = await res.json();

      if (data.status === "already_delivered") {
        setResult(
          `⚠️ Shipment already delivered
          📦 Shipment ID: ${data.shipment_id}
          👤 Delivered by: ${data.delivered_by}
          ⏰ Time: ${formatTime(data.delivered_at)}`
        );
      } else if (data.status === "delivered") {
        setResult(
          `✅ Successfully delivered to ${data.customer_name}
          📦 Shipment ID: ${data.shipment_id}
          👤 Delivered by: ${data.delivered_by}
          ⏰ Time: ${formatTime(data.delivered_at)}`
        );
      } else if (data.status === "invalid_otp") {
        setResult("❌ Wrong OTP, please re-type");
      } else {
        setResult("❌ Unexpected server response");
      }

      setVerified(true);
    } catch {
      setResult("❌ Network error. Backend not reachable.");
      setVerified(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>LensKart</Text>

        {/* STEP 1: USER ENTERS NAME */}
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#666"
          value={customerName}
          onChangeText={setCustomerName}
        />

        {/* STEP 2: PLACE ORDER */}
        <View style={styles.buttonWrapper}>
          <Button title="CLICK ME TO PLACE ORDER" onPress={placeOrder} />
        </View>

        {/* STEP 3: SHOW GENERATED DETAILS */}
        {orderPlaced && (
          <>
            <View style={styles.row}>
              <View style={styles.smallBox}>
                <Text>Shipment ID (system)</Text>
                <Text style={styles.bold}>{shipmentId}</Text>
              </View>

              <View style={styles.smallBox}>
                <Text>OTP (demo)</Text>
                <Text style={styles.bold}>{serverOtp}</Text>
              </View>
            </View>

            {/* STEP 4: DELIVERY BOY INPUTS */}
            <TextInput
              style={styles.input}
              placeholder="Enter Shipment ID"
              placeholderTextColor="#666"
              value={enteredShipmentId}
              onChangeText={setEnteredShipmentId}
              // keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              placeholderTextColor="#666"
              value={enteredOtp}
              onChangeText={setEnteredOtp}
              keyboardType="numeric"
            />

            <View style={styles.buttonWrapper}>
              <Button title="VERIFY" onPress={confirmDelivery} />
            </View>
          </>
        )}

        {/* STEP 5: RESULT */}
        {verified && (
          <View style={styles.resultBox}>
            <Text style={styles.bold}>Result</Text>
            <Text>{result}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    marginVertical: 10,
    borderRadius: 6,
    color: "#000",
    backgroundColor: "#fff",
  },
  buttonWrapper: {
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  smallBox: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#f5f5f5",
  },
  resultBox: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#eef4ff",
  },
  bold: {
    fontWeight: "bold",
    marginTop: 5,
    color: "#000",
  },
});
