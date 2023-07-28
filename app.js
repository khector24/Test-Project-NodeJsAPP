import express from "express";
import ejs from "ejs";
import sqlite3 from "sqlite3";

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// Connect to the SQLite database
const db = new sqlite3.Database("./database/faq_wizard.db");

app.get("/", (req, res) => {
    // Query the 'faq_table' to get all rows
    db.all("SELECT question, answer FROM faq_table", (err, rows) => {
      if (err) {
        console.error("Error retrieving data from the database:", err);
        // Handle the error (e.g., render an error page)
      } else {
        // Render the 'home' view and pass the data to it
        res.render("home", { faqData: rows });
      }
    });
  });
  

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
});