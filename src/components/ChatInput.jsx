import {
    Send
} from "lucide-react";

import {
    useState
} from "react";

import api from "../api/axios";


export default function ChatInput({
    conversationId,
    setMessages
}) {
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);

    async function sendMessage() {
        if (!question || !conversationId) {
            return;
        }

        const userMessage = {
            role: "user",
            content: question
        };

        setMessages(prev => [...prev, userMessage]);
        setQuestion("");
        setLoading(true);

        try {
            const response = await api.post("/chat/", {
                conversation_id: conversationId,
                question
            });

            const assistantMessage = {
                role: "assistant",
                content: response.data.answer,
                sources: response.data.sources
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.log(error);
            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    content: "Something went wrong."
                }
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="border-t border-slate-800 bg-slate-950/90 p-3 sm:p-4">
            <div className="mx-auto flex max-w-4xl items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-2 shadow-lg shadow-slate-950/40">
                <input
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}
                    placeholder="Ask your documents..."
                    className="flex-1 border-none bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                />

                <button
                    onClick={sendMessage}
                    disabled={loading || !conversationId}
                    className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-3 text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
}
