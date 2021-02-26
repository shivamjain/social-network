const _ = require('lodash');
const express = require('express');
let app = express();

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const config = require(`./${process.env.NODE_ENV}.config.json`);

// Database connections initialize
const MongoDB = require('./src/misc/db/client/mongodb');
let mongodbObj = new MongoDB(config.database.mongodb);
let mongodbClient = mongodbObj.createConnection({ useUnifiedTopology: true });

// Initializing database models from schemas over mongodb client.
const schemas = require('./src/schemas');
let models = {};
_.each(schemas, (value, key) => {
	models[key] = mongodbClient.model(key, value);
});

const routes = require('./src/routes');
_.each(routes, (value, key) => {
    app.use(value);
})

app.listen(config.app.port, (req, res) => {
    console.log(`App is running on port: ${config.app.port}`);
})