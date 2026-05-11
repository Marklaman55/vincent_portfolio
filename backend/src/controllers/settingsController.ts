import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getSettings = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*');

    if (error) throw error;
    
    const settings: any = {};
    data.forEach((s: any) => {
      settings[s.key] = s.value;
    });
    
    res.json(settings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const updates = Object.entries(req.body).map(([key, value]) => ({
      key,
      value: String(value)
    }));

    const { data, error } = await supabase
      .from('settings')
      .upsert(updates)
      .select();

    if (error) throw error;
    res.json({ message: 'Settings updated successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
