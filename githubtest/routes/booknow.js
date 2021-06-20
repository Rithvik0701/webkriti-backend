const express = require("express");
const { verifyToken } = require("../Middlewares/authverify");
const router = express.Router();
const { bookNow } = require("../controllers/booknow");
const { seatdata } = require("../Middlewares/seatinfo");

router.post("/book", verifyToken,seatdata ,bookNow);


// router.post("/book", verifyToken,seatdata );
module.exports = router;