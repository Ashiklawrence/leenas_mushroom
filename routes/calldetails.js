

const express = require('express');
const router = express.Router();

// middleware
const {authMiddleware} = require('../middleware/authmiddleware')

const { addCalldetails,getCalldetails,updateCalldetails,deleteCalldetails} = require('../controllers/calldetails');


router.route('/addCalldetails').post(authMiddleware,addCalldetails);
router.route('/getCalldetails').get(authMiddleware,getCalldetails);
router.route('/updateCalldetails').patch(authMiddleware,updateCalldetails);
router.route('/deleteCalldetails').delete(authMiddleware,deleteCalldetails);

module.exports = router;
