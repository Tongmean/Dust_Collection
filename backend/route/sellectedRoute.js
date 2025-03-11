const express = require('express');
const router = express.Router();
const {
    getRoundtransportwithsstatusid,
    getDepartmentid,
    getTypeid,
    getCurrentweight
} = require('../controller/sellcted')

router.get('/roundtransport', getRoundtransportwithsstatusid);
router.get('/department', getDepartmentid);
router.get('/type', getTypeid);
router.get('/curentweight/:Round_ID', getCurrentweight);


module.exports = router; 