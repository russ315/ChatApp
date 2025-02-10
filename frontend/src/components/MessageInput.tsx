import React from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";

interface MessageInputProps {
    messageInput: string;
    setMessageInput: (input: string) => void;
    sendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ messageInput, setMessageInput, sendMessage }) => {
    return (
        <div className="flex items-center p-4 border-t bg-white">
            <input
                type="text"
                placeholder="Write a message.."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none"
            />
            <button className="p-2 mx-2 text-gray-600">
                <FaMicrophone size={20} />
            </button>
            <button onClick={sendMessage} className="p-2 text-blue-500">
                <FaPaperPlane size={20} />
            </button>
        </div>
    );
};

export default MessageInput;
