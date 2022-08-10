import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  blogs: [
    { type: mongoose.Schema.Types.ObjectId, ref: "blog", required: true },
  ],
});

// every users should follow usersSchema to creat user
export default mongoose.model("user", userSchema);