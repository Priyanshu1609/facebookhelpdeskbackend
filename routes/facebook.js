'use strict';

const router = require("express").Router();
// const authMiddleWare = require("../middlewares/auth");
const Messages = require("../models/Messages");

// Use dotenv to read .env vars into Node
require('dotenv').config();

router.get("/", async (_req, res) => {
  res.status(200).json("Facebook route");
});

// POST route to create or replace a message
router.post("/messages/add", async (req, res) => {
  const { messageId, message } = req.body;

  try {
    // Check if a message with the given messageId already exists
    const existingMessage = await Messages.findOne({ messageId });

    if (existingMessage) {
      // If the message exists, replace it
      existingMessage.message = message;
      await existingMessage.save();
      res.status(200).json({ message: "Message updated successfully", existingMessage });
    } else {
      // If the message does not exist, create a new one
      const newMessage = new Messages({ messageId, message });
      await newMessage.save();
      res.status(201).json({ message: "Message created successfully", newMessage });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
});

// GET route to retrieve a message by messageId
router.get("/messages/get/:messageId", async (req, res) => {
  const { messageId } = req.params;

  try {
    const message = await Messages.findOne({ messageId });

    if (!message) {
      res.status(404).json({ error: "Message not found" });
    } else {
      res.status(200).json(message);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
});


module.exports = router;

