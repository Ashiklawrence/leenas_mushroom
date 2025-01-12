const express = require('express');
const router = express.Router();

// middleware
const {authMiddleware} = require('../middleware/authmiddleware')

const { addMushroomdetails,getMushroomdetails} = require('../controllers/mushroomdetails');


router.route('/addMushroomdetails').post(authMiddleware,addMushroomdetails);
router.route('/getMushroomdetails').get(authMiddleware,getMushroomdetails);
// router.route('/updateOrderdetails').patch(authMiddleware,updateOrderdetails);
// router.route('/deleteOrderdetails').delete(authMiddleware,deleteOrderdetails);

module.exports = router;
