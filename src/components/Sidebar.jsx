import {
    Plus,
    MessageSquare,
    Upload,
    FileText,
    Trash2,
    X
} from "lucide-react";

import {
    useEffect,
    useState
} from "react";

import api from "../api/axios";

import UploadModal from "./UploadModal";


export default function Sidebar({
    activeConversation,
    setActiveConversation,
    onClose,
    setMessages
}) {
    const [conversations, setConversations] = useState([]);
    const [showUpload, setShowUpload] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        loadConversations();
    }, []);

    async function loadConversations() {
        try {
            const response = await api.get("/chat/conversations/");
            setConversations(response.data);
        } catch (error) {
            console.log("Conversation loading error:", error);
        }
    }

    async function createConversation() {
        try {
            const response = await api.post(
                "/chat/conversation/create/",
                {
                    title: "New Chat"
                }
            );

            const newChat = response.data;

            setConversations(previous => [newChat, ...previous]);
            setActiveConversation(newChat.id);
            localStorage.setItem("conversation_id", newChat.id);
            if (setMessages) {
                setMessages([]);
            }
        } catch (error) {
            console.log("Create conversation error:", error);
        }
    }

    function selectConversation(id) {
        setActiveConversation(id);
        localStorage.setItem("conversation_id", id);
        if (setMessages) {
            setMessages([]);
        }
        if (onClose) {
            onClose();
        }
    }

    async function deleteConversation(id, event) {
        if (event) {
            event.stopPropagation();
        }

        setDeletingId(id);

        const attempts = [
            { method: "delete", url: `/chat/conversation/${id}/` },
            { method: "delete", url: `/chat/conversation/${id}/delete/` },
            { method: "delete", url: `/chat/conversations/${id}/` },
            { method: "delete", url: `/chat/conversations/${id}/delete/` },
            { method: "post", url: `/chat/conversation/${id}/delete/` },
            { method: "post", url: `/chat/conversations/${id}/delete/` }
        ];

        let lastError = null;

        for (const attempt of attempts) {
            try {
                const response = await api.request({
                    method: attempt.method,
                    url: attempt.url
                });

                if (response.status >= 200 && response.status < 300) {
                    setConversations(previous => previous.filter(chat => chat.id !== id));

                    if (activeConversation === id) {
                        setActiveConversation(null);
                        localStorage.removeItem("conversation_id");
                        if (setMessages) {
                            setMessages([]);
                        }
                    }

                    setDeletingId(null);
                    return;
                }
            } catch (error) {
                lastError = error;
            }
        }

        console.log("Delete conversation error:", lastError);
        setDeletingId(null);
    }

    return (
        <>
            <aside className="flex h-screen w-80 max-w-[88vw] flex-col border-r border-slate-800 bg-slate-950/95 text-white shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
                    <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-blue-500/15 p-2 text-blue-400">
                            <FileText size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Mr AI</p>
                            <p className="text-xs text-slate-400">Knowledge workspace</p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="px-4 py-4">
                    <button
                        onClick={createConversation}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110"
                    >
                        <Plus size={18} />
                        New Chat
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-3 pb-4">
                    <div className="mb-3 flex items-center justify-between px-1">
                        <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400">
                            Recent chats
                        </p>
                        <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] text-slate-400">
                            {conversations.length}
                        </span>
                    </div>

                    {conversations.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-500">
                            No conversations yet. Start a fresh chat to begin.
                        </div>
                    )}

                    {conversations.map(chat => {
                        const isActive = activeConversation === chat.id;

                        return (
                            <div
                                key={chat.id}
                                className={`mb-2 flex items-start gap-3 rounded-2xl border p-3 transition ${isActive
                                    ? "border-blue-500/40 bg-slate-800/80"
                                    : "border-transparent bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800/70"}`}
                            >
                                <button
                                    onClick={() => selectConversation(chat.id)}
                                    className="flex flex-1 items-start gap-3 text-left"
                                >
                                    <div className={`rounded-xl p-2 ${isActive ? "bg-blue-500/20 text-blue-400" : "bg-slate-800 text-slate-400"}`}>
                                        <MessageSquare size={16} />
                                    </div>

                                    <div className="min-w-0 flex-1 overflow-hidden">
                                        <div className="truncate text-sm font-medium">
                                            {chat.title || "New Chat"}
                                        </div>
                                        <div className="mt-1 text-xs text-slate-400">
                                            {chat.updated_at
                                                ? new Date(chat.updated_at).toLocaleDateString()
                                                : "Just now"}
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={(event) => deleteConversation(chat.id, event)}
                                    disabled={deletingId === chat.id}
                                    className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-800 hover:text-rose-400 disabled:cursor-wait"
                                    aria-label="Delete conversation"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="border-t border-slate-800 p-4">
                    <button
                        onClick={() => setShowUpload(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 font-medium text-slate-200 transition hover:border-blue-500/40 hover:bg-slate-800"
                    >
                        <Upload size={18} />
                        Upload Document
                    </button>
                </div>
            </aside>

            {showUpload && (
                <UploadModal
                    close={() => setShowUpload(false)}
                />
            )}
        </>
    );
}
