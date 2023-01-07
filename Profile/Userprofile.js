const express = require("express");
const router = express.Router();
const Register_Models = require("../models/UserSignup");
const JWT = require("jsonwebtoken");

require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    let token = req.cookies.token || req.headers["token"];

    if (token != undefined || token != null || token != "") {
      const have_valid_token = JWT.verify(token, process.env.JWT_SECRET);
      const id_from_token = have_valid_token.id;
      const user_data = await Register_Models.findById(id_from_token);
      res.json({
        message: "You are login",
        status: "success",
        data: user_data,
        // token: token,
      });
    } else {
      req.json({ message: "You are not login ", status: "warning" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});
module.exports = router;

// code to update user profile data by id
router.patch("/:id", async (req, res) => {
  try {
    const update_user = await Register_Models.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phone_number: req.body.phone_number,
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
          zip_code: req.body.zip_code,
          country: req.body.country,
        },
      }
    );
    res.json(update_user);
  } catch (err) {
    res.json({ message: err });
  }
});
