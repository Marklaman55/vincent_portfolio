import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { 
  Save, 
  Mail, 
  MessageCircle, 
  Shield, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { getSettingsData as getSettings, saveSettingsData as saveSettings } from "../api/settings";

const AdminSettings = () => {
  const [formData, setFormData] = useState({
    whatsapp_number: "",
    company_email: ""
  });
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  useEffect(() => {
    getSettings().then(data => {
      setFormData({
        whatsapp_number: data.whatsapp_number || "",
        company_email: data.company_email || ""
      });
    }).catch(err => console.error("Load Settings Error:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");

    try {
      await saveSettings(formData);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error("Save Settings Error:", err);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">System Settings</h1>
        <p className="text-white/40">Configure your contact information and system preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Contact Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 md:p-10 rounded-3xl border-white/5"
        >
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-display font-bold">Contact Configuration</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/60 ml-1 flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Number
                </label>
                <input
                  required
                  type="text"
                  value={formData.whatsapp_number}
                  onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                  className="w-full glass rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="254700000000"
                />
                <p className="text-[10px] text-white/20 ml-1">Enter number with country code, no "+" or spaces (e.g., 254712345678)</p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-white/60 ml-1 flex items-center">
                  <Mail className="w-4 h-4 mr-2" /> Company Email
                </label>
                <input
                  required
                  type="email"
                  value={formData.company_email}
                  onChange={(e) => setFormData({ ...formData, company_email: e.target.value })}
                  className="w-full glass rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="contact@nexusdigital.com"
                />
                <p className="text-[10px] text-white/20 ml-1">This email will be displayed on the contact page and footer.</p>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <div className="flex items-center">
                {status === "success" && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center text-emerald-400 text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Settings saved successfully
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 mr-2" /> Failed to save settings
                  </motion.div>
                )}
              </div>
              <button
                disabled={status === "saving"}
                type="submit"
                className="btn-primary flex items-center px-10 disabled:opacity-50"
              >
                {status === "saving" ? "Saving..." : (
                  <>
                    <Save className="w-5 h-5 mr-2" /> Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Security Info */}
        <div className="glass p-8 rounded-3xl border-white/5 bg-white/[0.01]">
          <h4 className="font-bold mb-4">Security & Access</h4>
          <p className="text-sm text-white/40 leading-relaxed mb-6">
            Your admin session is protected by JWT authentication. For security reasons, 
            sessions expire after 24 hours of inactivity. Always sign out when using a shared device.
          </p>
          <div className="flex items-center text-xs text-white/20">
            <Shield className="w-3 h-3 mr-2" />
            Last login from: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
