const express = require("express");
const router = express.Router();
const Register_Models = require("../models/UserSignup");
const JWT = require("jsonwebtoken");

require("dotenv").config();
const upload = require("../config/image_upload")

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
router.patch("/update", async (req, res) => {
  const token = req.body.token || req.headers["token"] || req.cookies.token;

  try {
    // check if havce token 
    if (token == undefined || token == null || token == "") {
      res.json({ message: "You are not login", status: "warning" });
    }

    const have_valid_token = JWT.verify(token, process.env.JWT_SECRET);
    if(!have_valid_token){
      res.json({ message: "You are not login", status: "warning" });
    }

    const id = have_valid_token.id;

    const update_user = await Register_Models.findByIdAndUpdate(id, req.body, {new: true});
    await update_user.save();

    return res.json({ message: "Profile updated successfully", status: "success", data: update_user });
  } catch (err) {
    res.json({ message: err, status: "error" });
  }
});

// code to update user profile data by id
router.patch("/update/img",upload.single("picture"), async (req, res) => {
  console.log('updated profile img..');
  const token = req.body.token || req.headers["token"] || req.cookies.token;

  try {
    // check if havce token 
    if (token == undefined || token == null || token == "") {
      return res.json({ message: "You are not login", status: "warning" });
    }

    const have_valid_token = JWT.verify(token, process.env.JWT_SECRET);
    if(!have_valid_token){
      return res.json({ message: "You are not login", status: "warning" });
    }

    const id = have_valid_token.id;
    const url = req.protocol + "://" + req.get("host");

    const update_user = await Register_Models.findByIdAndUpdate(id, {
      image: url + "/medias/" + req.file.filename,
    }, {new: true});
    await update_user.save();

    return res.json({ message: "Profile image updated", status: "success", data: update_user });
  } catch (err) {
    res.json({ message: err, status: "error" });
  }
});
