const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { USER_TYPE: { ADMIN, SUPERADMIN } } = require("../json/enums.json");
const { localUpload } = require("../service/s3.upload")

const {
  EMPLOYEE: { VALIDATOR, APIS }
} = require("../controllers");

/* Post Apis */
router.post("/", auth({ usersAllowed: [ADMIN, SUPERADMIN] }), localUpload.single("uploadExcel"), VALIDATOR.fileUpload, APIS.createEmployee);
router.post("/get", auth({ usersAllowed: [ADMIN, SUPERADMIN] }), VALIDATOR.fetch, APIS.getEmployee);

/* Put Apis */
router.put("/:_id", auth({ usersAllowed: [ADMIN, SUPERADMIN] }), APIS.updateEmployee);

/* Delete Apis */
router.delete("/:_id", auth({ usersAllowed: [ADMIN, SUPERADMIN] }), VALIDATOR.toggleActive, APIS.deleteEmployee);

module.exports = router;