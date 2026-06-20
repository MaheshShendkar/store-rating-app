// const db = require("../config/db");
// const bcrypt = require("bcryptjs");

// /*
// =========================================
// ADMIN DASHBOARD
// =========================================
// */

// exports.getDashboard = async (req, res) => {
//   try {

//     const [users] = await db.query(
//       "SELECT COUNT(*) AS totalUsers FROM users"
//     );

//     const [stores] = await db.query(
//       "SELECT COUNT(*) AS totalStores FROM stores"
//     );

//     const [ratings] = await db.query(
//       "SELECT COUNT(*) AS totalRatings FROM ratings"
//     );

//     res.status(200).json({
//       totalUsers: users[0].totalUsers,
//       totalStores: stores[0].totalStores,
//       totalRatings: ratings[0].totalRatings
//     });

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       message: "Server Error"
//     });

//   }
// };


// /*
// =========================================
// ADD USER
// =========================================
// */

// exports.addUser = async (req, res) => {

//   try {

//     const {
//       name,
//       email,
//       password,
//       address,
//       role
//     } = req.body;

//     const [existingUser] = await db.query(
//       "SELECT * FROM users WHERE email = ?",
//       [email]
//     );

//     if (existingUser.length > 0) {
//       return res.status(400).json({
//         message: "Email already exists"
//       });
//     }

//     const hashedPassword =
//       await bcrypt.hash(password, 10);

//     await db.query(
//       `INSERT INTO users
//       (name,email,password,address,role)
//       VALUES (?,?,?,?,?)`,
//       [
//         name,
//         email,
//         hashedPassword,
//         address,
//         role
//       ]
//     );

//     res.status(201).json({
//       message: "User Added Successfully"
//     });

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       message: "Server Error"
//     });

//   }
// };


// /*
// =========================================
// GET ALL USERS
// WITH FILTERS
// =========================================
// */

// exports.getUsers = async (req, res) => {

//   try {

//     const { name, email, role } = req.query;

//     let query =
//       `SELECT id,name,email,address,role
//        FROM users
//        WHERE 1=1`;

//     let values = [];

//     if (name) {
//       query += " AND name LIKE ?";
//       values.push(`%${name}%`);
//     }

//     if (email) {
//       query += " AND email LIKE ?";
//       values.push(`%${email}%`);
//     }

//     if (role) {
//       query += " AND role = ?";
//       values.push(role);
//     }

//     const [users] =
//       await db.query(query, values);

//     res.status(200).json(users);

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       message: "Server Error"
//     });

//   }
// };


// /*
// =========================================
// ADD STORE
// =========================================
// */

// exports.addStore = async (req, res) => {

//   try {

//     const {
//       name,
//       email,
//       address,
//       owner_id
//     } = req.body;

//     const [owner] = await db.query(
//       `SELECT *
//        FROM users
//        WHERE id = ?
//        AND role = 'STORE_OWNER'`,
//       [owner_id]
//     );

//     if (owner.length === 0) {
//       return res.status(400).json({
//         message: "Invalid Store Owner"
//       });
//     }

//     await db.query(
//       `INSERT INTO stores
//       (name,email,address,owner_id)
//       VALUES (?,?,?,?)`,
//       [
//         name,
//         email,
//         address,
//         owner_id
//       ]
//     );

//     res.status(201).json({
//       message: "Store Added Successfully"
//     });

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       message: "Server Error"
//     });

//   }
// };


// /*
// =========================================
// GET ALL STORES
// WITH AVERAGE RATING
// =========================================
// */

// exports.getStores = async (req, res) => {

//   try {

//     const [stores] = await db.query(

//       `SELECT
//           s.id,
//           s.name,
//           s.email,
//           s.address,

//           ROUND(
//              AVG(r.rating),2
//           ) AS averageRating

//        FROM stores s

//        LEFT JOIN ratings r
//        ON s.id = r.store_id

//        GROUP BY s.id`

//     );

//     res.status(200).json(stores);

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       message: "Server Error"
//     });

//   }
// };


// exports.getAllUsers = async (req, res) => {

//   try {

//     const {
//       name,
//       email,
//       address,
//       role
//     } = req.query;

//     let query =
//       "SELECT id,name,email,address,role FROM users WHERE 1=1";

//     const params = [];

//     if (name) {
//       query += " AND name LIKE ?";
//       params.push(`%${name}%`);
//     }

//     if (email) {
//       query += " AND email LIKE ?";
//       params.push(`%${email}%`);
//     }

//     if (address) {
//       query += " AND address LIKE ?";
//       params.push(`%${address}%`);
//     }

//     if (role) {
//       query += " AND role = ?";
//       params.push(role);
//     }

//     const [users] = await db.query(
//       query,
//       params
//     );

//     res.status(200).json(users);

//   } catch (error) {

//     res.status(500).json({
//       message: error.message
//     });

//   }

// };


// new code 

const db = require("../config/db");
const bcrypt = require("bcryptjs");

/*
=========================================
ADMIN DASHBOARD
=========================================
*/

exports.getDashboard = async (req, res) => {

  try {

    const [users] = await db.query(
      "SELECT COUNT(*) AS totalUsers FROM users"
    );

    const [stores] = await db.query(
      "SELECT COUNT(*) AS totalStores FROM stores"
    );

    const [ratings] = await db.query(
      "SELECT COUNT(*) AS totalRatings FROM ratings"
    );

    res.status(200).json({
      totalUsers: users[0].totalUsers,
      totalStores: stores[0].totalStores,
      totalRatings: ratings[0].totalRatings
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


/*
=========================================
ADD USER
=========================================
*/

exports.addUser = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      address,
      role
    } = req.body;

    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {

      return res.status(400).json({
        message: "Email already exists"
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users
      (name,email,password,address,role)
      VALUES (?,?,?,?,?)`,
      [
        name,
        email,
        hashedPassword,
        address,
        role
      ]
    );

    res.status(201).json({
      message: "User Added Successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


/*
=========================================
GET USERS WITH FILTERS
=========================================
*/

exports.getUsers = async (req, res) => {

  try {

    const {
      name,
      email,
      address,
      role
    } = req.query;

    let query = `
      SELECT
        id,
        name,
        email,
        address,
        role
      FROM users
      WHERE 1=1
    `;

    const values = [];

    if (name) {

      query +=
        " AND name LIKE ?";

      values.push(
        `%${name}%`
      );

    }

    if (email) {

      query +=
        " AND email LIKE ?";

      values.push(
        `%${email}%`
      );

    }

    if (address) {

      query +=
        " AND address LIKE ?";

      values.push(
        `%${address}%`
      );

    }

    if (role) {

      query +=
        " AND role = ?";

      values.push(role);

    }

    query +=
      " ORDER BY name ASC";

    const [users] =
      await db.query(
        query,
        values
      );

    res.status(200).json(users);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


/*
=========================================
ADD STORE
=========================================
*/

exports.addStore = async (req, res) => {

  try {

    const {
      name,
      email,
      address,
      owner_id
    } = req.body;

    const [owner] = await db.query(
      `SELECT *
       FROM users
       WHERE id = ?
       AND role = 'STORE_OWNER'`,
      [owner_id]
    );

    if (owner.length === 0) {

      return res.status(400).json({
        message: "Invalid Store Owner"
      });

    }

    await db.query(
      `INSERT INTO stores
      (name,email,address,owner_id)
      VALUES (?,?,?,?)`,
      [
        name,
        email,
        address,
        owner_id
      ]
    );

    res.status(201).json({
      message: "Store Added Successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


/*
=========================================
GET STORES WITH FILTERS
=========================================
*/

exports.getStores = async (req, res) => {

  try {

    const {
      name,
      email,
      address
    } = req.query;

    let query = `
      SELECT
        s.id,
        s.name,
        s.email,
        s.address,

        ROUND(
          AVG(r.rating),
          2
        ) AS averageRating

      FROM stores s

      LEFT JOIN ratings r
      ON s.id = r.store_id

      WHERE 1=1
    `;

    const values = [];

    if (name) {

      query +=
        " AND s.name LIKE ?";

      values.push(
        `%${name}%`
      );

    }

    if (email) {

      query +=
        " AND s.email LIKE ?";

      values.push(
        `%${email}%`
      );

    }

    if (address) {

      query +=
        " AND s.address LIKE ?";

      values.push(
        `%${address}%`
      );

    }

    query += `
      GROUP BY s.id
      ORDER BY s.name ASC
    `;

    const [stores] =
      await db.query(
        query,
        values
      );

    res.status(200).json(stores);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};