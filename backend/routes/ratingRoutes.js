const express = require("express");
const router = express.Router();

const {
  submitRating,
  getUserRating
} = require("../controllers/ratingController");

const {
  verifyToken
} = require("../middleware/authMiddleware");


router.post(
  "/submitrating",
  verifyToken,
  submitRating
);

router.get(
  "/store/:storeId",
  verifyToken,
  getUserRating
);

module.exports = router;