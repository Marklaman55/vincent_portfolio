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
import axios from 'axios';

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
    title: "EcoDrive Solutions", 
    category: "SaaS Platform", 
    description: "Enterprise fleet management platform with real-time tracking and analytics built for global logistics.", 
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c", 
    link: "https://webhub.agency/",
    createdAt: new Date()
  },
  { 
    _id: "2", 
    title: "Velvet & Vine", 
    category: "E-commerce", 
    description: "High-end luxury fashion boutique with integrated AI-driven styling recommendations.", 
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8", 
    link: "https://webhub.agency/",
    createdAt: new Date()
  },
  { 
    _id: "3", 
    title: "FinTech Hub", 
    category: "Banking App", 
    description: "Secure, cross-platform mobile banking solution with blockchain-backed encryption.", 
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3", 
    link: "https://webhub.agency/",
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

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  role: { type: String, default: 'user' },
  selectedPlan: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);
const User = mongoose.model('User', userSchema);

// Mock Users for fallback
let mockUsers: any[] = [];

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
  const corsOptions = {
    origin: process.env.FRONTEND_URL || 'https://webhub-08uf.onrender.com',
    credentials: true,
  };
  app.use(cors(corsOptions));
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
  
  // Auth Routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      if (dbConnected) {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        const user = new User({ email, password: hashedPassword, name });
        await user.save();
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        return res.status(201).json({ token, user: { id: user._id, email, name, role: user.role } });
      }

      // Mock
      if (mockUsers.find(u => u.email === email)) return res.status(400).json({ error: 'User already exists' });
      const newUser = { _id: Math.random().toString(36).substr(2, 9), email, password: hashedPassword, name, role: 'user', selectedPlan: null };
      mockUsers.push(newUser);
      const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
      res.status(201).json({ token, user: { id: newUser._id, email, name, role: 'user' } });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      let user: any;

      if (dbConnected) {
        user = await User.findOne({ email });
      } else {
        user = mockUsers.find(u => u.email === email);
      }

      if (!user) return res.status(401).json({ error: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
      res.json({ token, user: { id: user._id, email: user.email, name: user.name, role: user.role, selectedPlan: user.selectedPlan } });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/user/me', authenticateToken, async (req: any, res) => {
    try {
      if (dbConnected) {
        const user = await User.findById(req.user.id).select('-password');
        return res.json(user);
      }
      const user = mockUsers.find(u => u._id === req.user.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      const { password, ...userData } = user;
      res.json(userData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put('/api/user/plan', authenticateToken, async (req: any, res) => {
    try {
      const { plan } = req.body;
      if (dbConnected) {
        const user = await User.findByIdAndUpdate(req.user.id, { selectedPlan: plan }, { new: true }).select('-password');
        return res.json(user);
      }
      const index = mockUsers.findIndex(u => u._id === req.user.id);
      if (index === -1) return res.status(404).json({ error: 'User not found' });
      mockUsers[index].selectedPlan = plan;
      const { password, ...userData } = mockUsers[index];
      res.json(userData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // M-Pesa Integration
  const getMpesaToken = async () => {
    const key = process.env.MPESA_CONSUMER_KEY;
    const secret = process.env.MPESA_CONSUMER_SECRET;
    const auth = Buffer.from(`${key}:${secret}`).toString('base64');
    
    try {
      const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        headers: {
          Authorization: `Basic ${auth}`
        }
      });
      return response.data.access_token;
    } catch (error: any) {
      console.error('M-Pesa Token Error:', error.response?.data || error.message);
      throw new Error('Failed to generate M-Pesa token');
    }
  };

  app.post('/api/mpesa/stkpush', authenticateToken, async (req: any, res) => {
    try {
      const { phoneNumber, amount } = req.body;
      const token = await getMpesaToken();
      
      const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
      const shortCode = process.env.MPESA_SHORTCODE;
      const passkey = process.env.MPESA_PASSKEY;
      const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');
      
      const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/query', {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: shortCode,
        PhoneNumber: phoneNumber,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: 'WebHub Technologies',
        TransactionDesc: 'Payment for Web Services'
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      res.json(response.data);
    } catch (error: any) {
      console.error('STK Push Error:', error.response?.data || error.message);
      res.status(500).json({ error: error.response?.data || error.message });
    }
  });

  app.post('/api/mpesa/callback', async (req, res) => {
    console.log('M-Pesa Callback Received:', JSON.stringify(req.body, null, 2));
    // Here logic would be added to verify transaction and update user plan state in DB
    // Since this is a demo, we log it.
    res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  });

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

  app.put('/api/projects/:id', authenticateToken, async (req, res) => {
    try {
      if (dbConnected) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          return res.status(400).json({ error: 'Invalid project ID' });
        }
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) return res.status(404).json({ error: 'Project not found' });
        return res.json(project);
      }
      
      // Fallback to mock data
      const index = mockProjects.findIndex(p => p._id === req.params.id);
      if (index === -1) return res.status(404).json({ error: 'Project not found' });
      
      mockProjects[index] = { ...mockProjects[index], ...req.body };
      res.json(mockProjects[index]);
    } catch (error: any) {
      console.error('Update project error:', error);
      res.status(500).json({ error: 'Failed to update project', details: error.message });
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
            { title: "EcoDrive Solutions", category: "SaaS Platform", description: "Enterprise fleet management platform with real-time tracking and analytics built for global logistics.", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c", link: "https://webhub.agency/" },
            { title: "Velvet & Vine", category: "E-commerce", description: "High-end luxury fashion boutique with integrated AI-driven styling recommendations.", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8", link: "https://webhub.agency/" },
            { title: "FinTech Hub", category: "Banking App", description: "Secure, cross-platform mobile banking solution with blockchain-backed encryption.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3", link: "https://webhub.agency/" }
          ]).then(() => console.log("Database seeded with initial projects."))
            .catch(err => console.error("Seeding error:", err));
        }
      })
      .catch(err => console.error("Could not count documents for seeding:", err));
  }
}

startServer().catch(console.error);
