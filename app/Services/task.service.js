const { BadRequestError, NotFoundError } = require("../Errors");
const TaskModel = require("../Models/task.model");

const getAllTask = async () => {
  const result = await TaskModel.find().populate({
    path: "className",
    select: "_id name",
  });

  return result;
};

const createTask = async (req) => {
  const { title, description, file, deadline, className } = req.body;

  const check = await TaskModel.findOne({
    title,
  });

  if (check) {
    throw new BadRequestError("Title already exist!");
  }

  const result = await TaskModel.create({
    title,
    description,
    deadline,
    className,
  });

  return result;
};

const getOneTask = async (req) => {
  const { id } = req.params;

  const result = await TaskModel.findOne({
    _id: id,
  }).populate({ path: "className", select: "_id name" });

  if (!result) {
    throw new NotFoundError("Task not found!");
  }

  return result;
};

const updateTask = async (req) => {
  const { id } = req.params;
  const { title, description, file, deadline, className } = req.body;

  const check = await TaskModel.findOne({
    title,
    _id: { $ne: id },
  });

  if (check) {
    throw new BadRequestError("Title already exist!");
  }

  const result = await TaskModel.findOneAndUpdate(
    {
      _id: id,
    },
    { title, description, deadline, className },
    { new: true, runValidators: true }
  );

  if (!result) {
    throw new NotFoundError("Task not found!");
  }

  return result;
};

const deleteTask = async (req) => {
  const { id } = req.params;

  const result = await TaskModel.findOne({ _id: id });

  if (!result) {
    throw new NotFoundError("Task not found!");
  }

  await result.remove();

  return result;
};

module.exports = { createTask, getAllTask, getOneTask, updateTask, deleteTask };
