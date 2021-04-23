const express = require('express');
const router = express.Router();
const lineMessage = require('../controller/linemessage');

router.get('/', (req, res) => {
    return res.status(200).json({
        status: 'success'
    });
});
module.exports = router;