const express = require("express");
const router = express.Router();

const {
  FINANCECONTACT: { VALIDATOR, APIS }
} = require("../controllers");

/* Post Apis */
router.post("/", VALIDATOR.create, APIS.createFinanceContact);
router.get("/", VALIDATOR.fetch, APIS.getFinanceContact);

/* Put Apis */
router.put("/:_id", VALIDATOR.update, APIS.updateFinanceContact);

/* Delete Apis */
router.delete("/:_id", VALIDATOR.toggleActive, APIS.deleteFinanceContact);

module.exports = router;