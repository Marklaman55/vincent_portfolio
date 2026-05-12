import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, ExternalLink, Shield, Save, Loader2, Link as LinkIcon, Image as ImageIcon, Type, Layout, LogOut, Upload, Lock, X, Check } from 'lucide-react';
import SEO from '../components/SEO';
import { Project } from './Portfolio';
import { cn } from '../lib/utils';
import Cropper from 'react-easy-crop';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function Admin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [isUrlValid, setIsUrlValid] = useState(true);

  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Web Application',
    description: '',
    image: '',
    link: ''
  });

  const categories = ["Web Application", "UI/UX Design", "System Architecture", "System Branding"];

  useEffect(() => {
    if (token) {
      fetchProjects();
    }
  }, [token]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Expected JSON response from server");
      }
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Expected JSON response from server");
      }
      
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        localStorage.setItem('adminToken', data.token);
      } else {
        setLoginError(data.error);
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginError('Server error. Try again.');
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('adminToken');
  };

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<Blob | null> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg');
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageToCrop(reader.result?.toString() || null);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCropSave = async () => {
    if (!imageToCrop || !croppedAreaPixels) return;

    try {
      const croppedImageBlob = await getCroppedImg(imageToCrop, croppedAreaPixels);
      if (!croppedImageBlob) return;

      const file = new File([croppedImageBlob], "cropped-image.jpg", { type: "image/jpeg" });
      
      const formData = new FormData();
      formData.append('image', file);

      setUploadLoading(true);
      setImageToCrop(null);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setNewProject({ ...newProject, image: data.url });
      }
    } catch (err) {
      console.error('Crop save error:', err);
    } finally {
      setUploadLoading(false);
    }
  };

  const validateUrl = (url: string) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(url);
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setNewProject({ ...newProject, link: url });
    setIsUrlValid(validateUrl(url) || url === '');
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUrlValid) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newProject)
      });
      if (res.ok) {
        setNewProject({ title: '', category: 'Web Application', description: '', image: '', link: '' });
        setShowAddForm(false);
        fetchProjects();
      }
    } catch (err) {
      console.error('Add project error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: any) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchProjects();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  if (!token) {
    return (
      <div className="pt-32 pb-20 bg-bg min-h-screen flex items-center justify-center p-6">
        <SEO title="Admin Login" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md glass p-10 rounded-3xl border border-border shadow-2xl"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-ink rounded-2xl flex items-center justify-center mb-4">
              <Shield className="text-primary w-8 h-8" />
            </div>
            <h1 className="text-3xl font-display font-bold text-ink">Admin Access</h1>
            <p className="text-ink/60 text-sm mt-1">Please enter your password</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 w-5 h-5" />
                <input
                  type="password"
                  required
                  className="w-full bg-white/50 border border-border rounded-xl px-12 py-4 outline-none focus:ring-2 focus:ring-primary transition-all"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              {loginError && <p className="text-red-500 text-xs mt-2 ml-2">{loginError}</p>}
            </div>
            <button type="submit" className="w-full btn-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2">
              Login <ExternalLink size={18} />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-bg min-h-screen">
      <SEO title="Admin Dashboard" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-ink rounded-xl flex items-center justify-center">
              <Shield className="text-primary w-6 h-6" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold text-ink">Admin Dashboard</h1>
              <p className="text-ink/60 font-mono text-[10px] tracking-widest uppercase">Welcome back, Vincent</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn-primary py-3 px-8 flex items-center gap-2 group"
            >
              {showAddForm ? <Layout className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {showAddForm ? 'View Dashboard' : 'Add Project'}
            </button>
            <button onClick={handleLogout} className="w-12 h-12 bg-white border border-border rounded-xl flex items-center justify-center text-ink/60 hover:text-red-500 transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {showAddForm ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto glass p-8 rounded-3xl border border-border shadow-2xl"
            >
              <h2 className="text-2xl font-display font-bold text-ink mb-8">Project Details</h2>
              <form onSubmit={handleAddProject} className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ink/40 mb-2">
                    <Type className="w-4 h-4" /> Project Title
                  </label>
                  <input
                    required
                    className="w-full bg-white/50 border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary transition-all"
                    value={newProject.title}
                    onChange={e => setNewProject({...newProject, title: e.target.value})}
                    placeholder="e.g. Quantum Financial Portal"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ink/40 mb-2">
                      Category
                    </label>
                    <select
                      className="w-full bg-white/50 border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary transition-all appearance-none"
                      value={newProject.category}
                      onChange={e => setNewProject({...newProject, category: e.target.value})}
                    >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ink/40 mb-2">
                       Project Link
                    </label>
                    <div className="relative">
                      <input
                        required
                        className={cn(
                          "w-full bg-white/50 border rounded-xl px-4 py-3 outline-none focus:ring-2 transition-all",
                          isUrlValid ? "border-border focus:ring-primary" : "border-red-500 focus:ring-red-500"
                        )}
                        value={newProject.link}
                        onChange={handleLinkChange}
                        placeholder="https://yourlink.com"
                      />
                      {!isUrlValid && (
                        <p className="text-red-500 text-[10px] absolute -bottom-5 left-0">Please enter a valid URL</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ink/40 mb-2">
                    <Upload className="w-4 h-4" /> Upload Image
                  </label>
                  <div className="flex gap-4 items-center">
                    <div className="flex-grow">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label 
                        htmlFor="image-upload" 
                        className="flex items-center justify-center gap-2 w-full bg-white/50 border border-dashed border-border rounded-xl px-4 py-3 cursor-pointer hover:bg-white transition-all text-ink/60"
                      >
                        {uploadLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5" />}
                        {newProject.image ? "Change Image" : "Choose File"}
                      </label>
                    </div>
                    {newProject.image && (
                      <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-border">
                        <img src={newProject.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ink/40 mb-2">
                    Detailed Project Description
                  </label>
                  <div className="bg-white/50 rounded-xl overflow-hidden border border-border">
                    <ReactQuill 
                      theme="snow"
                      value={newProject.description}
                      onChange={(val) => setNewProject({...newProject, description: val})}
                      className="min-h-[150px]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !newProject.image || !isUrlValid}
                  className="w-full btn-primary py-4 rounded-xl flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <Save className="w-6 h-6" /> Save Project
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {loading ? (
                <div className="col-span-full py-20 flex justify-center">
                  <Loader2 className="w-12 h-12 animate-spin text-primary" />
                </div>
              ) : projects.length === 0 ? (
                <div className="col-span-full py-20 text-center glass rounded-3xl border border-dashed border-border">
                   <p className="text-ink/40 font-display text-xl">No projects in your collection yet.</p>
                </div>
              ) : (
                projects.map((project: any) => (
                  <div key={project._id} className="glass rounded-3xl border border-border overflow-hidden flex flex-col">
                    <div className="aspect-video relative overflow-hidden">
                       <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                       <div className="absolute top-4 right-4 flex gap-2">
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-ink hover:text-primary transition-colors"
                          >
                            <ExternalLink size={18} />
                          </a>
                          <button 
                            onClick={() => handleDeleteProject(project._id)}
                            className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                       </div>
                    </div>
                    <div className="p-6 flex-grow">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">{project.category}</span>
                      <h3 className="text-2xl font-display font-bold text-ink mt-2">{project.title}</h3>
                      <p className="text-ink/60 text-sm mt-4 line-clamp-2">{project.description}</p>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cropper Modal */}
      <AnimatePresence>
        {imageToCrop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 backdrop-blur-sm p-6"
          >
            <div className="w-full max-w-4xl h-[80vh] bg-bg rounded-3xl overflow-hidden flex flex-col shadow-2xl relative">
              <div className="p-6 border-b border-border flex justify-between items-center">
                <h3 className="text-xl font-display font-bold">Crop Project Image</h3>
                <button onClick={() => setImageToCrop(null)} className="p-2 hover:bg-ink/5 rounded-full transition-colors">
                  <X />
                </button>
              </div>
              
              <div className="flex-grow relative bg-ink/5">
                <Cropper
                  image={imageToCrop}
                  crop={crop}
                  zoom={zoom}
                  aspect={16 / 9}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>

              <div className="p-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="w-full md:w-64">
                   <label className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-2 block">Zoom Level</label>
                   <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                   <button 
                    onClick={() => setImageToCrop(null)}
                    className="flex-1 md:flex-none px-8 py-3 rounded-xl border border-border font-bold hover:bg-ink/5 transition-all text-ink/60"
                   >
                     Cancel
                   </button>
                   <button 
                    onClick={handleCropSave}
                    className="flex-1 md:flex-none px-12 py-3 rounded-xl bg-ink text-white font-bold hover:bg-primary transition-all flex items-center justify-center gap-2"
                   >
                     <Check size={18} /> Apply Crop
                   </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
