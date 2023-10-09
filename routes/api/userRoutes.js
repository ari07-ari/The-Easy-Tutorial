const router = require('express').Router();
const {
  getStudents,
  getSingleStudent,
  createStudent,
  deleteStudent,
  addAssignment,
  removeAssignment,
} = require('../../controllers/studentController');

// /api/users
router.route('/').get(getStudents).post(createStudent);

// /api/users/:userId
router.route('/:userId').get(getSingleStudent).delete(deleteStudent).put();

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addAssignment).delete();

module.exports = router;
