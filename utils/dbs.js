const mongoose = require("mongoose")

function checkDB(){
	try {
		mongoose.connect(process.env.DATABASE_MONGODB, { dbName: "CBT" });
		console.log("connected to db");
	} catch (err) {
		console.log(`failed to connect to db : ${err}`);
	}
};

module.exports = { checkDB };