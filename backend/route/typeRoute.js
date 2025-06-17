const express = require('express');
const router = express.Router();
const {
    getTypes,
    getType,
    postType,
    updateType,
} = require('../controller/type')

router.get('/', getTypes);
router.get('/:id', getType);
router.post('/post', postType);
router.put('/update/:id', updateType);

module.exports = router;