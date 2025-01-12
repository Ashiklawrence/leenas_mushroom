const express = require('express');
const router = express.Router();

// middleware
const {authMiddleware} = require('../middleware/authmiddleware')

const { addBeddetails,getBeddetails} = require('../controllers/beddetails');


router.route('/addBeddetails').post(authMiddleware,addBeddetails);
router.route('/getBeddetails').get(authMiddleware,getBeddetails);
// router.route('/updateOrderdetails').patch(authMiddleware,updateOrderdetails);
// router.route('/deleteOrderdetails').delete(authMiddleware,deleteOrderdetails);

module.exports = router;
