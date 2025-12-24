import { supabase } from './supabaseClient';

export async function fetchLeviersDaeTitles(): Promise<string[]> {
  const { data, error } = await supabase
    .from('leviers dae')
    .select('dna_title');
  if (error) {
    console.error('Erreur récupération leviers DAE:', error);
    return [];
  }
  return (data || []).map((row: any) => row.dna_title).filter(Boolean);
}
