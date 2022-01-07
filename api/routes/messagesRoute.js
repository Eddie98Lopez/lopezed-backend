const express = require("express");
const { validateMessage } = require("../middleware/messagesMiddleware");
const {
  getResources,
  getById,
  addResource,
} = require("../dbHelpers");
const restricted = require('../middleware/restricted')

const router = express.Router();

router.get("/", restricted,async (req, res) => {
  try {
    const messages = await getResources("messages");
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json("something went wrong");
  }
});

router.get("/:id", restricted,async (req, res) => {
  try {
    const message = await getById("messages", req.params.id);
    res.status(200).json(message)
  } catch (error) {
    res.status(500).json("something went wrong bro");
  }
});

router.post("/", validateMessage, async (req, res) => {
  try {
    const newMessage = await addResource("messages", req.body);
    //console.log(newMessage);
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json("something went wrong bro");
  }
});

module.exports = router;
