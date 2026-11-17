const express = require("express");
const { listProperties, getProperty } = require("../controllers/propertyController");

const router = express.Router();

router.get("/properties", listProperties);
router.get("/properties/:id", getProperty);

module.exports = router;
