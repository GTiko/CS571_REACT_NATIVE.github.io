const express = require("express");
const router = express.Router();
const lucasController = require("../controllers/lucasController");
const auth = require("../middleware/auth");

router.get("/", auth.validateNumber, lucasController.findLucasNumber);

module.exports = router;