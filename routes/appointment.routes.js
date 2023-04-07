const express = require("express");
const router = express.Router();

const {
  APPOINTMENT: { VALIDATOR, APIS }
} = require("../controllers");

/* Post Apis */
router.post("/", VALIDATOR.create, APIS.createAppointment);
router.get("/", VALIDATOR.fetch, APIS.getAppointment);

/* Put Apis */
router.put("/:_id", VALIDATOR.update, APIS.updateAppointment);

/* Delete Apis */
router.delete("/:_id", VALIDATOR.toggleActive, APIS.deleteAppointment);

module.exports = router;