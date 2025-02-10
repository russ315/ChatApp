import axios from "axios";
import { useEffect } from "react";

export const AxiosInterceptor = () => {
    useEffect(() => {
        axios.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("token");
                if (token) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }

                return config;
            },
            (error) => Promise.reject(error)
        );
    }, []);

    return null;
};
