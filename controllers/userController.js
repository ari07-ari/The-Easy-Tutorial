const { User, Student } = require('../models');

module.exports = {
  // Get all users
  async getusers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
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
  async createUser(req, res) {
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

    // Create a Friend
    async createFriend(req, res) {
      // example data
      // {
      //   "username": "marisol03",
      //   "email": "marisol@gmail.com"
      // }
    
        try {
          const user = await User.findOneAndUpdate({_id: req.params.userId }, 
            {$addToSet: {friends: req.params.friendId}}, {new:true});
          res.json(user);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },

  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }
      res.json({ message: 'user deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

    // Delete a friend
    async deletefriend(req, res) {
      try {
        const user = await User.findOneAndDelete({_id: req.params.userId }, 
          {$pull: {friends: req.params.friendId}}, {new:true});
  
        if (!user) {
          res.status(404).json({ message: 'No friend with that ID' });
        }
  
     
        res.json({ message: 'friend deleted!' });
      } catch (err) {
        res.status(500).json(err);
      }
    },

  // Update a user
  async updateUser(req, res) {
      // example data
  // {
  //   "username": "lernantino",
  //   "email": "lernantino@gmail.com"
  // }
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }
      else{
      res.json(user);}
    } 
    catch (err) {
      res.status(500).json(err);
    }
  },
};
