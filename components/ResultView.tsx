
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AisoAnalysisResult } from '../types';
import { BROWSER_ACT_CONFIG } from '../constants';
import { getProjectById } from '../services/supabaseService';
import {
  CheckCircle2,
  BrainCircuit,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  Zap,
  Fingerprint,
  ShieldCheck,
  ChevronLeft,
  Calendar,
  Download,
  Loader2
} from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line
} from 'recharts';

const ResultView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<AisoAnalysisResult | null>(null);
  const [brandName, setBrandName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getProjectById(id)
        .then(data => {
          if (data && data.analysisResult) {
            setResult(data.analysisResult);
            setBrandName(data.project.name);
          } else {
            setError("Result not found or analysis incomplete.");
            // Fallback: If only project data exists but no analysis result (old data?), we might need to re-run or show partial data.
            // For now, let's assume we need the result.
            if (data) setBrandName(data.project.name);
          }
        })
        .catch(err => {
          console.error(err);
          setError("Failed to load results.");
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 h-screen">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading Analysis Results...</p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
        <p className="text-gray-500 mb-4">{error || "No result data available."}</p>
        <button onClick={() => navigate('/dashboard')} className="text-emerald-600 hover:underline">Back to Dashboard</button>
      </div>
    );
  }

  const isGood = result.geoScore.total >= 60;
  const isBad = result.geoScore.total < 50;

  const handleExportCSV = () => {
    // Construct CSV content
    let csv = `AISO Analysis Report - ${brandName}\n`;
    csv += `Date,${new Date().toLocaleDateString()}\n\n`;

    // GEO Score Section
    csv += `GEO Score Breakdown\n`;
    csv += `Metric,Score,Weight\n`;
    csv += `Domain Rating,${result.geoScore.domainRating},30%\n`;
    csv += `AI Mentions,${result.geoScore.aiMentions},40%\n`;
    csv += `Platform Diversity,${result.geoScore.platformDiversity},20%\n`;
    csv += `Technical Factors,${result.geoScore.technicalFactors},10%\n`;
    csv += `TOTAL SCORE,${result.geoScore.total},100%\n\n`;

    // Historical Trends Section
    csv += `Historical Trends\n`;
    csv += `Date,GEO Score,Avg Position\n`;
    result.historicalData.forEach(day => {
      csv += `${day.date},${day.score},${day.position}\n`;
    });
    csv += `\n`;

    // Recommendations Section
    csv += `AI Agent Recommendations\n`;
    csv += `Agent,Title,Description,Impact\n`;
    result.recommendations.forEach(rec => {
      csv += `"${rec.agent}","${rec.title}","${rec.description.replace(/"/g, '""')}","${rec.impact}"\n`;
    });

    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `WeAISO_Report_${brandName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Navigation & Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-4 text-sm font-medium"
        >
          <ChevronLeft size={16} /> Back to Dashboard
        </button>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-4xl font-bold text-gray-900">{brandName} AISO Report</h2>
              <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold border border-blue-100 shadow-sm">
                <Fingerprint size={12} /> BrowserACT Verified
              </div>
            </div>
            <p className="text-gray-500">Last analyzed on {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleExportCSV}
              className="bg-white border border-gray-200 px-6 py-3 rounded-xl font-bold text-gray-700 shadow-sm hover:bg-gray-50 flex items-center gap-2 transition-all active:scale-95"
            >
              <Download size={18} /> Export Data
            </button>
            <button
              onClick={() => window.print()}
              className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-600 flex items-center gap-2 transition-all active:scale-95"
            >
              Share Report
            </button>
          </div>
        </div>
      </div>

      {/* Main Score Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12 print:grid-cols-4">
        <div className={`lg:col-span-1 p-8 rounded-3xl border flex flex-col justify-center text-center ${isGood ? 'bg-emerald-50 border-emerald-200' : isBad ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200'}`}>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">GEO Score™</p>
          <div className="text-7xl font-black mb-4" style={{ color: isGood ? '#059669' : isBad ? '#dc2626' : '#d97706' }}>
            {result.geoScore.total}
          </div>
          <div className="flex items-center justify-center gap-2 mb-6">
            {isGood ? <CheckCircle2 className="text-emerald-500" /> : <ShieldAlert className="text-red-500" />}
            <span className={`font-bold ${isGood ? 'text-emerald-700' : isBad ? 'text-red-700' : 'text-orange-700'}`}>
              {isGood ? 'High Visibility' : isBad ? 'Action Required' : 'Moderate Discovery'}
            </span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Your brand is {isGood ? 'strongly' : 'weakly'} established across AI knowledge bases.
          </p>
        </div>

        <div className="lg:col-span-3 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-8">GEO Score™ Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Domain Rating', value: result.geoScore.domainRating, weight: '30%', color: 'bg-blue-500' },
              { label: 'AI Mentions', value: result.geoScore.aiMentions, weight: '40%', color: 'bg-purple-500' },
              { label: 'Platform Diversity', value: result.geoScore.platformDiversity, weight: '20%', color: 'bg-emerald-500' },
              { label: 'Tech Factors', value: result.geoScore.technicalFactors, weight: '10%', color: 'bg-orange-500' },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-xs text-gray-400 font-bold uppercase mb-2">{item.label}</p>
                <div className="flex items-end gap-1 mb-3">
                  <span className="text-3xl font-bold text-gray-900">{item.value}</span>
                  <span className="text-xs text-gray-400 pb-1">/ 100</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }}></div>
                </div>
                <p className="text-[10px] text-gray-400 mt-2">Weight: {item.weight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Historical Trends Section */}
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm mb-12 print:break-inside-avoid">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold text-gray-900">Visibility & Ranking Trends</h3>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500">
            <Calendar size={14} /> Last 7 Days
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={result.historicalData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis
                dataKey="date"
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
                orientation="right"
              />
              <YAxis
                yAxisId="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                domain={[0, 20]}
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
                name="GEO Score"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="position"
                stroke="#111827"
                strokeWidth={3}
                dot={{ fill: '#111827', r: 4, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6 }}
                name="Avg Position"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Critical Guide for low scores */}
      {isBad && (
        <div className="mb-12 bg-gray-900 text-white p-8 rounded-3xl relative overflow-hidden print:bg-gray-100 print:text-black print:border print:border-gray-300">
          <div className="absolute top-0 right-0 p-8 opacity-10 print:hidden">
            <TrendingUp size={120} />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="text-orange-400" /> Path to 90 Score
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed print:text-gray-600">
              Based on your current low visibility, our PANTHEON agents have identified critical gaps.
              Implementing these can boost your score by up to 45 points in 30 days.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 items-start p-4 bg-white/5 rounded-2xl border border-white/10 print:bg-gray-200 print:border-gray-300">
                <div className="w-8 h-8 rounded-lg bg-orange-400/20 text-orange-400 flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-bold text-white print:text-black">Implement Schema Markup</h4>
                  <p className="text-sm text-gray-400 print:text-gray-500">AI crawlers are missing your product metadata. Add JSON-LD today.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start p-4 bg-white/5 rounded-2xl border border-white/10 print:bg-gray-200 print:border-gray-300">
                <div className="w-8 h-8 rounded-lg bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-bold text-white print:text-black">Aggressive Backlink Acquisition</h4>
                  <p className="text-sm text-gray-400 print:text-gray-500">Focus on industry-specific wikis and authoritative tech blogs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Agents Insight Section */}
      <h3 className="text-2xl font-bold text-gray-900 mb-8">PANTHEON AI Agents Intelligence</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 print:grid-cols-2">
        {result.recommendations.map((rec, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:border-emerald-200 transition-all group print:break-inside-avoid">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <BrainCircuit size={20} />
                </div>
                <div>
                  <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">{rec.agent}</p>
                  <h4 className="font-bold text-gray-900">{rec.title}</h4>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${rec.impact === 'High' ? 'text-red-600 bg-red-50 border-red-100' : 'text-blue-600 bg-blue-50 border-blue-100'
                }`}>
                {rec.impact} Impact
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">{rec.description}</p>
            <button className="text-sm font-bold text-gray-900 flex items-center gap-1 group-hover:gap-2 transition-all print:hidden">
              Execute recommendation <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Share of Voice Visual */}
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm mb-12 print:break-inside-avoid">
        <h3 className="text-xl font-bold text-gray-900 mb-8">Model Share of Voice</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={result.shareOfVoice}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={40}>
                {result.shareOfVoice.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer disclaimer about verification */}
      <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-center gap-2 text-gray-400 text-xs text-center">
        <ShieldCheck size={14} />
        This discovery report is verified against <strong>BrowserACT {BROWSER_ACT_CONFIG.NAME}</strong> citation signatures.
        Generated by WeAISO Platform.
      </div>
    </div>
  );
};

export default ResultView;
