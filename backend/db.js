const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:KGTM5SImpmIqenme@cluster0.matwpjf.mongodb.net/paytm_project");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    // required: true,
    trim: true,
  },
  lastname: {
    type: String,
    // required: true,
    trim: true,
  },
  username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3,
      maxLength: 30
  },
  password: {
      type: String,
      required: true,
      minLength: 6
  },  
});

const accountschema = mongoose.Schema({
  userid : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true,
  },
  balance : {
    type : Number,
    required : true,
  }
})

const User = mongoose.model("Users",userSchema);
const Account = mongoose.model("accounts",accountschema);

module.exports = {
  User,
  Account,
}