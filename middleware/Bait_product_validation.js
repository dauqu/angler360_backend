const Bait_Product = require("../models/Bait_Product");

async function Bait_product_validation(req, res, next) {
  try {
    const {
      product_name,
      product_title,
      product_description,
      product_price,
      product_type,
      status,
    } = req.body;

    // code to check all fields are filled
    if (
      !product_name ||
      !product_title ||
      !product_description ||
      !product_price ||
      !product_type ||
      !status
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all fields", status: "warning" });
    }

    // code to check slug is unique or not
    const slug = req.body.slug;
    const slug_exist = await Bait_Product.findOne({
      slug,
    });

    if (slug_exist) {
      return res
        .status(400)
        .json({ message: "This Slug already exist", status: "warning" });
    }
  } catch (error) {
    console.log("(Bait_product_validtion error) " + error);
    return res.status(500).json({ message: error.message, status: "error" });
  }
  next();
}

module.exports = Bait_product_validation;
