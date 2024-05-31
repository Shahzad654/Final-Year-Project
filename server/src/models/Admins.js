import mongoose from "mongoose";

const AdminsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const AdminsModel = mongoose.model("admins", AdminsSchema);
