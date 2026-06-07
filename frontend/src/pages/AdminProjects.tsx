import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  ExternalLink, 
  Image as ImageIcon,
  X,
  Save
} from "lucide-react";
import { getProjects, saveProject, deleteProject } from "../api/portfolio";

const AdminProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    technologies: "",
    imageUrl: "",
    link: ""
  });

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error("Fetch Projects Error:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSave = editingProject ? { ...formData, id: editingProject.id } : formData;
      await saveProject(dataToSave);
      setIsModalOpen(false);
      setEditingProject(null);
      setFormData({ name: "", description: "", technologies: "", imageUrl: "", link: "" });
      fetchProjects();
    } catch (err) {
      console.error("Save Project Error:", err);
    }
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      technologies: project.technologies,
      imageUrl: project.imageUrl,
      link: project.link
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number | string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      fetchProjects();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Project Management</h1>
          <p className="text-white/40">Add, edit, or remove projects from your portfolio.</p>
        </div>
        <button 
          onClick={() => {
            setEditingProject(null);
            setFormData({ name: "", description: "", technologies: "", imageUrl: "", link: "" });
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" /> Add New Project
        </button>
      </div>

      {/* Projects Table/Grid */}
      <div className="glass rounded-3xl border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-6 text-xs uppercase tracking-wider font-bold text-white/40">Project</th>
                <th className="px-8 py-6 text-xs uppercase tracking-wider font-bold text-white/40">Technologies</th>
                <th className="px-8 py-6 text-xs uppercase tracking-wider font-bold text-white/40">Link</th>
                <th className="px-8 py-6 text-xs uppercase tracking-wider font-bold text-white/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-10 rounded-lg overflow-hidden bg-white/5 shrink-0">
                        <img 
                          src={project.imageUrl || `https://picsum.photos/seed/${project.id}/200/120`} 
                          alt="" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold truncate">{project.name}</p>
                        <p className="text-xs text-white/40 truncate max-w-[200px]">{project.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies?.split(',').map((tech: string) => (
                        <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/40 border border-white/10">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center text-sm">
                      Visit <ExternalLink className="ml-1 w-3 h-3" />
                    </a>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => handleEdit(project)}
                        className="p-2 glass rounded-lg text-white/40 hover:text-primary transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)}
                        className="p-2 glass rounded-lg text-white/40 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-white/20 italic">No projects added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bg/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl glass rounded-3xl border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 glass rounded-full hover:text-white/60">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60 ml-1">Project Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full glass rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Nexus Dashboard"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60 ml-1">Technologies (comma separated)</label>
                  <input
                    required
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    className="w-full glass rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                    placeholder="React, Node.js, SQLite"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60 ml-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full glass rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Briefly describe the project..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60 ml-1">Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                      type="text"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="w-full glass rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-primary transition-colors"
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60 ml-1">Project Link</label>
                  <div className="relative">
                    <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                      type="text"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      className="w-full glass rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-primary transition-colors"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn-primary flex items-center"
                >
                  <Save className="w-5 h-5 mr-2" /> {editingProject ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
