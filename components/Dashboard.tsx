
import React, { useState, useMemo, useEffect } from 'react';
import { Project } from '../types';
import { Plus, ChevronDown, Calendar, Search, TrendingUp, Globe, ExternalLink, MoreVertical, HelpCircle, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getProjects } from '../services/supabaseService';
import { Loader2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user) {
      getProjects(user.id)
        .then(data => setProjects(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return projects.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.url.toLowerCase().includes(query) ||
      p.keywords.some(kw => kw.toLowerCase().includes(query))
    );
  }, [projects, searchQuery]);

  const chartData = [
    { name: '20-02-2025', score: 38, position: 6 },
    { name: '21-02-2025', score: 45, position: 8 },
    { name: '22-02-2025', score: 40, position: 10 },
    { name: '23-02-2025', score: 42, position: 3 },
    { name: '24-02-2025', score: 35, position: 7 },
    { name: '25-02-2025', score: 48, position: 9 },
  ];

  const pieData = [
    { name: 'Google', value: 35, color: '#10b981' },
    { name: 'Mention', value: 25, color: '#3b82f6' },
    { name: 'Brndwtch', value: 15, color: '#2563eb' },
    { name: 'Other', value: 25, color: '#e5e7eb' },
  ];

  const getStatusTooltip = (status: string) => {
    switch (status) {
      case 'Good': return 'Score > 60: Your brand has strong AI discoverability across major LLMs.';
      case 'Fair': return 'Score 50-60: Moderate visibility. Some models might miss your brand in complex queries.';
      case 'Bad': return 'Score < 50: Weak AI discoverability. Your brand is virtually invisible to AI search; urgent action required.';
      default: return '';
    }
  };

  const handleQuickExport = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation(); // Don't trigger project selection
    let csv = `AISO Summary - ${project.name}\n`;
    csv += `URL,${project.url}\n`;
    csv += `Score,${project.score}%\n`;
    csv += `Status,${project.visibilityStatus}\n`;
    csv += `Keywords,${project.keywords.join(' | ')}\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `AISO_Summary_${project.name.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Projects /</p>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-gray-900">Global Overview</h2>
            <button
              onClick={() => navigate('/wizard')}
              className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all shadow-sm shadow-emerald-100 flex items-center gap-2"
            >
              <Plus size={18} /> Add New Project
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 flex-1 md:justify-end">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Search websites, brands or keywords..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden p-0.5 shadow-sm">
            <button className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors border-r border-gray-200">All models</button>
            <button className="px-2 py-1.5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
              <ChevronDown size={16} />
            </button>
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 shadow-sm">
            <Calendar size={14} className="text-gray-400" />
            <span>Last 7 Days</span>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-gray-400 font-medium">Avg. Brand Score</p>
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100">
              <TrendingUp size={10} /> +7.2%
            </span>
          </div>
          <div className="text-4xl font-bold text-gray-900">54%</div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
            <div className="h-full bg-emerald-400" style={{ width: '54%' }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-gray-400 font-medium">Active Sites</p>
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
              Active
            </span>
          </div>
          <div className="text-4xl font-bold text-gray-900">{projects.length}</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-gray-400 font-medium">Total Citations</p>
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100">
              <TrendingUp size={10} /> +12%
            </span>
          </div>
          <div className="text-4xl font-bold text-gray-900">1.2k</div>
        </div>
      </div>

      {/* Project Table Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Tracked Websites</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Showing {filteredProjects.length} sites</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Website / Brand</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">AISO Score</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Avg. Position</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Keywords</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-500 flex justify-center items-center gap-2"><Loader2 className="animate-spin" size={16} /> Loading projects...</td></tr>
              ) : filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer group/row" onClick={() => navigate(`/result/${project.id}`)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                          <Globe size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{project.name}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            {project.url} <ExternalLink size={10} />
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${project.score >= 60 ? 'text-emerald-600' : project.score < 50 ? 'text-red-600' : 'text-orange-600'
                          }`}>
                          {project.score}%
                        </span>
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${project.score >= 60 ? 'bg-emerald-500' : project.score < 50 ? 'bg-red-500' : 'bg-orange-500'
                              }`}
                            style={{ width: `${project.score}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      #{project.avgPosition}
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative group/tooltip inline-block">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold border transition-colors ${project.visibilityStatus === 'Good' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                            project.visibilityStatus === 'Bad' ? 'bg-red-50 text-red-700 border-red-100' :
                              'bg-orange-50 text-orange-700 border-orange-100'
                          }`}>
                          {project.visibilityStatus}
                          <HelpCircle size={10} className="ml-1 opacity-50" />
                        </span>
                        {/* Tooltip implementation */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover/tooltip:block z-20 w-56 p-3 bg-gray-900 text-white text-[10px] rounded-xl shadow-2xl">
                          <div className="font-bold mb-1 border-b border-white/10 pb-1 flex items-center gap-1.5">
                            <TrendingUp size={10} className="text-emerald-400" />
                            {project.visibilityStatus} Visibility
                          </div>
                          {getStatusTooltip(project.visibilityStatus)}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {project.keywords.slice(0, 2).map((kw, i) => (
                          <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px]">
                            {kw}
                          </span>
                        ))}
                        {project.keywords.length > 2 && (
                          <span className="text-[10px] text-gray-400">+{project.keywords.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button
                          onClick={(e) => handleQuickExport(e, project)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 hover:bg-emerald-50 text-gray-500 hover:text-emerald-700 rounded-lg text-xs font-semibold transition-all border border-gray-100 hover:border-emerald-100 shadow-sm"
                          title="Export Project Summary"
                        >
                          <Download size={14} />
                          <span>Export</span>
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <p className="text-sm italic">No projects found matching "{searchQuery}"</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-gray-900">Visibility Growth (Aggregated)</h3>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-gray-500">Discovery Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                <span className="text-gray-500">Citation Rank</span>
              </div>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 11 }}
                  dy={10}
                />
                <YAxis
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 11 }}
                  domain={[0, 100]}
                  tickFormatter={(val) => `${val}%`}
                  orientation="right"
                />
                <YAxis
                  yAxisId="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 11 }}
                  domain={[0, 25]}
                  reversed
                  orientation="left"
                />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="score"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 4, strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6 }}
                  name="Discovery Rate"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="position"
                  stroke="#111827"
                  strokeWidth={3}
                  dot={{ fill: '#111827', r: 4, strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6 }}
                  name="Citation Rank"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-8">Model Presence</h3>
          <div className="h-[350px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="text-gray-400 text-sm">Aggregated</div>
              <div className="text-3xl font-bold">82%</div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs text-gray-500 font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
