const db = require("../config/db");

/*
=================================
OWNER DASHBOARD
AVERAGE RATING
=================================
*/

exports.getOwnerDashboard = async (req, res) => {

  try {

    const ownerId = req.user.id;

    const [result] = await db.query(

      `SELECT

        s.id,
        s.name,

        ROUND(
          IFNULL(AVG(r.rating),0),
          2
        ) AS averageRating

      FROM stores s

      LEFT JOIN ratings r
      ON s.id = r.store_id

      WHERE s.owner_id = ?

      GROUP BY s.id`,

      [ownerId]

    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "No Store Found"
      });
    }

    res.status(200).json(result[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};



/*
=================================
USERS WHO RATED MY STORE
=================================
*/

exports.getStoreRatings = async (req, res) => {

  try {

    const ownerId = req.user.id;

    const [ratings] = await db.query(

      `SELECT

        u.id,
        u.name,
        u.email,
        r.rating

      FROM users u

      INNER JOIN ratings r
      ON u.id = r.user_id

      INNER JOIN stores s
      ON s.id = r.store_id

      WHERE s.owner_id = ?`,

      [ownerId]

    );

    res.status(200).json(ratings);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};