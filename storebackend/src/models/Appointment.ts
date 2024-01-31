import mongoose, { Schema } from "mongoose";
const appointmentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who booked the appointment
  store: { type: Schema.Types.ObjectId, ref: 'Store', required: true }, // Reference to the store where the appointment is booked
  status: { type: String, enum: ['NOT-AVAILABLE', 'END', 'START'], default: 'NOT-AVAILABLE' },
});

const Appointment = mongoose.models.Appointment || mongoose.model("Appointments", appointmentSchema);
export default Appointment;