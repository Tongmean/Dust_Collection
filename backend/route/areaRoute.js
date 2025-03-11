const express = require('express');
const router = express.Router();
const {
    getAreas,
    getArea,
    postArea,
    updateArea,
} = require('../controller/area')

router.get('/', getAreas);
router.get('/:id', getArea);
router.post('/post', postArea);
router.put('/update/:id', updateArea);

module.exports = router;