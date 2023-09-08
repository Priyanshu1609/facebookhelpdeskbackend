'use strict';

const router = require("express").Router();
// const authMiddleWare = require("../middlewares/auth");
const Messages = require("../models/Messages");

// Use dotenv to read .env vars into Node
require('dotenv').config();

router.get("/", async (_req, res) => {
  res.status(200).json("Facebook route");
});

// POST endpoint to create or update a message
router.post("/messages", async (req, res) => {
  const { messageId, message, updated_time } = req.body;

  try {
    // Check if a message with the given messageId exists
    let existingMessage = await Messages.findOne({ messageId });

    // Calculate the time difference in hours
    const currentTime = new Date();
    const timeDifferenceHours = (currentTime - updated_time) / (1000 * 60 * 60);

    if (existingMessage) {
      // If the message exists and updated_time is greater than 24 hours, create a new message
      if (timeDifferenceHours >= 24) {
        existingMessage = new Messages({
          messageId,
          message,
          updated_time: updated_time,
        });

        await existingMessage.save();
        res.status(200).json({ message: "Message saved successfully" });
      } else {
        // Update the existing message
        existingMessage.message = message;
        existingMessage.updated_time = currentTime;

        await existingMessage.save();
        res.status(200).json({ message: "Message updated successfully" });
      }
    } else {
      // Create a new message if it doesn't exist
      existingMessage = new Messages({
        messageId,
        message,
        updated_time: currentTime,
      });

      await existingMessage.save();
      res.status(200).json({ message: "Message created successfully" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ err });
  }
});

// GET endpoint to retrieve all messages
router.get("/messages", async (req, res) => {
  try {
    // Find all messages in the database
    const messages = await Messages.find();

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
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

