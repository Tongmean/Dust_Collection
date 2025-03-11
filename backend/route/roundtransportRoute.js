const express = require('express');
const router = express.Router();
const {getRoundtransports, getRoundtransport, postRoundtransport, updateRoundtransport} = require('../controller/roundtransport')

router.get('/', getRoundtransports);
router.get('/:id', getRoundtransport);
router.post('/post', postRoundtransport);
router.put('/update/:id', updateRoundtransport);

module.exports = router;