const router = require('express').Router();
const {
  getusers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  createFriend,
  deletefriend,
  
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getusers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(createFriend).delete(deletefriend);

module.exports = router;
