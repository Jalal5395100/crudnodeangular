const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

router.post("/createUser", userController.createUser);
router.put("/updateUser", userController.updateUser);
router.get("", userController.getAllUsers);
router.get("/:id", userController.searchUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
