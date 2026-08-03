import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages }) {
    return (
        <div className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#0f172a_100%)] p-4 sm:p-6 lg:p-8">
            {messages.length === 0 && (
                <div className="flex h-full items-center justify-center">
                    <div className="max-w-md rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-center shadow-2xl shadow-slate-950/40">
                        <div className="mb-3 inline-flex rounded-2xl bg-blue-500/10 p-3 text-blue-400">
                            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h6m-6 4h10" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white">Start your first conversation</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            Ask about your uploaded documents and let the assistant answer with grounded context.
                        </p>
                    </div>
                </div>
            )}

            <div className="mx-auto flex max-w-4xl flex-col space-y-4">
                {messages.map((message, index) => (
                    <MessageBubble key={index} message={message} />
                ))}
            </div>
        </div>
    );
}
