import { Request, Response } from 'express';
import { transporter } from '../config/mail';
import fs from 'fs';
import path from 'path';

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'backend', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const MESSAGES_FILE = path.join(process.cwd(), 'backend', 'data', 'messages.json');

// Initialize messages file if it doesn't exist
if (!fs.existsSync(MESSAGES_FILE)) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2));
}

const getMessages = () => {
  try {
    const data = fs.readFileSync(MESSAGES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveMessages = (messages: any[]) => {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
};

export const getMessagesHandler = async (req: Request, res: Response) => {
  try {
    const messages = getMessages();
    // Sort by ID descending (newest first)
    const sortedMessages = [...messages].sort((a: any, b: any) => b.id - a.id);
    res.json(sortedMessages);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, service, message } = req.body;
    
    const messages = getMessages();
    
    const newMessage = {
      id: Date.now(), // Simple ID generation
      fullName,
      email,
      phone,
      service,
      message,
      status: 'unread',
      createdAt: new Date().toISOString()
    };

    messages.push(newMessage);
    saveMessages(messages);

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

    res.status(201).json(newMessage);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMessageStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const messages = getMessages();
    const messageIndex = messages.findIndex((m: any) => m.id === parseInt(id));
    
    if (messageIndex === -1) {
      return res.status(404).json({ message: 'Message not found' });
    }

    messages[messageIndex].status = status;
    saveMessages(messages);
    
    res.json(messages[messageIndex]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const messages = getMessages();
    const messageIndex = messages.findIndex((m: any) => m.id === parseInt(id));
    
    if (messageIndex === -1) {
      return res.status(404).json({ message: 'Message not found' });
    }

    const [deletedMessage] = messages.splice(messageIndex, 1);
    saveMessages(messages);
    
    res.json({ message: 'Message deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
