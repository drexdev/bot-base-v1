const Data = require("./index");

Data.prepare("fywe/getAllUsers", "SELECT * FROM fywe_users");
Data.prepare("fywe/getOrCreateUser", "SELECT * FROM fywe_users WHERE (id, guildId) = (?, ?)");

Data.prepare("fywe/", "");