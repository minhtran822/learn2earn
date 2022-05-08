const router = require("express").Router()

router.use("/users", require("./users"))
router.use("/auth", require("./auth"))
router.use("/feedback", require("./feedback"))

module.exports = router;