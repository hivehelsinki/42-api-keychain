const scheduled = require("./tasks/scheduled");
const populateDatabase = require("./tasks/populate-database");

scheduled.exec();
populateDatabase.exec();
