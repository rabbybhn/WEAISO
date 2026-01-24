
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Plus, ChevronLeft, Loader2, ShieldCheck } from 'lucide-react';
import { analyzeWebsite } from '../services/geminiService';
import { createProject } from '../services/supabaseService';
import { useAuth } from '../contexts/AuthContext';

const Wizard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState('');
  const [brandName, setBrandName] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [selectedModels, setSelectedModels] = useState(['ChatGPT', 'Gemini', 'Claude']);
  const [loading, setLoading] = useState(false);

  const addKeyword = () => {
    if (currentKeyword.trim() && !keywords.includes(currentKeyword.trim())) {
      setKeywords([...keywords, currentKeyword.trim()]);
      setCurrentKeyword('');
    }
  };

  const toggleModel = (model: string) => {
    if (selectedModels.includes(model)) {
      setSelectedModels(selectedModels.filter(m => m !== model));
    } else {
      setSelectedModels([...selectedModels, model]);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      const result = await analyzeWebsite(url, brandName, keywords);

      if (user) {
        const projectData = {
          name: brandName,
          url: url,
          keywords: keywords,
          score: result.geoScore.total,
          avgPosition: result.avgPosition,
          visibilityStatus: result.geoScore.total >= 60 ? 'Good' : result.geoScore.total < 50 ? 'Bad' : 'Fair' as any,
        };
        const newProject = await createProject(user.id, projectData, result);
        if (newProject) {
          navigate(`/result/${newProject.id}`);
        }
      } else {
        // Fallback for unauthenticated flow or error? For now assume gated.
        alert("Session expired. Please login.");
      }

    } catch (error) {
      console.error("Analysis or Save failed:", error);
      alert("Failed to analyze brand. Please check API Key or Connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      {/* Stepper */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
          <div className={`w-16 h-1 mx-2 rounded ${step >= 2 ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
          <div className={`w-16 h-1 mx-2 rounded ${step >= 3 ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Add Your Website</h2>
        <p className="text-gray-500">Step {step} of 3 • Set up brand monitoring</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Website URL</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Globe size={18} />
                </div>
                <input
                  type="text"
                  placeholder="https://example.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Brand Name</label>
              <input
                type="text"
                placeholder="Your Brand Name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Target Keywords</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Add keyword and press Enter"
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  value={currentKeyword}
                  onChange={(e) => setCurrentKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                />
                <button
                  onClick={addKeyword}
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  <Plus size={20} className="text-gray-600" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-100">
                    {kw}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-2">Keywords help generate relevant prompts for your industry</p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h4 className="font-bold text-gray-900 mb-4">Select AI Models to Track</h4>
            <div className="grid grid-cols-2 gap-4">
              {['ChatGPT', 'ChatGPT Search', 'Google Gemini', 'Claude', 'Perplexity', 'DeepSeek', 'Grok'].map(model => (
                <label
                  key={model}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${selectedModels.includes(model) ? 'bg-emerald-50 border-emerald-500' : 'bg-gray-50 border-gray-200'
                    }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedModels.includes(model)}
                    onChange={() => toggleModel(model)}
                  />
                  <div className={`w-5 h-5 rounded flex items-center justify-center border ${selectedModels.includes(model) ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-gray-300'}`}>
                    {selectedModels.includes(model) && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{model}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="text-emerald-500" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready for Analysis</h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Our PANTHEON agents will now scan the selected models for your brand citations and calculate your GEO Score™.
            </p>
            <div className="bg-gray-50 rounded-2xl p-6 text-left max-w-md mx-auto">
              <p className="text-sm font-bold text-gray-700 mb-4">Plan Summary</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Website:</span>
                  <span className="text-gray-900 font-medium">{url}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Models:</span>
                  <span className="text-gray-900 font-medium">{selectedModels.length} selected</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 flex justify-between items-center pt-8 border-t border-gray-100">
          <button
            onClick={step === 1 ? () => navigate('/dashboard') : () => setStep(step - 1)}
            className="flex items-center gap-2 text-gray-500 font-semibold hover:text-gray-700 transition-colors"
          >
            <ChevronLeft size={20} /> {step === 1 ? 'Cancel' : 'Previous'}
          </button>
          <button
            onClick={handleNext}
            disabled={loading || !url || !brandName}
            className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : step === 3 ? 'Start Analysis' : 'Next Step'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
