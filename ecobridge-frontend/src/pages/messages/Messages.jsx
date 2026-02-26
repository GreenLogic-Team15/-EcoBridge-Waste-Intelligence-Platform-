import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, Send } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/apiClient";

const Messages = () => {
  const { userType } = useAuth();
  const location = useLocation();
  const state = location.state || {};

  const [inbox, setInbox] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingInbox, setLoadingInbox] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const initialReceiverId = state.receiverId || null;

  useEffect(() => {
    let cancelled = false;
    setLoadingInbox(true);
    setError("");
    api
      .get("/api/messages/inbox")
      .then((res) => {
        if (cancelled) return;
        const payload = res.data;
        const list =
          payload?.inbox || payload?.data || (Array.isArray(payload) ? payload : []);
        setInbox(Array.isArray(list) ? list : []);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err.response?.data?.message ||
            "Unable to load conversations. Please try again.",
        );
      })
      .finally(() => {
        if (!cancelled) setLoadingInbox(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!initialReceiverId || inbox.length === 0) return;
    const match = inbox.find((c) =>
      (c.participants || []).some(
        (p) => p._id === initialReceiverId || p.id === initialReceiverId,
      ),
    );
    if (match) {
      setSelectedConversation(match);
    }
  }, [initialReceiverId, inbox]);

  useEffect(() => {
    if (!selectedConversation || !selectedConversation._id) {
      setMessages([]);
      return;
    }

    let cancelled = false;
    setLoadingMessages(true);
    setError("");
    api
      .get(`/api/messages/conversation/${selectedConversation._id}`)
      .then((res) => {
        if (cancelled) return;
        const payload = res.data;
        const list = Array.isArray(payload) ? payload : payload?.messages || [];
        setMessages(list);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err.response?.data?.message ||
            "Unable to load conversation. Please try again.",
        );
      })
      .finally(() => {
        if (!cancelled) setLoadingMessages(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedConversation]);

  const sortedInbox = useMemo(() => {
    return [...inbox].sort((a, b) => {
      const aTime = a.lastMessage?.createdAt || a.createdAt || "";
      const bTime = b.lastMessage?.createdAt || b.createdAt || "";
      return new Date(bTime).getTime() - new Date(aTime).getTime();
    });
  }, [inbox]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    if (!selectedConversation && !initialReceiverId) {
      setError("No conversation selected.");
      return;
    }

    setSending(true);
    setError("");

    try {
      let conversationId = selectedConversation?._id;

      if (!conversationId && initialReceiverId) {
        const res = await api.post("/api/messages/conversation", {
          receiverId: initialReceiverId,
          wasteLogId: state.wasteLogId,
        });
        const conv = res.data?.conversation || res.data;
        conversationId = conv?._id;
        if (conv) {
          setInbox((prev) => {
            const exists = prev.find((c) => c._id === conv._id);
            return exists ? prev : [conv, ...prev];
          });
          setSelectedConversation(conv);
        }
      }

      if (!conversationId) {
        setError("Unable to determine conversation.");
        setSending(false);
        return;
      }

      const res = await api.post("/api/messages", {
        conversationId,
        recipientId: initialReceiverId || state.recipientId,
        text: newMessage.trim(),
      });
      const msg = res.data?.data || res.data?.message || res.data;

      setMessages((prev) =>
        Array.isArray(prev) ? [...prev, msg].filter(Boolean) : [msg],
      );
      setNewMessage("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to send message. Please try again.",
      );
    } finally {
      setSending(false);
    }
  };

  const getOtherParticipant = () => {
    if (!selectedConversation) return null;
    return (
      (selectedConversation.participants || []).find((p) => !p.isCurrentUser) ||
      selectedConversation.participants?.[0] ||
      null
    );
  };

  const markSuccessful = async () => {
    if (!selectedConversation?._id) return;
    const other = getOtherParticipant();
    if (!other || !(other._id || other.id)) return;
    try {
      await api.put(
        `/api/messages/conversation/${selectedConversation._id}/successful`,
        { partnerId: other._id || other.id },
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to mark partner successful. Please try again.",
      );
    }
  };

  const markCompleted = async () => {
    if (!selectedConversation?._id) return;
    try {
      await api.put(
        `/api/messages/conversation/${selectedConversation._id}/completed`,
        state.wasteLogId ? { wasteLogId: state.wasteLogId } : undefined,
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to mark pickup completed. Please try again.",
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar userType={userType || "partner"} />

      <div className="flex-1 ml-56 p-6 flex flex-col">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Messages
            </h1>
            <p className="text-xs text-gray-500">
              Chat with SMEs and partners about pickup requests.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {userType === "business" && selectedConversation && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={markSuccessful}
                  className="px-3 py-1.5 rounded-full text-[11px] bg-[#E8F5E9] text-[#2E5C47] hover:bg-[#D1E7DD]"
                >
                  Mark partner successful
                </button>
                <button
                  type="button"
                  onClick={markCompleted}
                  className="px-3 py-1.5 rounded-full text-[11px] bg-[#4A7C59] text-white hover:bg-[#3d6649]"
                >
                  Mark pickup completed
                </button>
              </div>
            )}
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#2E5C47] text-white">
              <MessageCircle className="w-4 h-4" />
            </div>
          </div>
        </header>

        <div className="flex-1 flex bg-[#F5F7F6] rounded-lg border border-gray-100 overflow-hidden">
          {/* Conversation list */}
          <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-xs font-medium text-gray-600">
                Conversations
              </p>
            </div>

            <div className="flex-1 overflow-y-auto">
              {loadingInbox && (
                <p className="px-4 py-3 text-xs text-gray-500">Loading…</p>
              )}
              {!loadingInbox && sortedInbox.length === 0 && (
                <p className="px-4 py-3 text-xs text-gray-500">
                  No messages yet.
                </p>
              )}
              {sortedInbox.map((conv) => {
                const isActive = selectedConversation?._id === conv._id;
                const other =
                  (conv.participants || []).find((p) => !p.isCurrentUser) ||
                  conv.participants?.[0] ||
                  {};
                return (
                  <button
                    key={conv._id}
                    type="button"
                    onClick={() => setSelectedConversation(conv)}
                    className={`w-full px-4 py-3 text-left text-xs border-b border-gray-50 hover:bg-[#F5F7F6] ${
                      isActive ? "bg-[#E8F5E9]" : "bg-white"
                    }`}
                  >
                    <p className="font-medium text-gray-900">
                      {other.name || other.fullName || "Conversation"}
                    </p>
                    <p className="text-gray-500 line-clamp-1">
                      {conv.lastMessage?.text || ""}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {conv.lastMessage?.createdAt
                        ? new Date(
                            conv.lastMessage.createdAt,
                          ).toLocaleString()
                        : ""}
                    </p>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Messages pane */}
          <section className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {error && (
                <p className="text-xs text-red-600" role="alert">
                  {error}
                </p>
              )}
              {!selectedConversation && !initialReceiverId && (
                <p className="text-xs text-gray-500">
                  Select a conversation from the left or start a new chat from a
                  pickup or listing.
                </p>
              )}
              {loadingMessages && (
                <p className="text-xs text-gray-500">Loading messages…</p>
              )}
              {messages.map((msg) => {
                const mine = msg.isMine || msg.senderIsCurrentUser;
                return (
                  <div
                    key={msg._id}
                    className={`flex ${
                      mine ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs rounded-2xl px-3 py-2 text-xs ${
                        mine
                          ? "bg-[#2E5C47] text-white"
                          : "bg-white text-gray-800 border border-gray-100"
                      }`}
                    >
                      <p>{msg.text}</p>
                      {msg.createdAt && (
                        <p className="mt-1 text-[10px] opacity-70">
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Composer */}
            <form
              onSubmit={handleSend}
              className="border-t border-gray-100 bg-white px-4 py-3 flex items-center gap-2"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 bg-[#F5F7F6] border border-gray-200 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
              />
              <button
                type="submit"
                disabled={sending || !newMessage.trim()}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#2E5C47] text-white disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Messages;

