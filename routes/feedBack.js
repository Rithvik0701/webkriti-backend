const express = require("express");
const { verifyToken } = require("../Middlewares/authverify");
const {addfeedback ,addfeedback2} = require("../controllers/feedBack");
const { feedVerify } = require("../Middlewares/feedback");
const router = express.Router();


// router.get("/add", verifyToken, feedVerify);

router.post("/add", verifyToken,feedVerify, addfeedback);
// router.post("/add/", verifyToken,feedVerify,addfeedback2)



module.exports = router;