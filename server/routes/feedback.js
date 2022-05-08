const router = require("express").Router();
const { feedback } = require("../controllers")

router.get("/", feedback.index);
router.get("/:id", feedback.getByID);
router.post("/add/:id", feedback.create);

module.exports = router;