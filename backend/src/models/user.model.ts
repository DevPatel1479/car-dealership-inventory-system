import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      required: true,
      default: 'USER',
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model('User', userSchema);