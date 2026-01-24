
import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Globe, 
  Users, 
  Settings, 
  User, 
  CreditCard, 
  Mail, 
  MessageSquare,
  BarChart3,
  Search,
  Zap,
  ShieldCheck,
  TrendingUp,
  BrainCircuit,
  Target
} from 'lucide-react';
import { Project } from './types';

// BrowserACT API Configuration - Added as requested
export const BROWSER_ACT_CONFIG = {
  NAME: "ba-260124-01",
  KEY: "app-3QBMazoWGgK04ja4FEJiSxkr"
};

export const SIDEBAR_ITEMS = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
  { id: 'prompts', label: 'Prompts', icon: <MessageSquare size={18} /> },
  { id: 'websites', label: 'Websites', icon: <Globe size={18} /> },
  { id: 'competitors', label: 'Competitors', icon: <Users size={18} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  { id: 'profile', label: 'Profile', icon: <User size={18} /> },
  { id: 'billing', label: 'Billing', icon: <CreditCard size={18} /> },
  { id: 'contact', label: 'Contact Us', icon: <Mail size={18} /> },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Booksy',
    url: 'https://booksy.com',
    keywords: ['booking software', 'salon appointments'],
    score: 48,
    avgPosition: 17,
    visibilityStatus: 'Bad',
    lastUpdated: '2025-02-25'
  },
  {
    id: '2',
    name: 'Survicate',
    url: 'https://survicate.com',
    keywords: ['customer surveys', 'nps software'],
    score: 65,
    avgPosition: 8,
    visibilityStatus: 'Good',
    lastUpdated: '2025-02-25'
  },
  {
    id: '3',
    name: 'Brand24',
    url: 'https://brand24.com',
    keywords: ['media monitoring', 'social listening'],
    score: 72,
    avgPosition: 5,
    visibilityStatus: 'Good',
    lastUpdated: '2025-02-25'
  }
];

export const FEATURE_CARDS = [
  {
    title: 'Citation Gap Analyzer',
    description: "Find where competitors get cited but you don't. Scan ChatGPT, Claude, and more.",
    icon: <Search className="text-blue-500" />
  },
  {
    title: 'GEO Score™',
    description: "One number that tells you how visible you are to AI. Combines DR, mentions, and tech factors.",
    icon: <Target className="text-purple-500" />
  },
  {
    title: 'PANTHEON Agents',
    description: "Autonomous AI agents working on your visibility around the clock. Predicting growth and strategy.",
    icon: <BrainCircuit className="text-emerald-500" />
  }
];
