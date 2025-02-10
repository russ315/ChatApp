import React from "react";
import { FaSearch } from "react-icons/fa";
import logo from "./../assets/ruslan.jpg"


const contacts = [
    { name: "Ruslan", lastMessage: "You: Yes", img: logo.url},
    { name: "Nurkhon", lastMessage: "Thanks", img: "https://via.placeholder.com/50" },
    { name: "Akerke", lastMessage: "No, it will be 15th", img: "https://via.placeholder.com/50" },
];

const Sidebar: React.FC = () => {
    return (
        <div className="w-1/4 bg-white border-r p-4">
            <div className="relative mb-4">
                <FaSearch className="absolute top-3 left-3 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none"
                />
            </div>
            <div>
                {contacts.map((contact, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded cursor-pointer">
                        <img  src={ logo} alt={contact.name} className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="font-semibold">{contact.name}</p>
                            <p className="text-sm text-gray-500">{contact.lastMessage}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
