import {
    Menu,
    Sparkles
} from "lucide-react";


export default function Header({ onToggleSidebar }) {

    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 text-white shadow-sm sm:px-6">
            <div className="flex items-center gap-3">
                <button
                    onClick={onToggleSidebar}
                    className="rounded-xl border border-slate-700 bg-slate-900/70 p-2 text-slate-300 transition hover:border-blue-500/40 hover:text-white lg:hidden"
                    aria-label="Open sidebar"
                >
                    <Menu size={18} />
                </button>

                <div className="flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5">
                    <Sparkles className="text-blue-400" size={16} />
                    <span className="text-sm font-semibold">AI Knowledge Assistant</span>
                </div>
            </div>

            {/* <div className="hidden text-sm text-slate-400 sm:block">
                LangGraph + RAG
            </div> */}
        </header>
    );
}