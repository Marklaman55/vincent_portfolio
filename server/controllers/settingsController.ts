import { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

export const getSettings = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    res.json(data || {});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('settings')
      .upsert([{ id: 1, ...req.body }])
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
