const path = require("path");
const { NotFoundError } = require("../Errors");
const FilesModel = require("../Models/file.model");

const createFile = async (req) => {
  const ext = path.extname(req.file.originalname);
  console.log(ext);

  const locationName = (req) => {
    if (ext === ".jpeg" || ext === ".png" || ext === ".jpg") {
      return `uploads/images/${req.file.filename}`;
    } else {
      return `uploads/docs/${req.file.filename}`;
    }
  };

  const result = await FilesModel.create({
    name: req.file ? locationName(req).toString() : "",
  });

  return result;
};

const checkingFile = async (req) => {
  const result = await FilesModel.findOne({ _id: id });
  console.log(result);

  if (!result) {
    throw new NotFoundError("File not found!");
  }

  return result;
};

module.exports = { createFile, checkingFile };
