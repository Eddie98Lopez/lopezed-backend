const express = require("express");
const {
  checkFields,
  hashPass,
  checkUserExists,
  checkPass,
  generateToken,
  checkRegFields,
  addUser
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", checkRegFields, hashPass, async (req, res) => {
  try {
    const added = await addUser("users", req.newUser);
    res.status(200).json({ message: "user added", user: added });
  } catch (error) {
    res.status(500).json("internal server error");
  }
});

router.post(
  "/login",
  checkFields,
  checkUserExists,
  checkPass,
  async (req, res) => {
    try {
      const token = generateToken(req.user, process.env.JWT_SECRET);
      res.status(200).json({ token: token, user: req.user.username });
    } catch (error) {
      res.status(500);
    }
  }
);

module.exports = router;
