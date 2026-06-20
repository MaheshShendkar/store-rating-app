const express = require("express");
const router = express.Router();

const {
  getStores
} = require("../controllers/storeController");

const {
  verifyToken
} = require("../middleware/authMiddleware");

router.get(
  "/searchstores",
  verifyToken,
  getStores
);

module.exports = router;