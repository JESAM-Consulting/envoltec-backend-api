const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const { USER_TYPE } = require("../json/enums.json");

const {
  ROLE: { VALIDATOR, APIS },
} = require("../controllers");

router.post("/", auth({ usersAllowed: [USER_TYPE.ADMIN], isTokenRequired: false }), VALIDATOR.createRole, APIS.createRole);
router.get("/get", auth({ usersAllowed: [USER_TYPE.ADMIN], isTokenRequired: false }), APIS.getRole);

module.exports = router;
