const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://Massoud01:Moni12345_@cluster0.6di6y2l.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const SimulationDataScehma = new mongoose.Schema({
  P: [Number],
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const dataSchema = new mongoose.Schema({
  windSpeed: {
    type: Number,
  },
  windDirection: {
    type: Number,
  },
  date: {
    type: Date,
  },
});
const contactusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
  },
  query: {
    type: String,
    required: true,
  },
});

const users = mongoose.model("windturbineusers", userSchema);
const data = mongoose.model("windData", dataSchema);
const contactus = mongoose.model("contactus", contactusSchema);
const simulationData = mongoose.model("simulationData", SimulationDataScehma);
module.exports = { users, data, contactus, simulationData };
