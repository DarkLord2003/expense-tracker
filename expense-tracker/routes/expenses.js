const express = require("express");
const Expense = require("../models/Expense");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/add", authMiddleware, async (req, res) => {
  const { amount, category, description } = req.body;
  const expense = new Expense({ user: req.user.id, amount, category, description });
  await expense.save();
  res.json(expense);
});

router.get("/", authMiddleware, async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
  res.json(expenses);
});

module.exports = router;
