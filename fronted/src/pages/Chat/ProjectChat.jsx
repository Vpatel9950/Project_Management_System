import React, { useState, useEffect, useRef } from "react";
import { messageService } from "../../services/messageService";
import { useAuth } from "../../context/AuthContext";
import { MessageSquare, Send, User, RefreshCw } from "lucide-react";

const ProjectChat = ({ projectId }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    if (!projectId) return;
    try {
      setLoading(true);
      const data = await messageService.getMessagesByProjectId(projectId);
      setMessages(data || []);
    } catch (err) {
      console.error("Failed to load chat messages", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [projectId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!content.trim() || !user?.id) return;

    try {
      setSending(true);
      const sentMessage = await messageService.sendMessage(
        user.id,
        projectId,
        content.trim()
      );
      setMessages((prev) => [...prev, sentMessage]);
      setContent("");
    } catch (err) {
      alert("Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex flex-col h-[550px] shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-white text-base">Project Team Chat</h3>
        </div>
        <button
          onClick={fetchMessages}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Refresh Messages"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-2">
        {loading ? (
          <div className="text-center py-10 text-slate-500 text-sm">Loading discussion...</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            No messages sent yet. Start discussing project goals with your team!
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isMe = msg.sender?.id === user?.id;
            return (
              <div
                key={msg.id || idx}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-[11px] text-slate-400">
                  <User className="w-3 h-3 text-indigo-400" />
                  <span className="font-semibold">{msg.sender?.fullName || "Member"}</span>
                </div>

                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isMe
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none shadow-md shadow-indigo-500/20"
                      : "bg-slate-950/80 border border-slate-800 text-slate-200 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-800 flex gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a team message..."
          className="flex-1 px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={sending || !content.trim()}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all disabled:opacity-50 flex items-center gap-1.5 shadow-md shadow-indigo-500/20"
        >
          <Send className="w-4 h-4" />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};

export default ProjectChat;
