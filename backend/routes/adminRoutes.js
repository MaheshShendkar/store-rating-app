// const express = require("express");
// const router = express.Router();

// const {
//   getDashboard,
//   addUser,
//   getUsers,
//   addStore,
//   getStores
// } = require("../controllers/adminController");

// const {
//   verifyToken
// } = require("../middleware/authMiddleware");

// const {
//   authorize
// } = require("../middleware/roleMiddleware");


// router.get(
//   "/dashboard",
//   verifyToken,
//   authorize("ADMIN"),
//   getDashboard
// );

// router.post(
//   "/users",
//   verifyToken,
//   authorize("ADMIN"),
//   addUser
// );

// router.get(
//   "/users",
//   verifyToken,
//   authorize("ADMIN"),
//   getUsers
// );

// router.post(
//   "/stores",
//   verifyToken,
//   authorize("ADMIN"),
//   addStore
// );

// router.get(
//   "/stores",
//   verifyToken,
//   authorize("ADMIN"),
//   getStores
// );

// module.exports = router;


//  new code 
const express = require("express");
const router = express.Router();

const {
  getDashboard,
  addUser,
  getUsers,
  addStore,
  getStores
} = require("../controllers/adminController");

const {
  verifyToken
} = require("../middleware/authMiddleware");

const {
  authorize
} = require("../middleware/roleMiddleware");

/*
=========================================
ADMIN DASHBOARD
=========================================
*/

router.get(
  "/dashboard",
  verifyToken,
  authorize("ADMIN"),
  getDashboard
);

/*
=========================================
USER MANAGEMENT
=========================================
*/

router.post(
  "/users",
  verifyToken,
  authorize("ADMIN"),
  addUser
);

router.get(
  "/users",
  verifyToken,
  authorize("ADMIN"),
  getUsers
);

/*
=========================================
STORE MANAGEMENT
=========================================
*/

router.post(
  "/stores",
  verifyToken,
  authorize("ADMIN"),
  addStore
);

router.get(
  "/stores",
  verifyToken,
  authorize("ADMIN"),
  getStores
);

module.exports = router;