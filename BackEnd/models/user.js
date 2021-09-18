const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    fName: {
        type: String,
        required: true,
      },
      lName: {
        type: String,
        required: true,
      },
      phoneNo: {
        type: String,
        required: true,
      },
      Email : {
        type : String,
        required : true,
        unique : true
    }

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User",userSchema)