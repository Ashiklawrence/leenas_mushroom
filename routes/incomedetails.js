const express = require('express');
const router = express.Router();

// middleware
const {authMiddleware} = require('../middleware/authmiddleware')

const { addIncomedetails,getiIncomedetails,deleteIncomedetails} = require('../controllers/incomedetails');


router.route('/addIncomedetails').post(authMiddleware,addIncomedetails);
router.route('/getiIncomedetails').get(authMiddleware,getiIncomedetails);
// router.route('/updateOrderdetails').patch(authMiddleware,updateOrderdetails);
router.route('/deleteIncomedetails').delete(authMiddleware,deleteIncomedetails);

module.exports = router;
