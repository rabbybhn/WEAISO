
import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Globe,
  Zap,
  ShieldCheck,
  BarChart3,
  Search,
  Target,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  LayoutDashboard
} from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-2 rounded-xl text-white">
              <Sparkles size={20} fill="currentColor" />
            </div>
            <span className="text-2xl font-bold tracking-tight">WeAISO</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-emerald-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-emerald-600 transition-colors">How it Works</a>
            <a href="#faq" className="hover:text-emerald-600 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-bold text-gray-900 hover:text-emerald-600 transition-colors">
              Sign In
            </Link>
            <Link
              to="/dashboard"
              className="bg-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-bold mb-8 animate-fade-in-up">
            <Zap size={14} fill="currentColor" /> AI-Powered Brand Intelligence
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-gray-900">
            AI Search Visibility <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600">Tracker</span>
          </h1>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Monitor Your Brand in AI
          </h2>

          <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed">
            The leading <strong>AI visibility checker</strong> to track how ChatGPT, Claude, Gemini, and other AI models mention your brand.
            Use our <strong>AI visibility tracker</strong> to monitor competitors and optimize your AI presence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/dashboard"
              className="bg-emerald-500 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-200 hover:-translate-y-1 flex items-center gap-2"
            >
              Start Free Trial <ArrowRight size={20} />
            </Link>
            <button className="bg-white border text-gray-700 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-gray-50 transition-all flex items-center gap-2">
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
              Continue with Google
            </button>
          </div>

          {/* Social Proof / Models */}
          <div className="mt-20 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 font-bold text-xl"><Sparkles size={24} /> ChatGPT</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Target size={24} /> Claude</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Globe size={24} /> Gemini</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Search size={24} /> Perplexity</div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section (Simulated Image) */}
      <section className="relative -mt-20 z-20 pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gray-900 rounded-[2.5rem] p-2 ring-1 ring-white/10 shadow-2xl shadow-emerald-900/20 transform hover:scale-[1.01] transition-transform duration-500">
            <div className="bg-gray-900 rounded-[2rem] overflow-hidden relative aspect-[16/9] flex items-center justify-center border border-white/5">
              {/* Simulated UI Content */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>
              <div className="relative text-center">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/50 animate-pulse">
                  <ArrowRight size={40} className="text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">See It in Action</h3>
                <p className="text-gray-400">Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              <Sparkles size={14} className="text-emerald-500" /> Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete AI Visibility Checker Features
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Comprehensive <strong>AI visibility tracker</strong> tools to monitor, analyze, and improve your brand's presence in AI-generated search results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Search size={24} className="text-white" />}
              color="bg-emerald-500"
              title="AI Visibility Tracking"
              desc="Monitor how your brand appears in ChatGPT, Gemini, Claude, DeepSeek, and other AI models in real-time."
            />
            <FeatureCard
              icon={<BarChart3 size={24} className="text-white" />}
              color="bg-blue-500"
              title="Analytics Dashboard"
              desc="Comprehensive metrics showing visibility scores, mention rates, and sentiment analysis across platforms."
            />
            <FeatureCard
              icon={<TrendingUp size={24} className="text-white" />}
              color="bg-purple-500"
              title="Trend Analysis"
              desc="Track historical changes and identify patterns in how AI models perceive your brand over time."
            />
            <FeatureCard
              icon={<Globe size={24} className="text-white" />}
              color="bg-orange-500"
              title="Competitor Insights"
              desc="See how competitors rank against your brand across different AI models and search queries."
            />
            <FeatureCard
              icon={<Target size={24} className="text-white" />}
              color="bg-pink-500"
              title="Smart Prompts"
              desc="AI-generated prompts tailored to your brand for comprehensive visibility testing."
            />
            <FeatureCard
              icon={<ShieldCheck size={24} className="text-white" />}
              color="bg-red-500"
              title="Source Tracking"
              desc="Identify which sources AI models cite when mentioning your brand or competitors."
            />
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              <CheckCircle2 size={14} /> How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Start Tracking AI Search Visibility in Minutes
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Four simple steps to use our <strong>AI visibility tracker</strong> and outperform competitors in AI search results.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 z-0"></div>

            <StepCard
              number="01"
              icon={<Globe size={24} />}
              title="Add Your Website"
              desc="Enter your brand name, website URL, and target keywords to start tracking."
            />
            <StepCard
              number="02"
              icon={<Sparkles size={24} />}
              title="Generate Smart Prompts"
              desc="Our AI generates tailored prompts to test your brand's visibility across different scenarios."
            />
            <StepCard
              number="03"
              icon={<Zap size={24} />}
              title="Test Across Models"
              desc="Prompts are automatically tested across ChatGPT, Claude, Gemini, and more simultaneously."
            />
            <StepCard
              number="04"
              icon={<LayoutDashboard size={24} />}
              title="Analyze Results"
              desc="View comprehensive dashboards with visibility scores, rankings, and competitor analysis."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center pb-8 border-b border-gray-800">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="bg-emerald-500 p-2 rounded-xl text-white">
                <Sparkles size={20} fill="currentColor" />
              </div>
              <span className="text-2xl font-bold tracking-tight">WeAISO</span>
            </div>
            <div className="flex gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="pt-8 text-center md:text-left text-gray-500 text-sm">
            © 2025 WeAISO Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Sub-components for cleaner code
const FeatureCard = ({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: string }) => (
  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

const StepCard = ({ number, icon, title, desc }: { number: string, icon: React.ReactNode, title: string, desc: string }) => (
  <div className="relative z-10 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100">
      {icon}
    </div>
    <div className="absolute -top-4 -right-4 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold border-4 border-white shadow-sm">
      {number}
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;
