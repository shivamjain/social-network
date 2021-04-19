const _ = require("lodash");
const moment = require("moment"); //date formatter module
const path = require("path"); //path module
const express = require("express");
const cookieParser = require('cookie-parser');
const exphbs = require("express-handlebars");
const Registry = require("./src/misc/registry");
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
Registry.set("__dirname", __dirname);

// Express-Handlebars : Rendering View (Node Frontend)
var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        dateFormat: function (dateString) {
            return moment(dateString).format("D MMM YYYY, h:mm:ss a").toUpperCase();
        }
    },
    //handlebars config
    defaultLayout: "standard",
    extname: "hbs",
    layoutsDir: "src/views/layouts",
    partialsDir: Registry.get("__dirname") + "/src/views",
    /* runtimeOptions: {
         allowProtoPropertiesByDefault: true,
         allowProtoMethodsByDefault: true,
    */
});

app.engine("hbs", hbs.engine);
app.set("views", (__dirname + "/src/views")); //In case of custom 'views' path
app.set("view engine", "hbs");

// Set static folder (views)
app.use(express.static(path.join(__dirname, "src/public")));

// Body and Cookie Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const routes = require("./src/routes");
_.each(routes, (value, key) => {
    app.use(value);
})

app.listen(config.app.port, (req, res) => {
    console.log(`App is running on port: ${config.app.port}`);
})