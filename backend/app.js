const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const storeRoutes = require("./routes/storeRoutes");
const ratingRoutes= require("./routes/ratingRoutes");
const ownerRoutes =require("./routes/ownerRoutes");
const userRoutes= require("./routes/userRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/owners", ownerRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stores",storeRoutes);
app.use("/api/ratings",ratingRoutes);
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Store Rating Backend Running"
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});