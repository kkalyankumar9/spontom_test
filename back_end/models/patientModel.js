const mongoose = require("mongoose");
const crudSchema = mongoose.Schema({
  userID: String,
  name: String,
  patient_image:String,
  age: String,
  gender:String,
  email:String,
  address:String,
  phone_no:String,
  timestamp:String,
  heartRate: String,
  temperature: String,
  medicalHistory:String,
  medications:String,
  user:String
});

const CrudModel = new mongoose.model("HealthData", crudSchema);
module.exports = { CrudModel };
