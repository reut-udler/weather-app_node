const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./src/utils/geocode");
const fortcast = require("./src/utils/forecast");

const app = express();

const publicDirectory = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "reut udler",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    name: "Reut Udler",
    img: "https://cdn.pixabay.com/photo/2021/08/22/18/10/hummingbird-6565805_960_720.jpg/",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Reut Udler",
    description: "Help us Help you",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a location",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      fortcast(latitude, longitude, (error, fortcastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: fortcastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404help", {
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "404 - Page didn't found",
  });
});

app.listen(3000, () => {
  console.log("Server working");
});
