# 🚚 Last-Mile Delivery Confirmation System

## 📌 Overview

This project is a Last-Mile Delivery Confirmation System that simulates how real e-commerce companies (like LensKart, Amazon, Flipkart) confirm deliveries using a Shipment ID + OTP verification mechanism.

The system ensures:

A delivery can be confirmed only once

OTP verification is handled securely on the backend

Delivery status and metadata are tracked properly

## 🎯 Problem Statement

In last-mile delivery:

Fake or duplicate delivery confirmations must be avoided

The correct customer must receive the product

Delivery partners should verify delivery securely

This project solves the above using:

Unique Shipment ID

One-Time Password (OTP)

Backend-controlled validation

## 🧩 Solution Flow

1️⃣ Customer places an order

2️⃣ Backend generates:

Shipment ID

OTP

3️⃣ Delivery partner enters:

Shipment ID

OTP

4️⃣ Backend verifies:

Shipment existence

OTP correctness

Delivery status

5️⃣ Backend returns result with proper HTTP status codes

## Architecture Diagram

<img width="419" height="622" alt="image" src="https://github.com/user-attachments/assets/f76629de-d180-48d5-9fe3-38a1853973bd" />


## 🛠 Tech Stack
### 🔹 Backend


Node.js

Express.js

MySQL

mysql2 (Promise-based)

dotenv

### 🔹 Frontend (Mobile App)

React Native

Expo (Expo Go)

TypeScript

## 🗂 Project Structure
<img width="885" height="545" alt="image" src="https://github.com/user-attachments/assets/cbc6938c-e6a0-4bd9-8b8b-97ec77ef837f" />


## 🗄 Database Design

### 📌 Database
CREATE DATABASE last_mile_delivery;

### 📌 Table: shipments

 <img width="682" height="307" alt="image" src="https://github.com/user-attachments/assets/354c3d8c-8fb0-41d3-ad8d-855694d29cc9" />


## 🔗 API Endpoints

### 🚀 Place Order
POST /api/place-order


Request

{
  "customer_name": "Rahul"
}


Response

{
  "shipment_id": "SHIP12345",
  "otp_code": "482193"
}

### 🚚 Confirm Delivery
POST /api/confirm-delivery


Request

{
  "shipment_id": "SHIP12345",
  "otp": "482193",
  "delivered_by": "DeliveryBoy01"
}

## 📡 HTTP Status Codes Used
Status Code	Meaning
200 OK	Delivery successful
400 Bad Request	Missing required fields
401 Unauthorized	Invalid OTP
404 Not Found	Shipment ID not found
409 Conflict	Shipment already delivered
500 Internal Server Error	Server failure

## 🧠 Backend Business Logic

Shipment ID must exist

OTP must match

Delivery allowed only once

Re-verification returns already_delivered

All business rules enforced on backend

## ⚠️ Frontend is a thin client — backend controls all logic.

📱 Mobile App UI Flow
🟢 Step 1: Place Order

Enter customer name

Click Place Order

🟢 Step 2: System Generates

Shipment ID (displayed)

OTP (displayed for demo)

🟢 Step 3: Delivery Partner Inputs

Shipment ID (alphanumeric)

OTP (numeric)

🟢 Step 4: Verify

Click Verify

Result shown on screen

## 📹 video Demo
https://drive.google.com/drive/folders/1j-q6RlUvNrUgKCSZeCFe3HjL9C-46W48?usp=sharing




## 📱 App interfaces

### 👋 Intro

<img width="499" height="622" alt="image" src="https://github.com/user-attachments/assets/06e34a6c-5612-4f04-97f9-6bffecff2ca0" />


### 🛒 Placing order from frontend

<img width="497" height="759" alt="image" src="https://github.com/user-attachments/assets/236f6f23-dc64-411f-b60f-0bfb0603f81b" />

### ✅ Successful Delivery

<img width="474" height="913" alt="image" src="https://github.com/user-attachments/assets/55f58639-d22f-40e8-9a2b-38122f12f0fa" />


### ⚠️ Already Delivered

<img width="480" height="929" alt="image" src="https://github.com/user-attachments/assets/940e51af-7e55-4bee-813a-4b4723076f28" />

### ⚠️ Missing Fields

### shipmentID missing

<img width="481" height="870" alt="image" src="https://github.com/user-attachments/assets/9a1ed0a7-24f7-4c76-8c25-a3a187492ca2" />

### OTP missing

<img width="501" height="897" alt="image" src="https://github.com/user-attachments/assets/bca44e20-2026-46c9-8fec-ec2ee19be53f" />

### ❌ Wrong OTP

<img width="493" height="896" alt="image" src="https://github.com/user-attachments/assets/c2af1660-16fb-4e90-9f84-7d09365b9597" />



## ⚙️ Setup Instructions

### 🔹 Backend Setup
cd backend
npm install
cp .env.example .env
npm run dev


### 🔹 Mobile App Setup
cd mobile-app
npm install
npx expo start


## 📌 Use Expo Go on a physical Android device for best results.

### ⚠️ Important Notes

localhost works only for emulator

For physical device, update API base URL with system IP

.env file is ignored for security

OTP is shown only for demo/testing

## 🧪 Test Scenarios Covered

✔ Correct OTP
✔ Wrong OTP
✔ Already delivered shipment
✔ Missing shipment ID
✔ Missing OTP
✔ Network / server error handling

## 🏆 Key Learnings & Highlights

Separation of concerns (Controller / Service / Config)

Proper HTTP status code usage

Backend-driven business logic

React Native ↔ Node.js integration

Real-world debugging and edge-case handling


## 👨‍💻 Author
### Rahul Kumar
### GitHub: @Rahul-64





