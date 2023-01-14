const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();

app.use(express.static(__dirname + "/"));
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.json({ message: "Angler_360_Backend API is  working" });
});

//Loop of allowed origins
const allowedOrigins = [
  "https://angler360-front.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
];

//CORS policy access
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);


const connectDB = require("./config/database");
connectDB();

//user handlers
app.use("/api/profile", require("./Profile/Userprofile"));
app.use("/api/getuser", require("./routes/user_register"));
app.use("/api/signup", require("./routes/user_register"));
app.use("/api/login", require("./routes/login"));
app.use("/api/logout", require("./routes/logout"));


//user routes
app.use("/api/products", require("./routes/Product"));
app.use('/api/category', require('./routes/category'))
app.use('/api/cart', require('./routes/cart'))
app.use('/api/order', require('./routes/order'))
app.use('/api/paypal', require('./routes/paypal'))


//admin handler
app.use("/api/admin/profile", require("./Profile/Userprofile"));
app.use("/api/admin/getuser", require("./routes/admin/user_register"));
app.use("/api/admin/signup", require("./routes/admin/user_register"));
app.use("/api/admin/login", require("./routes/admin/login"));
app.use("/api/admin/logout", require("./routes/admin/logout"));

// admin routes 
app.use("/api/admin/products", require("./routes/admin/products"));
app.use("/api/admin/productcategories", require("./routes/admin/Product_Category"));
app.use("/api/admin/orders", require("./routes/admin/Orders"));
app.use("/api/admin/cart", require("./routes/admin/Cart"));


app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
