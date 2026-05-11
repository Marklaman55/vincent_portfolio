import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { transporter } from '../config/mail';

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, service, message } = req.body;
    
    // Save to DB
    const { data, error } = await supabase
      .from('messages')
      .insert([{ fullName, email, phone, service, message, status: 'unread' }])
      .select();

    if (error) throw error;

    // Send Email Notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'vincentkamau137@gmail.com', // Admin email
      subject: `New Lead: ${fullName} - ${service}`,
      text: `
        Name: ${fullName}
        Email: ${email}
        Phone: ${phone}
        Service: ${service}
        Message: ${message}
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Email send failed:', err);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json(data[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMessageStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { data, error } = await supabase
      .from('messages')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Message deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
