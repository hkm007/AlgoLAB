const express = require('express');
const router = express.Router();
const { 
    dummyData, 
    singleDummyData, 
    love, 
    luck,
    stringAPI,
    fact
} = require('../controllers/api');


//dummy api route
router.get('/api/dummy', dummyData);

//api route for specific id of dummy
router.get('/api/dummy/:id', singleDummyData);

//fact api route
router.get('/api/fact', fact);

//api route for love calculator
router.post('/api/love', love);

//api route for luck prediction
router.post('/api/luck', luck);

//api route for string features
router.post('/api/string', stringAPI);

module.exports = router;