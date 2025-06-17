const express = require('express');
const router = express.Router();
const {
    getConcernpersons,
    getConcernperson,
    postConcernperson,
    updateConcernperson,
} = require('../controller/concernperson')

router.get('/', getConcernpersons);
router.get('/:id', getConcernperson);
router.post('/post', postConcernperson);
router.put('/update/:id', updateConcernperson);

module.exports = router;