const validator = require("validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const admin = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address");
      }
    },
  },
  password: {
    type: String,
    required: true,
  }
});

admin.statics.loginWithEmailAndPassword = async (data) => {
  const admin = await Admin.findOne({ email: data.email });
  if (!admin) {
      return {isLoging:false, error:'Loging faild'}
  }

    const compare = await bcrypt.compare(data.password, admin.password);
    if (!compare) {
        return {isLoging:false, error:'Invalid password'}
    }

    return {isLoging:true, admin};

}

admin.methods.toJSON = function(){
  const admin = this
  const adminObject = admin.toObject()

  delete adminObject.password

  return adminObject
}



const Admin = mongoose.model("admin", admin);

module.exports = Admin;