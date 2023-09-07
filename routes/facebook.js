'use strict';

const router = require("express").Router();
const authMiddleWare = require("../middlewares/auth");
const Messages = require("../models/Messages");

// Use dotenv to read .env vars into Node
require('dotenv').config();

router.get("/", async (_req, res) => {
  res.status(200).json("Facebook route");
});

router.post("/add", async (req, res) => {

  try {
    const { email, message } = req.body;
    // add to db using messages model
    const newMessage = new Messages({
      email: email,
      message: message
    })

    const msg = await newMessage.save();
    res.status(200).json({ msg });
  } catch (error) {
    res.status(500).json(err)
  }

})



module.exports = router;

