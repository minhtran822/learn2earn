const router = require("express").Router();
const {users} = require("../controllers");
const authRequired = require("../middleware/auth.required");

router.get("/:id", users.getFeedback);
router.post("/add/:id", users.addFeedback);

module.exports = router;