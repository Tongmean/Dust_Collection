const express = require('express');
const router = express.Router();
const {
    getRoundtransportlogs,
    getRoundtransportlog,
    postRoundtransportlog,
    updateRoundtransportlog
} = require('../controller/roundtransportlog')

router.get('/', getRoundtransportlogs);
router.get('/:id', getRoundtransportlog);
router.post('/post', postRoundtransportlog);
router.put('/update/:id', updateRoundtransportlog);

module.exports = router;