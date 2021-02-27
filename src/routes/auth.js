const express = require('express');
const Registry = require('../misc/registry');
let router = express.Router();

router.get('/auth/test', (req, res) => {
    res.json({
        msg: "ok tested",
        environment: Registry.get("env")
    });
    // res.render('login',{
    //     msg: "ok tested",
    //     environment: Registry.get("env")
    // });
});

router.post('/auth/login', (req, res) => {

});

router.post('/auth/register', (req, res) => {
    
});

router.get('/auth/logout', (req, res) => {
    
});

module.exports = router;