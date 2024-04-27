const express = require("express");
const router = express.Router();
const openController = require("../controllers/open_controller");

router.get("/", openController.getLoc);
router.post("/data", openController.saveOrGet);

module.exports = router;
