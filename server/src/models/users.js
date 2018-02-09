const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
};

module.exports.getUserByEmail = (email, callback) => {
  const query = {email: email};
  User.findOne(query, callback);
};

module.exports.getUserByUsername = (username, callback) => {
  const query = {username: username};
  User.findOne(query, callback);
};

module.exports.addUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  })
}

// promise test

module.exports.createUser = (user) => new Promise((resolve, reject) => {
  let newUser = new User(user)
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

module.exports.findByUsername = (username) => new Promise((resolve, reject) => {
  const query = {username: username};
  resolve({user: User.findOne(query, (err) => {
    if (err) return reject(err);
  })});
})

module.exports.findByEmail = (email) => new Promise((resolve, reject) => {
  const query = {email: email};
  User.findOne(query, (err, user) => {
    if (err) return reject(err);
    else resolve(user);
  });
});

module.exports.comparePassword = (passwords) => new Promise((resolve, reject) => {
  try {
    resolve(bcrypt.compareSync(passwords.candidate, passwords.hash))
  } catch (err) {
    reject(err)
  }
});
