const express = require('express');
let router = express.Router();

router.get('/auth/test', (req, res) => {
    res.json({msg: "ok tested"});
});

module.exports = router;