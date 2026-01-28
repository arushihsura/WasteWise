const Truck = require('../models/Truck')
const Bin = require('../models/Bin')

const getRoutes = async (req, res) => {
  try {
    const { city } = req.params
    const festivalMode = req.query.festival === 'true'

    if (!['navimumbai', 'indore', 'surat'].includes(city)) {
      return res.status(400).json({ success: false, message: 'Invalid city' })
    }

    // Get trucks for the city
    let trucks = await Truck.find({ city }).populate('assignedBins')

    // If no trucks found, create default trucks for the city
    if (trucks.length === 0) {
      const defaultTrucks = {
        navimumbai: [
          { truckNumber: 1, name: 'Truck 1', zone: 'Market Zone', color: 'from-blue-400 to-blue-600', baseDistance: 12.5, baseTime: '45 mins' },
          { truckNumber: 2, name: 'Truck 2', zone: 'Residential Zone', color: 'from-emerald-400 to-emerald-600', baseDistance: 8.3, baseTime: '35 mins' },
        ],
        indore: [
          { truckNumber: 1, name: 'Truck 1', zone: 'Commercial Zone', color: 'from-purple-400 to-purple-600', baseDistance: 10.2, baseTime: '40 mins' },
          { truckNumber: 2, name: 'Truck 2', zone: 'Industrial Zone', color: 'from-amber-400 to-amber-600', baseDistance: 14.7, baseTime: '50 mins' },
        ],
        surat: [
          { truckNumber: 1, name: 'Truck 1', zone: 'Textile District', color: 'from-red-400 to-red-600', baseDistance: 11.8, baseTime: '42 mins' },
          { truckNumber: 2, name: 'Truck 2', zone: 'Residential Zone', color: 'from-cyan-400 to-cyan-600', baseDistance: 9.4, baseTime: '38 mins' },
        ],
      }

      const truckData = defaultTrucks[city]
      for (const truck of truckData) {
        await Truck.create({
          ...truck,
          city,
          driver: null,
          status: 'active',
          capacity: 5000,
          currentLoad: 0,
          assignedBins: [],
        })
      }

      trucks = await Truck.find({ city }).populate('assignedBins')
    }

    // Get bins for the city
    const bins = await Bin.find({ city })

    // Sort bins by priority (critical first)
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
    const sortedBins = bins.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

    // Assign bins to trucks (simplified distribution)
    const trucksWithBins = trucks.map((truck, truckIdx) => {
      const binCount = Math.ceil(sortedBins.length / trucks.length)
      const startIdx = truckIdx * binCount
      const endIdx = Math.min(startIdx + binCount, sortedBins.length)
      const assignedBins = sortedBins.slice(startIdx, endIdx)

      const distance = festivalMode ? truck.baseDistance * 1.3 : truck.baseDistance
      const timeMultiplier = festivalMode ? 1.25 : 1
      const baseTimeMinutes = parseInt(truck.baseTime)
      const estimatedTime = Math.ceil(baseTimeMinutes * timeMultiplier)

      return {
        id: truck._id,
        name: truck.name,
        zone: truck.zone,
        color: truck.color,
        bins: assignedBins.map((bin, idx) => ({
          id: bin._id,
          binId: bin.binId,
          location: bin.location,
          fillLevel: bin.fillLevel,
          priority: bin.priority,
          stopOrder: idx + 1,
        })),
        distance: distance.toFixed(1) + ' km',
        estimatedTime: estimatedTime + ' mins',
        stops: assignedBins.length,
      }
    })

    // Add festival truck if festival mode is active
    if (festivalMode) {
      const festivalBins = bins.filter((b) => b.priority === 'critical').slice(0, 2)
      trucksWithBins.push({
        id: null,
        name: 'Truck 3 (Festival)',
        zone: 'Festival Support',
        color: 'from-pink-400 to-pink-600',
        bins: festivalBins.map((bin, idx) => ({
          id: bin._id,
          binId: bin.binId,
          location: bin.location,
          fillLevel: bin.fillLevel,
          priority: bin.priority,
          stopOrder: idx + 1,
        })),
        distance: '6.5 km',
        estimatedTime: '25 mins',
        stops: festivalBins.length,
      })
    }

    // City-specific explanations
    const explanations = {
      navimumbai: 'Route optimization prioritizes Market Zone bins which have higher fill levels due to increased commercial activity. Residential areas with lower accumulation are scheduled for lower priority to maximize collection efficiency.',
      indore: 'Industrial zone receives priority due to consistent high waste generation. Commercial areas are scheduled for peak efficiency. Route planning avoids congested areas during business hours.',
      surat: 'Textile industry generates significant waste requiring priority scheduling. Coastal residential areas have moderate accumulation. Route timing avoids peak traffic in mill districts.',
    }

    res.status(200).json({
      success: true,
      data: {
        city: city.charAt(0).toUpperCase() + city.slice(1),
        trucks: trucksWithBins,
        explanation: explanations[city],
        festivalMode,
      },
    })
  } catch (error) {
    console.error('Routes controller error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch routes', error: error.message })
  }
}

module.exports = { getRoutes }
