const mongoose = require('mongoose')

const truckSchema = new mongoose.Schema(
  {
    truckNumber: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      enum: ['navimumbai', 'indore', 'surat'],
    },
    zone: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      default: 5000, // kg
    },
    currentLoad: {
      type: Number,
      default: 0, // kg
    },
    status: {
      type: String,
      enum: ['active', 'maintenance', 'inactive'],
      default: 'active',
    },
    driver: {
      type: String,
      default: null,
    },
    assignedBins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bin',
      },
    ],
    color: {
      type: String,
      default: 'from-blue-400 to-blue-600',
    },
    baseDistance: {
      type: Number,
      default: 0, // km
    },
    baseTime: {
      type: String,
      default: '0 mins',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Truck', truckSchema)
