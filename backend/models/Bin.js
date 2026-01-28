const mongoose = require('mongoose')

const binSchema = new mongoose.Schema(
  {
    binId: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
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
    fillLevel: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 0,
    },
    priority: {
      type: String,
      enum: ['critical', 'high', 'medium', 'low'],
      default: 'low',
    },
    status: {
      type: String,
      enum: ['active', 'maintenance', 'full'],
      default: 'active',
    },
    truckAssigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Truck',
      default: null,
    },
    capacity: {
      type: Number,
      default: 100,
    },
    lastCollected: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
)

// Pre-save hook to determine priority based on fill level
binSchema.pre('save', function () {
  if (this.fillLevel >= 90) {
    this.priority = 'critical'
  } else if (this.fillLevel >= 75) {
    this.priority = 'high'
  } else if (this.fillLevel >= 60) {
    this.priority = 'medium'
  } else {
    this.priority = 'low'
  }
})

module.exports = mongoose.model('Bin', binSchema)
