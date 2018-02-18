const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  joined: {
    type: Date,
    default: Date.now
  }
});

var User = module.exports = mongoose.model('Users', userSchema);

module.exports.createUser = (user) => new Promise((resolve, reject) => {
  let newUser = new User(user);
  try {
    var salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(newUser.password, salt);
  } catch (err) {
    console.log(err);
    reject(err);
  }

  newUser.save(function (err) {
    if (err) return reject(err);
    resolve(newUser);
  });
})

module.exports.findById = (id) => new Promise((resolve, reject) => {
  const query = {id: id};
  resolve({user: User.findOne(query, (err) => {
    if (err) return reject(err);
  })});
})

module.exports.findByUsername = (username) => new Promise((resolve, reject) => {
  const query = {username: username};
  User.findOne(query, (err, user) => {
    if (err) return reject(err);
    else user ? resolve(user) : reject(new Error('User not found'));
  });
})

module.exports.findByEmail = (email) => new Promise((resolve, reject) => {
  const query = {email: email};
  User.findOne(query, (err, user) => {
    if (err) return reject(err);
    else user ? resolve(user) : reject(new Error('User not found'));
  });
});

module.exports.comparePassword = (passwords) => new Promise((resolve, reject) => {
  try {
    bcrypt.compareSync(passwords.candidate, passwords.hash) ? resolve() : reject(new Error('Password Did Not Match'));
  } catch (err) {
    reject(err);
  }
});
