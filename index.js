require("dotenv").config();
const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Koneksi ke Mysql
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Koneksi ke database gagal:", err);
  } else {
    console.log("Terhubung ke database MySQL");
  }
});

app.get("/api/projects", (req, res) => {
  db.query("SELECT * FROM projects", (err, results) => {
    if (err) {
      res.status(500).json({ error: "Gagal terhubung ke server" });
    } else {
      res.json(results);
    }
  });
});

app.get("/", (req, res) => {
  res.send("Backend is running!...");
});

// Endpoint API example
// app.get("/api/hello", (req, res) => {
//   res.json({ message: "Hello from backend!" });
// });

// API

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open in Browser http://localhost:${PORT}`);
});
