const Bin = require('../models/Bin')
const Truck = require('../models/Truck')

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Bin.deleteMany({})
    await Truck.deleteMany({})

    console.log('Creating seed data...')

    // Pune bins
    const pruneBins = [
      // Market Zone - High priority
      { binId: 'PUNE-MZ-001', location: 'Market Street (High St)', city: 'pune', zone: 'Market', fillLevel: 95, capacity: 100 },
      { binId: 'PUNE-MZ-002', location: 'Commercial Hub', city: 'pune', zone: 'Market', fillLevel: 88, capacity: 100 },
      { binId: 'PUNE-MZ-003', location: 'Shopping District', city: 'pune', zone: 'Market', fillLevel: 82, capacity: 100 },
      { binId: 'PUNE-MZ-004', location: 'Business Park A', city: 'pune', zone: 'Market', fillLevel: 75, capacity: 100 },
      { binId: 'PUNE-MZ-005', location: 'Food Court Area', city: 'pune', zone: 'Market', fillLevel: 92, capacity: 100 },
      // Residential Zone - Medium priority
      { binId: 'PUNE-RZ-001', location: 'Residential Area A', city: 'pune', zone: 'Residential', fillLevel: 65, capacity: 100 },
      { binId: 'PUNE-RZ-002', location: 'Residential Area B', city: 'pune', zone: 'Residential', fillLevel: 58, capacity: 100 },
      { binId: 'PUNE-RZ-003', location: 'Park Road', city: 'pune', zone: 'Residential', fillLevel: 45, capacity: 100 },
      { binId: 'PUNE-RZ-004', location: 'Housing Complex', city: 'pune', zone: 'Residential', fillLevel: 52, capacity: 100 },
      { binId: 'PUNE-RZ-005', location: 'Garden Society', city: 'pune', zone: 'Residential', fillLevel: 48, capacity: 100 },
    ]

    // Indore bins
    const indoreBins = [
      // Commercial Zone - High priority
      { binId: 'INDORE-CZ-001', location: 'Commercial Hub', city: 'indore', zone: 'Commercial', fillLevel: 92, capacity: 100 },
      { binId: 'INDORE-CZ-002', location: 'Business District', city: 'indore', zone: 'Commercial', fillLevel: 86, capacity: 100 },
      { binId: 'INDORE-CZ-003', location: 'Trade Center', city: 'indore', zone: 'Commercial', fillLevel: 79, capacity: 100 },
      { binId: 'INDORE-CZ-004', location: 'Shopping Mall', city: 'indore', zone: 'Commercial', fillLevel: 88, capacity: 100 },
      { binId: 'INDORE-CZ-005', location: 'Office Complex', city: 'indore', zone: 'Commercial', fillLevel: 71, capacity: 100 },
      // Industrial Zone - High priority
      { binId: 'INDORE-IZ-001', location: 'Industrial Park A', city: 'indore', zone: 'Industrial', fillLevel: 88, capacity: 100 },
      { binId: 'INDORE-IZ-002', location: 'Factory District', city: 'indore', zone: 'Industrial', fillLevel: 75, capacity: 100 },
      { binId: 'INDORE-IZ-003', location: 'Warehouse Area', city: 'indore', zone: 'Industrial', fillLevel: 62, capacity: 100 },
      { binId: 'INDORE-IZ-004', location: 'Manufacturing Plant', city: 'indore', zone: 'Industrial', fillLevel: 84, capacity: 100 },
      { binId: 'INDORE-IZ-005', location: 'Industrial Hub', city: 'indore', zone: 'Industrial', fillLevel: 68, capacity: 100 },
    ]

    // Surat bins
    const suratBins = [
      // Textile District - High priority
      { binId: 'SURAT-TD-001', location: 'Textile Mills Area', city: 'surat', zone: 'Textile', fillLevel: 93, capacity: 100 },
      { binId: 'SURAT-TD-002', location: 'Garment District', city: 'surat', zone: 'Textile', fillLevel: 87, capacity: 100 },
      { binId: 'SURAT-TD-003', location: 'Fabric Market', city: 'surat', zone: 'Textile', fillLevel: 81, capacity: 100 },
      { binId: 'SURAT-TD-004', location: 'Cotton Processing', city: 'surat', zone: 'Textile', fillLevel: 89, capacity: 100 },
      { binId: 'SURAT-TD-005', location: 'Dyeing Units', city: 'surat', zone: 'Textile', fillLevel: 76, capacity: 100 },
      // Residential Zone - Medium priority
      { binId: 'SURAT-RZ-001', location: 'Coastal Residential', city: 'surat', zone: 'Residential', fillLevel: 71, capacity: 100 },
      { binId: 'SURAT-RZ-002', location: 'Suburban Area', city: 'surat', zone: 'Residential', fillLevel: 59, capacity: 100 },
      { binId: 'SURAT-RZ-003', location: 'Housing Complex', city: 'surat', zone: 'Residential', fillLevel: 52, capacity: 100 },
      { binId: 'SURAT-RZ-004', location: 'Residential Colony', city: 'surat', zone: 'Residential', fillLevel: 64, capacity: 100 },
      { binId: 'SURAT-RZ-005', location: 'Apartment Society', city: 'surat', zone: 'Residential', fillLevel: 47, capacity: 100 },
    ]

    const allBins = [...pruneBins, ...indoreBins, ...suratBins]
    await Bin.insertMany(allBins)
    console.log(`Created ${allBins.length} bins`)

    // Create trucks
    const trucks = [
      // Pune trucks
      { truckNumber: 1, name: 'Truck 1', city: 'pune', zone: 'Market Zone', color: 'from-blue-400 to-blue-600', baseDistance: 12.5, baseTime: '45 mins', status: 'active' },
      { truckNumber: 2, name: 'Truck 2', city: 'pune', zone: 'Residential Zone', color: 'from-emerald-400 to-emerald-600', baseDistance: 8.3, baseTime: '35 mins', status: 'active' },
      // Indore trucks
      { truckNumber: 1, name: 'Truck 1', city: 'indore', zone: 'Commercial Zone', color: 'from-purple-400 to-purple-600', baseDistance: 10.2, baseTime: '40 mins', status: 'active' },
      { truckNumber: 2, name: 'Truck 2', city: 'indore', zone: 'Industrial Zone', color: 'from-amber-400 to-amber-600', baseDistance: 14.7, baseTime: '50 mins', status: 'active' },
      // Surat trucks
      { truckNumber: 1, name: 'Truck 1', city: 'surat', zone: 'Textile District', color: 'from-red-400 to-red-600', baseDistance: 11.8, baseTime: '42 mins', status: 'active' },
      { truckNumber: 2, name: 'Truck 2', city: 'surat', zone: 'Residential Zone', color: 'from-cyan-400 to-cyan-600', baseDistance: 9.4, baseTime: '38 mins', status: 'active' },
    ]

    await Truck.insertMany(trucks)
    console.log(`Created ${trucks.length} trucks`)

    console.log('✅ Database seeding completed successfully!')
    return true
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    return false
  }
}

module.exports = seedDatabase
