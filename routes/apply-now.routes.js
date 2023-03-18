const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { USER_TYPE: { ADMIN } } = require("../json/enums.json");

const {
  APPLYNOW: { VALIDATOR, APIS }
} = require("../controllers");

/* Post Apis */
router.post("/", auth({ usersAllowed: [ADMIN] }), VALIDATOR.create, APIS.createApplyNow);
router.post("/get", auth({ usersAllowed: [ADMIN] }), VALIDATOR.fetch, APIS.getApplyNow);

/* Put Apis */
router.put("/update/:_id", auth({ usersAllowed: [ADMIN] }), APIS.updateApplyNow);

/* Delete Apis */
router.delete("/delete/:_id", auth({ usersAllowed: [ADMIN] }), VALIDATOR.toggleActive, APIS.deleteApplyNow);

module.exports = router;