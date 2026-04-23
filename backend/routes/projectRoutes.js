import express from 'express';
import Project from '../models/Project.js';
import { authenticateToken } from './authRoutes.js';

const router = express.Router();

// Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get single project (public)
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create a project (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ message: 'Error creating project', error: err.message });
  }
});

// Update a project (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: 'Error updating project', error: err.message });
  }
});

// Delete a project (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
