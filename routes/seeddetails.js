const express = require('express');
const router = express.Router();

// middleware
const {authMiddleware} = require('../middleware/authmiddleware')

const { addSeeddetails,getSeeddetails} = require('../controllers/seeddetails');


router.route('/addSeeddetails').post(authMiddleware,addSeeddetails);
router.route('/getSeeddetails').get(authMiddleware,getSeeddetails);
// router.route('/updateOrderdetails').patch(authMiddleware,updateOrderdetails);
// router.route('/deleteOrderdetails').delete(authMiddleware,deleteOrderdetails);

module.exports = router;
