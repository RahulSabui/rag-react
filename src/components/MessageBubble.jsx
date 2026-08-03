export default function MessageBubble({ message }) {
    const isUser = message.role === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-2xl rounded-3xl px-5 py-4 shadow-lg shadow-slate-950/20 ${isUser
                    ? "bg-linear-to-r from-blue-600 to-cyan-500 text-white"
                    : "border border-slate-800 bg-slate-900/90 text-slate-100"}`}
            >
                <p className="whitespace-pre-wrap text-sm leading-7">{message.content}</p>
{/* 
                {message.sources && message.sources.length > 0 && (
                    <div className="mt-4 border-t border-slate-700/70 pt-3 text-xs text-slate-400">
                        <p className="font-semibold text-slate-300">Sources</p>

                        {message.sources.map((source, index) => (
                            <div key={index} className="mt-1">
                                📄 {source.file_name || source.source || "Document"}
                            </div>
                        ))}
                    </div>
                )} */}
            </div>
        </div>
    );
}