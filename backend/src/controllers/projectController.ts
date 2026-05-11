import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'backend', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const PROJECTS_FILE = path.join(process.cwd(), 'backend', 'data', 'projects.json');

// Initialize projects file if it doesn't exist
if (!fs.existsSync(PROJECTS_FILE)) {
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify([], null, 2));
}

const getProjects = () => {
  try {
    const data = fs.readFileSync(PROJECTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveProjects = (projects: any[]) => {
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
};

export const getProjectsHandler = async (req: Request, res: Response) => {
  try {
    const projects = getProjects();
    // Sort by ID descending (newest first)
    const sortedProjects = [...projects].sort((a: any, b: any) => b.id - a.id);
    res.json(sortedProjects);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const projects = getProjects();
    
    const newProject = {
      id: Date.now(), // Simple ID generation
      ...req.body,
      createdAt: new Date().toISOString()
    };

    projects.push(newProject);
    saveProjects(projects);

    res.status(201).json(newProject);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const projects = getProjects();
    const projectIndex = projects.findIndex((p: any) => p.id === parseInt(id));
    
    if (projectIndex === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }

    projects[projectIndex] = {
      ...projects[projectIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    saveProjects(projects);
    
    res.json(projects[projectIndex]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const projects = getProjects();
    const projectIndex = projects.findIndex((p: any) => p.id === parseInt(id));
    
    if (projectIndex === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const [deletedProject] = projects.splice(projectIndex, 1);
    saveProjects(projects);
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
