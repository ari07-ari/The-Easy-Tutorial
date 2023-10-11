const { Schema, Types , model} = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      //type: Schema.Types.ObjectId,
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(email) {
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regex.test(email);
        },
        message: props => `${props.value} is not a valid phone number!`}
    },
    thoughts:
      [{ type: Schema.Types.ObjectId, 
        ref: 'Thought' }],
    
    friends: 
    [{ type: Schema.Types.ObjectId, 
      ref: 'User' }],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function(){
  return this.friends.length;
})

const User = model('User', userSchema);

module.exports = User;
