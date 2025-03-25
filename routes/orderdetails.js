const express = require('express');
const router = express.Router();

// middleware
const {authMiddleware} = require('../middleware/authmiddleware')

const { addOrderdetails,getOrderdetails,updateOrderdetails,deleteOrderdetails} = require('../controllers/orderdetails');


router.route('/addOrderdetails').post(authMiddleware,addOrderdetails);
router.route('/getOrderdetails').get(authMiddleware,getOrderdetails);
router.route('/updateOrderdetails').patch(authMiddleware,updateOrderdetails);
router.route('/deleteOrderdetails').delete(authMiddleware,deleteOrderdetails);

module.exports = router;
