import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import { Navigation, Truck, Trash2, MapPin, Route, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import logo from '../assets/logo.png';

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icons
const createCustomIcon = (color, icon) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        ${icon}
      </svg>
    </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
};

const truckIcon = createCustomIcon('#10b981', '<path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path><path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path><path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"></path>');
const binHighIcon = createCustomIcon('#ef4444', '<path d="M3 6h18"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path>');
const binMediumIcon = createCustomIcon('#f59e0b', '<path d="M3 6h18"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>');
const binLowIcon = createCustomIcon('#10b981', '<path d="M3 6h18"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>');

const RouteMap = () => {
  const [user, setUser] = useState(null);
  const [selectedTruck, setSelectedTruck] = useState('truck-1');
  const [showOptimized, setShowOptimized] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Dummy data for bins in Navi Mumbai area
  const bins = [
    { id: 1, name: 'Vashi', position: [19.0768, 73.0044], priority: 'high', fillLevel: 92, zone: 'A' },
    { id: 2, name: 'Nerul', position: [19.0331, 73.0169], priority: 'high', fillLevel: 88, zone: 'A' },
    { id: 3, name: 'Seawoods', position: [19.0215, 73.0041], priority: 'medium', fillLevel: 65, zone: 'B' },
    { id: 4, name: 'Kharghar', position: [19.0421, 73.0677], priority: 'medium', fillLevel: 58, zone: 'B' },
    { id: 5, name: 'Panvel', position: [18.9894, 73.1178], priority: 'low', fillLevel: 35, zone: 'C' },
    { id: 6, name: 'Airoli', position: [19.1568, 72.9989], priority: 'high', fillLevel: 85, zone: 'A' },
    { id: 7, name: 'Ghansoli', position: [19.1227, 72.9996], priority: 'medium', fillLevel: 62, zone: 'B' },
    { id: 8, name: 'Kopar Khairane', position: [19.1003, 73.0090], priority: 'low', fillLevel: 40, zone: 'C' },
  ];

  // Truck starting points
  const trucks = [
    { id: 'truck-1', name: 'Truck Alpha', position: [19.0768, 73.0044], zone: 'A', status: 'active' },
    { id: 'truck-2', name: 'Truck Beta', position: [19.0331, 73.0169], zone: 'B', status: 'active' },
    { id: 'truck-3', name: 'Truck Gamma', position: [18.9894, 73.1178], zone: 'C', status: 'idle' },
  ];

  // Optimized route for selected truck
  const getOptimizedRoute = (truckId) => {
    const truck = trucks.find(t => t.id === truckId);
    if (!truck) return { positions: [], bins: [] };

    // Sort bins by priority and proximity to truck
    const sortedBins = [...bins]
      .filter(bin => bin.zone === truck.zone || bin.priority === 'high')
      .sort((a, b) => {
        const priorityWeight = { high: 3, medium: 2, low: 1 };
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      })
      .slice(0, 4);

    const positions = [truck.position, ...sortedBins.map(b => b.position)];
    return { positions, bins: sortedBins };
  };

  const route = getOptimizedRoute(selectedTruck);
  const selectedTruckData = trucks.find(t => t.id === selectedTruck);

  // Calculate route stats
  const totalDistance = (route.bins.length * 2.5).toFixed(1); // km
  const estimatedTime = (route.bins.length * 15).toFixed(0); // minutes
  const totalWaste = route.bins.reduce((sum, bin) => sum + (bin.fillLevel * 1.2), 0).toFixed(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="WasteWise Logo" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                WasteWise
              </h1>
              <p className="text-xs text-gray-500">Route Navigator</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 capitalize">
                {user?.fullName || 'Driver'}
              </p>
              <p className="text-xs text-gray-500 capitalize">{user?.role || 'Role'}</p>
            </div>
            <button className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full text-white font-semibold text-sm flex items-center justify-center hover:shadow-lg transition-shadow">
              {user?.fullName?.charAt(0) || 'D'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Page Title */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-emerald-700 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Navigation size={16} />
            Live Navigation
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Collection Route Map
          </h1>
          <p className="text-gray-600 text-lg">
            Optimized routes for efficient waste collection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-emerald-100">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-teal-50">
                <div className="flex items-center gap-3">
                  <MapPin className="text-emerald-700" size={20} />
                  <h2 className="font-bold text-gray-900">Live Route View</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowOptimized(!showOptimized)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      showOptimized
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-gray-600 border border-gray-300'
                    }`}
                  >
                    {showOptimized ? 'Optimized Route' : 'All Bins'}
                  </button>
                </div>
              </div>

              <div style={{ height: '600px' }}>
                <MapContainer
                  center={[19.0330, 73.0297]}
                  zoom={12}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />

                  {/* Show all bins or only route bins */}
                  {(showOptimized ? route.bins : bins).map((bin) => {
                    const icon = bin.priority === 'high' ? binHighIcon : bin.priority === 'medium' ? binMediumIcon : binLowIcon;
                    return (
                      <Marker key={bin.id} position={bin.position} icon={icon}>
                        <Popup>
                          <div className="p-2">
                            <h3 className="font-bold text-gray-900 mb-1">{bin.name}</h3>
                            <p className="text-sm text-gray-600">Fill Level: {bin.fillLevel}%</p>
                            <p className="text-sm text-gray-600">Priority: {bin.priority}</p>
                            <p className="text-sm text-gray-600">Zone: {bin.zone}</p>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}

                  {/* Show selected truck */}
                  {selectedTruckData && (
                    <Marker position={selectedTruckData.position} icon={truckIcon}>
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-bold text-gray-900 mb-1">{selectedTruckData.name}</h3>
                          <p className="text-sm text-gray-600">Zone: {selectedTruckData.zone}</p>
                          <p className="text-sm text-gray-600">Status: {selectedTruckData.status}</p>
                        </div>
                      </Popup>
                    </Marker>
                  )}

                  {/* Show optimized route line */}
                  {showOptimized && route.positions.length > 0 && (
                    <>
                      <Polyline
                        positions={route.positions}
                        color="#10b981"
                        weight={4}
                        opacity={0.7}
                        dashArray="10, 10"
                      />
                      {/* Show circles around high priority bins */}
                      {route.bins.filter(b => b.priority === 'high').map(bin => (
                        <Circle
                          key={`circle-${bin.id}`}
                          center={bin.position}
                          radius={300}
                          pathOptions={{
                            color: '#ef4444',
                            fillColor: '#ef4444',
                            fillOpacity: 0.1,
                            weight: 2,
                            dashArray: '5, 5'
                          }}
                        />
                      ))}
                    </>
                  )}
                </MapContainer>
              </div>
            </div>
          </div>

          {/* Sidebar - Route Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Truck Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Truck size={20} className="text-emerald-700" />
                Select Truck
              </h3>
              <div className="space-y-2">
                {trucks.map(truck => (
                  <button
                    key={truck.id}
                    onClick={() => setSelectedTruck(truck.id)}
                    className={`w-full p-3 rounded-xl text-left transition-all ${
                      selectedTruck === truck.id
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <p className="font-semibold">{truck.name}</p>
                    <p className="text-xs opacity-90">Zone {truck.zone} • {truck.status}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Route Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Route size={20} className="text-emerald-700" />
                Route Statistics
              </h3>
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin size={16} className="text-emerald-600" />
                    <p className="text-xs font-semibold text-gray-600 uppercase">Distance</p>
                  </div>
                  <p className="text-2xl font-bold text-emerald-700">{totalDistance} km</p>
                </div>

                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={16} className="text-emerald-600" />
                    <p className="text-xs font-semibold text-gray-600 uppercase">Est. Time</p>
                  </div>
                  <p className="text-2xl font-bold text-emerald-700">{estimatedTime} min</p>
                </div>

                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50">
                  <div className="flex items-center gap-2 mb-1">
                    <Trash2 size={16} className="text-emerald-600" />
                    <p className="text-xs font-semibold text-gray-600 uppercase">Total Waste</p>
                  </div>
                  <p className="text-2xl font-bold text-emerald-700">{totalWaste} kg</p>
                </div>

                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle size={16} className="text-emerald-600" />
                    <p className="text-xs font-semibold text-gray-600 uppercase">Stops</p>
                  </div>
                  <p className="text-2xl font-bold text-emerald-700">{route.bins.length}</p>
                </div>
              </div>
            </div>

            {/* Collection Order */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-emerald-700" />
                Collection Order
              </h3>
              <div className="space-y-3">
                {route.bins.map((bin, index) => (
                  <div key={bin.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      bin.priority === 'high' ? 'bg-red-500' : bin.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">{bin.name}</p>
                      <p className="text-xs text-gray-500">{bin.fillLevel}% full</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteMap;
