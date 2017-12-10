const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


let UserSchema = new mongoose.Schema({
   username: String,
   firstName: String,
   lastName: String,
   bDay: String,
   password: String,
   permission: String,
   pic: String,
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);