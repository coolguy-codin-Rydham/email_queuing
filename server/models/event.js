import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  description: {
    type: String,
    required: true,
  },
  venue: {
    name: String,
    lat: Number,
    lng: Number,
  },
  mode: {
    type: String,
    required: true,
  },
  creator: {
    type: {
      email: { type: String, required: true },
      name: { type: String, required: true },
    },
    required: true,
  },
});

const EventModel = mongoose.model("Events", eventSchema);

export default EventModel;
