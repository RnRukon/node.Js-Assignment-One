const express = require('express');
const userController = require("../Controller/User.Controller");

const router = express.Router();

// router.route('/random').get(userController.getRandomUsers);

router.get("/random", userController.getRandomUsers)
router.get("/all", userController.getUsersAll)
router.post('/save', userController.postUser)
// router.patch('/update/:id', userController.patchUser)
// router.patch("/bulk-update/:id", userController.bulkUpdate)
router.delete("/delete/:id", userController.deleteUser)


module.exports = router;

