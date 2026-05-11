import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X,
  Globe,
  ShoppingCart,
  TrendingUp,
  BarChart3,
  Settings,
  Lightbulb,
  RefreshCw,
  ShieldCheck
} from "lucide-react";

const AdminServices = () => {
  const [services, setServices] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "Globe"
  });

  const fetchServices = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("admin_token");
    const url = editingService ? `/api/services/${editingService.id}` : "/api/services";
    const method = editingService ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    setIsModalOpen(false);
    setEditingService(null);
    setFormData({ name: "", description: "", icon: "Globe" });
    fetchServices();
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      icon: service.icon
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    const token = localStorage.getItem("admin_token");
    await fetch(`/api/services/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    fetchServices();
  };

  const iconOptions = [
    { name: "Globe", icon: <Globe /> },
    { name: "ShoppingCart", icon: <ShoppingCart /> },
    { name: "TrendingUp", icon: <TrendingUp /> },
    { name: "BarChart3", icon: <BarChart3 /> },
    { name: "Settings", icon: <Settings /> },
    { name: "Lightbulb", icon: <Lightbulb /> },
    { name: "RefreshCw", icon: <RefreshCw /> },
    { name: "ShieldCheck", icon: <ShieldCheck /> },
  ];

  const getIcon = (name: string) => {
    const option = iconOptions.find(o => o.name === name);
    return option ? option.icon : <Globe />;
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Service Management</h1>
          <p className="text-white/40">Manage the services displayed on your website.</p>
        </div>
        <button 
          onClick={() => {
            setEditingService(null);
            setFormData({ name: "", description: "", icon: "Globe" });
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" /> Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <motion.div
            key={service.id}
            layout
            className="glass p-8 rounded-3xl border-white/5 relative group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                {getIcon(service.icon)}
              </div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEdit(service)}
                  className="p-2 glass rounded-lg text-white/40 hover:text-primary transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(service.id)}
                  className="p-2 glass rounded-lg text-white/40 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-display font-bold mb-3">{service.name}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{service.description}</p>
          </motion.div>
        ))}
        {services.length === 0 && (
          <div className="col-span-full py-20 text-center text-white/20 italic glass rounded-3xl">
            No services added yet.
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bg/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg glass rounded-3xl border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold">
                {editingService ? "Edit Service" : "Add New Service"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 glass rounded-full hover:text-white/60">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60 ml-1">Service Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full glass rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Website Development"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60 ml-1">Icon</label>
                <div className="grid grid-cols-4 gap-3">
                  {iconOptions.map(option => (
                    <button
                      key={option.name}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon: option.name })}
                      className={`p-4 rounded-xl flex items-center justify-center transition-all ${
                        formData.icon === option.name 
                          ? "bg-primary text-white shadow-lg shadow-primary/20" 
                          : "glass text-white/40 hover:text-white"
                      }`}
                    >
                      {option.icon}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60 ml-1">Description</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full glass rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Describe the service..."
                />
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
                  <Save className="w-5 h-5 mr-2" /> {editingService ? "Update Service" : "Create Service"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
