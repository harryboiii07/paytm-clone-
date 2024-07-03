import mongoose from "mongoose";

mongoose.connect("mongodb+srv://admin:KGTM5SImpmIqenme@cluster0.matwpjf.mongodb.net/paytm_project");

const userSchema = new mongoose.Schema({
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
  firstName: {
      type: String,
      required: true,
      trim: true,
  },
  lastName: {
      type: String,
      required: true,
      trim: true,
  }
});

const User = mongoose.model("Users",Userschema);

module.exports({
  User
})