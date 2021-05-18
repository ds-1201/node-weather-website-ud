const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths
const viewsPath = path.join(__dirname, "..", "templates", "views");
const publicDir = path.join(__dirname, "..", "public");
const partialsDir = path.join(__dirname, "..", "templates", "partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsDir);

app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Dhruv Shah",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      message: "address must be provided",
    });
  } else if (req.query.address.length === 0) {
    return res.send({
      message: "address must be provided",
    });
  }

  geocode(req.query.address, (error, geoData) => {
    if (error) {
      return res.send({ message: error });
    }
    forecast(geoData.longtitude, geoData.latitude, (error, forecastData) => {
      if (error) {
        return res.send({ message: error });
      }
      res.send({
        status: 200,
        address: req.query.address,
        result: {
          location: geoData.place_name,
          description: forecastData.description,
          temperature: forecastData.temperature,
          feelslike: forecastData.feelslike,
        },
      });
    });
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Dhruv Shah",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Dhruv Shah",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not Found!!!",
    title: "404 Page",
    name: "Dhruv Shah",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    errorMessage: "Page not Found!!!",
    name: "Dhruv Shah",
  });
});

app.listen(port, () => {
  console.log("Server is started on port 3000");
});
