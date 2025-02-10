import React from "react";

interface Message {
    id: number;
    sender: "me" | "other";
    text: string;
    time: string;
}

interface ChatWindowProps {
    messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
    return (
        <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} mb-2`}>
                    <div className={`p-3 rounded-lg max-w-xs ${msg.sender === "me" ? "bg-green-300" : "bg-blue-400 text-white"}`}>
                        {msg.text}
                        <span className="block text-xs text-gray-600 text-right mt-1">{msg.time}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatWindow;
