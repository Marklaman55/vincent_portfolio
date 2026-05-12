import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const SERVICES_FILE = path.join(process.cwd(), 'data', 'services.json');

// Initialize services file if it doesn't exist
if (!fs.existsSync(SERVICES_FILE)) {
  fs.writeFileSync(SERVICES_FILE, JSON.stringify([], null, 2));
}

const loadServices = () => {
  try {
    const data = fs.readFileSync(SERVICES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveServicesToFile = (services: any[]) => {
  fs.writeFileSync(SERVICES_FILE, JSON.stringify(services, null, 2));
};

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = loadServices();
    const sortedServices = [...services].sort((a: any, b: any) => a.id - b.id);
    res.json(sortedServices);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const services = loadServices();
    
    const newService = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };

    services.push(newService);
    saveServicesToFile(services);

    res.status(201).json(newService);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const services = loadServices();
    const serviceIndex = services.findIndex((s: any) => s.id === parseInt(id));
    
    if (serviceIndex === -1) {
      return res.status(404).json({ message: 'Service not found' });
    }

    services[serviceIndex] = {
      ...services[serviceIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    saveServicesToFile(services);
    
    res.json(services[serviceIndex]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const services = loadServices();
    const serviceIndex = services.findIndex((s: any) => s.id === parseInt(id));
    
    if (serviceIndex === -1) {
      return res.status(404).json({ message: 'Service not found' });
    }

    services.splice(serviceIndex, 1);
    saveServicesToFile(services);
    
    res.json({ message: 'Service deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};