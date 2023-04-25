const express = require("express");
const router = express.Router();
const { upload } = require("../service/s3.upload")

const {
  FINANCELANDING: { VALIDATOR, APIS }
} = require("../controllers");

/* Post Apis */
router.post("/", upload.single("image"), VALIDATOR.create, APIS.createFinanceLanding);
router.get("/", VALIDATOR.fetch, APIS.getFinanceLanding);

/* Put Apis */
router.put("/:_id", upload.single("image"), VALIDATOR.update, APIS.updateFinanceLanding);

/* Delete Apis */
router.delete("/:_id", VALIDATOR.toggleActive, APIS.deleteFinanceLanding);

module.exports = router;