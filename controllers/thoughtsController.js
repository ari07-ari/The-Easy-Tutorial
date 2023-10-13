const { ObjectId } = require('mongoose').Types;
const { Thought, User} = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' })
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

// create a new thought
  async createThoughts(req, res) {
    // example data
  // {
  //   "thoughtText": "Here's a cool thought...",
  //   "username": "lernantino",
  //   "userId": "5edff358a0fcb779aa7b118b"
  // }
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate({_id: req.body.userId },
        {$addToSet:{thoughts: thought._id}}, {new:true});
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

      // Create a reaction
      async createReaction(req, res) {
        // example data
        // {
        //   "reactionBody": "I want some of the food",
        //   "username": "lernantino"
          
        // }
      
          try {
            const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId }, 
              {$addToSet: {reactions: req.body}}, {runValidators:true, new:true});
            res.json(thought);
          } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
        },

  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json({ message: 'thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

    // Delete a Reaction
    async deleteReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          {_id: req.params.thoughtId }, 
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          {  runValidators: true, new:true});
  
        if (!thought) {
          res.status(404).json({ message: 'No reaction with that ID' });
        }
        
        res.json({ message: 'reaction deleted!' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },

  // Update a thought
  async updateThought(req, res) {
    // example data
  // {
  //   "thoughtText": "Here's a cool thought...",
  //   "username": "lernantino",
  //   "userId": "5edff358a0fcb779aa7b118b"
  // }
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
