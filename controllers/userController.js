const { User, Student } = require('../models');

module.exports = {
  // Get all users
  async getCourses(req, res) {
    try {
      const users = await user.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a user
  async getSingleCourse(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.courseId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a user
  async createCourse(req, res) {
  // example data
  // {
  //   "username": "lernantino",
  //   "email": "lernantino@gmail.com"
  // }

    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a user
  async deleteCourse(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.courseId });

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }

      await Student.deleteMany({ _id: { $in: user.students } });
      res.json({ message: 'user and thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateCourse(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.courseId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
