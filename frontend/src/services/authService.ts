import axios from "axios";
import {API_URL}  from "./../config.ts"


export const AuthService = {
    login: async (username: string, password: string) => {
        const response = await axios.post(`${API_URL}/auth/login`, { username, password });
        return response.data;
    },
    getToken:  () => {
        return localStorage.getItem("token")!='';
    },

    register: async (username: string, password: string) => {
        await axios.post(`${API_URL}/auth/register`, { username, password });
    },

    logout: () => {
        localStorage.removeItem("token");
    }
};
