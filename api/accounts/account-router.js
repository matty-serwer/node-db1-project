const express = require("express");
const router = express.Router();
const Account = require("./account-model");

router.get("/", async (req, res) => {
  try {
    const data = await Account.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
