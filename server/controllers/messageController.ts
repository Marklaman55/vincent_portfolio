import { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';
import { transporter } from '../config/mail.js';

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const saveMessage = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Message from ${req.body.name}`,
      text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error('Email Error:', err);
      else console.log('Email sent:', info.response);
    });

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMessageStatus = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .update({ status: req.body.status })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Message deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
