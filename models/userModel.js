const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');


const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      minlength: 6
    },
    name: {
      type: String,
      required: true
    },
    googleId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);


// Hash password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});



// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  console.log('Comparing passwords...');
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch.toString();
  } catch (error) {
    console.log('Error comparing passwords:', error);
    return error.toString();
  }
};






const User = model("User", userSchema);

module.exports = User;

