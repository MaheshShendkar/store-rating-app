const express = require("express");
const router = express.Router();

const {
  getOwnerDashboard,
  getStoreRatings
} = require("../controllers/ownerController");

const {
  verifyToken
} = require("../middleware/authMiddleware");

const {
  authorize
} = require("../middleware/roleMiddleware");

router.get(
  "/dashboard",
  verifyToken,
  authorize("STORE_OWNER"),
  getOwnerDashboard
);

router.get(
  "/ratings",
  verifyToken,
  authorize("STORE_OWNER"),
  getStoreRatings
);

module.exports = router;