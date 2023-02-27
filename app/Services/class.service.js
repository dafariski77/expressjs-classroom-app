const { NotFoundError, BadRequestError } = require("../Errors");
const ClassModel = require("../Models/class.model");

const getAllClass = async () => {
  const result = await ClassModel.find();

  return result;
};

const getOneClass = async (req) => {
  const { id } = req.params;

  const result = await ClassModel.findOne({
    _id: id,
  });

  if (!result) {
    throw new NotFoundError("Class Not Found");
  }

  return result;
};

const createClass = async (req) => {
  const { name, description, teacher, tags } = req.body;

  const check = await ClassModel.findOne({
    name,
  });

  if (check) {
    throw new BadRequestError("Class name already exist!");
  }

  const result = await ClassModel.create({
    name,
    description,
    teacher,
    tags,
  });

  return result;
};

const deleteClass = async (req) => {
  const { id } = req.params;

  const result = await ClassModel.findOne({
    _id: id,
  });

  if (!result) {
    throw new NotFoundError("Class Not found!");
  }

  await result.remove();

  return result;
};

const updateClass = async (req) => {
  const { id } = req.params;
  const { name, description, teacher, tags } = req.body;

  const check = await ClassModel.findOne({
    name,
    _id: { $ne: id },
  });

  if (check) {
    throw new BadRequestError("Class name already exist");
  }

  const result = await ClassModel.findOneAndUpdate(
    {
      _id: id,
    },
    {
      name,
      description,
      teacher,
      tags,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!result) {
    throw new NotFoundError("Class Not found");
  }

  return result;
};

module.exports = {
  getOneClass,
  createClass,
  getAllClass,
  updateClass,
  deleteClass,
};
