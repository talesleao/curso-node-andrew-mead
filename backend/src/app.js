const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Define paths for Express config
const indexDirectoryPath = path.join(__dirname, "../../");
const viewsPath = path.join(__dirname, "../../frontend/templates/views");
const partialsPath = path.join(__dirname, "../../frontend/templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(indexDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Clima",
    name: "Tales Leão"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Sobre",
    name: "Tales Leão"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Ajuda",
    name: "Tales Leão",
    message: "Se precisar de algo, é só falar!"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, data) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: data,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term!"
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    name: "Tales Leão",
    message: "Help article not found!"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    name: "Tales Leão",
    message: "Page not found!"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
