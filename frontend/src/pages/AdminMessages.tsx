import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { 
  Mail, 
  Phone, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Search,
  MessageSquare
} from "lucide-react";
import { getMessages, updateMessageStatus, deleteMessage } from "../api/messages";

const AdminMessages = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (err) {
      console.error("Fetch Messages Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusUpdate = async (id: number | string, status: string) => {
    try {
      await updateMessageStatus(id, status);
      fetchMessages();
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }
    } catch (err) {
      console.error("Status Update Error:", err);
    }
  };

  const handleDelete = async (id: number | string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteMessage(id);
      fetchMessages();
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  const filteredMessages = messages.filter(m => 
    m.fullName.toLowerCase().includes(search.toLowerCase()) || 
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-12rem)] flex gap-8">
      {/* Messages List */}
      <div className="w-1/3 flex flex-col glass rounded-3xl border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-display font-bold mb-4">Inbox</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input 
              type="text" 
              placeholder="Search messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
        <div className="flex-grow overflow-auto divide-y divide-white/5">
          {filteredMessages.map((msg) => (
            <button
              key={msg.id}
              onClick={() => {
                setSelectedMessage(msg);
                if (msg.status === 'unread') handleStatusUpdate(msg.id, 'read');
              }}
              className={`w-full p-6 text-left hover:bg-white/[0.02] transition-colors flex items-start space-x-4 ${selectedMessage?.id === msg.id ? 'bg-primary/5 border-l-2 border-primary' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${msg.status === 'unread' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/40'}`}>
                {msg.fullName.charAt(0)}
              </div>
              <div className="min-w-0 flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <p className={`font-medium truncate ${msg.status === 'unread' ? 'text-white' : 'text-white/60'}`}>{msg.fullName}</p>
                  <span className="text-[10px] text-white/20 whitespace-nowrap ml-2">{new Date(msg.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-white/40 truncate mb-1">{msg.service}</p>
                <p className="text-xs text-white/30 line-clamp-1">{msg.message}</p>
              </div>
            </button>
          ))}
          {filteredMessages.length === 0 && (
            <div className="p-12 text-center text-white/20 italic">No messages found.</div>
          )}
        </div>
      </div>

      {/* Message Detail */}
      <div className="flex-grow glass rounded-3xl border-white/5 overflow-hidden flex flex-col">
        {selectedMessage ? (
          <>
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                  {selectedMessage.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold">{selectedMessage.fullName}</h3>
                  <p className="text-white/40 flex items-center text-sm">
                    <Clock className="w-3 h-3 mr-1" /> Received on {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="p-3 glass rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Delete Message"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                {selectedMessage.status !== 'responded' && (
                  <button 
                    onClick={() => handleStatusUpdate(selectedMessage.id, 'responded')}
                    className="btn-primary py-2 px-6 flex items-center"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Mark as Responded
                  </button>
                )}
              </div>
            </div>
            <div className="flex-grow p-8 overflow-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-4 rounded-2xl border-white/5">
                  <div className="flex items-center text-white/40 text-xs uppercase tracking-wider mb-2">
                    <Mail className="w-3 h-3 mr-1" /> Email Address
                  </div>
                  <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline font-medium">{selectedMessage.email}</a>
                </div>
                <div className="glass p-4 rounded-2xl border-white/5">
                  <div className="flex items-center text-white/40 text-xs uppercase tracking-wider mb-2">
                    <Phone className="w-3 h-3 mr-1" /> Phone Number
                  </div>
                  <p className="font-medium">{selectedMessage.phone}</p>
                </div>
                <div className="glass p-4 rounded-2xl border-white/5">
                  <div className="flex items-center text-white/40 text-xs uppercase tracking-wider mb-2">
                    <MessageSquare className="w-3 h-3 mr-1" /> Interested Service
                  </div>
                  <p className="font-medium">{selectedMessage.service}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-white/40 uppercase tracking-wider">Message Content</h4>
                <div className="glass p-8 rounded-3xl border-white/5 text-white/80 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/10 p-6 rounded-2xl">
                <h4 className="font-bold mb-2">Admin Note</h4>
                <p className="text-sm text-white/60">
                  To reply, click the email address above to open your default mail client. 
                  Once you've replied, mark the message as "Responded" to keep track of your inbox.
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-12">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-white/10 mb-6">
              <Mail className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-display font-bold mb-2">No Message Selected</h3>
            <p className="text-white/40 max-w-xs">Select a message from the inbox to view its full details and take action.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
