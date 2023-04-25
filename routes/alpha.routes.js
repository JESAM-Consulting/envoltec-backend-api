const express = require("express");
const router = express.Router();

const {
  ALPHA : { VALIDATOR, APIS }
} = require("../controllers");

/* Post Apis */
router.post("/", VALIDATOR.create, APIS.createAlpha);
router.get("/", VALIDATOR.fetch, APIS.getAlpha);

/* Put Apis */
router.put("/:_id", VALIDATOR.update, APIS.updateAlpha);

/* Delete Apis */
router.delete("/:_id", VALIDATOR.toggleActive, APIS.deleteAlpha);

module.exports = router;