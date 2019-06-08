const { Schema, model } = require('mongoose');
const { randomBytes, pbkdf2Sync } = require('crypto');
const uniquePlugin = require('mongoose-unique-validator');
const { sign } = require('jsonwebtoken');
const config = require('../config');
const { userRoles } = require('../utils/mongo');

const UserSchema = new Schema({
  name: {
    type: String, lowercase: true, trim: true, required: 'Please provide a name',
  },
  email: {
    type: String, lowercase: true, trim: true, unique: true, required: 'Please provide a valid email address',
  },
  role: { type: String, enum: userRoles, default: userRoles[0] },
  isActive: { type: Boolean, default: false },
  photoUrl: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  salt: String,
  hash: String,
}, { timestamps: true });

UserSchema.plugin(uniquePlugin, { message: 'An account already exists with that email ' });

UserSchema.index({
  email: 1,
  name: 1,
});
UserSchema.index({
  name: 'text',
});

UserSchema.index({
  name: 'text',
});

UserSchema.methods.setPassword = function userPassword(password) {
  this.salt = randomBytes(16).toString('hex');
  this.hash = pbkdf2Sync(password, this.salt, 100, 64, 'sha512').toString('hex');
};

UserSchema.methods.verifyPassword = function verify(password) {
  const hash = pbkdf2Sync(password, this.salt, 100, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.statics.validateToken = async function tokenValidate(token) {
  const user = await this.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  return { name: user.name };
};

UserSchema.methods.generateToken = function token(time = '7d') {
  return sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
    },
    config.secret, {
      issuer: config.baseUrl,
      expiresIn: time,
    },
  );
};

module.exports = model('User', UserSchema);
