const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req,res)=>{
     try{
        const {
            name,
            email,
            password,
            address
        } = req.body;

        const [existing] = await db.query(
            "SELECT * FROM users WHERE email=?",
            [email]
        );

        if(existing.length>0){
            return res.status(400).json({
                message:"email already exists"
            });
        }

        const hashedPassword =
        await bcrypt.hash(password,10);

        await db.query(
      `INSERT INTO users
      (name,email,password,address,role)
      VALUES(?,?,?,?,?)`,
      [
        name,
        email,
        hashedPassword,
        address,
        "USER"
      ]
    );
    
    res.status(201).json({
        message:"Registration Sucessful"
    });
}catch(error){
    res.status(500).json({
        error:error.message
    });

}
};

exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const [users] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    const user = users[0];

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      token,
      role: user.role,
      name: user.name
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};