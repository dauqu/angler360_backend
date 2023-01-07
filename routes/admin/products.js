const router = require('express').Router();
const Bait_Product = require("../../models/Bait_Product");
const upload = require("../../config/image_upload");

router.get("/", async (req, res) => {
    try {
        const products = await Bait_Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message, status: "error" });
    }
});


// code to get products by slug from database
router.get("/slug/:slug", async (req, res) => {
    try {
        const product = await Bait_Product.find({ slug: req.params.slug });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message, status: "error" });
    }
});

// code to count total products
router.get("/count/allproduct", async (req, res) => {
    try {
        const products = await Bait_Product.find();
        // send total products
        res.json({ message: "Total products", total_products: products.length });
    } catch (err) {
        res.json({ message: err });
    }
});

// get image url from database
router.get("/image", async (req, res) => {
    try {
        const product = await Bait_Product.find().select("product_image");
        res.json({ message: "Image url", product: product });
    } catch (err) {
        res.status(500).json({ message: err.message, status: "error" });
    }
});

// code to get products by id from database
router.get("/:id", async (req, res) => {
    try {
        const product = await Bait_Product.findById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message, status: "error" });
    }
});

// code to add products to database
router.post("/", upload.single("banner"), async (req, res) => {
    try {
        // console.log(req.body);
        const url = req.protocol + "://" + req.get("host");

        const add_product = new Bait_Product({
            product_name: req.body.product_name,
            product_title: req.body.product_title,
            product_description: req.body.product_description,
            product_price: req.body.product_price,
            product_type: req.body.product_type,
            status: req.body.status,
            product_image: url + "/medias/" + req.file.filename,
            slug: Math.random().toString(36).slice(2, 7).toUpperCase(),
        });

        const new_product = await add_product.save();
        res.status(201).json(new_product);
    } catch (err) {
        res.status(400).json({ message: err.message, status: "error" });
    }
});

// code to edit products from database by slug
router.put("/slug/:slug", async (req, res) => {
    console.log(req.body);
    try {

        const product = await Bait_Product.findOneAndUpdate({
            slug: req.params.slug,
        }, req.body);

        return res.json(product);

    } catch (err) {
        res.status(400).json({ message: err.message, status: "error" });
    }
});

// code to delete products from database
router.delete("/:id", async (req, res) => {
    try {
        await Bait_Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted", status: "success" });
    } catch (error) {
        res.status(500).json({ message: err.message, status: "error" });
    }
});

module.exports = router;