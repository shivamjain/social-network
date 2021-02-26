const _ = require('lodash');
const express = require('express');
let app = express();

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const config = require(`./${process.env.NODE_ENV}.config.json`);

const schemas = require('./src/schemas');

const routes = require('./src/routes');
_.each(routes, (value, key) => {
    app.use(value);
})

app.listen(config.app.port, (req, res) => {
    console.log(`App is running on port: ${config.app.port}`);
})