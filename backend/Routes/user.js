const express = require('express');
const router = express.Router();
const userCrts = require('../Controllers/user')
// const User = require('../models/User'); 


router.post('/signup', userCrts.signup );
router.post('/login',userCrts.login); 


module.exports = router;