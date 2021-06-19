const express = require("express");
const { signUp, signIn } = require("../controllers/auth");
const { verifyToken } = require("../Middlewares/authverify");
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);






module.exports = router;