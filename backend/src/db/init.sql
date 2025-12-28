CREATE DATABASE IF NOT EXISTS last_mile_delivery;
USE last_mile_delivery;

CREATE TABLE IF NOT EXISTS shipments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  shipment_id VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(100),
  otp_code VARCHAR(10),
  status ENUM('Pending', 'In-Transit', 'Delivered') DEFAULT 'Pending',
  delivered_at TIMESTAMP NULL,
  delivered_by VARCHAR(100)
);

INSERT INTO shipments (shipment_id, customer_name, otp_code, status)
VALUES
('SHIP001', 'Amit Sharma', '123456', 'Pending'),
('SHIP002', 'Ravi Kumar', '654321', 'In-Transit'),
('SHIP003', 'Neha Verma', '111111', 'Delivered');
