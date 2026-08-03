import {
    useState
} from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";


export default function Home() {
    const [activeConversation, setActiveConversation] = useState(
        localStorage.getItem("conversation_id")
    );

    const [messages, setMessages] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    function changeConversation(id) {
        localStorage.setItem("conversation_id", id);
        setActiveConversation(id);
        setIsSidebarOpen(false);
    }


    return (
        <div className="flex h-screen overflow-hidden bg-slate-950">
            <div
                className={`fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-200 lg:hidden ${isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            <div className={`fixed inset-y-0 left-0 z-40 transition-transform duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
                <Sidebar
                    activeConversation={activeConversation}
                    setActiveConversation={changeConversation}
                    onClose={() => setIsSidebarOpen(false)}
                    setMessages={setMessages}
                />
            </div>

            <div className="flex min-h-0 flex-1 flex-col">
                <Header onToggleSidebar={() => setIsSidebarOpen(true)} />
                <ChatWindow messages={messages} />
                <ChatInput conversationId={activeConversation} setMessages={setMessages} />
            </div>
        </div>
    );
}