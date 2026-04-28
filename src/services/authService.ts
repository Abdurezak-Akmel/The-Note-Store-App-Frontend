import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/auth";

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Types for auth data
export interface RegisterAndLoginData {
    email: string;
    password: string;
}

export interface ResetPasswordData {
    email: string;
    newPassword: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    token?: string;
    user?: {
        id: string;
        email: string;
        role: string;
        created_at: string;
    };
}

// Auth service functions
export const authService = {

    // Register a new user
    async register(userData: RegisterAndLoginData): Promise<AuthResponse> {
        try {
            const response = await api.post("/users/reg", userData);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Registration failed" };
        }
    },

    // Login user
    async login(credentials: RegisterAndLoginData): Promise<AuthResponse> {
        try {
            const response = await api.post("/users/login", credentials);
            if (response.data.success && response.data.token && response.data.user) {
                localStorage.setItem("accessToken", response.data.token);
                localStorage.setItem("userInfo", JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Login failed" };
        }
    },

    // Logout user
    async logout(): Promise<AuthResponse> {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await api.post(
                "/users/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.success) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("userInfo");
                localStorage.removeItem("refreshToken");
            }
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Logout failed" };
        }
    },

    // Reset password with token
    async resetPassword(resetData: ResetPasswordData): Promise<AuthResponse> {
        try {
            const response = await api.post("/users/reset", resetData);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Password reset failed" };
        }
    }
}

export default authService;