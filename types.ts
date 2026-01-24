
export enum AppView {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD',
  WIZARD = 'WIZARD',
  RESULT = 'RESULT'
}

export interface Project {
  id: string;
  name: string;
  url: string;
  keywords: string[];
  score: number;
  avgPosition: number;
  visibilityStatus: 'Good' | 'Fair' | 'Bad';
  lastUpdated: string;
}

export interface GeoScoreBreakdown {
  domainRating: number;
  aiMentions: number;
  platformDiversity: number;
  technicalFactors: number;
  total: number;
}

export interface AiAgentRecommendation {
  agent: 'Analyst' | 'Forecaster' | 'Strategist' | 'Auditor';
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface AisoAnalysisResult {
  geoScore: GeoScoreBreakdown;
  avgPosition: number;
  recommendations: AiAgentRecommendation[];
  shareOfVoice: { name: string; value: number; color: string }[];
  historicalData: { date: string; score: number; position: number }[];
}
