import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";
import { useAuth } from "./../context/authContext";

interface Message {
    id: number;
    sender: "me" | "other";
    text: string;
    time: string;
}

const ChatApp: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const handleLogout = auth?.handleLogout ?? (() => {});

    useEffect(() => {
        if (!auth?.isLoggedIn) {
            navigate("/login");
        }
    }, [auth?.isLoggedIn, navigate]);

    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: "other", text: "How is UI design going?", time: "16:39" },
        { id: 2, sender: "me", text: "Almost finished", time: "16:41" },
        { id: 3, sender: "other", text: "Did you finish your work already?", time: "15:25" },
        { id: 4, sender: "me", text: "Yes", time: "15:26" },
    ]);

    const [messageInput, setMessageInput] = useState("");

    const sendMessage = () => {
        if (messageInput.trim() !== "") {
            const newMessage: Message = {
                id: messages.length + 1,
                sender: "me",
                text: messageInput,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };
            setMessages([...messages, newMessage]);
            setMessageInput("");
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <div className="p-4 border-b flex justify-between items-center bg-white">
                    <h2 className="text-xl font-semibold">Chat</h2>
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
                </div>
                <ChatWindow messages={messages} />
                <MessageInput messageInput={messageInput} setMessageInput={setMessageInput} sendMessage={sendMessage} />
            </div>
        </div>
    );
};

export default ChatApp;
