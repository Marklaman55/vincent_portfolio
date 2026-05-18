import React from 'react';
import { motion } from 'motion/react';
import { User, Package, Calendar, LogOut, Code2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Account = () => {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-bg">
      <SEO title="My Account | WebHub" description="Manage your WebHub Technologies account and services" />
      
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center text-primary">
              <User size={40} />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold text-ink mb-1">Hello, {user.name}</h1>
              <p className="text-ink/60 font-mono text-xs uppercase tracking-widest">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={() => { logout(); navigate('/'); }}
            className="px-6 py-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center gap-2 font-mono text-xs uppercase tracking-widest"
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Active Plan */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-10 rounded-[2.5rem] border border-white/10"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-ink">
                <Package size={24} />
              </div>
              <h3 className="text-2xl font-display font-bold text-ink">Active Plan</h3>
            </div>

            {user.selectedPlan ? (
              <div>
                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20 mb-6">
                  <span className="text-xs font-mono text-primary uppercase tracking-[0.2em] mb-2 block">Current Package</span>
                  <h4 className="text-3xl font-display font-bold text-ink">{user.selectedPlan}</h4>
                </div>
                <p className="text-ink/60 text-sm mb-8 leading-relaxed">
                  Your project is currently being processed by our team. Expect a welcome email with next steps within 24 hours.
                </p>
                <Link to="/pricing" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
                  Change Plan <ArrowRight size={20} />
                </Link>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-ink/60 mb-8">You haven't selected a business plan yet.</p>
                <Link to="/pricing" className="btn-primary py-4 px-8 inline-flex items-center gap-2 group">
                  Explore Plans <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </motion.div>

          {/* Account Settings / Progress */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-10 rounded-[2.5rem] border border-white/10"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-ink/5 rounded-2xl flex items-center justify-center text-ink/40">
                <Calendar size={24} />
              </div>
              <h3 className="text-2xl font-display font-bold text-ink">Project Timeline</h3>
            </div>

            <div className="space-y-6">
              {[
                { step: 'Account Created', status: 'completed', date: new Date(user.createdAt || Date.now()).toLocaleDateString() },
                { step: 'Plan Selection', status: user.selectedPlan ? 'completed' : 'pending', date: user.selectedPlan ? 'Done' : '-' },
                { step: 'Project Assessment', status: 'pending', date: 'Upcoming' },
                { step: 'Design Phase', status: 'pending', date: 'Upcoming' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${item.status === 'completed' ? 'bg-primary shadow-[0_0_10px_rgba(255,225,0,0.5)]' : 'bg-ink/10'}`}></div>
                    <span className={`text-sm ${item.status === 'completed' ? 'text-ink font-bold' : 'text-ink/40'}`}>{item.step}</span>
                  </div>
                  <span className="text-[10px] font-mono text-ink/30 uppercase tracking-widest">{item.date}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-ink/5 text-center">
              <p className="text-[10px] font-mono text-ink/40 uppercase tracking-[0.2em] mb-4">Support Reference</p>
              <div className="px-4 py-2 bg-ink/5 rounded-lg text-ink font-mono text-sm inline-block">
                WH-{(user.id || user._id)?.slice(-6)?.toUpperCase() || 'NEW'}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Account;
