import axios from "axios";


export const api = axios.create({
    baseURL: "http://localhost:3000"
});


api.interceptors.request.use(
    (config: any) => {
        if (!config.url?.includes("/auth")) {
            const token = localStorage.getItem("jwt_token")
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
);

api.interceptors.response.use(
    (response: any) => response,
    async (error) => {
        console.log("Interceptor caught an error:", error.response?.status);

        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refresh_token = localStorage.getItem("refresh_token");
            console.log("Stored Refresh Token:", refresh_token);

            if (refresh_token) {
                try {
                    console.log("Calling refresh token API");
                    const response: any = await api.post(
                        "/auth/refresh-token",
                        {},
                        { headers: { Authorization: `Bearer ${refresh_token}` } }
                    );

                    console.log("New Access Token Received:", response.data.accessToken);

                    localStorage.setItem("jwt_token", response.data.accessToken);
                    originalRequest.headers["Authorization"] = `Bearer ${response.data.accessToken}`;

                    return api(originalRequest);
                } catch (err) {
                    console.error("Refresh token failed:", err);
                    window.location.href = "/login";
                }
            } else {
                console.warn("No refresh token found. Redirecting to login.");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;


