var mongoose = require('mongoose');
  //var Schema = mongoose.Schema;
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');


  var userSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true,
       maxlength: 32,
       trim: true
   },
    lastname: {
           type: String,
           maxlength: 32,
           trim: true,
    },
     email:{
         type: String,
         trim: true,
         required: true,
         unique: true
     },
     userinfo: {
            type: String,
            trim: true
     },
     // TODO will come back here !!
     encry_password: {
         type: String,
         required: true
     },
     salt: String,
     role:{
          type: Number,
          default: 0,
     },
       purchases :{
           type: Array,
           default: []
       }
  },{ timestamps: true });

  userSchema.virtual("password")
  .set(function(password){
      this._password = password
      this.salt = uuidv1();
      this.encry_password = securePassword(password);
  })
  .get(function(){
      return this._password
  })

  userSchema.method = { //This Method convert a plain password to sequre password>

    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },
      securePassword: function(plainpassword){
          if(!password) return "";
          try{
               return crypto.createHmac('sha256', this.salt)
               .update(plainpassword)
               .digest('hex');
          } catch (err) {
               return "";
          }
      }
  }

module.exports = mongoose.model("User", userSchema) // Exporting the user schema 
