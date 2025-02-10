import { createContext, useContext, useState } from "react";
import { AuthService } from "../services/authService";

interface AuthContextType {
    isLoggedIn: boolean;
    handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(AuthService.getToken());

    const handleLogout = () => {
        AuthService.logout();
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, handleLogout }}>
    {children}
    </AuthContext.Provider>
);
};

export const useAuth = () => {
    return useContext(AuthContext);
};
