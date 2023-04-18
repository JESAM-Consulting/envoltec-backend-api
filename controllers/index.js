module.exports = {
  ROLE: {
    APIS: require("./role/role.controller"),
    VALIDATOR: require("./role/role.validator"),
  },
  USER: {
    APIS: require("./user/user.controller"),
    VALIDATOR: require("./user/user.validator"),
  },
  APPLYNOW: {
    APIS: require("./applyNow/apply-now.controller"),
    VALIDATOR: require("./applyNow/apply-now.validator"),
  },
  APPOINTMENT: {
    APIS: require("./appointment/appointment.controller"),
    VALIDATOR: require("./appointment/appointment.validator"),
  },
  EMPLOYEE: {
    APIS: require("./employe/employe.controller"),
    VALIDATOR: require("./employe/employe.validator"),
  },
};
