const express = require('express');
const router = express.Router();
const userCrts = require('../Controllers/user')


router.post('/signup', userCrts.signup );
router.post('/login',userCrts.login); 


module.exports = router;