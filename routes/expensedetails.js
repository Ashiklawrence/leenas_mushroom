const express = require('express');
const router = express.Router();

// middleware
const {authMiddleware} = require('../middleware/authmiddleware')

const { addExpensedetails,getExpensedetails,deleteExpensedetails} = require('../controllers/expensedetails');


router.route('/addExpensedetails').post(authMiddleware,addExpensedetails);
router.route('/getExpensedetails').get(authMiddleware,getExpensedetails);
// router.route('/updateOrderdetails').patch(authMiddleware,updateOrderdetails);
router.route('/deleteExpensedetails').delete(authMiddleware,deleteExpensedetails);

module.exports = router;
