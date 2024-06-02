const express = require("express");
const collaborative = require("./collaborative");
const content = require("./content");
const router = express.Router();

router.use("/collaborative", collaborative);
router.use("/content", content);

module.exports = router;
