const router = require('express').Router();
const {
  getCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../../controllers/userController.js');

// /api/thoughts
router.route('/').get(getCourses).post(createCourse);

// /api/users/:userId
router.route('/:thoughtId').get(getSingleStudent).delete(deleteStudent).put();

// /api/courses/:courseId
router.route('/:thoughtId/reactions').post().delete(deleteCourse);

module.exports = router;
