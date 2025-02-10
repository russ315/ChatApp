import React, {useEffect, useState} from "react";
import ChatApp from "./components/ChatApp";
import {AuthContext} from "./context/authContext";
import {AxiosInterceptor} from "./interceptors/axiosInterceptor.tsx";
import {BrowserRouter, Navigate, redirect, Route, Routes} from "react-router-dom";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import {AuthService} from "./services/authService.ts";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        }
    }, [token]);

    const handleLogin = async (username: string, password: string) => {
        try {
            const response = await AuthService.login(username, password);
            localStorage.setItem("token", response.data);
            setToken(response.data);
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const handleRegister = async (username: string, password: string) => {
        try {
            await AuthService.register(username, password);
            await handleLogin(username, password);

        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    const handleLogout = () => {
        AuthService.logout();
        setToken(null);
        setIsLoggedIn(false);
    };

    return (

        <AuthContext.Provider value={{ isLoggedIn, handleLogout }}>
            <AxiosInterceptor />
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login setIsLoggedIn={()=>{isLoggedIn}} setIsRegistering={() => {}} handleLogin={handleLogin} />} />
                    <Route path="/register" element={<Register setIsLoggedIn={()=>{isLoggedIn}} setIsRegistering={() => {isLoggedIn}} handleRegister={handleRegister} />} />
                    <Route path="/chat" element={isLoggedIn ? <ChatApp /> : <Navigate to="/login" replace />} />
                    <Route path="/" element={<Navigate to={isLoggedIn ? "/chat" : "/login"} replace />} />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    )


}


export default App;
