const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    email:{type:String , reqired: true , unique : true},
    password : {type:String , required: true}
})
// hashing password
// userSchema.pre("save",async function (next) {
//     if (!this.isModified("password")) return next();
//         const salt = await bcrypt.genSalt(10);
//         this.password = bcrypt.hash(this.password, salt);
//         next();
// })

module.exports = mongoose.model("User",userSchema);