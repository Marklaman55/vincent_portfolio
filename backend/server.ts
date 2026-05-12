import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Load env vars
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
let dbConnected = false;

// Mock Data Store for when DB is unavailable
let mockProjects = [
  { 
    _id: "1", 
    title: "Easy Move Kenya", 
    category: "Web Application", 
    description: "Relocation management system.", 
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop", 
    link: "https://easymove-kenya-h1m8.vercel.app/",
    createdAt: new Date()
  },
  { 
    _id: "2", 
    title: "Styled By Kim", 
    category: "UI/UX Design", 
    description: "Fashion and styling portfolio.", 
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2864&auto=format&fit=crop", 
    link: "https://styled-by-kim.vercel.app/",
    createdAt: new Date()
  }
];

// Mongoose Schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  image: String,
  link: String,
  createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'portfolio-projects',
      format: 'png',
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
    };
  }
});

const upload = multer({ storage: storage });

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Simple Auth Middleware
  const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err: any, user: any) => {
      if (err) return res.status(403).json({ error: 'Invalid token' });
      req.user = user;
      next();
    });
  };

  // Email Config
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // API Routes
  
  // Admin Login
  app.post('/api/admin/login', async (req, res) => {
    const { password } = req.body;
    const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === adminPass) {
      const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
      return res.json({ token });
    }

    res.status(401).json({ error: 'Invalid password' });
  });

  // Contact Form
  app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        replyTo: email,
      });

      res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      console.error('Email sending error:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  });

  // Portfolio Management
  app.get('/api/projects', async (req, res) => {
    try {
      if (dbConnected) {
        const projects = await Project.find().sort({ createdAt: -1 });
        return res.json(projects);
      }
      // Fallback to mock data
      res.json(mockProjects);
    } catch (error: any) {
      console.error('Fetch projects error:', error);
      res.status(500).json({ error: 'Failed to fetch projects', details: error.message });
    }
  });

  app.get('/api/projects/:id', async (req, res) => {
    try {
      if (dbConnected) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          return res.status(400).json({ error: 'Invalid project ID' });
        }
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        return res.json(project);
      }
      const project = mockProjects.find(p => p._id === req.params.id);
      if (!project) return res.status(404).json({ error: 'Project not found' });
      res.json(project);
    } catch (error: any) {
      console.error('Fetch project error:', error);
      res.status(500).json({ error: 'Failed to fetch project', details: error.message });
    }
  });

  app.post('/api/projects', authenticateToken, async (req, res) => {
    try {
      if (dbConnected) {
        const project = new Project(req.body);
        await project.save();
        return res.status(201).json(project);
      }
      
      // Fallback to mock data (in-memory persistence)
      const newProject = { 
        ...req.body, 
        _id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date() 
      };
      mockProjects.unshift(newProject);
      res.status(201).json(newProject);
    } catch (error: any) {
      console.error('Add project error:', error);
      res.status(500).json({ error: 'Failed to add project', details: error.message });
    }
  });

  app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
    try {
      if (dbConnected) {
        await Project.findByIdAndDelete(req.params.id);
        return res.json({ success: true });
      }
      
      // Fallback to mock data
      mockProjects = mockProjects.filter(p => (p._id !== req.params.id && (p as any).id !== req.params.id));
      res.json({ success: true });
    } catch (error: any) {
      console.error('Delete project error:', error);
      res.status(500).json({ error: 'Failed to delete project', details: error.message });
    }
  });

  // Image Upload
  app.post('/api/upload', authenticateToken, upload.single('image'), (req: any, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ url: req.file.path });
  });

  // Settings
   app.get('/api/settings', async (req, res) => {
     try {
       if (dbConnected) {
         const settings = await (mongoose.models.Settings || mongoose.model('Settings', new mongoose.Schema({
           whatsapp_number: String,
           company_email: String,
           site_title: String,
           site_description: String
         }))).findOne();
         if (settings) return res.json(settings);
       }
       // Default settings
       res.json({
         whatsapp_number: "254103591401",
         company_email: "vincentkamau137@gmail.com",
         site_title: "Web Hub - Futuristic Tech Agency",
         site_description: "Web Hub is a futuristic technology agency specializing in high-performance web systems."
       });
     } catch (error: any) {
       console.error('Fetch settings error:', error);
       res.status(500).json({ error: 'Failed to fetch settings' });
     }
   });

   // Health check
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      db: dbConnected ? 'connected' : 'mock-mode',
      environment: process.env.NODE_ENV
    });
  });

  // Catch-all for API routes to prevent falling through to Vite's SPA fallback
  app.all('/api/*', (req, res) => {
    res.status(404).json({ error: 'API route not found' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
      root: path.join(process.cwd(), 'frontend'),
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'frontend', 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Start server
  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
    
    // Connect to MongoDB only if URI is provided
    if (MONGODB_URI) {
      mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
      }).then(() => {
        console.log('Connected to MongoDB');
        dbConnected = true;
        seedData();
      }).catch(err => {
        console.error('MongoDB connection failed, falling back to Mock Mode:', err.message);
        dbConnected = false;
      });
    } else {
      console.log('No MONGODB_URI provided, starting in Mock Mode with initial data.');
      dbConnected = false;
    }
  });

  function seedData() {
    // Seed initial data if empty and connected
    Project.countDocuments()
      .then(count => {
        if (count === 0) {
          Project.create([
            { title: "Easy Move Kenya", category: "Web Application", description: "Relocation management system.", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop", link: "https://easymove-kenya-h1m8.vercel.app/" },
            { title: "Styled By Kim", category: "UI/UX Design", description: "Fashion and styling portfolio.", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2864&auto=format&fit=crop", link: "https://styled-by-kim.vercel.app/" }
          ]).then(() => console.log("Database seeded with initial projects."))
            .catch(err => console.error("Seeding error:", err));
        }
      })
      .catch(err => console.error("Could not count documents for seeding:", err));
  }
}

startServer().catch(console.error);
