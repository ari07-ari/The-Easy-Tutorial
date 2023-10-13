const { Schema, model, Types } = require('mongoose');

// Schema to create reaction model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: ()=>{
          return new Types.ObjectId()
      }
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      getters: (createdAt)=>{
        return createdAt;
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);


module.exports = reactionSchema;
