const express = require('express');
const router = express.Router();
const {
    getDepartments,
    getDepartment,
    postDepartment,
    updateDepartment,
} = require('../controller/deparment')

router.get('/', getDepartments);
router.get('/:id', getDepartment);
router.post('/post', postDepartment);
router.put('/update/:id', updateDepartment);

module.exports = router;