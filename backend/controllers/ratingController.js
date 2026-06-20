const db = require("../config/db");

/*
=================================
SUBMIT / UPDATE RATING
=================================
*/

exports.submitRating = async (req, res) => {
  try {

    const userId = req.user.id;

    const {
      storeId,
      rating
    } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5"
      });
    }

    const [existingRating] = await db.query(
      `SELECT *
       FROM ratings
       WHERE user_id = ?
       AND store_id = ?`,
      [userId, storeId]
    );

    if (existingRating.length > 0) {

      await db.query(
        `UPDATE ratings
         SET rating = ?
         WHERE user_id = ?
         AND store_id = ?`,
        [rating, userId, storeId]
      );

      return res.status(200).json({
        message: "Rating Updated Successfully"
      });
    }

    await db.query(
      `INSERT INTO ratings
      (user_id, store_id, rating)
      VALUES (?, ?, ?)`,
      [userId, storeId, rating]
    );

    res.status(201).json({
      message: "Rating Submitted Successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};


/*
=================================
GET USER RATING FOR STORE
=================================
*/

exports.getUserRating = async (req, res) => {

  try {

    const userId = req.user.id;
    const storeId = req.params.storeId;

    const [ratings] = await db.query(
      `SELECT rating
       FROM ratings
       WHERE user_id = ?
       AND store_id = ?`,
      [userId, storeId]
    );

    if (ratings.length === 0) {
      return res.status(200).json({
        rating: null
      });
    }

    res.status(200).json({
      rating: ratings[0].rating
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};