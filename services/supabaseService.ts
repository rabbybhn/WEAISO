
import { supabase } from '../lib/supabase';
import { Project, AisoAnalysisResult } from '../types';

export const getProjects = async (userId: string): Promise<Project[]> => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map((p: any) => ({
        id: p.id,
        name: p.name,
        url: p.url,
        keywords: p.keywords,
        score: p.score,
        avgPosition: p.avg_position,
        visibilityStatus: p.visibility_status,
        lastUpdated: new Date(p.created_at).toISOString().split('T')[0]
    }));
};


export const createProject = async (userId: string, project: Omit<Project, 'id' | 'lastUpdated'>, analysisResult?: AisoAnalysisResult): Promise<Project | null> => {
    const { data, error } = await supabase
        .from('projects')
        .insert([
            {
                user_id: userId,
                name: project.name,
                url: project.url,
                keywords: project.keywords,
                score: project.score,
                avg_position: project.avgPosition,
                visibility_status: project.visibilityStatus,
                analysis_result: analysisResult,
                created_at: new Date().toISOString()
            }
        ])
        .select()
        .single();

    if (error) throw error;

    return {
        id: data.id,
        name: data.name,
        url: data.url,
        keywords: data.keywords,
        score: data.score,
        avgPosition: data.avg_position,
        visibilityStatus: data.visibility_status,
        lastUpdated: new Date(data.created_at).toISOString().split('T')[0]
    };
};

export const getProjectById = async (id: string): Promise<{ project: Project; analysisResult: AisoAnalysisResult | null } | null> => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return null;

    return {
        project: {
            id: data.id,
            name: data.name,
            url: data.url,
            keywords: data.keywords,
            score: data.score,
            avgPosition: data.avg_position,
            visibilityStatus: data.visibility_status,
            lastUpdated: new Date(data.created_at).toISOString().split('T')[0]
        },
        analysisResult: data.analysis_result
    };
};
