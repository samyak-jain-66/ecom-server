const express = require("express");
const app = express();
const cors = require("cors");
const { connectToDB } = require("./config/connectDB");
const dotenv = require("dotenv");
const userRoutes = require("./api/routes/User");
const authRoutes = require("./api/routes/Auth");
const productRoutes = require("./api/routes/Product");
const categoryRoutes = require("./api/routes/Category");
const filterRoutes = require("./api/routes/Filter");
const bagRoutes = require("./api/routes/Bag");
const addressRoutes = require("./api/routes/Address");
const orderRoutes = require("./api/routes/Order");
const commentRoutes = require("./api/routes/Comment");
const mailRoutes = require("./api/routes/Mail");
const searchRoute = require("./api/routes/Search");

dotenv.config();
connectToDB();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
let corsOptions = {
  origin: [
    // 'http://127.0.0.1:5173',
    // 'http://localhost:5173',
    // 'http://localhost:3000',
    // 'http://192.168.1.39:3000',
    "https://ecommerce-user-gamma.vercel.app",
    "https://ecommerce-admin-seven-rose.vercel.app",
  ],
};

app.use(cors(corsOptions));
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/filter", filterRoutes);
app.use("/api/v1/bag", bagRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/comment", commentRoutes);
app.use("/api/v1/mail", mailRoutes);
app.use("/api/v1/search", searchRoute);

app.get("/", (req, res) => {
  return res.send("System Up and Running");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server up and running!");
});
