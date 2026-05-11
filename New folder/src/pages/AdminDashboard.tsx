import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { 
  MessageSquare, 
  Briefcase, 
  Layers, 
  TrendingUp, 
  Clock, 
  Mail, 
  ArrowUpRight,
  CheckCircle2,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const headers = { "Authorization": `Bearer ${token}` };

    fetch("/api/stats", { headers })
      .then(res => res.json())
      .then(data => setStats(data));

    fetch("/api/messages", { headers })
      .then(res => res.json())
      .then(data => setRecentMessages(data.slice(0, 5)));
  }, []);

  if (!stats) return <div className="animate-pulse space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map(i => <div key={i} className="h-32 glass rounded-2xl" />)}
    </div>
    <div className="h-96 glass rounded-2xl" />
  </div>;

  const cards = [
    { label: "Total Messages", value: stats.messages, icon: <MessageSquare />, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Projects", value: stats.projects, icon: <Briefcase />, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { label: "Services", value: stats.services, icon: <Layers />, color: "text-purple-400", bg: "bg-purple-400/10" },
    { label: "Unread Messages", value: stats.unread, icon: <Mail />, color: "text-orange-400", bg: "bg-orange-400/10" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Dashboard Overview</h1>
        <p className="text-white/40">Welcome back, here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-6 rounded-2xl border-white/5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                {card.icon}
              </div>
              <TrendingUp className="w-4 h-4 text-white/20" />
            </div>
            <div className="text-3xl font-display font-bold mb-1">{card.value}</div>
            <div className="text-sm text-white/40 font-medium">{card.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Messages */}
        <div className="lg:col-span-2 glass rounded-3xl border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-display font-bold text-xl">Recent Messages</h3>
            <Link to="/admin/messages" className="text-primary text-sm font-medium hover:underline flex items-center">
              View All <ArrowUpRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {recentMessages.length > 0 ? (
              recentMessages.map((msg) => (
                <div key={msg.id} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${msg.status === 'unread' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/40'}`}>
                      {msg.fullName.charAt(0)}
                    </div>
                    <div>
                      <p className={`font-medium ${msg.status === 'unread' ? 'text-white' : 'text-white/60'}`}>{msg.fullName}</p>
                      <p className="text-xs text-white/40">{msg.service} • {new Date(msg.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {msg.status === 'unread' ? (
                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">New</span>
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500/40" />
                  )}
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-white/20">No messages yet.</div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl border-white/5">
            <h3 className="font-display font-bold text-xl mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/admin/projects" className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
                <span className="font-medium">Add New Project</span>
                <Briefcase className="w-5 h-5 text-white/20 group-hover:text-primary transition-colors" />
              </Link>
              <Link to="/admin/services" className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
                <span className="font-medium">Manage Services</span>
                <Layers className="w-5 h-5 text-white/20 group-hover:text-primary transition-colors" />
              </Link>
              <Link to="/admin/settings" className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
                <span className="font-medium">System Settings</span>
                <Settings className="w-5 h-5 text-white/20 group-hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          <div className="glass p-8 rounded-3xl border-primary/10 bg-primary/[0.02]">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h4 className="font-bold">System Status</h4>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              All systems are operational. Database is healthy and API response times are optimal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
