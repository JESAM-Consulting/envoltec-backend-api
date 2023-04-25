const app = require("express")();

app.get("/", (req, res) => res.send("Welcome to Enovltec APIs!"));

app.use("/role", require("./role.routes"));
app.use("/user", require("./user.routes"));
app.use("/applyNow", require("./apply-now.routes"));
app.use("/appointment", require("./appointment.routes"));
app.use("/employee", require("./employee.routes"));
app.use("/alpha", require("./alpha.routes"));
app.use("/finance-contact", require("./finance.contact.routes"));
app.use("/finance-landing", require("./finance.landing.routes"));

module.exports = app;