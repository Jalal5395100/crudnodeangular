const user = require("../models/user");
const userModel = require("../models/user");

exports.createUser = (req, res, next) => {
    const user = new userModel({
      fName: req.body.fName,
      lName: req.body.lName,
      phoneNo: req.body.phoneNo,
      Email: req.body.Email
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created!",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error in Creating User!",
          err:err
        });
      });
};

exports.getAllUsers = (req, res, next) => {
  let fetchPosts;
  const userQuery = user.find();
  userQuery
    .then((documents) => {
      fetchPosts = documents;
      return res.status(200).json({
        user:fetchPosts
      })
    })
    .catch((error) => {
      res.status(500).json({
        message: "fetching posts failed!",
      });
    });
};

exports.updateUser = (req, res) => {
  console.log(req.body.id,"dddoioio")
  const updateUser = new user({
    _id: req.body.id,
    fName: req.body.fName,
    lName: req.body.lName,
    phoneNo: req.body.phoneNo,
    Email: req.body.Email
    });
  user.updateOne({ _id: req.body.id }, updateUser)
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update Successfull" });
      } else {
        res.status(401).json({ message: "Not Authorized" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Could not update User!",
      });
    });
};

exports.searchUser = (req, res, next) => {
  user.findById(req.params.id)
    .then((getUser) => {
      if (getUser) {
        res.status(200).json(getUser);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "fetching post failed!",
        error:error
      });
    });
};

exports.deleteUser = (req, res, next) => {
  user.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({
          message: "user deleted successfully",
        });
      } else {
        res.status(401).json({ message: "Error in deleting user" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error in deleting user!",
      });
    });
};
