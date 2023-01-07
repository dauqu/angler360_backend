const router = require("express").Router();

router.get("/", (req, res) => {
    res.clearCookie("token")
    res.json({ message: "Logout Success", status: "success" })
})
module.exports = router;