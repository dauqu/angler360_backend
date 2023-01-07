const router = require('express').Router();
const Category = require('../models/Product_Category')
// get all categories 
router.get('/', async (req, res) => {
    try {

        // get all categories
        const categories = await Category.find({ status: "active" }).sort({ createdAt: -1 });
        res.status(200).json({ categories, status: "success" })
    } catch (error) {
        return res.status(200).json({ message: error.message, status: "error" })
    }
})


router.patch('/:id', async (req, res) => {
    const { id } = req.params
    try {

        if (!id || id === null || id === undefined) {
            return res.status(200).json({ message: "Invalid category id", status: "error" })
        }
        const updateCat = await Category.findByIdAndUpdate(id, req.body, { new: true });
        const updatedCat = await updateCat.save();
        return res.status(200).json({ message: "Category details updated successfully", status: "success", updatedCat })
    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error" })
    }
})
module.exports = router;
