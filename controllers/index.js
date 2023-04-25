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
  ALPHA: {
    APIS: require("./alpha/alpha.controller"),
    VALIDATOR: require("./alpha/alpha.validator"),
  },
  FINANCECONTACT: {
    APIS: require("./finance.contact/finance.contact.controller"),
    VALIDATOR: require("./finance.contact/finance.contact.validator"),
  },
  FINANCELANDING: {
    APIS: require("./finance.landing/finance.landing.controller"),
    VALIDATOR: require("./finance.landing/finance.landing.validator"),
  }
};
