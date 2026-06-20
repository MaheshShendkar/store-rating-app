const db = require("../config/db");

/*
==================================
GET ALL STORES
SEARCH BY NAME / ADDRESS
==================================
*/

exports.getStores = async (req, res) => {
  try {

    const { name, address } = req.query;

    let query = `
      SELECT
        s.id,
        s.name,
        s.email,
        s.address,

        ROUND(
          IFNULL(AVG(r.rating),0),
          2
        ) AS averageRating

      FROM stores s

      LEFT JOIN ratings r
      ON s.id = r.store_id

      WHERE 1=1
    `;

    let values = [];

    if (name) {
      query += " AND s.name LIKE ?";
      values.push(`%${name}%`);
    }

    if (address) {
      query += " AND s.address LIKE ?";
      values.push(`%${address}%`);
    }

    query += `
      GROUP BY
      s.id,
      s.name,
      s.email,
      s.address
    `;

    const [stores] = await db.query(query, values);

    res.status(200).json(stores);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};