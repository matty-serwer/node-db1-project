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

router.get("/:id", async (req, res) => {
  try {
    const data = await Account.getById(req.params.id);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const validateAccount = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: "Account body required" });
  } else if (!req.body.name || !req.body.budget) {
    res.status(400).json({ message: "name and budget are required fields" });
  } else {
    next();
  }
};

router.post("/", validateAccount, async (req, res) => {
  try {
    const account = req.body;
    const data = await Account.create(account);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const validateAccountId = async (req, res, next) => {
  try {
    const data = await Account.getById(req.params.id);
    if (!data) {
      res.status(404).json({ message: "Invalid id" })
    } else {
      next();
    }
 } catch {
    res.status(500).json({ message: "Server error finding account" });
 }
  
}

router.put("/:id", validateAccountId, validateAccount, async (req, res) => {
  try {
    const changes = req.body;
    const { id } = req.params;
    const data = await Account.update(id, changes);
    const updatedAccount = await Account.getById(id);
    if(data < 1) {
      res.status(500).json({ message: "Server Error" });
    } else {
      res.status(201).json(updatedAccount);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
