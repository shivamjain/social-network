const express = require('express');
let app = express();

app.listen(5000, (req, res) => {
    console.log("App is running");
})