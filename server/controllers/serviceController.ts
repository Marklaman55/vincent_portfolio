import { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

export const getServices = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    res.json(data || []);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const saveService = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Service deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
