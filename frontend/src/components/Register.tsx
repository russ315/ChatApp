import React, { Dispatch, SetStateAction, useState } from "react";

interface RegisterProps {
    setIsRegistering: Dispatch<SetStateAction<boolean>>;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    handleRegister: (username: string, password: string) => Promise<void>;
}

const Register: React.FC<RegisterProps> = ({ setIsRegistering, setIsLoggedIn, handleRegister }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    const onRegister = async () => {
        if (errors.length > 0) return;
        await handleRegister(username, password);
        setIsLoggedIn(true);
    };

    const handlePasswordChange = (newPassword: string) => {
        setPassword(newPassword);
        validatePasswords(newPassword, confirmPassword);
    };

    const handleConfirmPasswordChange = (newConfirmPassword: string) => {
        setConfirmPassword(newConfirmPassword);
        validatePasswords(password, newConfirmPassword);
    };

    const validatePasswords = (newPassword: string, newConfirmPassword: string) => {
        let errorList: string[] = [];

        if (newPassword.length < 8) {
            errorList.push("Password must be at least 8 characters.");
        }

        if (newPassword !== newConfirmPassword) {
            errorList.push("Passwords should match!");
        }

        setErrors(errorList);
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Register</h2>
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
                    onChange={(e) => handlePasswordChange(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full p-2 border rounded mb-2"
                    value={confirmPassword}
                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                />
                <button onClick={onRegister} className="w-full bg-green-500 text-white p-2 rounded">
                    Register
                </button>

                {errors.length > 0 && (
                    <ul className="text-sm text-red-500 mt-2">
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                )}

                <p className="mt-3 text-center">
                    Already have an account?{" "}
                    <a href={"/login"} className="text-blue-500 cursor-pointer" onClick={() => setIsRegistering(false)}>
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
