const _ = require("lodash");
const Registry = require("./src/misc/registry");
const express = require("express");
const exphbs = require("express-handlebars");
let app = express();

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const config = require(`./${process.env.NODE_ENV}.config.json`);

// Database connections initialize
const MongoDB = require("./src/misc/db/client/mongodb");
let mongodbObj = new MongoDB(config.database.mongodb);
let mongodbClient = mongodbObj.createConnection({ useUnifiedTopology: true });

// Initializing database models from schemas over mongodb client.
const schemas = require("./src/schemas");
let models = {};
_.each(schemas, (value, key) => {
    models[key] = mongodbClient.model(key, value);
});

Registry.set("env", process.env.NODE_ENV);
Registry.set("config", config);
Registry.set("models", models);

// Express-Handlebars : Rendering View (Node Frontend)
app.engine("hbs", exphbs({
    defaultLayout: "standard",
    extname: "hbs",
    layoutsDir: "src/views/layouts"
}));

app.set("views", (__dirname + "/src/views")); //In case of custom 'views' path
app.set("view engine", "hbs");

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const routes = require("./src/routes");
_.each(routes, (value, key) => {
    app.use(value);
})

app.listen(config.app.port, (req, res) => {
    console.log(`App is running on port: ${config.app.port}`);
})