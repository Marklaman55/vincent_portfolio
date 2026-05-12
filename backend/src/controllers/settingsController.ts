import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const SETTINGS_FILE = path.join(process.cwd(), 'data', 'settings.json');

// Initialize settings file if it doesn't exist
if (!fs.existsSync(SETTINGS_FILE)) {
  const defaultSettings = {
    whatsapp_number: "254103591401",
    company_email: "vincentkamau137@gmail.com"
  };
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2));
}

const loadSettings = () => {
  try {
    const data = fs.readFileSync(SETTINGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {
      whatsapp_number: "254103591401",
      company_email: "vincentkamau137@gmail.com"
    };
  }
};

const saveSettings = (settings: any) => {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
};

export const getSettings = async (req: Request, res: Response) => {
  try {
    const settings = loadSettings();
    res.json(settings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const currentSettings = loadSettings();
    const updates = req.body;
    
    const updatedSettings = {
      ...currentSettings,
      ...updates
    };
    
    saveSettings(updatedSettings);
    res.json({ message: 'Settings updated successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};