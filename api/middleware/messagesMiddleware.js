const validateMessage = (req, res, next) => {
  const { first, last, email, message } = req.body;
  console.log(req.body)

  if (!first || !last || !email || !message) {
    res.status(400).json({ message: "all fields required" });
  } else {
    next();
  }
};

module.exports={validateMessage}
