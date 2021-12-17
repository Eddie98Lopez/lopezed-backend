const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require('../data/db-config')
const { getResByFilter } = require("../dbHelpers");

const checkRegFields = (req, res, next) => {
  const { username, password, first } = req.body;
  if (!username || !password || !first) {
    res.status(400).json({ message: "all fields required" });
  } else {
      console.log('all fields are filled')
    next();
  }
};

const hashPass = (req, res, next) => {
  const { password } = req.body;
  const hash = bcrypt.hashSync(password, 12);
  req.newUser = { ...req.body, password: hash };
  console.log(req.newUser)
  next();
};

// ------------- LOGIN HELPER FUNCTIONS BELOW -------------------------------------------

const checkFields = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "all fields required" });
  } else {
      console.log('all fields filled')
    next();
  }
};

const checkUserExists = async (req, res, next) => {
  try {
    const { username } = req.body;
    console.log(username)
    const user = await getResByFilter("users",{username:username});
    console.log(user)

    if (!user[0]) {
      res.status(400).json({ message: "username or password incorrect" });
    } else {
      req.user = user[0];
      next();
    }
  } catch (error) {
    res.status(500).json("internal server Error bro");
  }
};

const checkPass = (req, res, next) => {
  const hash = req.user.password;
  const { password } = req.body;

  if (bcrypt.compareSync(password, hash) === true) {
    next();
  } else {
    res.status(403).json({ message: "invalid username or password" });
  }
};

const generateToken = (user, secret) => {
  const payload = {
    subject: user.user_id,
    username: user.username,
  };
  const options = {
    expiresIn: "1hr",
  };

  return jwt.sign(payload, secret, options);
};

const addUser = async (table, resource) => {
    const table_id = `${table.slice(0, table.length - 1)}_id`;
    const [newResource] = await db(table).insert(resource).returning([table_id,'first','username'])
    return newResource
  };

module.exports = {
  checkFields,
  hashPass,
  checkUserExists,
  checkPass,
  generateToken,
  checkRegFields,
  addUser
};

