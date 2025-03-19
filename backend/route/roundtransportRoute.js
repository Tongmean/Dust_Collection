const express = require('express');
const router = express.Router();
const {getRoundtransports, getRoundtransport, postRoundtransport, updateRoundtransport, deleteroundidandlog} = require('../controller/roundtransport')

router.get('/', getRoundtransports);
router.get('/:id', getRoundtransport);
router.post('/post', postRoundtransport);
router.put('/update/:id', updateRoundtransport);
router.delete('/delete/:id', deleteroundidandlog);

module.exports = router;