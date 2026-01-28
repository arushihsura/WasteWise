import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  DollarSign,
  Leaf,
  Fuel,
  Wind,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  MapPin,
  Target,
  Calendar,
  Sparkles
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import logo from '../assets/logo.png';

const AnalyticsImpact = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedZone, setSelectedZone] = useState('all');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Dummy Data
  const [wasteTrendData] = useState([
    { month: 'Jan', traditional: 450, smart: 380, saved: 70 },
    { month: 'Feb', traditional: 480, smart: 390, saved: 90 },
    { month: 'Mar', traditional: 520, smart: 410, saved: 110 },
    { month: 'Apr', traditional: 500, smart: 395, saved: 105 },
    { month: 'May', traditional: 530, smart: 420, saved: 110 },
    { month: 'Jun', traditional: 510, smart: 400, saved: 110 }
  ]);

  const [costComparisonData] = useState([
    { category: 'Fuel Costs', traditional: 45000, smart: 32000 },
    { category: 'Labor Hours', traditional: 38000, smart: 35000 },
    { category: 'Maintenance', traditional: 15000, smart: 12000 },
    { category: 'Penalties', traditional: 8000, smart: 2000 }
  ]);

  const [zonePerformanceData] = useState([
    { zone: 'Zone A', efficiency: 92, complaints: 5, waste: 1250 },
    { zone: 'Zone B', efficiency: 88, complaints: 12, waste: 1450 },
    { zone: 'Zone C', efficiency: 95, complaints: 3, waste: 980 },
    { zone: 'Zone D', efficiency: 85, complaints: 18, waste: 1680 },
    { zone: 'Zone E', efficiency: 90, complaints: 8, waste: 1320 }
  ]);

  const [emissionsData] = useState([
    { month: 'Jan', traditional: 180, smart: 125 },
    { month: 'Feb', traditional: 195, smart: 130 },
    { month: 'Mar', traditional: 210, smart: 140 },
    { month: 'Apr', traditional: 200, smart: 135 },
    { month: 'May', traditional: 215, smart: 145 },
    { month: 'Jun', traditional: 205, smart: 138 }
  ]);

  const [impactMetrics] = useState({
    fuelSaved: 15240,
    fuelSavedPercent: 28.5,
    emissionsReduced: 385,
    emissionsReducedPercent: 32.8,
    complaintsReduced: 156,
    complaintsReducedPercent: 68.4,
    costSavings: 22000,
    costSavingsPercent: 20.7,
    avgEfficiency: 90,
    overallImprovement: 15.3
  });

  const handleExport = () => {
    alert(`Exporting ${timeRange} report...`);
  };

  const MetricCard = ({ icon: Icon, title, value, change, changeType, suffix = '' }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg">
              <Icon size={20} className="text-emerald-700" />
            </div>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              {title}
            </p>
          </div>
          <h3 className="text-4xl font-bold mb-3 bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
            {value?.toLocaleString() || '0'}{suffix}
          </h3>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
              changeType === 'down' ? 'bg-green-50' : 'bg-emerald-50'
            }`}>
              {changeType === 'up' ? (
                <ArrowUpRight size={14} className="text-emerald-600" />
              ) : (
                <ArrowDownRight size={14} className="text-green-600" />
              )}
              <span className={`text-sm font-bold ${
                changeType === 'down' ? 'text-green-600' : 'text-emerald-600'
              }`}>
                {change}%
              </span>
            </div>
            <span className="text-xs text-gray-500">vs traditional</span>
          </div>
        </div>
      </div>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border-2 border-emerald-200">
          <p className="font-bold text-emerald-800 mb-2">
            {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {entry.name}: {entry.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

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
              <p className="text-xs text-gray-500">Analytics & Impact</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 capitalize">
                {user?.fullName || 'Official'}
              </p>
              <p className="text-xs text-gray-500 capitalize">{user?.role || 'Role'}</p>
            </div>
            <button className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full text-white font-semibold text-sm flex items-center justify-center hover:shadow-lg transition-shadow">
              {user?.fullName?.charAt(0) || 'A'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Page Title Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm font-semibold text-emerald-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Sparkles size={16} />
                Performance Analytics
              </p>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Impact Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Track performance, cost savings, and environmental impact in real-time
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2.5 rounded-xl border-2 border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white font-medium text-gray-700 transition-all"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <Download size={18} />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Key Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={Fuel}
            title="Fuel Saved"
            value={impactMetrics.fuelSaved}
            change={impactMetrics.fuelSavedPercent}
            changeType="down"
            suffix=" L"
          />
          <MetricCard
            icon={Wind}
            title="Emissions Reduced"
            value={impactMetrics.emissionsReduced}
            change={impactMetrics.emissionsReducedPercent}
            changeType="down"
            suffix=" kg CO₂"
          />
          <MetricCard
            icon={AlertCircle}
            title="Complaints Reduced"
            value={impactMetrics.complaintsReduced}
            change={impactMetrics.complaintsReducedPercent}
            changeType="down"
          />
          <MetricCard
            icon={DollarSign}
            title="Cost Savings"
            value={impactMetrics.costSavings}
            change={impactMetrics.costSavingsPercent}
            changeType="up"
            suffix=" ₹"
          />
        </div>

        {/* Waste Trends by Zone */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-emerald-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                <TrendingUp size={24} className="text-emerald-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Waste Collection Trends
                </h2>
                <p className="text-sm text-gray-500">Compare traditional vs smart routing efficiency</p>
              </div>
            </div>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="px-4 py-2.5 rounded-xl border-2 border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white font-medium text-gray-700"
            >
              <option value="all">All Zones</option>
              <option value="zone-a">Zone A</option>
              <option value="zone-b">Zone B</option>
              <option value="zone-c">Zone C</option>
              <option value="zone-d">Zone D</option>
              <option value="zone-e">Zone E</option>
            </select>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={wasteTrendData}>
              <defs>
                <linearGradient id="colorTraditional" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSmart" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="traditional"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#colorTraditional)"
                name="Traditional Routing (kg)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="smart"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorSmart)"
                name="Smart Routing (kg)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Cost Comparison */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                <DollarSign size={24} className="text-emerald-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Cost Comparison Analysis
                </h2>
                <p className="text-sm text-gray-500">Monthly operational expenses</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                <XAxis dataKey="category" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="traditional" 
                  fill="#ef4444" 
                  name="Traditional Routing (₹)"
                  radius={[8, 8, 0, 0]}
                />
                <Bar 
                  dataKey="smart" 
                  fill="#10b981" 
                  name="Smart Routing (₹)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Total Monthly Savings
                  </span>
                  <p className="text-xs text-gray-500 mt-1">Compared to traditional methods</p>
                </div>
                <span className="text-3xl font-bold text-emerald-700">
                  ₹{impactMetrics.costSavings?.toLocaleString() || '0'}
                </span>
              </div>
            </div>
          </div>

          {/* Emissions Reduction */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                <Leaf size={24} className="text-emerald-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Environmental Impact
                </h2>
                <p className="text-sm text-gray-500">Carbon emissions tracking</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={emissionsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="traditional"
                  stroke="#ef4444"
                  strokeWidth={3}
                  name="Traditional (kg CO₂)"
                  dot={{ fill: '#ef4444', r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="smart"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Smart Routing (kg CO₂)"
                  dot={{ fill: '#10b981', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50">
                <p className="text-sm text-gray-600 mb-1 font-medium">
                  Trees Equivalent
                </p>
                <p className="text-2xl font-bold text-emerald-700">
                  {Math.round((impactMetrics.emissionsReduced || 0) / 21)} trees/year
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50">
                <p className="text-sm text-gray-600 mb-1 font-medium">
                  Carbon Offset
                </p>
                <p className="text-2xl font-bold text-emerald-700">
                  {impactMetrics.emissionsReduced?.toLocaleString() || '0'} kg
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Zone Performance Table */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-emerald-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
              <MapPin size={24} className="text-emerald-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Zone Performance Overview
              </h2>
              <p className="text-sm text-gray-500">Efficiency metrics by zone</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-50 to-teal-50">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Zone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Efficiency
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Complaints
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Waste Collected
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {zonePerformanceData.map((zone, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-emerald-50/30 transition-colors">
                    <td className="px-6 py-5 font-bold text-gray-900">
                      {zone.zone}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${zone.efficiency}%`,
                              background: zone.efficiency >= 90 
                                ? 'linear-gradient(to right, #10b981, #059669)' 
                                : 'linear-gradient(to right, #f59e0b, #d97706)'
                            }}
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-900">
                          {zone.efficiency}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                        zone.complaints <= 5 ? 'bg-green-100 text-green-700' :
                        zone.complaints <= 10 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {zone.complaints}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-gray-700 font-semibold">
                      {zone.waste?.toLocaleString()} kg
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                        zone.efficiency >= 90 ? 'bg-emerald-100 text-emerald-700' :
                        zone.efficiency >= 85 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {zone.efficiency >= 90 ? '✓ Excellent' :
                         zone.efficiency >= 85 ? '⚠ Good' : '✗ Needs Attention'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-emerald-500 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-emerald-100 rounded-lg">
                <Target size={24} className="text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">
                Performance Goal
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              90% average efficiency across all zones
            </p>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold text-emerald-600">
                {impactMetrics.avgEfficiency >= 90 ? '✓' : '◷'}
              </div>
              <div className="text-xl font-bold text-gray-900">
                {impactMetrics.avgEfficiency >= 90 ? 'Target Met' : 'In Progress'}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-amber-500 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-amber-100 rounded-lg">
                <AlertCircle size={24} className="text-amber-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">
                Area of Concern
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              Zones with efficiency below 85%
            </p>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold text-amber-600">
                {zonePerformanceData.filter(z => z.efficiency < 85).length}
              </div>
              <div className="text-xl font-bold text-gray-900">
                Zone{zonePerformanceData.filter(z => z.efficiency < 85).length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-teal-500 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-teal-100 rounded-lg">
                <TrendingUp size={24} className="text-teal-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">
                Monthly Trend
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              Improvement in all metrics
            </p>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold text-teal-600">
                ↑
              </div>
              <div className="text-xl font-bold text-gray-900">
                +{impactMetrics.overallImprovement || 15}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsImpact;