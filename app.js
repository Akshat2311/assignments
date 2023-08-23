const express = require("express");
const mysql = require("mysql");
const axios = require("axios");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Akshat@2000",
  database: "favorites",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the database.");
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("search");
});

app.post("/search", async (req, res) => {
  const query = req.body.query;
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${query}&apikey=2b020b55`
    );
    res.render("search", { results: response.data.Search });
  } catch (error) {
    console.error(error);
    res.render("search", { results: [] });
  }
});

app.post("/favorite", (req, res) => {
  const { title, year, poster } = req.body;
  db.query(`INSERT INTO movies (title, year, poster) VALUES (${title}, ${year}, ${poster})`, (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: "An error occurred." });
    }
    res.json({ message: "Movie added to favorites." });
    res.end()
  })

//   db.query(
//     "INSERT INTO movies (title, year, poster) VALUES (?, ?, ?)",
//     [title, year, poster],
//     (err) => {
//       if (err) {
//         console.error(err.message);
//         return res.status(500).json({ message: "An error occurred." });
//       }
//       res.json({ message: "Movie added to favorites." });
//     }
//   );
});

app.get("/favorites", (req, res) => {
  db.query("SELECT * FROM movies", (err, results) => {
    if (err) {
      console.error("Error fetching favorites:", err.message);
      return res.render("favorites", { favorites: [] });
    }
    res.render("favorites", { favorites: results });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
