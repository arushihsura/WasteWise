const Bin = require('../models/Bin')
const Truck = require('../models/Truck')

const getDashboardStats = async (req, res) => {
  try {
    const { city } = req.params

    if (!['navimumbai', 'indore', 'surat'].includes(city)) {
      return res.status(400).json({ success: false, message: 'Invalid city' })
    }

    // Get all bins for the city
    const bins = await Bin.find({ city })
    const totalBins = bins.length

    // Get bins at risk (priority: high or critical)
    const binsAtRisk = bins.filter((b) => b.priority === 'high' || b.priority === 'critical').length

    // Get trucks for the city
    const trucks = await Truck.find({ city })
    const trucksRequired = Math.ceil(totalBins / 150) // Approximate: 150 bins per truck

    // Calculate efficiency (% of bins below critical)
    const binsNotCritical = bins.filter((b) => b.fillLevel < 90).length
    const efficiency = totalBins > 0 ? Math.round((binsNotCritical / totalBins) * 100) : 0

    // Get city-specific data
    const cityData = {
      navimumbai: {
        name: 'Navi Mumbai',
        zones: ['Market', 'Residential'],
        festivalImpact: 1.6,
      },
      indore: {
        name: 'Indore',
        zones: ['Commercial', 'Industrial'],
        festivalImpact: 1.4,
      },
      surat: {
        name: 'Surat',
        zones: ['Textile', 'Residential'],
        festivalImpact: 1.8,
      },
    }

    res.status(200).json({
      success: true,
      data: {
        city: cityData[city].name,
        totalBins,
        binsAtRisk,
        trucksRequired,
        efficiency,
        zones: cityData[city].zones,
        festivalImpact: cityData[city].festivalImpact,
        stats: bins,
      },
    })
  } catch (error) {
    console.error('Dashboard controller error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard stats', error: error.message })
  }
}

module.exports = { getDashboardStats }
