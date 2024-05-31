import mongoose from 'mongoose'

const PaystatusSchema = new mongoose.Schema({
 items: {
    type: Array,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid'], 
    default: 'paid', 
  },

}, { timestamps: true });

export const PaystatusModel = mongoose.model('paystatus', PaystatusSchema)