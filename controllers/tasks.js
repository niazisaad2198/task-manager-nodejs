const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const getTask = async (req, res) => {
  const { id: taskId } = req.params;
  try {
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      return res
        .status(404)
        .json({ msg: `Task not found with id: ${taskId}.` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const updateTask = async (req, res) => {
  const { id: taskId } = req.params;
  try {
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res
        .status(404)
        .json({ msg: `Task not found with id: ${taskId}.` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const deleteTask = async (req, res) => {
  const { id: taskId } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
      return res
        .status(404)
        .json({ msg: `Task not found with id: ${taskId}.` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
