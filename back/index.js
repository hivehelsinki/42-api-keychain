const scheduledCheck = require("./tasks/scheduled-check");
const populateDatabase = require("./tasks/populate-database");

scheduledCheck.schedule();
