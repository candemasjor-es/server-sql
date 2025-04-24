const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "prueba",
});
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  } else {
    console.log("Connected to the database.");
  }
});

app.get("/cities", (req, res) => {
  console.log(
    "El cliente entró en GET con la IP: " + req.ip.replace("::ffff:", "")
  );
  const sql = "SELECT * FROM prueba.cities;";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("An error occurred while fetching cities.");
    } else {
      res.send(result);
    }
  });
});

app.post("/cities", (req, res) => {
  console.log("el clinte entrar POST es ip: " + req.ip.replace("::ffff:", ""));
  const sql = "INSERT INTO prueba.cities (name, country) VALUES (?, ?)";
  const values = [req.body.name, req.body.country];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("An error occurred while adding a city.");
    } else {
      res.send("City added successfully.");
    }
  });
});

app.delete("/cities/:id", (req, res) => {
  console.log(
    "el clinte entrar DELETE es ip: " + req.ip.replace("::ffff:", "")
  );
  const sql = "DELETE FROM prueba.cities WHERE id = ?";
  const values = [req.params.id];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("An error occurred while deleting a city.");
    } else {
      res.send("City deleted successfully.");
    }
  });
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
