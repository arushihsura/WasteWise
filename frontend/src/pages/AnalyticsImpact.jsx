import React, { useState } from 'react';
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
  Calendar
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

const AnalyticsImpact = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedZone, setSelectedZone] = useState('all');
  const [loading, setLoading] = useState(false);

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
    // Simulate export functionality
    alert(`Exporting ${timeRange} report...`);
    console.log('Export data:', { 
      wasteTrendData, 
      costComparisonData, 
      zonePerformanceData, 
      emissionsData, 
      impactMetrics 
    });
  };

  const COLORS = {
    primary: '#2D5016',
    secondary: '#4A7C2C',
    accent: '#8FBC8F',
    beige: '#F5E6D3',
    beigeLight: '#FAF3E8',
    warning: '#D4A574',
    danger: '#C65D3B',
    success: '#6B8E23'
  };

  const MetricCard = ({ icon: Icon, title, value, change, changeType, suffix = '' }) => (
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 hover:shadow-lg transition-shadow"
         style={{ borderLeftColor: COLORS.primary }}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Icon size={20} style={{ color: COLORS.secondary }} />
            <p className="text-sm font-medium" style={{ color: COLORS.secondary }}>
              {title}
            </p>
          </div>
          <h3 className="text-3xl font-bold mb-2" style={{ color: COLORS.primary }}>
            {value?.toLocaleString() || '0'}{suffix}
          </h3>
          <div className="flex items-center gap-1">
            {changeType === 'up' ? (
              <ArrowUpRight size={16} className="text-green-600" />
            ) : (
              <ArrowDownRight size={16} className="text-green-600" />
            )}
            <span className="text-sm font-semibold text-green-600">
              {change}%
            </span>
            <span className="text-xs text-gray-500 ml-1">vs traditional</span>
          </div>
        </div>
      </div>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border"
             style={{ borderColor: COLORS.accent }}>
          <p className="font-semibold mb-2" style={{ color: COLORS.primary }}>
            {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: COLORS.beigeLight }}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: COLORS.primary }}>
              Analytics & Impact Dashboard
            </h1>
            <p className="text-gray-600">
              Track performance, cost savings, and environmental impact
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
              style={{ 
                borderColor: COLORS.accent,
                backgroundColor: 'white'
              }}
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: COLORS.primary }}
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
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp size={24} style={{ color: COLORS.primary }} />
            <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
              Waste Collection Trends
            </h2>
          </div>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
            style={{ borderColor: COLORS.accent, backgroundColor: 'white' }}
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
                <stop offset="5%" stopColor={COLORS.danger} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={COLORS.danger} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSmart" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.success} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={COLORS.success} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.accent} />
            <XAxis dataKey="month" stroke={COLORS.secondary} />
            <YAxis stroke={COLORS.secondary} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="traditional"
              stroke={COLORS.danger}
              fillOpacity={1}
              fill="url(#colorTraditional)"
              name="Traditional Routing (kg)"
            />
            <Area
              type="monotone"
              dataKey="smart"
              stroke={COLORS.success}
              fillOpacity={1}
              fill="url(#colorSmart)"
              name="Smart Routing (kg)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Cost Comparison */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign size={24} style={{ color: COLORS.primary }} />
            <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
              Cost Comparison Analysis
            </h2>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.accent} />
              <XAxis dataKey="category" stroke={COLORS.secondary} />
              <YAxis stroke={COLORS.secondary} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="traditional" 
                fill={COLORS.danger} 
                name="Traditional Routing (₹)"
                radius={[8, 8, 0, 0]}
              />
              <Bar 
                dataKey="smart" 
                fill={COLORS.success} 
                name="Smart Routing (₹)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: COLORS.beigeLight }}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium" style={{ color: COLORS.secondary }}>
                Total Monthly Savings
              </span>
              <span className="text-2xl font-bold" style={{ color: COLORS.success }}>
                ₹{impactMetrics.costSavings?.toLocaleString() || '0'}
              </span>
            </div>
          </div>
        </div>

        {/* Emissions Reduction */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <Leaf size={24} style={{ color: COLORS.primary }} />
            <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
              Environmental Impact
            </h2>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={emissionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.accent} />
              <XAxis dataKey="month" stroke={COLORS.secondary} />
              <YAxis stroke={COLORS.secondary} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="traditional"
                stroke={COLORS.danger}
                strokeWidth={3}
                name="Traditional (kg CO₂)"
                dot={{ fill: COLORS.danger, r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="smart"
                stroke={COLORS.success}
                strokeWidth={3}
                name="Smart Routing (kg CO₂)"
                dot={{ fill: COLORS.success, r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg" style={{ backgroundColor: COLORS.beigeLight }}>
              <p className="text-sm mb-1" style={{ color: COLORS.secondary }}>
                Trees Equivalent
              </p>
              <p className="text-xl font-bold" style={{ color: COLORS.success }}>
                {Math.round((impactMetrics.emissionsReduced || 0) / 21)} trees/year
              </p>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: COLORS.beigeLight }}>
              <p className="text-sm mb-1" style={{ color: COLORS.secondary }}>
                Carbon Offset
              </p>
              <p className="text-xl font-bold" style={{ color: COLORS.success }}>
                {impactMetrics.emissionsReduced?.toLocaleString() || '0'} kg CO₂
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Zone Performance Table */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <MapPin size={24} style={{ color: COLORS.primary }} />
          <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            Zone Performance Overview
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: COLORS.beigeLight }}>
                <th className="px-6 py-3 text-left text-sm font-semibold"
                    style={{ color: COLORS.primary }}>
                  Zone
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold"
                    style={{ color: COLORS.primary }}>
                  Efficiency
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold"
                    style={{ color: COLORS.primary }}>
                  Complaints
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold"
                    style={{ color: COLORS.primary }}>
                  Waste Collected (kg)
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold"
                    style={{ color: COLORS.primary }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {zonePerformanceData.map((zone, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium" style={{ color: COLORS.primary }}>
                    {zone.zone}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${zone.efficiency}%`,
                            backgroundColor: zone.efficiency >= 90 ? COLORS.success : COLORS.warning
                          }}
                        />
                      </div>
                      <span className="text-sm font-semibold">
                        {zone.efficiency}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      zone.complaints <= 5 ? 'bg-green-100 text-green-700' :
                      zone.complaints <= 10 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {zone.complaints}
                    </span>
                  </td>
                  <td className="px-6 py-4" style={{ color: COLORS.secondary }}>
                    {zone.waste?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      zone.efficiency >= 90 ? 'bg-green-100 text-green-700' :
                      zone.efficiency >= 85 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {zone.efficiency >= 90 ? 'Excellent' :
                       zone.efficiency >= 85 ? 'Good' : 'Needs Attention'}
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
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4"
             style={{ borderLeftColor: COLORS.success }}>
          <Target size={24} className="mb-3" style={{ color: COLORS.success }} />
          <h3 className="font-bold mb-2" style={{ color: COLORS.primary }}>
            Performance Goal
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            90% average efficiency across all zones
          </p>
          <div className="text-2xl font-bold" style={{ color: COLORS.success }}>
            Target {impactMetrics.avgEfficiency >= 90 ? 'Met' : 'In Progress'}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4"
             style={{ borderLeftColor: COLORS.warning }}>
          <AlertCircle size={24} className="mb-3" style={{ color: COLORS.warning }} />
          <h3 className="font-bold mb-2" style={{ color: COLORS.primary }}>
            Area of Concern
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            Zones with efficiency below 85%
          </p>
          <div className="text-2xl font-bold" style={{ color: COLORS.warning }}>
            {zonePerformanceData.filter(z => z.efficiency < 85).length} Zones
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4"
             style={{ borderLeftColor: COLORS.primary }}>
          <TrendingUp size={24} className="mb-3" style={{ color: COLORS.primary }} />
          <h3 className="font-bold mb-2" style={{ color: COLORS.primary }}>
            Monthly Trend
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            Improvement in all metrics
          </p>
          <div className="text-2xl font-bold" style={{ color: COLORS.success }}>
            +{impactMetrics.overallImprovement || 15}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsImpact;