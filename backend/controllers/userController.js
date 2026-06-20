// const db = require("../config/db");
// const bcrypt = require("bcryptjs");

// exports.changePassword = async (req, res) => {

//   try {

//     const userId = req.user.id;

//     const {
//       currentPassword,
//       newPassword
//     } = req.body;

//     const [users] = await db.query(
//       "SELECT * FROM users WHERE id=?",
//       [userId]
//     );

//     const user = users[0];

//     const isMatch =
//       await bcrypt.compare(
//         currentPassword,
//         user.password
//       );

//     if (!isMatch) {
//       return res.status(400).json({
//         message: "Current Password Incorrect"
//       });
//     }

//     const hashedPassword =
//       await bcrypt.hash(newPassword, 10);

//     await db.query(
//       `UPDATE users
//        SET password=?
//        WHERE id=?`,
//       [hashedPassword, userId]
//     );

//     res.status(200).json({
//       message: "Password Updated Successfully"
//     });

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       message: "Server Error"
//     });

//   }
// };



const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.changePassword = async (req, res) => {

  try {

    const userId = req.user.id;

    const {
      currentPassword,
      newPassword
    } = req.body;

    const [users] = await db.query(
      "SELECT * FROM users WHERE id=?",
      [userId]
    );

    if (users.length === 0) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    const user = users[0];

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Current Password Incorrect"
      });

    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    await db.query(
      "UPDATE users SET password=? WHERE id=?",
      [hashedPassword, userId]
    );

    res.status(200).json({
      message: "Password Updated Successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};