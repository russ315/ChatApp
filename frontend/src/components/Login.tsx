import React, { useState } from "react";

interface LoginProps {
    setIsRegistering: (value: boolean) => void;
    setIsLoggedIn: (value: boolean) => void;
    handleLogin:(username: string,password:string) => Promise<void>;
}

const Login: React.FC<LoginProps> = ({ setIsRegistering, setIsLoggedIn,handleLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const onLogin = async () => {
        await handleLogin(username, password);
        setIsLoggedIn(true);

    }
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 border rounded mb-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded mb-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={onLogin} className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
                <p className="mt-3 text-center">
                    Don't have an account?{" "}
                    <a href={"register"} className="text-blue-500 cursor-pointer" onClick={() => setIsRegistering(true)}>Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
