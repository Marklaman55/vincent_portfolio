import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password is plain text (for initial migration) or hashed
    let isMatch = false;
    if (admin.password.startsWith('$2a$') || admin.password.startsWith('$2b$')) {
      isMatch = await bcrypt.compare(password, admin.password);
    } else {
      isMatch = password === admin.password;
      // If it's a plain text match, we should probably hash it now (optional but good)
    }

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name
      }
    });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  // Normally disabled or restricted
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('admins')
      .insert([{ email, password: hashedPassword, name }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
