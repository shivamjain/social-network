const express = require('express');
let router = express.Router();

router.get('/auth/test', (req, res) => {
    res.json({msg: "ok tested"});
});

router.post('/auth/login', (req, res) => {

});

router.post('/auth/register', (req, res) => {
    
});

router.get('/auth/logout', (req, res) => {
    
});

module.exports = router;