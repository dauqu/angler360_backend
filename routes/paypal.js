const router = require("express").Router();

router.all("/cancelled", (req, res) => {
    console.log("Payment cancelled");
    console.log(req.body);
    console.log(req.params);
    res.send("Payment cancelled");
})
router.all("/success", (req, res) => {
    console.log("Payment success");
    console.log(req.body);
    console.log(req.params);
    res.send("Payment success");
})


module.exports = router;