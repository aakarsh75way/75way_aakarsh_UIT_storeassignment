import mongoose, { Schema } from "mongoose";
const storeSchema = new Schema({
  name: { type: String, required: true,unique:true },
  openTime: { type: String, required: true },
  closeTime: { type: String, required: true },
  employees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  bookedAppointments: [{ type: Number }],
  timeSlotInterval: { type: Number, default: 15 }, // Appointment time slot interval in minutes it could be like the store is only opened for say 3 hours
  capacityPerSlot: { type: Number, default: 10 }, // Maximum number of appointments per time slot and it will be managed by employees
});

const Store = mongoose.models.Store || mongoose.model("Stores", storeSchema);
export default Store;
